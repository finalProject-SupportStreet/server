
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  // alles was user betrifft, aus localStorage holen...
  user: {type: String},
  // woher kommt die?
  chatPartnerId : {type: String, required: true},
  myMessages: {type: String},
  otherMessages: [ String ]

})


/* 

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