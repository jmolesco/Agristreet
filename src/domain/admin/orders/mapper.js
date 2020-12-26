const DB = require('@Library/repository');
const ordersCriteria = require('@Library/DB/orders/criteria');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');

module.exports = {
  MapOrdersList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
  }) => {
    const repository = DB();

    const criteria = ordersCriteria();

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

    if(hasFarmerandCustomerId){
      if(hasFarmerandCustomerId.farmerid)
        criteria.farmerIdEqual(hasFarmerandCustomerId.farmerid);

        if(hasFarmerandCustomerId.consumerid)
        criteria.consumerIdEqual(hasFarmerandCustomerId.consumerid);
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
          criteria.orderByorders(SortType.ASC);
        } else {
          criteria.orderByorders(SortType.DESC);
        }
      } else {
        noOrderBy = true;
      }
    }

    const page = {
      page: pager.page,
      maxRecord: config.DEFAULTPAGE_NUMBER,
    };
    const ordersCount = await repository.ordersRepository.getOrdersListCount(criteria);
    criteria.setPager(page);
    if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.ordersRepository.getOrdersList(criteria);

    const mappedValues = result.map(repository.MapGetDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, ordersCount, page);
  },
  MapOrdersDetail: async ({ id }) => {
    const repository = DB();
    const result = await repository.ordersRepository.getOrdersDetail(id);
    return repository.MapGetDataList(result);
  },
};