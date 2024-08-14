import { ILike } from "typeorm";

import { AppDataSource } from "../data_source";

import CheckHelper from "../helpers/check_helper";
import MessageHelper from "../helpers/message_helper";

import paginate from "../libraries/pagination";

import { ProductCategory } from "../models/product_category";

export default class ProductCategoryService {
  /**
   ** Get data service.
   *
   * @param request
   * @return object
   */
  getData = async (request: any) => {
    let status = true;
    let message = MessageHelper.retrieveSuccess();

    const page = Number(request.query.page);
    const perPage = Number(request.query.per_page);
    const sortKey = request.query.sort_key;
    const sortOrder = request.query.sort_order.toUpperCase();

    let whereParams: any = {};

    let orderParams: any = {
      [sortKey]: sortOrder,
    };

    let relationParams: any = {};

    if (CheckHelper.isset(request.query.search)) {
      whereParams = [
        {
          name: ILike(`%${request.query.search}%`),
        },
        {
          description: ILike(`%${request.query.search}%`),
        },
      ];
    }

    const productCategory = await paginate(page, perPage, ProductCategory, whereParams, orderParams, relationParams);
    const data = productCategory.data;
    const pagination = productCategory.pagination;

    const result = {
      status: status,
      message: message,
      data: data,
      pagination: pagination,
    };

    return result;
  };

  /**
   ** Detail data service.
   *
   * @param request
   * @return object
   */
  detailData = async (request: any) => {
    let status = true;
    let message = MessageHelper.retrieveSuccess();

    const data = await AppDataSource.getRepository(ProductCategory).findOneBy({
      id: request.params.product_category_id,
    });

    const result = {
      status: status,
      message: message,
      data: data,
    };

    return result;
  };

  /**
   ** Create data service.
   *
   * @param request
   * @return object
   */
  createData = async (request: any) => {
    let status = true;
    let message = MessageHelper.saveSuccess();

    const productCategory = await AppDataSource.getRepository(ProductCategory).save({
      name: request.fields.name,
      description: request.fields.description,
    });

    const data = await AppDataSource.getRepository(ProductCategory).findOneBy({
      id: productCategory.id,
    });

    const result = {
      status: status,
      message: message,
      data: data,
    };

    return result;
  };

  /**
   ** Update data service.
   *
   * @param request
   * @return object
   */
  updateData = async (request: any) => {
    let status = true;
    let message = MessageHelper.saveSuccess();

    await AppDataSource.getRepository(ProductCategory).update(
      {
        id: request.params.product_category_id,
      },
      {
        name: request.fields.name,
        description: request.fields.description,
      }
    );

    const data = await AppDataSource.getRepository(ProductCategory).findOneBy({
      id: request.params.product_category_id,
    });

    const result = {
      status: status,
      message: message,
      data: data,
    };

    return result;
  };

  /**
   ** Delete data service.
   *
   * @param request
   * @return object
   */
  deleteData = async (request: any) => {
    let status = true;
    let message = MessageHelper.deleteSuccess();

    await AppDataSource.getRepository(ProductCategory).softDelete({
      id: request.params.product_category_id,
    });

    const result = {
      status: status,
      message: message,
    };

    return result;
  };
}
