import { Request, Response } from "express";

import ProductCategoryValidation from "../validations/product_category_validation";

import ProductCategoryService from "../services/product_category_service";

import FormatResponse from "../traits/format_response";

class ProductCategoryController {
  /**
   ** ProductCategoryValidation Instance
   *
   * @var \src\validations\product_category_validation
   */
  private productCategoryValidation: ProductCategoryValidation;

  /**
   ** ProductCategoryService Instance
   *
   * @var \src\services\product_category_service
   */
  private productCategoryService: ProductCategoryService;

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
    this.productCategoryValidation = new ProductCategoryValidation();
    this.productCategoryService = new ProductCategoryService();
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
    const validation = await this.productCategoryValidation.getData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productCategoryService.getData(request);

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
    const validation = await this.productCategoryValidation.detailData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productCategoryService.detailData(request);

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
    const validation = await this.productCategoryValidation.createData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productCategoryService.createData(request);

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
    const validation = await this.productCategoryValidation.updateData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productCategoryService.updateData(request);

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
    const validation = await this.productCategoryValidation.deleteData(request);

    if (!validation.status) {
      return this.formatResponse.sendResponse(validation, response);
    }

    const result = await this.productCategoryService.deleteData(request);

    return this.formatResponse.sendResponse(result, response);
  };
}

export default ProductCategoryController;
