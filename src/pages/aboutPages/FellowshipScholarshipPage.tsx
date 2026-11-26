import EditorialImage from '../../components/EditorialImage';
import PageHeader from '../../components/PageHeader';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFellowshipsAndRecognitionsPageInput, fetchFellowshipsAndRecognitionsPageHeroImage } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { urlFor } from '../../../sanityApiClient/sanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface FetchFellowshipsAndScholarshipsHeroImageResponse {
  image: {
    asset: {
      _id: string;
    };
  };
}

interface FetchFellowshipsAndScholarshipsInputResponse {
  _id: string;
  details: string[];
}

interface FellowshipsAndScholarshipsPageData {
  fellowshipsAndScholarshipsInput: FetchFellowshipsAndScholarshipsInputResponse[];
  fellowshipsAndScholarshipsHeroImage: FetchFellowshipsAndScholarshipsHeroImageResponse[];
}

const fetchFellowshipsAndScholarshipsData = async (): Promise<FellowshipsAndScholarshipsPageData> => {
  const [fellowshipsAndScholarshipsInput, fellowshipsAndScholarshipsHeroImage] = await Promise.all([
    fetchFellowshipsAndRecognitionsPageInput(),
    fetchFellowshipsAndRecognitionsPageHeroImage().catch(() => []),
  ]);
  if (!fellowshipsAndScholarshipsInput || fellowshipsAndScholarshipsInput.length === 0) {
    throw new Error('Fellowships and scholarships input not found');
  }

  return { fellowshipsAndScholarshipsInput, fellowshipsAndScholarshipsHeroImage };
};

const FellowShipScholarshipPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  const { data, isLoading, isError } = useQuery<FellowshipsAndScholarshipsPageData>({
    queryKey: ['fellowshipsAndScholarshipsData'],
    queryFn: fetchFellowshipsAndScholarshipsData,
  });

  const heroAssetId = data?.fellowshipsAndScholarshipsHeroImage?.[0]?.image?.asset?._id;
  const fellowshipsHeroImageUrl = heroAssetId
    ? urlFor(heroAssetId).width(1200).quality(85).format('webp').url()
    : '';

  useEffect(() => {
    document.title = `Fellowships & Scholarships - ${displayName}`;
  }, [displayName]);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section className="page-shell">
      <div className="site-wrap">
        {/* Header */}
        <PageHeader
          eyebrow="International Fellowships & Endowments"
          title="Fellowships & Scholarships"
          description={`Ashoka and Ford Foundation fellowships and academic research grants awarded to ${displayName}.`}
        />
        {isError && <p className="mb-6 text-muted" role="status">Fellowship details could not be loaded. Please try again later.</p>}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait */}
          {fellowshipsHeroImageUrl && (
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded overflow-hidden bg-paper border border-line">
                <EditorialImage
                  src={fellowshipsHeroImageUrl}
                  alt={`Portrait of ${displayName}`}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[620px]"
                />
              </div>
            </div>
          )}

          {/* Right Column: Fellowships List */}
          <div className={fellowshipsHeroImageUrl ? 'lg:col-span-7 space-y-6 text-left' : 'lg:col-span-12 space-y-6 text-left'}>
            <div className="space-y-6">
              <div className="p-6 rounded bg-paper border border-line space-y-2">
                <h2 className="text-xl">Ashoka Fellowship</h2>
                <p>Elected in September 2024 for her work advancing extractive justice in Nigeria.</p>
                <a className="text-link" href="https://www.ashoka.org/en-us/fellow/mina-ogbanga">Read her Ashoka Fellow profile</a>
              </div>
              {data?.fellowshipsAndScholarshipsInput.map((fellowship) => (
                <div
                  key={fellowship._id}
                  className="p-6 rounded bg-paper border border-line space-y-3"
                >
                  <ul className="list-disc space-y-2 pl-5 marker:text-gold-ink">
                    {fellowship.details.map((detail, index) => (
                      <li
                        key={index}
                        className="text-muted text-sm md:text-base font-normal leading-relaxed"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FellowShipScholarshipPage;
