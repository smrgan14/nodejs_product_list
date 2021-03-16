SELECT 
    p.name, SUM(pl.quantity) AS totalQuantity
FROM 
    list as l
INNER JOIN 
    productList AS pl ON l.id = pl.listId
INNER JOIN 
    product AS p ON p.id = pl.productId
WHERE 
    l.date BETWEEN @dateFrom AND @dateTo AND l.userId = @userId
GROUP BY 
    p.name
