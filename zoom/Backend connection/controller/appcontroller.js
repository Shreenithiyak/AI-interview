import  appmodel from '../models/appmodels.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {OAuth2Client} from 'google-auth-library';
import Question from '../models/questionModel.js';

export const sentdata = async(req,res)=>{
 const {name,email,password}=req.body
  try {
   const hashed = await bcrypt.hash(password,8)
   const add =await appmodel.create({name,email,password:hashed})
   res.status(200).json({msg:"sucess",data:add})
  } catch (error) {
   console.log('error',error);
   if (error.code === 11000) {
       return res.status(400).json({msg: "Name or Email already exists. Please try another one or login."})
   }
   res.status(500).json({msg: error.message || "Server error during registration"})
  }
}

export const checkdata = async(req,res)=>{
   const {email,password}=req.body
  try {
   
    const client = await appmodel.findOne({ email });
    if (!client) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    if (!client.password) {
      return res.status(400).json({ msg: "This account was created with Google login. Please use Google to sign in." });
    }

    const checkpass = await bcrypt.compare(password, client.password);
    if (!checkpass) {
      return res.status(401).json({ msg: "Incorrect password" });
    }
    const token = await jwt.sign({ id: client._id, name: client.name }, process.env.JWT_SECURE, { expiresIn: "1w" });
    res.status(200).json({ 
      msg: "token successfully syncked ", 
      token, 
      user: { name: client.name, email: client.email } 
    });

} catch (error) {
    console.log('error',error);
    res.status(500).json({msg: error.message || "Server error during login"})
}
}

export const movedatato =async(req,res)=>{
   try {
        res.status(200).json({msg:req.users})
    } catch (error) {
        console.log('error',error);
        
    }


}

export const googlelogin = async (req, res) => {
    const { id_token } = req.body;
    try {
        const client = new OAuth2Client(process.env.GOOGLE_OAUTH_ID);
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_OAUTH_ID,
        });
        const payload = ticket.getPayload();
        console.log("Google Payload:", payload);

        const user = await appmodel.findOne({ email: payload.email });
        if (user) {
            const token = await jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECURE, { expiresIn: "1w" });
            res.status(200).json({
                msg: "token successfully syncked ",
                token,
                user: { name: user.name, email: user.email }
            });
        } else {
            const add = await appmodel.create({ name: payload.name, email: payload.email, password: '' });
            const token = await jwt.sign({ id: add._id, name: add.name }, process.env.JWT_SECURE, { expiresIn: "1w" });
            res.status(200).json({
                msg: "token successfully syncked ",
                token,
                user: { name: add.name, email: add.email }
            });
        }
    } catch (error) {
        console.log('Google Auth Error:', error);
        res.status(500).json({ 
            msg: `Google Auth Error: ${error.message || "Unknown error"}`,
            details: error.toString()
        });
    }
}

export const getQuestions = async (req, res) => {
    try {
        const { company, role, level } = req.query;
        const filter = {};
        if (company && company !== '') filter.company = company;
        if (role && role !== '') filter.role = role;
        if (level && level !== '') filter.level = level;
        
        const questions = await Question.find(filter);
        res.status(200).json({ success: true, count: questions.length, data: questions });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ success: false, msg: "Error fetching questions", message: error.message });
    }
};

