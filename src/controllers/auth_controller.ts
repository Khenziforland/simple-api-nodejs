import { Request, Response } from "express";

import AuthValidation from "../validations/auth_validation";

import AuthService from "../services/auth_service";

import FormatResponse from "../traits/format_response";

class AuthController {
  /**
   ** AuthValidation Instance
   *
   * @var \src\validations\auth_validation
   */
  private authValidation: AuthValidation;

  /**
   ** AuthService Instance
   *
   * @var \src\services\auth_service
   */
  private authService: AuthService;

  /**
   ** FormatResponse Instance
   *
   * @var \src\traits\format_response
   */
  private formatResponse: FormatResponse;

  /**
   ** Create new instance
   *
   * @return void
   */
  constructor() {
    this.authValidation = new AuthValidation();
    this.authService = new AuthService();
    this.formatResponse = new FormatResponse();
  }

  /**
   ** Register
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  register = async (request: Request, response: Response) => {
    const validation = await this.authValidation.register(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.authService.register(request);

    return this.formatResponse.sendResponse(result, response);
  };

  /**
   ** Login
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  login = async (request: Request, response: Response) => {
    const validation = await this.authValidation.login(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.authService.login(request);

    return this.formatResponse.sendResponse(result, response);
  };

  /**
   ** Logout
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  logout = async (request: Request, response: Response) => {
    const validation = await this.authValidation.logout(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.authService.logout(request);

    return this.formatResponse.sendResponse(result, response);
  };
}

export default AuthController;
