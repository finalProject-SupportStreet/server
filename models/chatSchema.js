
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  // alles was user betrifft, aus localStorage holen...
  user: {type: String},
  //! woher kommt die Id vom Chatpartner ?
  chatPartnerId : {type: String, required: true},
  myMessages: {type: String},
  otherMessages: [
    {
      chatPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      messages: [String]
    }
  ]
});

const Chat = mongoose.model('chats', chatSchema);

export default Chat;


/* 
//* Beispiel wie es aussehen soll
otherMessages: [
  {
    userId: '15158852855885222',
    messages: ['Bis dann', 'Ja, bin dabei!', 'Hallo, was machst du heute']
  },
  {
    userId: '49874514885473361',
    messages: [ 'das war witzig', 'hahaha', 'Ja erzähl...' ]
  },
  ...
]

*/