// Modules
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// Components
import Header from './components/Header.js';
import Results from './pages/Results.js';
import Footer from './components/Footer.js';
import UserInputs from './pages/UserInputs.js';
// Styles
import './styles/sass/index.scss';
function App() {
  const [submit, setSubmit] = useState(false);
  const [userLimitChoice, setuserLimitChoice] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="dadJokeApp">
      <Header />
      <Routes>
        <Route path="/" element={<UserInputs propTerm={searchTerm => setSearchTerm(searchTerm)} propLimit={userLimitChoice => setuserLimitChoice(userLimitChoice)} propSubmit={submit => setSubmit(submit)} />} />
        <Route path="/results" element={<Results submit={submit} userLimitChoice={userLimitChoice} searchTerm={searchTerm} />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;