import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
  language: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model('Preference', PreferenceSchema);
