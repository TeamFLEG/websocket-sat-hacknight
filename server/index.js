const express = require('express');
const app = express();
const PORT = 4000;

const randWords = require('random-words');
let randWord = randWords();
let discoveredpos = [];
for(let i=0;i<randWord.length;i++)
  discoveredpos.push(' ');


//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Add this before the app.get() block
io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    console.log(randWord);
  
    //Listens and logs the message to the console
    socket.on('startGame', (data,callback) => { 
      // data=user
      console.log(data + " connected");
      callback(discoveredpos);
    });

    //when a guess letter is recieved , send back the guessed letter and its positions.
    //if no match, will return empty list
    socket.on('guess',data => {
      //console.log(data);
      let temp =[]
      for(let i=0;i<randWord.length;i++){
        if(randWord[i]==data.letter.toLowerCase() && discoveredpos[i]===' '){
          discoveredpos[i] = data.letter;
        }
      }
      console.log(discoveredpos);
      io.emit("discover",discoveredpos);
      if(discoveredpos.includes(' ')==false){
        io.emit("winner",data.user);
        console.log(data.user + " wins")
        randWord = randWords();
        discoveredpos = [];
        for(let i=0;i<randWord.length;i++)discoveredpos.push(' ');
      }
    })
  
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
