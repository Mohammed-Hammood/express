import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import events from './public/data/events.json';
import images from './public/data/images.json';
import users from './public/data/users.json';
import products from './public/data/proudcts.json';
import { homePage } from './public/pages/index';

// import fetch   from 'node-fetch';
// import htmlIndexPage from './public/pages/index.html'

// const fetch   = require('node-fetch');

const dotenv = require("dotenv");

dotenv.config();

const path = require("path");

const app: Express = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views')
app.set('view engine', 'ejs');

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "https://photo-gallery10.vercel.app",
        "https://events-history.vercel.app",
        "https://users-contacts.vercel.app",
        "https://users-contact.vercel.app",
        "https://online-market-1.vercel.app",
    ]
}));


// app.use('/static', express.static(path.join(__dirname, 'public')));


app.get("/", function (req: Request, res: Response) {
    res.status(200);
    res.send(homePage);
    // res.sendFile(__dirname + "/views/pages/home.html");
    // res.send('endpoints')
});

app.get("/api/events/", (req: Request, res: Response) => {
    res.status(200);
    res.send(events);
});


app.get("/api/products/", (req: Request, res: Response) => {
    const { query, category, limit, skip } = req.query;
    let data = products;
    if (category) {
        data = products.filter(item => category === 'all' || item.category === category)
    }
    if (query && query.toString().trim().length > 0) {
        let q: string = query.toString().toLowerCase();
        data = data.filter(item =>
            item.brand.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q)
        )
    }
    if (limit && skip && typeof limit === 'string' && typeof skip === 'string' ){
        let limit_ = parseInt(limit)
        let skip_ = parseInt(skip)
        data = data.filter((item, index:number) => index > skip_ && index < limit_);
    }

    let total:number = data.length;

    res.status(200).send({
        ok: true,
        data,
        total,
        query,
        category,
        limit,
        skip,
    })
})

app.get("/api/users/", (req: Request, res: Response) => {

    if (req.query.q?.toString()) {

        const q: string = req.query.q.toString().toLowerCase();

        const newUsers = users.filter(user => user.name.toLowerCase().includes(q));

        res.status(200);
        return res.send(newUsers);
    }
    res.status(200);
    res.send(users);

})


app.get("/api/images/", (req: Request, res: Response) => {
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    // const sendData = async () => {

    //     // const response = await fetch("https://worldoftechnology.pythonanywhere.com/api/images/?order=-id&limit=200&page=1&query=&category=all")
    //     // const data = await response.json();
    //     // res.send(data)
    // }
    res.send(images)
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is running at port ', port)
})

module.exports = app;