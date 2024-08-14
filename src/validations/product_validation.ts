import Joi from "joi";

import { AppDataSource } from "../data_source";

import ArrayHelper from "../helpers/array_helper";
import JoiHelper from "../helpers/joi_helper";
import MessageHelper from "../helpers/message_helper";

import { Product } from "../models/product";
import { ProductCategory } from "../models/product_category";
import CheckHelper from "../helpers/check_helper";
import FileUploadHelper from "../helpers/file_upload_helper";

export default class ProductValidation {
  /**
   ** Get data validation.
   *
   * @param request
   * @return object
   */
  getData = async (request: any) => {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      page: Joi.number()
        .required()
        .min(1)
        .messages({
        "number.base": "Halaman harus berupa angka !",
        "number.empty": "Halaman tidak boleh kosong !",
        "any.required": "Halaman tidak boleh kosong !",
        "number.min": "Halaman minimal bernilai 1 !",
      }),

      per_page: Joi.number()
        .required()
        .min(1)
        .messages({
          "number.base": "Jumlah per halaman harus berupa angka !",
          "number.empty": "Jumlah per halaman tidak boleh kosong !",
        "any.required": "Jumlah per halaman tidak boleh kosong !",
        "number.min": "Jumlah per halaman minimal bernilai 1 !",
      }),

      sort_key: Joi.string()
        .required()
        .messages({
          "string.empty": "Urutan berdasarkan tidak boleh kosong !",
          "string.base": "Urutan berdasarkan harus berupa string !",
          "any.required": "Urutan berdasarkan tidak boleh kosong !",
        })
        .external(async (value) => {
          if (!ArrayHelper.isValueInArray(value, ["name", "description", "created_at"])) {
            JoiHelper.errorMessage("sort_key", "Urutan berdasarkan harus bernilai name, description atau created_at !", value);
          }

          return true;
        }),

      sort_order: Joi.string()
        .required()
        .messages({
          "string.empty": "Tipe urutan tidak boleh kosong !",
          "string.base": "Tipe urutan harus berupa string !",
          "any.required": "Tipe urutan tidak boleh kosong !",
        })
        .external(async (value) => {
          if (!ArrayHelper.isValueInArray(value.toUpperCase(), ["ASC", "DESC"])) {
            JoiHelper.errorMessage("sort_order", "Tipe urutan harus bernilai ASC atau DESC !", value);
          }

          return true;
        }),

      search: Joi.string()
        .optional()
        .messages({
          "string.empty": "Pencarian tidak boleh kosong !",
          "string.base": "Pencarian harus berupa string !",
      }),
    });

    const data = {
      page: request.query.page,
      per_page: request.query.per_page,
      sort_key: request.query.sort_key,
      sort_order: request.query.sort_order,
      search: request.query.search,
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

  /**
   ** Detail data validation.
   *
   * @param request
   * @return object
   */
  detailData = async (request: any) => {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      product_id: Joi.number()
        .required()
        .messages({
          "number.base": "ID kategori produk harus berupa angka !",
          "number.empty": "ID kategori produk tidak boleh kosong !",
          "any.required": "ID kategori produk tidak boleh kosong !",
        })
        .external(async (value) => {
          const product = await AppDataSource.getRepository(Product).findOneBy({
            id: value,
          });

          if (!product) {
            JoiHelper.errorMessage("product_id", "ID produk tidak tersedia !", value);
          }

          return true;
        }),
    });

    const data = {
      product_id: request.params.product_id,
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

  /**
   ** Create data validation.
   *
   * @param request
   * @return object
   */
  createData = async (request: any) => {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      product_category_id: Joi.number()
        .required()
        .messages({
          "number.base": "ID kategori produk harus berupa angka !",
          "number.empty": "ID kategori produk tidak boleh kosong !",
          "any.required": "ID kategori produk tidak boleh kosong !",
        })
        .external(async (value) => {
          const productCategory = await AppDataSource.getRepository(ProductCategory).findOneBy({
            id: value,
          });

          if (!productCategory) {
            JoiHelper.errorMessage("product_category_id", "ID kategori produk tidak tersedia !", value);
          }

          return true;
        }),

      name: Joi.string()
        .required()
        .messages({
          "string.base": "Nama harus berupa string !",
        "string.empty": "Nama tidak boleh kosong !",
        "any.required": "Nama tidak boleh kosong !",
      }),

      price: Joi.number()
        .required()
        .min(0)
        .messages({
          "number.base": "Harga Produk harus berupa angka !",
          "number.empty": "Harga Produk tidak boleh kosong !",
          "any.required": "Harga Produk tidak boleh kosong !",
          "number.min": "Harga Produk minimal bernilai 0 !",
      }),

      image: Joi.any()
        .optional()
        .messages({
          "any.base": "Gambar harus berupa file !",
        })
        .external(async (value) => {
          if (!CheckHelper.isset(request.files.image)) {
            JoiHelper.errorMessage("image", "Gambar error, silakan upload ulang !", value);
          }

          if (!FileUploadHelper.isImage(request.files.image)) {
            JoiHelper.errorMessage("image", "Format gambar harus jpg, jpeg atau png !", value);
          }

          if (!FileUploadHelper.isFileSizeAccepted(request.files.image)) {
            JoiHelper.errorMessage("image", "Gambar maksimal berukuran 10 MB !", value);
          }

          return true;
        }),
    });

    const data = {
      product_category_id: request.fields.product_category_id,
      name: request.fields.name,
      price: request.fields.price,
      image: request.files.image,
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

  /**
   ** Update data validation.
   *
   * @param request
   * @return object
   */
  updateData = async (request: any) => {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      product_id: Joi.number()
        .required()
        .messages({
          "number.base": "ID kategori produk harus berupa angka !",
          "number.empty": "ID kategori produk tidak boleh kosong !",
          "any.required": "ID kategori produk tidak boleh kosong !",
        })
        .external(async (value) => {
          const product = await AppDataSource.getRepository(Product).findOneBy({
            id: value,
          });

          if (!product) {
            JoiHelper.errorMessage("product_id", "ID produk tidak tersedia !", value);
          }

          return true;
        }),

      name: Joi.string()
        .required()
        .messages({
          "string.base": "Nama harus berupa string !",
          "string.empty": "Nama tidak boleh kosong !",
        "any.required": "Nama tidak boleh kosong !",
      }),

      description: Joi.string()
        .required()
        .messages({
        "string.base": "Deskripsi harus berupa string !",
        "string.empty": "Deskripsi tidak boleh kosong !",
        "any.required": "Deskripsi tidak boleh kosong !",
      }),
    });

    const data = {
      product_id: request.params.product_id,
      name: request.fields.name,
      description: request.fields.description,
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

  /**
   ** Delete data validation.
   *
   * @param request
   * @return object
   */
  deleteData = async (request: any) => {
    let status = true;
    let message = MessageHelper.validateSuccess();
    let errorField = null;

    const schema = Joi.object({
      product_id: Joi.number()
        .required()
        .messages({
          "number.base": "ID kategori produk harus berupa angka !",
          "number.empty": "ID kategori produk tidak boleh kosong !",
          "any.required": "ID kategori produk tidak boleh kosong !",
        })
        .external(async (value) => {
          const product = await AppDataSource.getRepository(Product).findOneBy({
            id: value,
          });

          if (!product) {
            JoiHelper.errorMessage("product_id", "ID produk tidak tersedia !", value);
          }

          return true;
        }),
    });

    const data = {
      product_id: request.params.product_id,
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
