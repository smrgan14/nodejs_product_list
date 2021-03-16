import dbConnectionService from './DbConnectionServcice';
import dbQueryService from './DbQueryService';

class ProductListService {
    async createProductList(name, date, userId, products) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbListQuery = dbQueryService.queries.createList;
            const dbProductQuery = dbQueryService.queries.createProduct;
            const dbProductListQuery = dbQueryService.queries.createProductList;

            const dbListQueryResult = await connection.queryAsync(dbListQuery, {
                name,
                date,
                userId,
            });

            const listId = dbListQueryResult.insertId;

            for(let product of products) {
                const p = await connection.queryAsync(dbProductQuery, {
                    name: product.name,
                });
                
                await connection.queryAsync(dbProductListQuery, {
                    listId,
                    productId: p.insertId,
                    quantity: product.quantity,
                });
            }
            
            return {
                isSeccessfully: true,
            };
        } catch (error) {
            return { errorMessage: error.message };
        } finally {
            if(connection) {
                connection.release();
            }
        }
    }

    async setProductList(userId, listId, name, products) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            
            if (name) {
                const dbSetListQuery = dbQueryService.queries.setList;
                await connection.queryAsync(dbSetListQuery, {
                  userId,
                  id: listId,
                  name,
                });
            }

            if (products) {
                const dbSetProduct = dbQueryService.queries.setProduct;
                const dbSetProductQuantity = dbQueryService.queries.setProductQuantity;

                for (let product of products) {
                    console.log(product);

                    await connection.queryAsync(dbSetProduct, { 
                        id: product.productId,
                        name: product.name
                    });

                    await connection.queryAsync(dbSetProductQuantity, { 
                        listId: listId,
                        productId: product.productId,
                        quantity: product.quantity,
                    });
                }

                return { isSuccess: true };
            }
        }catch (error) {
            return error.message;
        }finally {
            if(connection) {
                connection.release();
            }
        }
    }

    async getProductListReport(userId, dateFrom, dateTo) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbReportQuery = dbQueryService.queries.getProductListReport;
            const reportResult = await connection.queryAsync(dbReportQuery, {
                dateFrom,
                dateTo,
                userId,
            });

            return reportResult;
        } catch (error) {
            return error.message;
        }finally {
            if(connection) {
                connection.release();
            }
        }
    }
}

export default new ProductListService();
