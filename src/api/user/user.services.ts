import { ErrorHTTP } from './../../errors/errors.class';
import { UserModel } from './user.models';
import bcryptjs from 'bcryptjs';
import { tokenService } from '../../tokens/tokens.services';
import { UserDTO } from './user.dto';

import { IUserModel } from './user.types';

class UserService {
  async generateAndSaveTokens(userFromDb: IUserModel) {
    const userDTO = new UserDTO(userFromDb);
    const tokens = tokenService.generateTokens({
      email: userDTO.email,
      id: userDTO._id,
      roles: userDTO.roles,
    });
    await tokenService.saveRefreshToken(userDTO._id, tokens.refreshToken);
    return {
      tokens,
      userDTO,
    };
  }
  async createUser(body: { email: string; password: string }) {
    const candidate = await UserModel.findOne({ email: body.email }).exec();
    if (candidate) {
      throw new ErrorHTTP(400, `Пользователь с таким email (${body.email}) уже существует`);
    }
    const hashPassword = await bcryptjs.hash(body.password, 7);
    const newUser = await UserModel.create({
      email: body.email,
      password: hashPassword,
    });

    const { tokens, userDTO } = await this.generateAndSaveTokens(newUser);
    return { tokens, userDTO };
  }

  async getUser(body: { email: string; password: string }) {
    const user = await UserModel.findOne({ email: body.email }).exec();
    if (!user) {
      throw new ErrorHTTP(400, `Пользователь с таким email ${body.email} не существует`);
    }
    const isValidPassword = bcryptjs.compareSync(body.password, user.password);
    if (!isValidPassword) {
      throw new ErrorHTTP(400, 'Пароль неверный');
    }

    const { tokens, userDTO } = await this.generateAndSaveTokens(user);
    return { tokens, userDTO };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new ErrorHTTP(401, `Вы не авторизованы`);
    }
    const tokenFromDB = await tokenService.findRefreshToken(refreshToken);

    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!tokenFromDB || !userData) {
      throw new ErrorHTTP(401, `Вы не авторизованы`);
    }
    const user = await UserModel.findById(userData.id);
    if (!user) {
      throw new ErrorHTTP(404, `Пользователь не существует`);
    }
    const { tokens, userDTO } = await this.generateAndSaveTokens(user);
    return {
      tokens,
      userDTO,
    };
  }

  logout(refreshToken: string) {
    return tokenService.removeRefreshToken(refreshToken);
  }
}

const userService = new UserService();
export { userService };
