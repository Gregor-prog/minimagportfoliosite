import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <div className="site-layout">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="topic-strip">Social work <span aria-hidden="true">•</span> Environmental sustainability <span aria-hidden="true">•</span> Social innovation</div>
      <header className="site-header">
        <Navbar />
      </header>

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
}
