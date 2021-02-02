require('dotenv').config();

module.exports = {
  MongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster0.g3kyj.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
};
