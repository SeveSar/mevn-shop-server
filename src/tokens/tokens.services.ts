import jwt, { JwtPayload } from "jsonwebtoken";
import { ITokenPayload } from "../api/user/user.types";
import { loggerService } from "../logger";
import { RefreshTokenModel } from "./tokens.models";

class TokenService {
  generateTokens(payload: ITokenPayload) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "10m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  async saveRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenOld = await RefreshTokenModel.findOne({ user: userId });
    if (refreshTokenOld) {
      refreshTokenOld.refreshToken = refreshToken;
      return await refreshTokenOld.save();
    } else {
      return await RefreshTokenModel.create({
        refreshToken,
        user: userId,
      });
    }
  }

  async removeRefreshToken(refreshToken: string) {
    return await RefreshTokenModel.deleteOne({ refreshToken });
  }

  async findRefreshToken(refreshToken: string) {
    return await RefreshTokenModel.findOne({ refreshToken });
  }

  validateAccessToken(accessToken: string) {
    try {
      const userDecoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as ITokenPayload;
      return userDecoded;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(refreshToken: string) {
    try {
      const userDecoded = jwt.verify(
        refreshToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as ITokenPayload;
      return userDecoded;
    } catch (e) {
      return null;
    }
  }
}

const tokenService = new TokenService();
export { tokenService };
