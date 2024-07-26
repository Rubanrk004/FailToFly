const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

let chatHistory = [];

const getBotResponse = (message) => {
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes('hello')) {
    return 'Hi there! How can I assist you today?';
  } else if (lowerCaseMessage.includes('help')) {
    return 'Sure, I am here to help you. What do you need assistance with?';
  } else if (lowerCaseMessage.includes('interview tips')) {
    return 'Here are some interview tips: Research the company, practice common interview questions, and dress appropriately.';
  } else if (lowerCaseMessage.includes('bye')) {
    return 'Goodbye! Have a great day!';

  }else if (lowerCaseMessage.includes('faq')){
    return 'Just expolre our page you can some idea!';
  } 
  else {
    return 'I am sorry, I did not understand that. Can you please rephrase?';
  }
};

app.post('/chatbot', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = getBotResponse(userMessage);
  const chatEntry = { user: userMessage, bot: botResponse };
  
  chatHistory.push(chatEntry);
  res.json(chatEntry);
});

app.get('/chatbot/history', (req, res) => {
  res.json(chatHistory);
});

app.delete('/chatbot/history', (req, res) => {
  chatHistory = [];
  res.json({ message: 'Chat history cleared' });
});

app.listen(port, () => {
  console.log(`Chatbot backend running at http://localhost:${port}`);
});
