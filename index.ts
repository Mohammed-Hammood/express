import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import events from './public/data/events.json';
import images from './public/data/images.json';
import users from './public/data/users.json';
import products from './public/data/proudcts.json';
import { homePage } from './public/pages/index';
import bodyParser from 'body-parser';

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

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "https://photo-gallery10.vercel.app",
        "https://events-history.vercel.app",
        "https://users-contacts.vercel.app",
        "https://users-contact.vercel.app",
        'https://amicum.vercel.app',
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
    if (limit && skip && typeof limit === 'string' && typeof skip === 'string') {
        let limit_ = parseInt(limit)
        let skip_ = parseInt(skip)
        data = data.filter((_, index: number) => index >= skip_ && index < limit_);
    }

    let total: number = data.length;

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

    res.send(images)
})



app.post("/api/auth/login", (req: Request, res: Response) => {

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).send({
            'error': 'Username and password are required'
        })
    }

    const user = users.find(item => item.username === username);


    if (!user || password !== 'password') return res.status(401).send({
        'error': 'Username or password is not correct'
    })

    return res.status(200).send(user);

})



 

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

module.exports = app;