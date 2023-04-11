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
// Model imports
const user_model_1 = __importDefault(require("../models/user-model"));
// Util imports
const input_regex_1 = __importDefault(require("../utils/input-regex"));
function authenticateLoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let bodyData = JSON.parse(req.body);
        let username = bodyData["username"];
        let password = bodyData["password"];
        if (username === undefined) {
            return res.status(400).send({
                status_code: 400,
                message: "Missing field \"username\""
            });
        }
        if (typeof username !== "string") {
            return res.status(400).send({
                status_code: 400,
                message: "Invalid username"
            });
        }
        username = username.toLowerCase();
        let userExists = yield user_model_1.default.userExists(username);
        if (userExists === undefined) {
            return res.status(500).send({
                status_code: 500,
                message: "Internal server error"
            });
        }
        if (userExists === false) {
            return res.status(404).send({
                status_code: 404,
                message: "User does not exist"
            });
        }
        if (password === undefined) {
            return res.status(400).send({
                status_code: 400,
                message: `Missing field "password"`
            });
        }
        if (typeof password !== "string") {
            return res.status(400).send({
                status_code: 400,
                message: "Invalid password"
            });
        }
        password = password.toLowerCase();
        if (!input_regex_1.default.username(username)) {
            return res.status(400).send({
                status_code: 400,
                message: "Invalid username format"
            });
        }
        if (!input_regex_1.default.password(password)) {
            return res.status(400).send({
                status_code: 400,
                message: "Invalid password format"
            });
        }
        let modelRes = yield user_model_1.default.authenticateUser(username, password);
        if (modelRes.success === false) {
            if (modelRes.status_code === 404) {
                return res.status(404).send({
                    status_code: 404,
                    message: "Invalid credentials"
                });
            }
            return res.status(modelRes.status_code).send({
                status_code: modelRes.status_code,
                message: "Internal server error."
            });
        }
        return res.status(200).send({
            status_code: 200,
            token: modelRes.auth_token
        });
    });
}
exports.default = authenticateLoginController;
