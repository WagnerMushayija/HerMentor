import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to HerMentor 👩‍💻</h1>
      <p>Empowering women through mentorship.</p>
      <Link to="/signup">
        <button style={{ marginTop: '10px' }}>Go to Signup</button>
      </Link>
        <Link to="/login">
        <button style={{ marginTop: '10px' }}>Go to Log In</button>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mentor" element={<MentorDash />} />
        <Route path="/mentee" element={<MenteeDash />} />
      </Routes>
    </BrowserRouter>
  );
}
