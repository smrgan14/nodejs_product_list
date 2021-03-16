import dbConnectionService from './DbConnectionServcice';
import dbQueryService from './DbQueryService';

class ListService {
    async createList(name, date, userId) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbQuery = dbQueryService.queries.createList;
            await connection.queryAsync(dbQuery, {
                name,
                date,
                userId,
            });

            return {
                isSuccessfully: true,
            };
        } catch (error) {
            return { errorMessage: error.message };
        } finally {
            if(connection) {
                connection.release();
            }
        }
    }

    async deleteList(listId) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbQuery = dbQueryService.queries.deleteList;
            await connection.queryAsync(dbQuery, {
                listId,
            });

            return {
                isSuccess: true,
            };
        } catch (error) {
            return error.message;
        }finally {
            if(connection) {
                connection.release();
            }
        }
    }
}

export default new ListService();
