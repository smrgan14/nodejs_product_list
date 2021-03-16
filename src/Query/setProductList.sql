UPDATE
	productList
SET productId = @productId,
	quantity = @quantity
WHERE
	productId = @productId AND listId = @listId
