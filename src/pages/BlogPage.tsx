import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { useAuthorContext } from '../hooks/AuthorContext';

export default function BlogPage() {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Articles & Perspectives - ${authorName}`;
  }, [authorName]);

  return (
    <section className="site-wrap page-shell">
      <PageHeader title="Articles & Perspectives" />
      <p className="text-muted">Blog posts are coming soon.</p>
    </section>
  );
}
