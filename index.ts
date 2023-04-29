import express, {Request, Response, Express} from 'express';
// import fetch   from 'node-fetch';
import cors from 'cors';
import images from './public/data/images.json'
// import htmlIndexPage from './public/pages/index.html'

// const fetch   = require('node-fetch');

const dotenv = require("dotenv");

dotenv.config();

const path = require("path");

const app:Express = express();

app.use('/static', express.static('public'));

app.use(cors({

    origin:["https://worldoffreetools.com", "http://localhost:3000", "http://localhost:3001"]
}));

app.get("/", function(req:Request, res:Response){
    // res.sendFile(path.join(__dirname, './pages/index.html'));
    res.send("Photo gallery API")
})
app.get("/api/images/", (req:Request, res:Response) => {
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    const sendData = async ()=> {

        // const response = await fetch("https://worldoftechnology.pythonanywhere.com/api/images/?order=-id&limit=200&page=1&query=&category=all")
        // const data = await response.json();
        res.send(images)
        // res.send(data)
    }
    sendData();
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running at port ', port)
})

module.exports =  app;