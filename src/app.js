import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import './config/conexao';



class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(
            '/files',
            express.static(path.resolve(__dirname, "..","tmp","uploads"))
        );
        this.app.use((req,res, next)=>{
            res.header("access-Control-Allow-origin", "*");
            res.header("access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.header("access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type');
        this.app.use(cors());
        next();
        })
    }
    routes(){
        this.app.use(routes);
    }
};

export default new App().app;


