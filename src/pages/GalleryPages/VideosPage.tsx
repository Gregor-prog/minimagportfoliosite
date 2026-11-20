import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVideoLinks } from '../../../sanityApiClient/useSanityClient';
import PageHeader from '../../components/PageHeader';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import { useAuthorContext } from '../../hooks/AuthorContext';

interface YouTubeEmbedLinks {
  youtubeEmbedLinks: string[];
}

export default function VideosPage() {
  const { authorName } = useAuthorContext();
  const { data = [], isError, isLoading } = useQuery<YouTubeEmbedLinks[]>({
    queryKey: ['videoLinks'],
    queryFn: fetchVideoLinks,
  });
  const videos = data[0]?.youtubeEmbedLinks ?? [];

  useEffect(() => {
    document.title = `Keynotes & Media Appearances - ${authorName}`;
  }, [authorName]);

  return (
    <section className="site-wrap page-shell">
      <PageHeader eyebrow="Gallery" title="Keynotes & Media Appearances" />
      {isLoading && <p role="status">Loading videos…</p>}
      {isError && <p role="status">Videos could not be loaded. Please try again later.</p>}
      {!isLoading && !isError && videos.length === 0 && <p>No videos are available.</p>}
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((url, index) => (
          <YoutubeEmbed key={`${url}-${index}`} videoUrl={url} title={`YouTube video ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
