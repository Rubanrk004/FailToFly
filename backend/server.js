const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authRoutes = require('./routes/auth');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const User = require('./models/User');

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//Resourse 

const resourceSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Resource = mongoose.model('Resource', resourceSchema);

app.get('/resources', async (req, res) => {
  const resources = await Resource.find();
  res.json(resources);
});

//progress

const progressSchema = new mongoose.Schema({
  category: String,
  progress: Number,
});

const Progress = mongoose.model('Progress', progressSchema);

app.get('/progress', async (req, res) => {
  const progress = await Progress.find();
  res.json(progress);
});

//Coding

const codingSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Coding = mongoose.model('Coding', codingSchema);

app.post('/coding', (req, res) => {
  console.log('Received POST request to /coding');
  console.log('Request body:', req.body);
  res.status(200).json({ message: 'Resource posted successfully' });
});

//Roadmap


const RoadmapSchema = new mongoose.Schema({
  resourceTitle: {
    type: String,
    required: true,
  },
  resourceUrl: {
    type: String,
    required: true,
  },
  resourceContent: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Roadmap = mongoose.model('Roadmap', RoadmapSchema);

// Fetch roadmaps
app.get('/roadmaps', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Post roadmaps
app.post('/roadmaps', async (req, res) => {
  try {
    const newRoadmap = new Roadmap(req.body);
    const savedRoadmap = await newRoadmap.save();
    res.json(savedRoadmap);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete roadmaps
app.delete('/adminres/:id', async (req, res) => {
  try {
    await Roadmap.findByIdAndDelete(req.params.id);
    res.send('Roadmap deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});


//avbadmin

const Avbadmin = require('./models/avbadmin');


// Get resources by type
app.get('/avbadmin/:type', async (req, res) => {
  try {
    const resources = await Avbadmin.find({ type: req.params.type });
    res.send(resources);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a resource by ID
app.delete('/avbadmin/:id', async (req, res) => {
  try {
    await Avbadmin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
});

// Post a new resource
app.post('/avbadmin', async (req, res) => {
  try {
    const newResource = new Avbadmin(req.body);
    await newResource.save();
    res.status(201).send(newResource);
  } catch (error) {
    res.status(500).send(error);
  }
});


//Adminres

const Adminres = require('./models/Adminres');

app.post('/adminres/:endpoint', async (req, res) => {
  try {
    const resource = new Adminres({
      ...req.body,
      endpoint: req.params.endpoint,
    });
    await resource.save();
    res.status(201).send(resource);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/adminres/:endpoint', async (req, res) => {
  try {
    const resources = await Adminres.find({ endpoint: req.params.endpoint });
    res.send(resources);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a resource by ID
app.delete('/adminres/:id', async (req, res) => {
  try {
    // const { id } = req.params;
    // await Adminres.findByIdAndDelete(id);
    await Adminres.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
});



const codingPracticeRoutes = require('./routes/codingPractice');
const behavioralQuestionRoutes = require('./routes/behavioralQuestion');
const companyResearchRoutes = require('./routes/companyResearch')
const resourceRoutes = require('./routes/resources');
const taskRoutes = require('./routes/tasks');
const remainderRoutes = require('./routes/reminders');
const topicRouter = require('./routes/topics');


app.use('/coding', codingPracticeRoutes);
app.use('/behavioral-questions', behavioralQuestionRoutes);
app.use('/company-research', companyResearchRoutes);
app.use('/resources', resourceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/reminders',remainderRoutes);
app.use('/api/topics', topicRouter);


app.post('/behavioral-questions', (req, res) => {
  console.log('Received POST request to /behavioral-questions');
  console.log('Request body:', req.body);
  res.status(200).json({ message: 'Resource posted successfully' });
});

app.post('/company-research', (req, res) => {
  console.log('Received POST request to /company-research');
  console.log('Request body:', req.body);
  res.status(200).json({ message: 'Resource posted successfully' });
});


//For resume 

const templateSchema = new mongoose.Schema({
  name: String,
  filePath: String,
});

const Template = mongoose.model('Template', templateSchema);

// app.use('/uploads', express.static('uploads'));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); 
  }
});

const upload = multer({ storage });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Upload endpoint
// app.post('/api/upload-template', upload.single('file'), async (req, res) => {
//   try {
//     const { name } = req.body;
//     const filePath = req.file.path;

//     const newTemplate = new Template({ name, filePath });
//     await newTemplate.save();
    
//     res.status(201).json({ message: 'Template uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading template', error });
//   }
// });

app.post('/api/upload-template', upload.single('file'), async (req, res) => {
  try {
    const { name } = req.body;
    const filePath = `/uploads/${req.file.filename}`;

    const newTemplate = new Template({ name, filePath });
    await newTemplate.save();
    
    res.status(201).json({ message: 'Template uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading template', error });
  }
});

app.get('/api/templates', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});



app.get('/api/download-template/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    res.download(template.filePath);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Preview endpoint
app.get('/api/preview-template/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.sendFile(path.resolve(template.filePath));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching template', error });
  }
});

//Message 

// Create a Message schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Message = mongoose.model('Message', messageSchema);

app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).send('Message sent successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.get('/api/admin/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.delete('/api/admin/messages/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.send('Message deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// quizzz

let quizData = [
  {
    id: 1,
    question: "What is Object-Oriented Programming?",
    options: [
      "A programming paradigm based on functions",
      "A programming paradigm based on objects and classes",
      "A programming paradigm based on procedures",
      "A programming paradigm based on modules"
    ],
    answer: "A programming paradigm based on objects and classes",
  },
  {
    id: 2,
    question: "Which of the following is not a principle of OOP?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
    answer: "Compilation",
  },
  {
    id: 3,
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "The current object",
      "The previous object",
      "The global object",
      "None of the above"
    ],
    answer: "The current object",
  },
  {
    id: 4,
    question: "What is encapsulation in OOP?",
    options: [
      "The ability to hide internal details of an object",
      "The ability to inherit attributes and behaviors",
      "The ability to define multiple methods with the same name",
      "The ability to create objects from a class"
    ],
    answer: "The ability to hide internal details of an object",
  },
  {
    id: 5,
    question: "Which OOP concept allows a class to inherit from more than one class?",
    options: ["Polymorphism", "Encapsulation", "Inheritance", "Multiple Inheritance"],
    answer: "Multiple Inheritance",
  },
  {
    id: 6,
    question: "What is polymorphism in OOP?",
    options: [
      "The ability to hide internal details of an object",
      "The ability to inherit attributes and behaviors",
      "The ability to define multiple methods with the same name",
      "The ability to create objects from a class"
    ],
    answer: "The ability to define multiple methods with the same name",
  },
  {
    id: 7,
    question: "What is an object in OOP?",
    options: [
      "A data type",
      "A programming paradigm",
      "An instance of a class",
      "A function"
    ],
    answer: "An instance of a class",
  },
  {
    id: 8,
    question: "What is a class in OOP?",
    options: [
      "A blueprint for creating objects",
      "A type of function",
      "A module",
      "A data structure"
    ],
    answer: "A blueprint for creating objects",
  },
  {
    id: 9,
    question: "Which of the following is a feature of OOP?",
    options: ["Encapsulation", "Abstraction", "Inheritance", "All of the above"],
    answer: "All of the above",
  },
  {
    id: 10,
    question: "What is inheritance in OOP?",
    options: [
      "The ability to create a new class from an existing class",
      "The ability to hide internal details of an object",
      "The ability to define multiple methods with the same name",
      "The ability to create objects from a class"
    ],
    answer: "The ability to create a new class from an existing class",
  },
  {
    id: 11,
    question: "What is abstraction in OOP?",
    options: [
      "Hiding the internal implementation details of an object",
      "Creating a new class from an existing class",
      "Defining multiple methods with the same name",
      "Creating objects from a class"
    ],
    answer: "Hiding the internal implementation details of an object",
  },
  {
    id: 12,
    question: "Which OOP principle helps in code reusability?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
    answer: "Inheritance",
  },
  {
    id: 13,
    question: "What is a constructor in OOP?",
    options: [
      "A function used to create an object",
      "A blueprint for creating objects",
      "A special method used to initialize objects",
      "A type of inheritance"
    ],
    answer: "A special method used to initialize objects",
  },
  {
    id: 14,
    question: "What is method overloading?",
    options: [
      "Creating multiple methods with the same name but different parameters",
      "Hiding the internal implementation details of an object",
      "Creating a new class from an existing class",
      "Defining multiple methods with the same name"
    ],
    answer: "Creating multiple methods with the same name but different parameters",
  },
  {
    id: 15,
    question: "Which of the following is true about OOP?",
    options: [
      "It is a procedural programming paradigm",
      "It is a modular programming paradigm",
      "It is based on the concept of objects",
      "It does not support inheritance"
    ],
    answer: "It is based on the concept of objects",
  },
  {
    id: 16,
    question: "What is method overriding?",
    options: [
      "Creating multiple methods with the same name but different parameters",
      "Hiding the internal implementation details of an object",
      "Redefining a method in a subclass",
      "Creating objects from a class"
    ],
    answer: "Redefining a method in a subclass",
  },
  {
    id: 17,
    question: "What is the purpose of the 'super' keyword in OOP?",
    options: [
      "To create an object",
      "To call the parent class constructor",
      "To hide internal details of an object",
      "To define multiple methods with the same name"
    ],
    answer: "To call the parent class constructor",
  }
];

app.get('/api/quiz', (req, res) => {
  res.json(quizData);
});

app.post('/api/quiz/submit', (req, res) => {
  const { userInfo, responses } = req.body;
  const results = quizData.map(q => ({
    question: q.question,
    correctAnswer: q.answer,
    userAnswer: responses[q.id],
    isCorrect: responses[q.id] === q.answer
  }));

  console.log(`User ${userInfo.name} with email ${userInfo.email} submitted the following responses:`, responses);

  res.json({ answers: results });
});


// //UserUploads 

// const uploadSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   description: String,
//   filename: String,
//   originalname: String,
//   mimetype: String,
//   size: Number,
//   createdAt: { type: Date, default: Date.now },
// });

// const Upload = mongoose.model('Upload', uploadSchema);

// // // Define storage for the files
// // const storages = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, './upload/');
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, `${uniqueSuffix}-${file.originalname}`);
// //   }
// // });

// // Configure Multer for file uploads
// const storages = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'upload')); 
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext); 
//   }
// });

// const uploads = multer({ storages });

// app.use('/useruploads', express.static(path.join(__dirname, 'upload')));

// app.post('/api/useruploads', uploads.single('file'), async (req, res) => {
//   try {
//     const newUpload = new Upload({
//       name: req.body.name,
//       email: req.body.email,
//       description: req.body.description,
//       filename: req.file.filename,
//       originalname: req.file.originalname,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//     });
//     await newUpload.save();
//     res.status(201).send(newUpload);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get('/api/useruploads', async (req, res) => {
//   try {
//     const uploads = await Upload.find();
//     res.status(200).send(uploads);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
