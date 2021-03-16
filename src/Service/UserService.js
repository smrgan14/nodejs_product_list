import dbConnectionService from './DbConnectionServcice';
import dbQueryService from './DbQueryService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

class UserService {
    async createUser(firstName, lastName, email, password) {
        let connection;
        const saltRounds = 10;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbQuery = dbQueryService.queries.createUser;
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    password = hash;
                    connection.queryAsync(dbQuery, {
                        firstName,
                        lastName,
                        email,
                        password,
                    });
                });
            });

            return {
                isSuccess: true
            };
        } catch (error) {
            return { errorMessage: error.message };
        } finally {
            if(connection) {
                connection.release();
            }
        }
    }

    async logIn(email, password) {
        let connection;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbQuery = dbQueryService.queries.logInUser;
            const dbQueryResult = await connection.queryAsync(dbQuery, {
                email,
            });

            const userPassword = dbQueryResult[0].password;
            const checkPassword = await bcrypt.compare(password, userPassword);

            if(checkPassword) {
                const userId = dbQueryResult[0].userId;
                const token = jwt.sign({ id: userId }, config.jwt.secretKey, { expiresIn: '1h' });

                return token;
            } else {
                return { isSuccess: false };
            }
        } catch (error) {
            return { errorMessage: error.message };
        } finally {
            if(connection) {
                connection.release();
            }
        }
    }

    async setUserPassword(currentPassword, newPassword,  userId) {
        let connection;
        const saltRounds = 10;
        try {
            connection = await dbConnectionService.pool.getConnectionAsync();
            const dbSetPasswordQuery = dbQueryService.queries.setUserPassword;
            const dbGetPasswordByUserIdQuery = dbQueryService.queries.getUserPasswordByUserId;

            const dbUserPassword = await connection.queryAsync(dbGetPasswordByUserIdQuery, {
                userId,
            });

            if(currentPassword == newPassword) {
                return { warningMessage: 'Current and new password are eaqule, try again' };
            }
            const isCheck = await bcrypt.compare(currentPassword,dbUserPassword[0].password);

            if(isCheck == false) {
                return { warningMessage: 'Current password is not correct'};
            }else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        newPassword = hash;
                        connection.queryAsync(dbSetPasswordQuery, {
                            newPassword,
                            userId,
                        });
                    });
                });
            return {
                isSuccess: true,
            };
        }
            
        } catch (error) {
            return error.message;
        } finally {
            if(connection) {
                connection.release();
            }
        }
    }
}

export default new UserService();