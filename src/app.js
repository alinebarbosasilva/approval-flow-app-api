const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const authMiddleware = require('./middlewares/authMiddleware');
const routeSolicitations = require('./routes/solicitations.routes');
const routeAuth = require('./routes/auth.routes');
const routeWarehousemanSolicitations = require('./routes/warehouseman.routes');
const routeAdminSolicitations = require('./routes/admin.routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }
    next();
});

app.use((req, res, next) => {
    if (req.path === '/login') {
        return next();
    }

    return authMiddleware(req, res, next);
});


app.use(routeSolicitations);
app.use(routeWarehousemanSolicitations);
app.use(routeAdminSolicitations);
app.use(routeAuth);

app.use((req,res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;