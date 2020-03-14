const express = require('express');
const os = require('os');

const app = express();

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'carnegiemellonuniversity',
    password: 's3ry6mert71i4rzjccozvxq5p6wmsv'
  },
  channels: ['carnegiemellonuniversity']
};

// Create a client with our options
const client = new tmi.client(opts);
let numDays = 0;

app.get('/api/getNumDays', (req, res) => res.send({ numDays }));
app.use(express.static('dist'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!tomorrow') {
    // const num = rollDice();
    client.say(
      target,
      'Semester delayed for another day -- adding additional day'
    );
    numDays += 1;
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!yesterday') {
    client.say(target, 'Semester back on track -- subtracting additional day');
    numDays -= 1;
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
