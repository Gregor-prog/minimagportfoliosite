import React, { useEffect } from 'react';
import WritingsComponent from '../../components/WritingsComponent';
import { useQuery } from '@tanstack/react-query'; 
import { fetchTextBooksImageWritingsLinks, fetchTextBooksWritingsLinks } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';

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

interface TextBooksData {
  TextBooksImageWritingsData: ImageBookLink[]; 
  TextBooksWritingsData: BookLink[];
}

const fetchPeaceAndSecurityData = async (): Promise<TextBooksData> => {
  const [TextBooksImageWritingsData, TextBooksWritingsData] = await Promise.all([
    fetchTextBooksImageWritingsLinks(),
    fetchTextBooksWritingsLinks(),
  ]);
  return { TextBooksImageWritingsData, TextBooksWritingsData };
};

const TextBooksPage: React.FC = () => {
  const { authorName } = useAuthorContext();

  useEffect(() => {
    document.title = `Textbooks - ${authorName}`;
  }, [authorName]);

  const { data, isLoading, isError } = useQuery<TextBooksData>({
    queryKey: ['peaceAndSecurityData'], 
    queryFn: fetchPeaceAndSecurityData, 
  });

  

  return (
    <WritingsComponent
      title="Textbooks"
      booksData={data?.TextBooksImageWritingsData || []}
      linksData={data?.TextBooksWritingsData?.[0]?.items || []}
      status={isLoading ? "Loading entries…" : isError ? "Entries could not be loaded. Please try again later." : undefined}
    />
  );
};

export default TextBooksPage;
