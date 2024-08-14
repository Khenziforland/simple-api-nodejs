import { AppDataSource } from "../../data_source";

/**
 * Paginate
 *
 * @param model
 * @param queryCondition
 * @param relationParams
 * @param page
 * @param perPage
 * @param sortKey
 * @param sortOrder
 * @returns object
 */
export default async function paginate(page: number, perPage: number, model: any, whereParams: any, orderParams: any, relationParams: any) {
  const response = await AppDataSource.getRepository(model).findAndCount({
    where: whereParams,
    order: orderParams,
    relations: relationParams,
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
}
