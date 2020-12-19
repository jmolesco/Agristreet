const DB = require('@Library/repository');
const farmerCriteria = require('@Library/DB/farmer/criteria');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');

module.exports = {
  MapFarmerList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
  }) => {
    const repository = DB();

    const criteria = farmerCriteria();

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
          criteria.orderByfarmer(SortType.ASC);
        } else {
          criteria.orderByfarmer(SortType.DESC);
        }
      } else {
        noOrderBy = true;
      }
    }

    const page = {
      page: pager.page,
      maxRecord: config.DEFAULTPAGE_NUMBER,
    };
    const farmerCount = await repository.farmerRepository.getFarmerListCount(criteria);
    criteria.setPager(page);
    if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.farmerRepository.getFarmerList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, farmerCount, page);
  },
  MapFarmerDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.farmerRepository.getFarmerDetail(id);
    return repository.MapGetDataList(result);
  },
};