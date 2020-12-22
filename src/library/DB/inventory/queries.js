const inventoryList = `
SELECT 
inventory.id,
product.id as productid,
product.productname,
inventory.quantity,
measurement.type,
inventory.status,
inventory.intime,
inventory.uptime
FROM inventory
INNER JOIN product ON product.id = inventory.productid
INNER JOIN measurement ON measurement.id = product.measurementid
`;

module.exports = {
  inventoryList,
};