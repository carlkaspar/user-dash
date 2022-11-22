const express = require('express');
const path = require('path');
const app = express();

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./mock-data/users.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`)
})

app.use(express.static(__dirname + '/dist/user-dash'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/<app-name>/index.html'));});
app.listen(process.env.PORT || 8080);