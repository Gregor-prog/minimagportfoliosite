import EditorialImage from '../../components/EditorialImage';
import PageHeader from '../../components/PageHeader';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfilePageHeroImage, fetchProfilePageText } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { urlFor } from '../../../sanityApiClient/sanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface FetchProfilePageHeroImageResponse {
  image: {
    asset: {
      _id: string;
    };
  };
}

interface FetchProfilePageTextResponse {
  _id: string;
  content: {
    _key: string;
    children: {
      _key: string;
      marks: string[];
      text: string;
    }[];
    markDefs: {
      _key: string;
      href: string;
      openInNewTab: boolean;
    }[];
  }[];
}

interface ProfilePageData {
  profilePageHeroImage: FetchProfilePageHeroImageResponse[];
  profilePageText: FetchProfilePageTextResponse[];
}

const fetchProfilePageData = async (): Promise<ProfilePageData> => {
  const [profilePageText, profilePageHeroImage] = await Promise.all([
    fetchProfilePageText(),
    fetchProfilePageHeroImage().catch(() => []),
  ]);
  if (!profilePageText || profilePageText.length === 0) {
    throw new Error('Profile Page text not found');
  }

  return { profilePageHeroImage, profilePageText };
};

const ProfilePage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  const { data, isLoading, isError } = useQuery<ProfilePageData>({
    queryKey: ['profilePageData'],  
    queryFn: fetchProfilePageData,  
  });

  const heroAssetId = data?.profilePageHeroImage?.[0]?.image?.asset?._id;
  const profileImgUrl = heroAssetId
    ? urlFor(heroAssetId).width(1200).quality(85).format('webp').url()
    : '';
  const profileImgTablet = heroAssetId
    ? urlFor(heroAssetId).width(768).quality(80).format('webp').url()
    : '';

  useEffect(() => {
    document.title = `Executive Biography & Profile - ${displayName}`;
  }, [displayName]);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section className="page-shell">
      <div className="site-wrap">
        {/* Academic Page Header */}
        <PageHeader
          eyebrow="Biography & Leadership"
          title="Executive Profile"
          description="First Professor of Social Work & Environmental Sustainability Globally • Acadapreneur • Ford Foundation Fellow"
        />
        {isError && <p className="mb-6 text-muted" role="status">The biography could not be loaded. Please try again later.</p>}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait & Key Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded overflow-hidden bg-paper border border-line">
              <EditorialImage
                srcSet={`${profileImgUrl} 1200w, ${profileImgTablet} 768w`}
                sizes="(max-width: 768px) 100vw, 40vw"
                src={profileImgUrl}
                alt={`Official portrait of ${displayName}`}
                loading="eager"
                className="w-full h-auto object-cover max-h-[620px]"
              />
            </div>

            {/* Quick Credentials Card */}
            <div className="p-5 rounded bg-paper border border-line text-left space-y-2 text-xs">
              <p className="text-muted uppercase tracking-wider font-semibold text-[10px]">
                Primary Affiliation
              </p>
              <p className="text-ink font-bold text-sm">
                Rivers State University (RSU), Port Harcourt
              </p>
              <p className="text-muted">
                Centre for Water and Sanitation Studies • Global Associate, IUPUI School of Social Work
              </p>
              <p className="text-muted">
                Editor-in-Chief of the{' '}
                <a className="text-link" href="https://www.ijsds.org/">
                  International Journal of Social Work and Development Studies (IJSDS)
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="surface-card p-6 md:p-8 space-y-6">
              {data?.profilePageText.map((paragraph) => (
                <div key={paragraph._id} className="space-y-4">
                  {paragraph.content.map((block) => (
                    <p
                      key={block._key}
                      className="text-ink text-base md:text-lg leading-relaxed font-sans font-normal"
                    >
                      {block.children.map((child) => {
                        const link = block.markDefs.find((def) => child.marks.includes(def._key));
                        if (link) {
                          return (
                            <a
                              key={child._key}
                              href={link.href}
                              target={link.openInNewTab ? '_blank' : '_self'}
                              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                              className="text-accent-strong hover:text-accent-strong underline font-semibold transition-colors"
                            >
                              {child.text}
                            </a>
                          );
                        }
                        return <span key={child._key}>{child.text}</span>;
                      })}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
