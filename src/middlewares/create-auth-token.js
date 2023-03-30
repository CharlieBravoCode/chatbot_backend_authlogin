"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_json_1 = require("../configs/secrets.json");
function createAuthToken(user_id, username, location) {
    let jwtPayload = {
        user_id,
        username,
        location
    };
    return jsonwebtoken_1.default.sign(jwtPayload, secrets_json_1.jwt_secret, { expiresIn: "3h" });
}
exports.default = createAuthToken;
