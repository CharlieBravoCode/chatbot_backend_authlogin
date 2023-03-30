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
const promise_1 = __importDefault(require("mysql2/promise"));
const db_config_json_1 = __importDefault(require("../configs/db-config.json"));
class DatabaseConnection {
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                // Aquire a database connection and return it to the caller
                return yield DatabaseConnection.connectionPool.getConnection(); // Note: manually release the connection after use.
            }
            catch (err) {
                console.log(err);
                return undefined;
            }
        });
    }
}
DatabaseConnection.connectionPool = promise_1.default.createPool(db_config_json_1.default);
exports.default = DatabaseConnection;
