import { AppDataSource } from "../../data_source";

/**
 * Paginate
 *
 * @param model
 * @param queryCondition
 * @param page
 * @param perPage
 * @param sort_key
 * @param sort_order
 * @returns object
 */
export const paginate = async (model: any, queryCondition: any, page: number, perPage: number, sort_key: any, sort_order: any) => {
  if (sort_key === null || sort_order === null) {
    sort_key = "created_at";
    sort_order = "DESC";
  }

  const response = await AppDataSource.getRepository(model).findAndCount({
    where: queryCondition,
    order: { [sort_key]: sort_order },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const data = response[0];
  const total = response[1];
  const lastPage = Math.ceil(total / perPage);

  return {
    data: data,
    pagination: {
      total: total,
      per_page: perPage,
      page: page,
      last_page: lastPage,
    },
  };
};
