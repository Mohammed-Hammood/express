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
const universities_json_1 = __importDefault(require("./public/data/universities.json"));
const proudcts_json_1 = __importDefault(require("./public/data/proudcts.json"));
const index_1 = require("./public/pages/index");
const body_parser_1 = __importDefault(require("body-parser"));
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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "https://photo-gallery10.vercel.app",
        "https://universities-search.vercel.app",
        "https://events-history.vercel.app",
        "https://users-contacts.vercel.app",
        "https://users-contact.vercel.app",
        'https://amicum.vercel.app',
        "https://online-market-1.vercel.app",
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
app.get("/api/universities/", (req, res) => {
    const { query: q, limit: limit_, skip: skip_, country } = req.query;
    let data = universities_json_1.default;
    const query = q && typeof q === 'string' && q.toString().trim().length > 0 ? q.trim().toLowerCase() : null;
    const limit = !limit_ || (typeof limit_ === 'string' && parseInt(limit_) > 100) ? 100 : parseInt(typeof limit_ === 'string' ? limit_ : "10");
    const skip = typeof skip_ === 'string' && parseInt(skip_) >= 0 ? parseInt(skip_) : 0;
    if (query) {
        data = data.filter(item => item.name.toLowerCase().includes(query));
    }
    if (country && typeof country === 'string') {
        data = data.filter(item => country === "all" || item.country.toLowerCase().includes(country.toLowerCase()));
    }
    data = data.filter((_, index) => index >= skip && index < limit);
    let total = data.length;
    res.status(200).send({
        ok: true,
        data,
        total,
        query,
        limit,
        skip,
    });
});
app.get("/api/products/", (req, res) => {
    const { query, category, limit, skip } = req.query;
    let data = proudcts_json_1.default;
    if (category) {
        data = proudcts_json_1.default.filter(item => category === 'all' || item.category === category);
    }
    if (query && query.toString().trim().length > 0) {
        let q = query.toString().toLowerCase();
        data = data.filter(item => item.brand.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q));
    }
    if (limit && skip && typeof limit === 'string' && typeof skip === 'string') {
        let limit_ = parseInt(limit);
        let skip_ = parseInt(skip);
        data = data.filter((_, index) => index >= skip_ && index < limit_);
    }
    let total = data.length;
    res.status(200).send({
        ok: true,
        data,
        total,
        query,
        category,
        limit,
        skip,
    });
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
    res.send(images_json_1.default);
});
app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({
            'error': 'Username and password are required'
        });
    }
    const user = users_json_1.default.find(item => item.username === username);
    if (!user || password !== 'password')
        return res.status(401).send({
            'error': 'Username or password is not correct'
        });
    return res.status(200).send(user);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map