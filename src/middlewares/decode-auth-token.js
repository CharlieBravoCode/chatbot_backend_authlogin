"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_json_1 = require("../configs/secrets.json");
function decodeAuthToken(authToken) {
    try {
        let decoded = jsonwebtoken_1.default.verify(authToken, secrets_json_1.jwt_secret);
        return {
            user_id: decoded.user_id,
            username: decoded.username,
            location: decoded.location
        };
    }
    catch (err) {
        return undefined;
    }
}
exports.default = decodeAuthToken;
