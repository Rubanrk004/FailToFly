import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate ,Navigate} from 'react-router-dom';
import ArticlePage from './ArticlePage';
import VideoTutorialPage from './VideoTutorialPage';
import RecommendedBooksPage from './RecommendedBooksPage';
import CodingPracticePage from './CodingPracticePage';
import BehavioralQuestionPage from './BehavioralQuestionPage';
import CompanyResearchPage from './CompanyResearchPage';
import AdminDashboard from './AdminDashboard';
import RoadmapSection from './RoadmapSection';
import RoadmapDetailPage from './RoadmapDetailPage';
import ChatInterface from './ChatInterface';
import ResourcePage from './ResourcePage';
import Avbadmin from './Avbadmin';
import ProgressTracker from './ProgressTracker';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import InfoPage from './pages/Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Profile from './pages/Profile';
import AuthPage from './pages/Authentication';
import ResumeTemplates from './ResumeTemplates';
import AdminUploadPage from './AdminUploadPage';
import AdminPage from './AdminPage';
import { FaBook, FaVideo, FaBookOpen } from 'react-icons/fa';
import AptitudeLearning from './pages/AptitudeLearning';
import LogicQuestions from './pages/LogicQuestions';
import NumericalQuestions from './pages/NumericalQuestions';
import VerbalQuestions from './pages/VerbalQuestions';
import Quiz from './Quiz';
import Adminfiles from './Adminfiles';
import UploadPage from './UploadPage';
import AdminLogin from './AdminLogin';
import AdminLinks from './AdminLinks';
// import ProtectedRoute from './ProtectedRoute';

const InterviewPreparationDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [resources, setResources] = useState([]);
  const [progress, setProgress] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newReminder, setNewReminder] = useState('');


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    setIsMenuOpen(false); 
  };

  const goToProfile = () => {
    navigate('/profile');
    setIsMenuOpen(false); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  
  
 useEffect(() => {
    fetchTasks();
    fetchReminders();
    fetchResources();
    fetchProgress();
  }, []);


  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://failtofly-backend.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };


  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://failtofly-backend.onrender.com/api/reminders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReminders(response.data);
    } catch (err) {
      console.error('Error fetching reminders:', err);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get('https://failtofly-backend.onrender.com/resources');
      setResources(response.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await axios.get('https://failtofly-backend.onrender.com/progress');
      setProgress(response.data);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  const addTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://failtofly-backend.onrender.com/api/tasks', 
        { title: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };


  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://failtofly-backend.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };


  const addReminder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://failtofly-backend.onrender.com/api/reminders', 
      { title: newReminder, date: new Date() },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReminders([...reminders, response.data]);
      setNewReminder('');
    } catch (err) {
      console.error('Error adding reminder:', err);
    }
  };

  

  const deleteReminder = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://failtofly-backend.onrender.com/api/reminders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReminders(reminders.filter(reminder => reminder._id !== id));
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  const navigate = useNavigate();



  return (
    <div className="bg-background text-primary-foreground min-h-screen flex flex-col" >
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-400 to-blue-500 py-4 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <img className="h-10 w-auto mr-2" src="/finallogos.png" alt="Logo" />
          <h1 className="text-3xl font-bold tracking-wider text-black font-serif">FailToFly</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <button
              className="bg-white bg-gradient-to-r from-green-400 to-blue-500/80 hover:bg-gray-200 px-4 py-2 rounded-full shadow-md transition duration-300 flex items-center"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
            <button
              className="bg-white bg-gradient-to-r from-green-400 to-blue-500/80 text-white hover:bg-gray-200 px-3 py-2 rounded-full shadow-md transition duration-300 flex items-center"
              aria-label="Profile"
              onClick={goToProfile}
            >
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
              Profile
            </button>
          </div>
          <div className="md:hidden relative">
            <button
              className="bg-white bg-gradient-to-r from-green-400 to-blue-500/80 text-white hover:bg-gray-200 px-3 py-2 rounded-full shadow-md transition duration-300 flex items-center"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faBars} className="mr-0" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-5 w-48 bg-gradient-to-r from-green-400 to-blue-500/80 rounded-md shadow-lg py-2 z-20">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={goToProfile}
                >
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                  Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

             

      <main className="mt-16 flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Section title="Study Planner" description="Plan your study schedule here ">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-input p-3 rounded-lg shadow-inner flex items-center">
              <input
                type="text"
                placeholder="Add task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full text-black bg-transparent focus:outline-none"
              />
            </div>
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-green-400 to-blue-500/40  text-white px-4 py-2 rounded-full shadow-md transition duration-300"
            >
              Add
            </button>
          </div>
          <ul className="mt-4 space-y-2">
            {tasks.map((task) => (
              <ListItem key={task._id} item={task} onDelete={() => deleteTask(task._id)} />
            ))}
          </ul>
        </Section>

        <Section title="Reminders" description="Set important reminders" >
          <div className="grid grid-cols-2 gap-3 ">
            <div className=" bg-input p-3 rounded-lg shadow-inner">
              <input
                type="text"
                placeholder="Add reminder"
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                className="w-full text-black bg-transparent focus:outline-none"
              />
            </div>
            <button
              onClick={addReminder}
              className="bg-gradient-to-r from-green-400 to-blue-500/40 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
            >
              Add
            </button>
          </div>
          <ul className="mt-4 space-y-2">
            {reminders.map((reminder) => (
              <ListItem key={reminder._id} item={reminder} onDelete={() => deleteReminder(reminder._id)} />
            ))}
          </ul>
        </Section>

        <Section title="Resources" description="Access helpful articles, videos, and books">
    <ul className="space-y-2">
      <li><Link to="/article-1" className="text-primary text-black hover:underline"><FaBookOpen className="inline mr-2" />Article </Link></li>
      <li><Link to="/video-tutorial" className="text-primary text-black hover:underline"><FaVideo className="inline mr-2" />Video Tutorial</Link></li>
      <li><Link to="/recommended-books" className="text-primary text-black hover:underline"><FaBook className="inline mr-2" />Recommended Books</Link></li>
    </ul>
  </Section>

        <Section title="Progress Tracker" description="Track your preparation progress">
        <img src="./progress.png" alt="coding-practice" className="w-full h-40 object-cover rounded-lg mb-3" />
        <Link to="/topics" className="text-primary hover:underline">Track</Link>
        </Section>
        <Section title="Coding Practice" description="Sharpen your coding skills">
          <img src="./codingimage.png" alt="coding-practice" className="w-full h-40 object-cover rounded-lg mb-3" />
          <Link to="/coding" className="text-primary hover:underline">Start Coding</Link>
        </Section>

        <Section title="Behavioral Questions" description="Prepare for behavioral interviews">
          <img src="./bquestions.jpg" alt="behavioral-questions" className="w-full h-40 object-cover rounded-lg mb-3" />
          <Link to="/behavioral-questions" className="text-primary hover:underline">Practice Questions</Link>
        </Section>

        <Section title="Company Research" description="Explore information about target companies">
          <img src="./company.jpg" alt="company-research" className="w-full h-40 object-cover rounded-lg mb-3" />
          <Link to="/company-research" className="text-primary hover:underline">View Details</Link>
        </Section>

        <Section title="RoadMap" description="Explore road maps">
          <img src="./roadmap.jpg" alt="roadmap" className="w-full h-40 object-cover rounded-lg mb-3" />
          <Link to="/roadmaps" className="text-primary hover:underline">Explore</Link>
        </Section>


        <Section title="Resume Templates" description="Explore templates">
          <img src="./resume.png" alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
        <Link
                to="/resume-templates"
                className="text-primary hover:underline">
                Go to Template Page
              </Link>
        </Section>

        <Section title="Aptitude" description="Learn Aptitude from basics">
          <img src="./apti1.jpg" alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
        <Link
                to="/aptitude"
                className="text-primary hover:underline">
                Start Learning
              </Link>
        </Section>

        <Section title="Quiz" description="Check your Knowledge">
          <img src="./quiz.jpg" alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
        <Link
                to="/quiz"
                className="text-primary hover:underline">
                Take quiz
              </Link>
        </Section>
        
        <Section title="Chatbot" description="Ask Anything">
          <ChatInterface />
        </Section>



      </main>
    </div>
  );
};

