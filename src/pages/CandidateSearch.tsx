import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import '../index.css';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { setSavedCandidates } = useOutletContext<{ savedCandidates: Candidate[], setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>> }>();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        console.log('Fetched candidates:', data);
        setCandidates(data);
      } catch (err) {
        setError('Failed to fetch candidates');
        console.error('Error fetching candidates:', err);
      }
    };

    fetchCandidates();
  }, []);

  const handleNextCandidate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
  };

  const handleSaveCandidate = () => {
    const candidate = candidates[currentIndex];
    setSavedCandidates((prevCandidates) => [...prevCandidates, candidate]);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Hide the message after 3 seconds
    handleNextCandidate();
  }

  const candidate = candidates[currentIndex]; // Get the current candidate

  return (
    <div>
      <h1>Candidate Search</h1>
      {error && <p>{error}</p>}
      {candidate ? (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={candidate.login} width="50" />
          <p>Name: {candidate.name}</p>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <div className="button-container">
            <button className="button-minus" onClick={handleNextCandidate}>No thanks</button>
            <button className="button-plus" onClick={handleSaveCandidate}>Save Candidate</button>
          </div>
        </div>
      ) : (
        <p>No candidates found</p>
      )}
      {showMessage && <div className="save-message">Candidate Saved</div>}
    </div>
  );
};

export default CandidateSearch;