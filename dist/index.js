"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node module imports
const express_1 = __importDefault(require("express"));
// import https from "https";
// import fs from "fs";
// Router imports
const routes_1 = require("./src/routers/routes");
const app = (0, express_1.default)();
const port = 1234;
// app.use(bodyParser.text({
//     type: "*/*"
// }));
app.use(express_1.default.text({
    type: "application/json"
}));
app.get("/", (req, res) => {
    return res.send({
        status: 200,
        message: "OK"
    });
});
app.use("/auth", routes_1.loginRouter);
app.use("/auth", routes_1.registerRouter);
app.use("/", routes_1.userDataRouter);
// Code block to create HTTPS Server
// const httpsServer = https.createServer({
//     key: fs.readFileSync("./server.key"),
//     cert: fs.readFileSync("./server.cert")
// }, app);
// httpsServer.listen(port, () => {
//     console.log(`Listening at: https://0.0.0.0:${port}/`);
// });
app.listen(port, "0.0.0.0", () => {
    console.log(`Listening at: http://0.0.0.0:${port}`);
});
