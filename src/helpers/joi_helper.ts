import Joi from "joi";

class JoiHelper {
  /**
   ** Error message.
   *
   * @param path
   * @param message
   * @param value
   * @returns throw error
   */
  public static errorMessage(path: string, message: string, value: any = null) {
    throw new Joi.ValidationError(
      "Error",
      [
        {
          type: `${path}.external`,
          path: [path],
          message: message,
        },
      ],
      value
    );
  }
}

export default JoiHelper;