import EditorialImage from '../../components/EditorialImage';
import PageHeader from '../../components/PageHeader';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWorkPageInput } from '../../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../../hooks/AuthorContext';
import { urlFor } from '../../../sanityApiClient/sanityClient';
import WholePageSpinner from '../../components/WholePageSpinner';

interface WorkPageImage {
  asset: {
    _id: string;
    url: string;
  };
}

interface WorkPageHeading {
  style: string;
  _key: string;
  markDefs: { href?: string; openInNewTab?: boolean }[];
  children: { text: string }[];
}

interface WorkPageResponse {
  _id: string;
  heading: WorkPageHeading[];
  description: string;
  image: WorkPageImage;
}

const fetchWorkPageData = async () => {
  const workPageResponse = await fetchWorkPageInput();
  if (!workPageResponse || workPageResponse.length === 0) {
    throw new Error('Work Page input data not found');
  }
  return workPageResponse;
};

const WorkPage: React.FC = () => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';
  
  const { data = [], isLoading, isError } = useQuery<WorkPageResponse[]>({
    queryKey: ['workPageData'],
    queryFn: fetchWorkPageData,
    staleTime: 0,
  });

  useEffect(() => {
    document.title = `Professional Impact & Work - ${displayName}`;
  }, [displayName]);

  if (isLoading) {
    return <WholePageSpinner />;
  }

  return (
    <section className="page-shell">
      <div className="site-wrap">
        {/* Header */}
        <PageHeader
          eyebrow="Community & Sectoral Impact"
          title="Professional Work & Initiatives"
          description="Advancing community empowerment, environmental restoration, WASH infrastructure, and sustainable development across Nigeria and globally."
        />
        {isError && <p className="mb-6 text-muted" role="status">Work entries could not be loaded. Please try again later.</p>}

        {/* Initiatives List */}
        <div className="space-y-6 text-left">
          {data.map((ele: WorkPageResponse) => {
            const imgUrl = ele.image?.asset?._id
              ? urlFor(ele.image.asset._id).width(600).quality(85).format('webp').url()
              : '';

            return (
              <div
                key={ele._id}
                className="flex flex-col md:flex-row gap-6 p-6 surface-card"
              >
                {imgUrl && (
                  <div className="w-full md:w-56 h-40 md:h-auto flex-shrink-0 rounded-xl overflow-hidden bg-cream flex items-center justify-center p-2 border border-line">
                    <EditorialImage
                      src={imgUrl}
                      className="w-full h-full object-contain"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {ele.heading?.map((headingItem) => {
                      const linkDef = headingItem.markDefs?.[0];
                      const content = headingItem.children?.[0]?.text;

                      return linkDef && linkDef.href ? (
                        <a
                          key={headingItem._key}
                          href={linkDef.href}
                          className="font-bold font-serif text-xl md:text-2xl text-accent-strong hover:text-accent-strong underline block mb-2"
                          target={linkDef.openInNewTab ? '_blank' : '_self'}
                          rel={linkDef.openInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          {content}
                        </a>
                      ) : (
                        <h2 key={headingItem._key} className="font-bold font-serif text-xl md:text-2xl text-ink mb-2">
                          {content}
                        </h2>
                      );
                    })}

                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {ele.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
