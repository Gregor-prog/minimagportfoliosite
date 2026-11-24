import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function ErrorPage() {
  useEffect(() => {
    document.title = 'Page Not Found - Professor Mina Margaret Ogbanga';
  }, []);

  return (
    <section className="site-wrap page-shell">
      <PageHeader eyebrow="404" title="Page not found" description="The page you’re looking for may have moved." />
      <Link className="site-button" to="/home">Return to the homepage</Link>
    </section>
  );
}
