import { ErrorHTTP } from "./../../errors/errors.class";
import { UserModel } from "./user.models";
import bcryptjs from "bcryptjs";
import { tokenService } from "../../tokens/tokens.services";
import { UserDTO } from "./user.dto";
import { RefreshTokenModel } from "../../tokens/tokens.models";
import { IUser } from "./user.types";

class UserService {
  async generateAndSaveToken(userFromDb: IUser) {
    const userDTO = new UserDTO(userFromDb);
    const tokens = tokenService.generateTokens({
      email: userDTO.email,
      id: userDTO.id,
      roles: userDTO.roles,
    });
    await tokenService.saveRefreshToken(userDTO.id, tokens.refreshToken);
    return {
      tokens,
      userDTO,
    };
  }
  async createUser(body: { email: string; password: string }) {
    const candidate = await UserModel.findOne({ email: body.email });
    if (candidate) {
      throw new ErrorHTTP(
        400,
        `Пользователь с таким email ${body.email} уже существует`
      );
    }
    const hashPassword = await bcryptjs.hash(body.password, 7);
    const newUser = await UserModel.create({
      email: body.email,
      password: hashPassword,
      roles: ["USER"],
    });

    const { tokens, userDTO } = await this.generateAndSaveToken(newUser);
    return { tokens, userDTO };
  }

  async getUser(body: { email: string; password: string }) {
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
      throw new ErrorHTTP(
        400,
        `Пользователь с таким email ${body.email} не существует`
      );
    }
    const isValidPassword = bcryptjs.compareSync(body.password, user.password);
    if (!isValidPassword) {
      throw new ErrorHTTP(400, "Пароль неверный");
    }

    const { tokens, userDTO } = await this.generateAndSaveToken(user);
    return { tokens, userDTO };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new ErrorHTTP(401, `Вы не авторизованы`);
    }
    const tokenFromDB = await RefreshTokenModel.findOne({ refreshToken });
    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!tokenFromDB || !userData) {
      throw new ErrorHTTP(401, `Вы не авторизованы`);
    }
    const user = await UserModel.findById(userData.id);
    if (!user) {
      throw new ErrorHTTP(400, `Пользователь не существует`);
    }
    const { tokens, userDTO } = await this.generateAndSaveToken(user);
    return {
      tokens,
      userDTO,
    };
  }
}

const userService = new UserService();
export { userService };
