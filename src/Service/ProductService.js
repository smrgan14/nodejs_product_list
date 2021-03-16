import dbConnectionService from './DbConnectionServcice';
import dbQueryService from './DbQueryService';

class ProductService {
    async createProduct(name) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbQuery = dbQueryService.queries.createProduct;
            await connection.queryAsync(dbQuery, {
                name,
            });

            return {
                isSuccess: true,
            };
        } catch (error) {
            return { errorMessage: error.message };
        } finally {
            if(connection) {
                connection.release();
            }
        }
    }

    async setProduct(id, name) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbQuery = dbQueryService.queries.setProduct;
            await connection.queryAsync(dbQuery, {
                id,
                name,
            });

            return  {
                isUpdated: true,
            };
        } catch (error) {
            return { errorMessage: error.message };
        }finally {
            if(connection) {
                connection.release();
            }
        }
    }
}

export default new ProductService();
