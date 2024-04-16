// =================== websocket ===================
const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
// =================== websocket ===================

// =================== MONGODB ===================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());
// =================== MONGODB ===================

// =================== MONGODB ===================
mongoose.connect('mongodb://127.0.0.1:27017/realtimechatapphetic');

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "Token not provided" });

  jwt.verify(token.split(" ")[1], 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key');
          res.json({ token });
        } else {
          res.json("Incorrect Password");
        }
      } else {
        res.json("User not found");
      }
    })
    .catch(err => res.json(err));
});

app.get("/user", verifyToken, (req, res) => {
  const userId = req.user.userId;

  UserModel.findById(userId)
    .then(user => {
      res.json({
        name: user.name,
        email: user.email,
      });
    })
    .catch(err => res.json(err));
});

app.listen(5000, () => {
  console.log('Server has started!');
});
// =================== MONGODB ===================

// =================== websocket ===================
// Le serveur HTTP écoute sur le port 8000 pour les connexions WebSocket
server.listen(webSocketsServerPort);
console.log('websocket server listening on port', webSocketsServerPort);

const wsServer = new webSocketServer({
  httpServer: server // Création du serveur WebSocket en passant le serveur HTTP
});

const clients = {}; // Objet pour stocker les clients connectés

const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
}

wsServer.on('request', function (request) { // Appelé lorsqu'une nouvelle connexion WebSocket est établie
  var userID = getUniqueID();
  // console.log((new Date()) + ' new connection ' + request.origin + '.');

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  // console.log(userID + Object.getOwnPropertyNames(clients));

  connection.on('message', function (message) { // Appelé lorsqu'un message est reçu depuis un client WebSocket
    if (message.type === 'utf8') {
      // console.log( message.utf8Data);

      // Envoi du message reçu à tous les clients connectés
      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
        // console.log('To: ', clients[key]);
      }
    }
  });
});
// =================== websocket ===================
