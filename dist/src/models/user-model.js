"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Util imports
const hash_password_1 = __importDefault(require("../utils/hash-password"));
const create_auth_token_1 = __importDefault(require("../middlewares/create-auth-token"));
// Node module imports
const database_connection_1 = __importDefault(require("./database-connection"));
class UserModel {
    authenticateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield database_connection_1.default.create();
            if (conn === undefined) {
                return {
                    success: false,
                    status_code: 500
                };
            }
            let hashedPassword = (0, hash_password_1.default)(password);
            try {
                let queryStr = `SELECT * FROM Users WHERE username="${username}" AND password="${hashedPassword}";`;
                let queryResults = yield conn.query(queryStr);
                conn.release();
                queryResults = queryResults[0];
                if (queryResults.length < 1) {
                    return {
                        success: false,
                        status_code: 404
                    };
                }
                let queryResult = queryResults[0];
                let auth_token = (0, create_auth_token_1.default)(queryResult["user_id"], queryResult["username"], queryResult["location"]);
                return {
                    success: true,
                    status_code: 200,
                    auth_token
                };
            }
            catch (err) {
                console.log(err);
                return {
                    success: false,
                    status_code: 500,
                };
            }
        });
    }
    createUser(username, password, location) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield database_connection_1.default.create();
            if (conn === undefined) {
                return {
                    success: false,
                    status_code: 500,
                };
            }
            let hashedPassword = (0, hash_password_1.default)(password);
            try {
                let queryStr = `INSERT INTO Users (user_id, username, password, location) VALUES(NULL, "${username}", "${hashedPassword}", "${location}");`;
                let queryResult = yield conn.query(queryStr);
                conn.release();
                /* Result when printing queryResult[0]:
                    ResultSetHeader {
                    fieldCount: 0,
                    affectedRows: 1,
                    insertId: 2,
                    info: '',
                    serverStatus: 2,
                    warningStatus: 0
                }
                */
                let newUserID = queryResult[0].insertId;
                let auth_token = (0, create_auth_token_1.default)(newUserID, username, location);
                return {
                    success: true,
                    status_code: 400,
                    auth_token
                };
            }
            catch (err) {
                return {
                    success: false,
                    status_code: 500
                };
            }
        });
    }
    userExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield database_connection_1.default.create();
            username = username.toLowerCase();
            if (conn === undefined) {
                return undefined;
            }
            try {
                let queryResult = yield conn.query(`SELECT * FROM Users WHERE username="${username}";`);
                conn.release();
                if (queryResult[0].length !== 0) {
                    return true;
                }
                return false;
            }
            catch (err) {
                return false;
            }
        });
    }
    userClientData(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = yield database_connection_1.default.create();
            if (conn === undefined) {
                return undefined;
            }
            let queryStr = `SELECT * FROM Users WHERE user_id=${user_id}`;
            try {
                let queryResult = conn.query(queryStr);
                if (queryResult[0].length === 0) {
                    return undefined;
                }
                let username = queryResult[0][0]["username"];
                let location = queryResult[0][0]["location"];
                return {
                    user_id,
                    username,
                    location
                };
            }
            catch (err) {
                return undefined;
            }
        });
    }
}
exports.default = new UserModel();
