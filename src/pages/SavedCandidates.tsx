import { useOutletContext } from 'react-router-dom';
import Candidate from '../interfaces/Candidate.interface';
import '../index.css';

const SavedCandidates = () => {
  const { savedCandidates, setSavedCandidates } = useOutletContext<{ savedCandidates: Candidate[], setSavedCandidates: React.Dispatch<React.SetStateAction<Candidate[]>> }>();

  const handleRemoveCandidate = (id: number) => {
    setSavedCandidates((prevCandidates) => prevCandidates.filter(candidate => candidate.id !== id));
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub Profile</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
                <td>{candidate.name}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></td>
                <td><button onClick={() => handleRemoveCandidate(candidate.id)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates</p>
      )}
    </div>
  );
};

export default SavedCandidates;