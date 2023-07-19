"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const events_json_1 = __importDefault(require("./public/data/events.json"));
const images_json_1 = __importDefault(require("./public/data/images.json"));
const users_json_1 = __importDefault(require("./public/data/users.json"));
const index_1 = require("./public/pages/index");
// import fetch   from 'node-fetch';
// import htmlIndexPage from './public/pages/index.html'
// const fetch   = require('node-fetch');
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const app = (0, express_1.default)();
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use((0, cors_1.default)({
    origin: [
        "https://photo-gallery10.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "https://events-history.vercel.app",
        "https://users-contacts.vercel.app",
        "https://users-contact.vercel.app",
    ]
}));
// app.use('/static', express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
    res.status(200);
    res.send(index_1.homePage);
    // res.sendFile(__dirname + "/views/pages/home.html");
    // res.send('endpoints')
});
app.get("/api/events/", (req, res) => {
    res.status(200);
    res.send(events_json_1.default);
});
app.get("/api/users/", (req, res) => {
    var _a;
    if ((_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString()) {
        const q = req.query.q.toString().toLowerCase();
        const newUsers = users_json_1.default.filter(user => user.name.toLowerCase().includes(q));
        res.status(200);
        return res.send(newUsers);
    }
    res.status(200);
    res.send(users_json_1.default);
});
app.get("/api/images/", (req, res) => {
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    // const sendData = async () => {
    //     // const response = await fetch("https://worldoftechnology.pythonanywhere.com/api/images/?order=-id&limit=200&page=1&query=&category=all")
    //     // const data = await response.json();
    //     // res.send(data)
    // }
    res.send(images_json_1.default);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running at port ', port);
});
module.exports = app;
//# sourceMappingURL=index.js.map