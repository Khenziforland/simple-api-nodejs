import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../data_source";

import { config } from "../config";

import MessageHelper from "../helpers/message_helper";

import { User } from "../models/user";
import { AccessToken } from "../models/access_token";
import { DateTime } from "luxon";

class AuthService {
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
}

export default AuthService;
