import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Get the user's role from Firestore
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;
        if (role === 'mentor') {
          navigate('/mentor');
        } else {
          navigate('/mentee');
        }
      } else {
        setError('User data not found.');
      }

      setError(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
    </div>
  );
};

export default Login;
