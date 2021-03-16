DELETE 
	productList,list 
FROM 
    productList
INNER JOIN
    list ON productList.listId = @listId
WHERE
    list.id = @listId;
