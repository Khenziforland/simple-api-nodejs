import { Request, Response } from "express";

import ProductValidation from "../validations/product_validation";

import ProductService from "../services/product_service";

import FormatResponse from "../traits/format_response";

class ProductController {
  /**
   ** ProductValidation Instance
   *
   * @var \src\validations\product_validation
   */
  private productValidation: ProductValidation;

  /**
   ** ProductService Instance
   *
   * @var \src\services\product_service
   */
  private productService: ProductService;

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
    this.productValidation = new ProductValidation();
    this.productService = new ProductService();
    this.formatResponse = new FormatResponse();
  }

  /**
   ** Get Data
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  getData = async (request: Request, response: Response) => {
    const validation = await this.productValidation.getData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productService.getData(request);

    return this.formatResponse.sendResponse(result, response);
  };

  /**
   ** Detail Data
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  detailData = async (request: Request, response: Response) => {
    const validation = await this.productValidation.detailData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productService.detailData(request);

    return this.formatResponse.sendResponse(result, response);
  };

  /**
   ** Create Data
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  createData = async (request: Request, response: Response) => {
    const validation = await this.productValidation.createData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productService.createData(request);

    return this.formatResponse.sendResponse(result, response);
  };

  /**
   ** Update Data
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  updateData = async (request: Request, response: Response) => {
    const validation = await this.productValidation.updateData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productService.updateData(request);

    return this.formatResponse.sendResponse(result, response);
  };

  /**
   ** Delete Data
   *
   * @param Request request
   * @param Response response
   * @return Response
   */
  deleteData = async (request: Request, response: Response) => {
    const validation = await this.productValidation.deleteData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productService.deleteData(request);

    return this.formatResponse.sendResponse(result, response);
  };
}

export default ProductController;
