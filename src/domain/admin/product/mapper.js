const DB = require('@Library/repository');
const productCriteria = require('@Library/DB/product/criteria');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');

module.exports = {
  MapProductList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
  }) => {
    const repository = DB();

    const criteria = productCriteria();

    if (filterStatus) {
      if (filterStatus.status === 1) {
        criteria.statusEqual(true);
      } else if (filterStatus.status === 2) {
        criteria.statusEqual(false);
      }
    }
    if (searchKeyword) {
      criteria.keywordLike(searchKeyword.keyword);
    }
    let noOrderBy = false;
    if (orderBy) {
      if (orderBy.orderKey === 1) { // ID
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByID(SortType.ASC);
        } else {
          criteria.orderByID(SortType.DESC);
        }
      } else if (orderBy.orderKey === 2) {
        if (orderBy.orderType === SortType.ASC) { // ASC
          criteria.orderByproduct(SortType.ASC);
        } else {
          criteria.orderByproduct(SortType.DESC);
        }
      } else {
        noOrderBy = true;
      }
    }

    const page = {
      page: pager.page,
      maxRecord: config.DEFAULTPAGE_NUMBER,
    };
    const productCount = await repository.productRepository.getProductListCount(criteria);
    criteria.setPager(page);
    if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.productRepository.getProductList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, productCount, page);
  },
  MapProductDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.productRepository.getProductDetail(id);
    return repository.MapGetDataList(result);
  },
};