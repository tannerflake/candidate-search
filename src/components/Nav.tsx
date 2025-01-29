import { Link } from 'react-router-dom';
import '../index.css';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="nav">
      <Link to="/" className="nav-item nav-link">Home</Link>
      <Link to="/SavedCandidates" className="nav-item nav-link">Potential Candidates</Link>
    </div>
  )
};

export default Nav;
