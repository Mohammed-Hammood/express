import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import events from './public/data/events.json';
import images from './public/data/images.json';
import users from './public/data/users.json';
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
        "https://photo-gallery10.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "https://events-history.vercel.app",
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

app.get("/api/users/", (req: Request, res: Response) => {
    res.status(200);

    if (req.query.q?.toString()) {

        const q: string = req.query.q.toString().toLowerCase();

        const newUsers = users.filter(user => user.name.toLowerCase().includes(q));

        return res.send(newUsers);
    }
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