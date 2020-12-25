const DB = require('@Library/repository');
const farmerbannerCriteria = require('@Library/DB/farmerbanner/criteria');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');

module.exports = {
  MapFarmerBannerList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
    hasFarmerId
  }) => {
    const repository = DB();

    const criteria = farmerbannerCriteria();

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
    //       criteria.orderByfarmerbanner(SortType.ASC);
    //     } else {
    //       criteria.orderByfarmerbanner(SortType.DESC);
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
    const FarmerBannerCount = await repository.farmerbannerRepository.getFarmerBannerListCount(criteria);
    debugger;
    criteria.setPager(page);
    // if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.farmerbannerRepository.getFarmerBannerList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, FarmerBannerCount, page);
  },
  MapFarmerBannerDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.farmerbannerRepository.getFarmerBannerDetail(id);
    return repository.MapGetDataList(result);
  },
};