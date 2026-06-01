import mongoose from 'mongoose';

const uri1 = "mongodb://nithiyashreek2004_db_user:wWglG6WffLeWeaaU@ac-jkhg551-shard-00-00.big13pb.mongodb.net:27017,ac-jkhg551-shard-00-01.big13pb.mongodb.net:27017,ac-jkhg551-shard-00-02.big13pb.mongodb.net:27017/projectAI?ssl=true&replicaSet=atlas-m2ow9a-shard-0&authSource=admin&appName=Cluster0";
const uri2 = "mongodb+srv://nithiyashreek2004_db_user:wWglG6WffLeWeaaU@cluster0.big13pb.mongodb.net/projectAI?retryWrites=true&w=majority";

async function testConnection(name, uri) {
  console.log(`Testing connection for: ${name}`);
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ Success for ${name}!`);
    await mongoose.disconnect();
    return true;
  } catch (err) {
    console.log(`❌ Failed for ${name}: ${err.message}`);
    return false;
  }
}

async function run() {
  await testConnection("Original URI (mongodb://)", uri1);
  await testConnection("Commented URI (mongodb+srv://)", uri2);
  process.exit(0);
}

run();
