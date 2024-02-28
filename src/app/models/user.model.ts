import { getPool } from '../../config/db';
import Logger from '../../config/logger';
import { ResultSetHeader } from 'mysql2';

// const getAll = async (): Promise<User[]> => {
//     Logger.info(`Getting all users from the database`);
//     const conn = await getPool().getConnection();
//     const query = 'select * from lab2_users';
//     const [ rows ] = await conn.query( query );
//     await conn.release();
//     return rows;
// }

// const getOne = async (id: number): Promise<User[]> => {
//     Logger.info(`Getting user ${id} from the database`);
//     const conn = await getPool().getConnection();
//     const query = 'select * from lab2_users where user_id = ?';
//     const [ rows ] = await conn.query( query, [ id ] );
//     await conn.release();
//     return rows;
// }


const insert = async (email: string, firstName: string, lastName: string, password: string): Promise<ResultSetHeader> => {
    Logger.info(`Adding user ${email} to the database`);
    const conn = await getPool().getConnection();
    const query = 'insert into user (email, first_name, last_name, password) values (?, ?, ?, ?)';
    const [result] = await conn.query(query,[email, firstName, lastName, password]);
    await conn.release();
    return result;
}

const getByEmail = async (email: string): Promise<User[]> => {
    Logger.info(`Getting user ${email} from the database`);
    const conn = await getPool().getConnection();
    const query = 'SELECT * FROM user WHERE email = (?)';
    const [result] = await conn.query(query,[email]);
    await conn.release();
    return result;
}

const insertToken = async (email: string, token: string): Promise<any> => {
    Logger.info(`Updating user ${email} token in the database`);
    const conn = await getPool().getConnection();
    const query = 'UPDATE user SET auth_token = (?) WHERE email = (?)';
    const [result] = await conn.query(query,[token, email]);
    await conn.release();
    return result;
}

const getId = async (id: string): Promise<User[]> => {
    Logger.info(`Getting user ${id} from the database`);
    const conn = await getPool().getConnection();
    const query = 'SELECT * FROM user WHERE id = (?)';
    const [result] = await conn.query(query,[id]);
    await conn.release();
    return result;
}

// const alter = async (id: number, username: string): Promise<any> => {
//     Logger.info(`Updating user ${id} to the database`);
//     const conn = await getPool().getConnection();
//     const query = 'UPDATE lab2_users SET username = (?) WHERE user_id = (?)';
//     const [result] = await conn.query(query,[username, id]);
//     await conn.release();
//     return result;
// }

// const remove = async (id: number): Promise<any> => {
//     Logger.info(`Deleting user ${id} from the database`);
//     const conn = await getPool().getConnection();
//     const query = 'DELETE FROM lab2_users WHERE user_id = (?)';
//     const [result] = await conn.query(query,[id]);
//     await conn.release();
//     return result;
// }

export {insert, getByEmail, insertToken, getId}