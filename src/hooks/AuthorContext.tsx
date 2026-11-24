import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthorDetails } from '../../sanityApiClient/useSanityClient';
import { urlFor } from '../../sanityApiClient/sanityClient';

interface Author {
  author?: string;
  logo?: { asset?: { _id?: string } };
}

interface AuthorContext {
  authorName: string;
  authorLogoUrl: string;
}

const AuthorContext = createContext<AuthorContext | undefined>(undefined);

export function AuthorContextProvider({ children }: { children: ReactNode }) {
  const { data } = useQuery<Author[]>({
    queryKey: ['authorData'],
    queryFn: fetchAuthorDetails,
  });

  const author = data?.[0];
  const authorName = author?.author?.trim() || 'Professor Mina Margaret Ogbanga';
  const logoId = author?.logo?.asset?._id;
  const authorLogoUrl = logoId ? urlFor(logoId).width(120).quality(80).format('webp').url() : '';

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (authorLogoUrl && favicon instanceof HTMLLinkElement) {
      favicon.href = authorLogoUrl;
    }
  }, [authorLogoUrl]);

  return (
    <AuthorContext.Provider value={{ authorName, authorLogoUrl }}>
      {children}
    </AuthorContext.Provider>
  );
}

export function useAuthorContext() {
  const context = useContext(AuthorContext);
  if (!context) {
    throw new Error('useAuthorContext must be used within an AuthorContextProvider');
  }
  return context;
}
