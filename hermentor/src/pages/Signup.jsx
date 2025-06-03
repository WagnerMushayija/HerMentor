import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'mentee',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${formData.fullName} - ${formData.role}`
      });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br />

        <select name="role" onChange={handleChange} required>
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select><br />

        <button type="submit">Sign Up</button>
      </form>

      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
      {success && <p style={{ color: 'green' }}>🎉 Signup successful!</p>}
    </div>
  );
};

export default Signup;
