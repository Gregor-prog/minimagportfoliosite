import EditorialImage from './EditorialImage';
import PageHeader from './PageHeader';
import React from 'react';
import { useAuthorContext } from '../hooks/AuthorContext';
import { HiOutlineSparkles } from 'react-icons/hi';

interface HonorsComponentProps {
  title: string;
  listData?: string[];
  imgUrl?: string;
  categoryBadge?: string;
  status?: string;
}

const HonorsComponent: React.FC<HonorsComponentProps> = ({
  title,
  listData = [],
  imgUrl,
  categoryBadge = 'Honors & Distinctions',
  status,
}) => {
  const { authorName } = useAuthorContext();
  const displayName = authorName || 'Professor Mina Margaret Ogbanga';

  return (
    <section className="page-shell">
      <div className="site-wrap">
        {/* Header */}
        <PageHeader
          eyebrow={categoryBadge}
          title={title}
          description={`International fellowships, civic recognitions, and professional awards honoring ${displayName}.`}
        />
        {status && <p className="mb-6 text-muted" role="status">{status}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait */}
          {imgUrl && (
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded overflow-hidden bg-paper border border-line">
                <EditorialImage
                  src={imgUrl}
                  alt={`Portrait of ${displayName}`}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[620px]"
                />
              </div>
            </div>
          )}

          {/* Right Column: Structured Honor Cards */}
          <div className={imgUrl ? 'lg:col-span-7 space-y-4 text-left' : 'lg:col-span-12 space-y-4 text-left'}>
            <div className="space-y-3">
              {listData.map((listItem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-4 surface-card"
                >
                  <div className="p-2 rounded-lg bg-gold-soft text-gold-ink border border-line flex-shrink-0 mt-0.5">
                    <HiOutlineSparkles size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-ink text-sm md:text-base leading-relaxed font-normal">
                      {listItem}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HonorsComponent;