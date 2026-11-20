import { Link } from 'react-router-dom';
import { useAuthorContext } from '../hooks/AuthorContext';

export default function Footer() {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  return (
    <footer className="site-footer">
      <div className="site-wrap">
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/about/profile">Biography</Link>
          <Link to="/writings/papers">Publications</Link>
          <Link to="/about/fellowships-and-scholarships">Fellowships</Link>
          <Link to="/about/awards-and-recognitions">Honors</Link>
          <Link to="/gallery/videos">Lectures & Media</Link>
          <Link to="/contact">Speaking Requests</Link>
        </nav>
        <div className="footer-details">
          <p>© {new Date().getFullYear()} {displayName}. All rights reserved.</p>
          <p>
            Published by{' '}
            <a href="https://wa.me/2348148876125" target="_blank" rel="noopener noreferrer">Parakletus Publishing</a>
          </p>
          <a href="#main-content">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
