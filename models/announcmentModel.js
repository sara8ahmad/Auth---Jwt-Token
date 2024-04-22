
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcmentSchema = new Schema({
    id: { type: Number , required: true },
    title: { type: String , required: true },
    content: { type: String , required: true },
    },
    {timestamps : true}
);

const Announcment = mongoose.model('Announcment' , announcmentSchema )

module.exports = Announcment;

/* const mongoose = require('mongoose');

const { Schema } = mongoose;

const announcementSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const responseSchema = new Schema({
  status: { type: String, required: true },
  data: [announcementSchema],
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;*/