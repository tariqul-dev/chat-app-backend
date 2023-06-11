const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// DB IMPORT
const dbConnect = require('./src/db/db');
// ROUTING IMPORT
const userRoute = require('./src/routers/user_route');
const authRoute = require('./src/routers/auth_route');

//! CONFIG 
dotenv.config({ path: './.env' });
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//! EXPRESS STUFF OR MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static('uploads'));



//! ENDPOINTS OR ROUTING
app.use(authRoute);
app.use('/user', userRoute);

// uploads\images\1686482126538-OIP.jpg




//! LISTEN CONNECTION
server.listen(port, () => {
    // Connect to db
    dbConnect();
    console.log(`Server running on: http://localhost:${port}`);
}); 