import mongoose from 'mongoose';

const uri = "mongodb://nithiyashreek2004_db_user:wWglG6WffLeWeaaU@ac-jkhg551-shard-00-00.big13pb.mongodb.net:27017,ac-jkhg551-shard-00-01.big13pb.mongodb.net:27017,ac-jkhg551-shard-00-02.big13pb.mongodb.net:27017/projectAI?ssl=true&replicaSet=atlas-m2ow9a-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB.");
    const collection = mongoose.connection.collection('questions');
    
    const count = await collection.countDocuments();
    console.log(`Total questions: ${count}`);

    const sample = await collection.find({}).limit(5).toArray();
    console.log("\nSample questions:", JSON.stringify(sample, null, 2));

    const rolesCount = await collection.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]).toArray();
    console.log("\nQuestions per role:", rolesCount);

    const levelsCount = await collection.aggregate([
      { $group: { _id: "$level", count: { $sum: 1 } } }
    ]).toArray();
    console.log("\nQuestions per level:", levelsCount);

    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
