import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../data_source";

import { config } from "../config";

import MessageHelper from "../helpers/message_helper";

import { User } from "../models/user";
import { AccessToken } from "../models/access_token";
import { DateTime } from "luxon";

class AuthService {
  /**
   ** Register service.
   *
   * @param request
   * @return object
   */
  register = async (request: any) => {
    let status = true;
    let message = MessageHelper.registerSuccess();

    const user = await AppDataSource.getRepository(User).save({
      email: request.fields.email,
      password: await bcrypt.hash(request.fields.password, 10),
    });

    const data = await AppDataSource.getRepository(User).findOneBy({
      id: user.id,
    });

    const token = jwt.sign({ id: user.id }, config.jwt.secretKey, {
      expiresIn: "24h",
    });

    const expiredAt = DateTime.now().plus({ days: 1 }).toISO();

    await AppDataSource.getRepository(AccessToken).save({
      user: {
        id: user.id,
      },
      token: token,
      expired_at: expiredAt,
    });

    const result = {
      status: status,
      message: message,
      data: data,
      token: token,
    };

    return result;
  };

  /**
   ** Login service.
   *
   * @param request
   * @return object
   */
  login = async (request: any) => {
    let status = true;
    let message = MessageHelper.loginSuccess();

    const data = await AppDataSource.getRepository(User).findOneBy({
      email: request.fields.email,
    });

    const token = jwt.sign({ id: data.id }, config.jwt.secretKey, {
      expiresIn: "24h",
    });

    const expiredAt = DateTime.now().plus({ days: 1 }).toISO();

    console.log(data);
    

    await AppDataSource.getRepository(AccessToken).save({
      user: {
        id: data.id,
      },
      token: token,
      expired_at: expiredAt,
    });

    const result = {
      status: status,
      message: message,
      data: data,
      token: token,
    };

    return result;
  };

  /**
   ** Logout service.
   *
   * @param request
   * @return object
   */
  logout = async (request: any) => {
    let status = true;
    let message = MessageHelper.logoutSuccess();

    // Get Token from header
    const token = request.headers!.authorization!.split(" ")[1];

    // Delete token from database
    await AppDataSource.getRepository(AccessToken).softDelete({
      token: token,
    });

    const result = {
      status: status,
      message: message,
    };

    return result;
  };
}

export default AuthService;
