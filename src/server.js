import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import morgan from 'morgan';

import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';

import ProductDaoMongoDB from "./daos/mongodb/productDao.js";
import MessagesDaoMongoDB from "./daos/mongodb/messageDao.js";
const productDao = new ProductDaoMongoDB();
const messagesDao = new MessagesDaoMongoDB();
//import ProductDaoFS from '../daos/filesystem/productDao.js';
//import MessagesDaoFS from '../daos/filesystem/messagesDao.js';
//const productDao = new ProductDaoFS();
//const messagesDao = new MessagesDaoFS();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(morgan('dev'));
import './daos/mongodb/connection.js';

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/chat', viewRouter);

const httpServer = app.listen(8080, ()=>{
    console.log('Server ok on port 8080');
})

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {

    console.log(`User connected ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('newUser', (user)=>{
        console.log(`>${user} inició sesión`);
    })

    socket.on('chat:message', async(msg) =>{
        await messagesDao.createMsg(msg);
        socketServer.emit('messages', await messagesDao.getAll());
    })

    socket.emit('msg', 'bienvenido al chat');

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user);
    })

    socket.on('chat:typing', (user)=>{
        socket.broadcast.emit('chat:typing', user)
    })

    socket.emit('allProducts', await productDao.getProducts());
    
})
