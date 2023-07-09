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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const events_json_1 = __importDefault(require("./public/data/events.json"));
const images_json_1 = __importDefault(require("./public/data/images.json"));
// import fetch   from 'node-fetch';
// import htmlIndexPage from './public/pages/index.html'
// const fetch   = require('node-fetch');
const dotenv = require("dotenv");
dotenv.config();
// const path = require("path");
const app = (0, express_1.default)();
app.use('/static', express_1.default.static('public'));
app.set('view engine', 'ejs');
app.use((0, cors_1.default)({
    origin: ["https://photo-gallery10.vercel.app", "http://localhost:3000", "http://localhost:3001"]
}));
app.get("/", function (req, res) {
    res.status(200);
    res.render('pages/index');
});
app.get("/api/events/", (req, res) => {
    res.status(200);
    res.send(events_json_1.default);
});
app.get("/api/images/", (req, res) => {
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
        // const response = await fetch("https://worldoftechnology.pythonanywhere.com/api/images/?order=-id&limit=200&page=1&query=&category=all")
        // const data = await response.json();
        res.send(images_json_1.default);
        // res.send(data)
    });
    sendData();
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port ', port);
});
module.exports = app;
//# sourceMappingURL=index.js.map