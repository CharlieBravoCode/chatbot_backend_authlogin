"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node imports
const crypto_1 = __importDefault(require("crypto"));
// Config import
const secrets_json_1 = require("../configs/secrets.json");
function hashPassword(password) {
    return crypto_1.default.createHmac("sha256", secrets_json_1.sha256_secret).update(password).digest("base64");
}
exports.default = hashPassword;
