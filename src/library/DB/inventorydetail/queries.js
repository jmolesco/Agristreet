const inventoryTrailList = `
SELECT 
inventorytrail.id,
inventorytrail.inventoryid,
inventorytrail.quantity,
inventorytrail.type,
inventorytrail.status,
inventorytrail.intime,
inventorytrail.uptime,
CASE
WHEN inventorytrail.uptime is null
THEN inventorytrail.intime
WHEN inventorytrail.uptime > inventorytrail.intime
THEN inventorytrail.uptime ELSE inventorytrail.intime END AS OrderDateTime
FROM inventorytrail
INNER JOIN inventory ON inventory.id = inventorytrail.inventoryid
`;

module.exports = {
  inventoryTrailList,
};