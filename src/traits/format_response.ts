import { Response } from "express";

class FormatResponse {
  /**
   ** Send response
   *
   * @param request
   * @param response
   * @returns object
   */
  sendResponse = (request: any, response: Response) => {
    let statusCode = 200;

    if (!request.status) {
      statusCode = 422;
    }

    let result: any = {
      status: request.status,
      message: request.message,
    };

    if (request.data) {
      result.data = request.data;
    }

    if (request.pagination) {
      result.pagination = request.pagination;
    }

    if (request.token) {
      result.token = request.token;
    }

    if (request.errorField) {
      result.error_field = request.errorField;
    }

    response.status(statusCode).send(result);
  };
}

export default FormatResponse;