UPDATE
    productList
SET
    quantity= @quantity
WHERE 
    productId = @productId AND listId = @listId
