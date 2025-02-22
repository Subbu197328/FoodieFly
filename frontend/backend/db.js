const mongoose = require('mongoose');

const mongoURI = 'mongodb://Subramanyam:Subbu1973@cluster0-shard-00-00.7xga6.mongodb.net:27017,cluster0-shard-00-01.7xga6.mongodb.net:27017,cluster0-shard-00-02.7xga6.mongodb.net:27017/FoodieFly?ssl=true&replicaSet=atlas-n5j4pw-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log("---", err);
        } else {
            console.log("Connected to MongoDB");

            const fetched_data = mongoose.connection.db.collection("food_items");  
            fetched_data.find({}).toArray(async function(err, data) {

                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err,catData){
                      if (err) console.log(err);
                else{
                    global.food_items = data;
                    global.foodCategory = catData;
                    
                }
                })
            });
        }
    });
};

module.exports = mongoDB;
