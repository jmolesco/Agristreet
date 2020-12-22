const productList = 
`
SELECT 
            product.id,
            product.farmerid,
            product.productname,
            product.brand,
            product.description,
            product.price,
            measurement.type,
            product.measurementid,
            product.status,
            product.intime,
            product.uptime,
            category.name as categoryName,
            product.categoryId,
            CASE
              WHEN product.uptime is null
              THEN product.intime
              WHEN product.uptime > product.intime
              THEN product.uptime ELSE product.intime END AS OrderDateTime
 FROM 
product
INNER JOIN measurement ON measurement.id = product.measurementid
INNER JOIN farmers ON farmers.id = product.farmerid
INNER JOIN category ON category.id = product.categoryid`
;

module.exports = {
  productList,
};