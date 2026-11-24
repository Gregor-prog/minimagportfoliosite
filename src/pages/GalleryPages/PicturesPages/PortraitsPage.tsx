import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ImagesComponent from '../../../components/ImagesComponent';
import PageHeader from '../../../components/PageHeader';
import { useAuthorContext } from '../../../hooks/AuthorContext';
import { fetchPortaitPicturesLinks } from '../../../../sanityApiClient/useSanityClient';
import { urlFor } from '../../../../sanityApiClient/sanityClient';

interface ImageLink {
  _id: string;
  imageTitle?: string;
  description?: string;
  image?: { asset?: { _id?: string } };
}

export default function PortraitsPage() {
  const { authorName } = useAuthorContext();
  const { data = [], isLoading, isError } = useQuery<ImageLink[]>({
    queryKey: ['portraitsPageResponse'],
    queryFn: fetchPortaitPicturesLinks,
  });

  useEffect(() => {
    document.title = `Field Work Pictures - ${authorName}`;
  }, [authorName]);

  const images = data.map((record, index) => {
    const asset = record.image?.asset?._id;
    const source = asset ? urlFor(asset).quality(82).format('webp') : null;
    return {
      _id: record._id,
      title: record.imageTitle || `Portrait ${index + 1}`,
      description: record.description,
      url: source?.width(1600).url(),
      previewUrl: source?.width(480).url(),
    };
  });

  return (
    <section className="site-wrap page-shell">
      <PageHeader eyebrow="Gallery" title="Official Portraits" />
      {isLoading && <p role="status">Loading portraits…</p>}
      {isError && <p role="status">Portraits could not be loaded. Please try again later.</p>}
      {!isLoading && !isError && images.length === 0 && <p>No portraits are available.</p>}
      <ImagesComponent images={images} />
    </section>
  );
}
