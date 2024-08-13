import Joi from "joi";

import { AppDataSource } from "../data_source";

import JoiHelper from "../helpers/joi_helper";
import MessageHelper from "../helpers/message_helper";

import { User } from "../models/user";

class AuthValidation {
  register = async (request: any) => {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.base": "Email harus berupa string !",
        "string.empty": "Email tidak boleh kosong !",
        "any.required": "Email tidak boleh kosong !",
        "string.email": "Format email tidak valid !",
      }).external(async (value) => {
        const user = await AppDataSource.getRepository(User).findOneBy({
          email: value,
        });

        if (user) {
          JoiHelper.errorMessage("email", "Email sudah terdaftar !", value);
        }

        return true;
      }),

      password: Joi.string().required().messages({
        "string.base": "Password harus berupa string !",
        "string.empty": "Password tidak boleh kosong !",
        "any.required": "Password tidak boleh kosong !",
      }),
    });

    const data = {
      email: request.fields.email,
      password: request.fields.password,
    };

    try {
      await schema.validateAsync(data);
    } catch (error: any) {
      status = false;
      message = error.details[0].message;
      errorField = error.details[0].path[0];
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  };
}

export default AuthValidation;
