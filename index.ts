import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import events from './public/data/events.json';
import images from './public/data/images.json';
import users from './public/data/users.json';
import universityes from './public/data/universities.json';
import products from './public/data/proudcts.json';
import { homePage } from './public/pages/index';
import bodyParser from 'body-parser';
import { gamesList } from './data';

// import fetch   from 'node-fetch';
// import htmlIndexPage from './public/pages/index.html'

// const fetch   = require('node-fetch');

const dotenv = require("dotenv");

dotenv.config();

// const path = require("path");

const app: Express = express();

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views')
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


/*
app.use(cors({
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

*/
app.use(cors());
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


app.get("/api/universities/", (req: Request, res: Response) => {
    const { query: q, limit: limit_, skip: skip_, country } = req.query;

    let data = universityes as { id:number, name: string, domains: string[], country: string, web_pages: string[] }[];

    const query: string | null = q && typeof q === 'string' && q.toString().trim().length > 0 ? q.trim().toLowerCase() : null;

    const limit: number = !limit_ || (typeof limit_ === 'string' && parseInt(limit_) > 100) ? 100 : parseInt(typeof limit_ === 'string' ? limit_ : "10");

    const skip: number = typeof skip_ === 'string' && parseInt(skip_) >= 0 ? parseInt(skip_): 0;

    if (query) {
        data = data.filter(item => item.name.toLowerCase().includes(query))
    }

    if (country && typeof country === 'string') {
        data = data.filter(item => country === "all" || item.country.toLowerCase().includes(country.toLowerCase()))
    }
    
    let total: number = data.length;

    data = data.filter((_, index: number) => index >= skip && index < (skip + limit));

    res.status(200).send({
        ok: true,
        data,
        total,
        query,
        limit,
        skip,
    })
})

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
    
    let total: number = data.length;

    if (limit && skip && typeof limit === 'string' && typeof skip === 'string') {
        let limit_ = parseInt(limit)
        let skip_ = parseInt(skip)
        data = data.filter((_, index: number) => index >= skip_ && index < limit_);
    }


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


/* app.get("/api/images/", (req: Request, res: Response) => {
    res.send(images)
}) */
app.get("/api/images/", (req: Request, res: Response) => {
  const { page = "1", limit = "10" } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  let limitNum = parseInt(limit as string, 10) || 10;
  if (limitNum > 100) limitNum = 100;
  if (limitNum < 1) limitNum = 10;

  const skip = (pageNum - 1) * limitNum;
  const total = images.images.length;
  const paginatedImages = images.images.slice(skip, skip + limitNum);

  res.status(200).json({
    ok: true,
    data: paginatedImages,
    total,
    page: pageNum,
    limit: limitNum,
    query: null,
  });
});



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


interface ParamsT {
    limit?: string,
    query?: string,
    page?: string,
    category?: string,
    order?: "id" | "-id",
    language?: string,
}


app.get("/api/games", (req, reply) => {
    let games = gamesList;
    const { query, language, page: _p, limit: _l, order } = req.query as ParamsT

    const page = parseInt(_p ?? '1');
    let limit = parseInt(_l ?? '10');

    if (limit > 100) limit = 10;
    const max = page * limit;
    const min = max - limit;

    if (query && query.trim().length > 0) {
        const search = (text: string) => query.trim().toLowerCase().includes(text) || text.toLowerCase().includes(query.toLowerCase());

        games = games.filter(item => search(item.description) || search(item.title) || item.developers.some(d => search(d)));

    }

    if (language && language.trim().length > 0 && language.toLowerCase() !== 'all') {

        games = games.filter(item => item.available_languages.some(L => L.toLowerCase().includes(language)));

    }
    const games_count = games.length;

    games = games.sort((a, b) => order === 'id' ? a.id - b.id : b.id - a.id).filter((_, i) => i >= min && i < max);


    const query_params = { limit, page, query, language, max, min, }

    reply.send({
        query_params,
        ok: true,
        games_count,
        status: 200,
        games,
    })
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

module.exports = app;
