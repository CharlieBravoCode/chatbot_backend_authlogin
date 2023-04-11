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
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let bodyData = JSON.parse(req.body);
        let username = bodyData["username"];
        let password = bodyData["password"];
        let location = bodyData["location"];
        if (username === undefined) {
            return res.status(400).send({
                status_code: 400,
                message: `Missing field "username"`
            });
        }
        if (typeof username !== "string") {
            return res.status(406).send({
                status_code: 406,
                message: `Invalid username`
            });
        }
        username = username.toLowerCase();
        if (!input_regex_1.default.username(username)) {
            return res.status(400).send({
                status_code: 400,
                message: `Missing field "username"`
            });
        }
        // Check if the username has already been taken
        let usernameTaken = yield user_model_1.default.userExists(username);
        if (usernameTaken === undefined) {
            return res.status(500).send({
                status_code: 500,
                message: "Internal server error."
            });
        }
        if (usernameTaken === true) {
            return res.status(400).send({
                status_code: 400,
                message: `Username taken`
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
                message: `Missing field "password"`
            });
        }
        if (location === undefined || typeof location !== "string") {
            location = "";
        }
        if (!input_regex_1.default.password(password)) {
            return res.status(400).send({
                status_code: 400,
                message: ""
            });
        }
        if (!input_regex_1.default.location(location)) {
            return res.status(400).send({
                status_code: 400,
                message: "Invalid location"
            });
        }
        let modelRes = yield user_model_1.default.createUser(username, password, location);
        if (modelRes === undefined) {
            return res.status(500).send({
                status_code: 500,
                message: "Connection error"
            });
        }
        return res.status(201).send({
            status_code: 201,
            token: modelRes.auth_token
        });
    });
}
exports.default = createUserController;
