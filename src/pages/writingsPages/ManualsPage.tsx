import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { fetchManualsImageWritingsLinks, fetchManualsWritingsLinks } from '../../../sanityApiClient/useSanityClient';

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
  items: {
    title: string;
    url: string;  
  }[];
}

interface ManualsData {
  manualsImageWritingsData: ImageBookLink[];
  manualsWritingsData: BookLink[];
}

const fetchManualsData = async (): Promise<ManualsData> => {
  const [manualsImageWritingsData, manualsWritingsData] = await Promise.all([
    fetchManualsImageWritingsLinks(),
    fetchManualsWritingsLinks(),
  ]);
 
  return { manualsImageWritingsData, manualsWritingsData};
};

const ManualsPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Manuals - ${authorName}`;
  }, [authorName]);

  const { data, isLoading, isError } = useQuery<ManualsData>({
    queryKey: ['manualsData'],
    queryFn: fetchManualsData,
  });


  return (
    <WritingsComponent
      title="Manuals"
      emptyMessage="Manuals are coming soon."
      booksData={data?.manualsImageWritingsData || []}
      linksData={data?.manualsWritingsData?.[0]?.items || []}
      status={isLoading ? "Loading entries…" : isError ? "Entries could not be loaded. Please try again later." : undefined}
    />
  );
}

export default ManualsPage;
