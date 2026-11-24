import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsLinks } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import PageHeader from '../../components/PageHeader';

interface NewsLink {
  _id: string;
  urls: string[];
}

export default function NewsPage() {
  const { authorName } = useAuthorContext();
  const { data = [], isError, isLoading } = useQuery<NewsLink[]>({
    queryKey: ['newsLinks'],
    queryFn: fetchNewsLinks,
  });
  const urls = data[0]?.urls ?? [];

  useEffect(() => {
    document.title = `News - ${authorName}`;
  }, [authorName]);

  return (
    <section className="site-wrap page-shell">
      <PageHeader eyebrow="Gallery" title="News & Press" />
      {isLoading && <p role="status">Loading news…</p>}
      {isError && <p role="status">News links could not be loaded. Please try again later.</p>}
      {!isLoading && !isError && urls.length === 0 && <p>No news links are available.</p>}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {urls.map((link, index) => (
          <li className="surface-card p-4" key={`${link}-${index}`}>
            <a className="text-link break-all" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
