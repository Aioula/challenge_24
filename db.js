const mongoose =require("mongoose");
const uri  = 
    "mongodb+srv://Aioula:Abdelmalik2016@cluster0.bpatf.mongodb.net/krusty-krab?retryWrites=true&w=majority&appName=Cluster0";

let dbConnection;
module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect(uri)
      .then(() => {
        dbConnection = mongoose.connection;
        console.log("connected to mongodb:");
        return cb();
      })
      .catch((err) => {
        console.error("Error connecting to mongoDB", err);
        return cb(err);
        s;
      });
  },
  getDb: () => dbConnection,
};