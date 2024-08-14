import { ILike } from "typeorm";

import { AppDataSource } from "../data_source";

import CheckHelper from "../helpers/check_helper";
import MessageHelper from "../helpers/message_helper";

import paginate from "../libraries/pagination";

import { Product, ProductMethod } from "../models/product";

export default class ProductService {
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

    const product = await paginate(page, perPage, Product, whereParams, orderParams, relationParams);
    const data = product.data;
    const pagination = product.pagination;

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

    const data = await AppDataSource.getRepository(Product).findOneBy({
      id: request.params.product_id,
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

    const product = await AppDataSource.getRepository(Product).save({
      product_category: {
        id: request.fields.product_category_id,
      },
      name: request.fields.name,
      price: request.fields.price,
    });

    await ProductMethod.saveImage(request, product.id);

    const data = await AppDataSource.getRepository(Product).findOneBy({
      id: product.id,
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

    await AppDataSource.getRepository(Product).update(
      {
        id: request.params.product_id,
      },
      {
        name: request.fields.name,
      }
    );

    const data = await AppDataSource.getRepository(Product).findOneBy({
      id: request.params.product_id,
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

    await AppDataSource.getRepository(Product).softDelete({
      id: request.params.product_id,
    });

    const result = {
      status: status,
      message: message,
    };

    return result;
  };
}
