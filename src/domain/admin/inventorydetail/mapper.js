const DB = require('@Library/repository');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');
const inventorytrailCriteria = require('@Library/DB/inventorydetail/criteria');

module.exports = {

  MapInventoryList: async ({
    pager,
    filterStatus,
    searchKeyword,
    orderBy,
    hasInventoryId
  }) => {
    const repository = DB();

    const criteria = inventorytrailCriteria();

    if (filterStatus) {
      if (filterStatus.status === 1) {
        criteria.statusEqual(true);
      } else if (filterStatus.status === 2) {
        criteria.statusEqual(false);
      }else{
        criteria.statusEqual(true);
      }
    }

    if(hasInventoryId){
      if(hasInventoryId.inventoryid)
        criteria.inventoryIdEqual(hasInventoryId.inventoryid);
    }
    if (searchKeyword) 
    {
      if(searchKeyword.keyword)
        criteria.keywordLike(searchKeyword.keyword);
    }
    let noOrderBy = false;
    if (orderBy) {
      if (orderBy.orderKey === 1) { // ID
        if (orderBy.orderType === SortType.ASC)  // ASC
          criteria.orderByID(SortType.ASC);
        else
          criteria.orderByID(SortType.DESC);
        
      } else if (orderBy.orderKey === 2) {  // inventorytrail Name
        if (orderBy.orderType === SortType.ASC)  // ASC
          criteria.orderByinventorytrail(SortType.ASC);
        else 
          criteria.orderByinventorytrail(SortType.DESC);
      } else 
        noOrderBy = true;    
    }

    const page = {
      page: pager.page,
      maxRecord: config.DEFAULTPAGE_NUMBER,
    };
    const inventorytrailCount = await repository.inventorytrailRepository.getInventoryTrailCount(criteria);
    criteria.setPager(page);

    if (noOrderBy === true) criteria.orderByIntime();

    const result = await repository.inventorytrailRepository.getInventoryTrailList(criteria);

    const mappedValues = result.map(repository.MapInventoryTrailDataList);
    const list = { list: mappedValues };
    return repository.MapListWithPager(list, inventorytrailCount.length, page);
  },
};