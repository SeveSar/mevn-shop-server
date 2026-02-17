import type { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import type { ITokenPayload } from '../api/user/user.types';
import { RefreshTokenModel } from './tokens.models';

class TokenService {
  generateTokens(payload: ITokenPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
      expiresIn: '7m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId: Types.ObjectId, refreshToken: string) {
    const refreshTokenFromBD = await RefreshTokenModel.findOne({
      user: userId,
    });
    if (refreshTokenFromBD) {
      refreshTokenFromBD.refreshToken = refreshToken;
      return await refreshTokenFromBD.save();
    } else {
      return await RefreshTokenModel.create({
        refreshToken,
        user: userId,
      });
    }
  }

  async removeRefreshToken(refreshToken: string) {
    return await RefreshTokenModel.deleteOne({ refreshToken }).exec();
  }

  async findRefreshToken(refreshToken: string) {
    return await RefreshTokenModel.findOne({ refreshToken }).exec();
  }

  validateAccessToken(accessToken: string) {
    try {
      const userDecoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET || '') as ITokenPayload;
      return userDecoded;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || '') as ITokenPayload;
      return userDecoded;
    } catch (e) {
      return null;
    }
  }
}

const tokenService = new TokenService();
export { tokenService };
