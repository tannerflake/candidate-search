import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Candidate from './interfaces/Candidate.interface';

function App() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedCandidatesJSON = localStorage.getItem('savedCandidates');
      if (savedCandidatesJSON) {
        setSavedCandidates(JSON.parse(savedCandidatesJSON));
      }
    } catch (error) {
      console.error('Error parsing saved candidates from localStorage:', error);
    }
  }, []);

  // Save saved candidates to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    } catch (error) {
      console.error('Error saving candidates to localStorage:', error);
    }
  }, [savedCandidates]);

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ savedCandidates, setSavedCandidates }} />
      </main>
    </>
  );
}

export default App;