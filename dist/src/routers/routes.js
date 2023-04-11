"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDataRouter = exports.registerRouter = exports.loginRouter = void 0;
const express_1 = require("express");
const authenticate_login_controller_1 = __importDefault(require("../controllers/authenticate-login.controller"));
const create_user_controller_1 = __importDefault(require("../controllers/create-user.controller"));
const get_user_data_controller_1 = __importDefault(require("../controllers/get-user-data-controller"));
exports.loginRouter = (0, express_1.Router)().post("/login", authenticate_login_controller_1.default);
exports.registerRouter = (0, express_1.Router)().post("/register", create_user_controller_1.default);
exports.userDataRouter = (0, express_1.Router)().post("/user", get_user_data_controller_1.default);
