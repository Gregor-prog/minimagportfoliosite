import PageHeader from '../../components/PageHeader';
import React, { useEffect } from 'react';
import PublicationExplorer, { PublicationItem } from '../../components/PublicationExplorer';
import { useQuery } from '@tanstack/react-query';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { fetchPapersImageWritingsLinks, fetchPapersWritingsLinks } from '../../../sanityApiClient/useSanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface ImageBookLink {
  title: string;
  image: {
    asset: {
      _id: string;
    };
  };
  url: string;
}

interface BookLink {
  items: PublicationItem[];
}

interface PapersPageData {
  papersImageWritingsData: ImageBookLink[];
  papersWritingsData: BookLink[];
}

const fetchPapersPageData = async (): Promise<PapersPageData> => {
  const [papersImageWritingsData, papersWritingsData] = await Promise.all([
    fetchPapersImageWritingsLinks().catch(() => []),
    fetchPapersWritingsLinks(),
  ]);

  return {
    papersImageWritingsData: papersImageWritingsData || [],
    papersWritingsData: papersWritingsData || [],
  };
};

const PapersPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Research Publications & Papers - ${authorName || 'Prof. Mina Margaret Ogbanga'}`;
  }, [authorName]);

  const { data, isLoading, isError } = useQuery<PapersPageData>({
    queryKey: ['papersData'],
    queryFn: fetchPapersPageData,
  });

  const papers: PublicationItem[] = (data?.papersWritingsData || []).flatMap((d) => d.items || []);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section className="page-shell">
      <div className="site-wrap">
        {/* Academic Page Header */}
        <PageHeader
          eyebrow="Scholarship & Research"
          title="Academic Papers & Publications"
          description={`Peer-reviewed articles, scholarly monographs, and policy research on environmental social work, sustainability, conflict resolution, and the extractive sector by ${authorName || 'Prof. Mina Margaret Ogbanga'}.`}
        />

        {/* Interactive Publication Explorer */}
        {isError ? (
          <p className="text-muted" role="status">Publications could not be loaded. Please try again later.</p>
        ) : (
          <PublicationExplorer
            papers={papers}
            imagePapers={data?.papersImageWritingsData}
            authorName={authorName}
          />
        )}
      </div>
    </section>
  );
};

export default PapersPage;