export const getCompanies = async (req, res) => {
    try {
        const companies = await Question.aggregate([
            { $group: { _id: { fullName: "$company", abbreviation: "$companyAbbreviation" } } },
            { $project: { _id: 0, fullName: "$_id.fullName", abbreviation: "$_id.abbreviation" } }
        ]);
        const validCompanies = companies.filter(c => c.fullName);
        res.status(200).json({ success: true, data: validCompanies });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await Question.aggregate([
            { $group: { _id: { title: "$role", description: "$roleDescription" } } },
            { $project: { _id: 0, title: "$_id.title", description: "$_id.description" } }
        ]);
        const validRoles = roles.filter(r => r.title).map((r, i) => ({ id: i + 1, ...r }));
        res.status(200).json({ success: true, data: validRoles });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const seedQuestions = async (req, res) => {
    const companies = [
        "TCS", "Infosys", "Wipro", "Accenture", "Google", "Amazon", "Microsoft", 
        "Zoho", "Meta", "Apple", "Netflix", "IBM", "Oracle", "Cisco", 
        "Tesla", "Intel", "Spotify", "Atlassian", "Uber", "Airbnb", 
        "Snowflake", "Salesforce", "Palantir", "Stripe"
    ];

    const questionsData = [];

    companies.forEach(company => {
        // Beginner Questions (3)
        questionsData.push(
            {
                level: 'beginner',
                company: company,
                category: "Fundamentals",
                time: "10-15 mins",
                question: `Explain the core architectural principles that drive ${company}'s primary product line.`,
                description: `This question tests your basic understanding of how ${company} builds its core services.`,
                focusAreas: ["Scalability", "Reliability", "Basic Architecture"]
            },
            {
                level: 'beginner',
                company: company,
                category: "Data Structures",
                time: "12 mins",
                question: `Which data structures would be most efficient for handling ${company}'s high-volume user data?`,
                description: "Tests selection of efficient data structures for specific use cases.",
                focusAreas: ["Arrays vs Lists", "Hash Maps", "Complexity"]
            },
            {
                level: 'beginner',
                company: company,
                category: "Problem Solving",
                time: "15 mins",
                question: `Describe a basic algorithm to optimize a typical workflow at ${company}.`,
                description: "Practical application of algorithms in a corporate context.",
                focusAreas: ["Optimization", "Logic", "Efficiency"]
            }
        );

        // Intermediate Questions (3)
        questionsData.push(
            {
                level: 'intermediate',
                company: company,
                category: "System Design",
                time: "20-25 mins",
                question: `How would you design a scalable microservice for ${company}'s cloud infrastructure?`,
                description: "Tests ability to design components that fit into a larger ecosystem.",
                focusAreas: ["API Design", "Load Balancing", "Microservices"]
            },
            {
                level: 'intermediate',
                company: company,
                category: "Performance",
                time: "22 mins",
                question: `How would you identify and resolve a bottleneck in ${company}'s data pipeline?`,
                description: "Deep dive into performance profiling and optimization.",
                focusAreas: ["Bottleneck Analysis", "Caching", "Throughput"]
            },
            {
                level: 'intermediate',
                company: company,
                category: "Database",
                time: "25 mins",
                question: `Compare SQL vs NoSQL requirements for ${company}'s distributed data storage.`,
                description: "Evaluating database trade-offs for company-specific scale.",
                focusAreas: ["ACID vs BASE", "Consistency", "Scalability"]
            }
        );

        // Advanced Questions (3)
        questionsData.push(
            {
                level: 'advanced',
                company: company,
                category: "High-Level Architecture",
                time: "35-45 mins",
                question: `Design a global-scale fault-tolerant system for ${company} that handles 100k+ requests per second.`,
                description: "Senior-level architectural challenge for extreme scale.",
                focusAreas: ["Multi-region Deployment", "Global Consistency", "Disaster Recovery"]
            },
            {
                level: 'advanced',
                company: company,
                category: "Security & Privacy",
                time: "40 mins",
                question: `How would you implement zero-trust security architecture across ${company}'s internal networks?`,
                description: "Advanced security protocols and identity management.",
                focusAreas: ["Authentication", "Encryption", "Zero-Trust"]
            },
            {
                level: 'advanced',
                company: company,
                category: "Future Tech",
                time: "45 mins",
                question: `How can ${company} leverage AI/ML to predict and prevent system failures in real-time?`,
                description: "Applying cutting-edge technology to maintain system health.",
                focusAreas: ["Predictive Analytics", "Self-healing Systems", "MLOps"]
            }
        );
    });

    try {
        await Question.deleteMany({});
        const seeded = await Question.insertMany(questionsData);
        res.status(200).json({ 
            msg: `Successfully seeded 9 questions for each of the 24 companies.`, 
            totalQuestions: seeded.length 
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: "Error seeding comprehensive MNC question sets" });
    }
};
































// export const data = async(req,res)=>{
//    console.log(req)
//  res.status(200).json({msg:"received",data:req.body})



// }


// export const sentdata = async(req,res)=>{
//     console.log(req)
//     try{
//   const {name,age,email}=req.body
//   const ab =await appmodel.create({name,age,email})
//   res.status(200).json({msg:"sucess",data:ab})
//     }catch(e){
//  console.log("error",e)
//     }
// }


// export const databyid =async(req,res)=>{
  
//    try{
//      const {id}=req.params
//      const data=await appmodel.findById(id)
//      console.log(data)
//      res.status(200).json({msg:"data found",data:data})

//    }catch(error){
//       console.log("error",error)
//       res.status(500).json({msg:"can't find data",error:error})
//    }
// }


// export const updatedatabyid =async(req,res)=>{
//    try{
//    const {name,age,email}=req.body
//   const {id}=req.params
//   const data = await appmodel.findByIdAndUpdate(id, {name, age, email} )
//    console.log(data)
//    res.status(200).json({msg:"data updated",data:data})
//    }catch(error){
//       console.log("error",error)
//       res.status(500).json({msg:"can't update data",error:error})
//    }
// }

// export const deletedatabyid=async ()=>{
//     try{
//      const {id}=req.params
//      const data=await appmodel.findByIdAndDelete(id)
//      console.log(data)
//      res.status(200).json({msg:"data deleted",data:data})

//    }catch(error){
//       console.log("error",error)
//       res.status(500).json({msg:"can't delete data",error:error})
//    }
// }

