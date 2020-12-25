const DB = require('@Library/repository');
const productimageCriteria = require('@Library/DB/productimage/criteria');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');

module.exports = {
  MapProductImageList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
    hasFarmerId
  }) => {
    const repository = DB();

    const criteria = productimageCriteria();

    if (filterStatus) {
      if (filterStatus.status === 1) {
        criteria.statusEqual(true);
      } else if (filterStatus.status === 2) {
        criteria.statusEqual(false);
      }
    }
    if (searchKeyword) {
      if(searchKeyword.keyword)
       criteria.keywordLike(searchKeyword.keyword);
    }
    let noOrderBy = false;
    // if (orderBy) {
    //   if (orderBy.orderKey === 1) { // ID
    //     if (orderBy.orderType === SortType.ASC) { // ASC
    //       criteria.orderByID(SortType.ASC);
    //     } else {
    //       criteria.orderByID(SortType.DESC);
    //     }
    //   } else if (orderBy.orderKey === 2) {
    //     if (orderBy.orderType === SortType.ASC) { // ASC
    //       criteria.orderByproductimage(SortType.ASC);
    //     } else {
    //       criteria.orderByproductimage(SortType.DESC);
    //     }
    //   } else {
    //     noOrderBy = true;
    //   }
    // }

    if(hasFarmerId){
      if(hasFarmerId.farmerid)
        criteria.farmerIdEqual(hasFarmerId.farmerid);
    }

    const page = {
      page: pager.page,
      maxRecord: config.DEFAULTPAGE_NUMBER,
    };
    const productimageCount = await repository.productimageRepository.getProductImageListCount(criteria);
    debugger;
    criteria.setPager(page);
    // if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.productimageRepository.getProductImageList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, productimageCount, page);
  },
  MapProductImageDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.productimageRepository.getProductImageDetail(id);
    return repository.MapGetDataList(result);
  },
};