const Section = ({ title, description, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-black text-3xl font-bold mb-2 fontsize-20">{title}</h2>
    <p className="text-green-600 mb-4">{description}</p>
    {children}
  </div>
);

const ListItem = ({ item, onDelete }) => (
  <li className="flex justify-between text-black items-center p-3 bg-secondary rounded-md shadow-sm">
    <span>{item.title}</span>
    <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded-full">Delete</button>
  </li>
);

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = sessionStorage.getItem('admin-auth');
//   return isAuthenticated ? children : <Navigate to="/admin-login" />;
// };

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin'); // Adjust this based on how you store admin status

  return isAdmin ? children : <Navigate to="/admin-login" />;
};


const App = () => {

  const isAuthenticated = localStorage.getItem('token');

  return(
  <Router>
    <Routes>
      <Route path="/" element={<InfoPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<InterviewPreparationDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/topics" element = {<ProgressTracker/>} />
      <Route path="/resumeupload" element={<AdminUploadPage />} />
      <Route path="/roadmaps" element={<RoadmapSection />} />
      <Route path="/roadmaps/:id" element={<RoadmapDetailPage />} />
      <Route path="/coding" element={<CodingPracticePage />} />
      <Route path="/behavioral-questions" element={<BehavioralQuestionPage />} />
      <Route path="/company-research" element={<CompanyResearchPage />} />
      <Route path="/article-1" element={<ArticlePage />} />
      <Route path="/video-tutorial" element={<VideoTutorialPage />} />
      <Route path="/recommended-books" element={<RecommendedBooksPage />} />
      <Route path="/aptitude" element={<AptitudeLearning />} />
      <Route path="/aptitude/logic" element={<LogicQuestions />} />
      <Route path="/aptitude/numerical" element={<NumericalQuestions />} />
      <Route path="/aptitude/verbal" element={<VerbalQuestions />} />
      <Route path="/quiz" element={<Quiz />}/> 
      <Route path="/useruploads" element={<UploadPage />}/> 
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route path="/admin-links" element={
          <ProtectedRoute>
            <AdminLinks />
          </ProtectedRoute>
        } />
        

{/* 
        <Route path="/admin-links" element={
          <ProtectedRoute>
            <AdminLinks />
          </ProtectedRoute>
        } /> */}
        
        <Route path="/adminres/:endpoint" element={
          <ProtectedRoute>
            <ResourcePage />
          </ProtectedRoute>
        } />
        <Route path="/resume-templates" element={
          <ProtectedRoute>
            <ResumeTemplates />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/adminmsg" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/avbadmin" element={
          <ProtectedRoute>
            <Avbadmin />
          </ProtectedRoute>
        } />
        <Route path="/resumeupload" element={
          <ProtectedRoute>
            <AdminUploadPage />
          </ProtectedRoute>
        } />

    </Routes>
  </Router>
  )
};

export default App;
