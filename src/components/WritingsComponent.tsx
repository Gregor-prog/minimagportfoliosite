import { urlFor } from '../../sanityApiClient/sanityClient';
import EditorialImage from './EditorialImage';
import PageHeader from './PageHeader';

interface WritingLink {
  title: string;
  url: string;
}

interface Book extends WritingLink {
  image?: { asset?: { _id?: string } };
}

interface WritingsProps {
  title: string;
  linksData?: WritingLink[];
  booksData?: Book[];
  status?: string;
}

export default function WritingsComponent({ title, linksData = [], booksData = [], status }: WritingsProps) {
  return (
    <section className="site-wrap page-shell">
      <PageHeader eyebrow="Scholarship" title={title} />
      {status && <p role="status">{status}</p>}
      {!status && booksData.length === 0 && linksData.length === 0 && <p>No entries are available.</p>}
      {booksData.length > 0 && (
        <ul className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {booksData.map((book, index) => {
            const asset = book.image?.asset?._id;
            const cover = asset ? urlFor(asset).width(480).quality(80).format('webp').url() : undefined;
            return (
              <li className="surface-card overflow-hidden" key={`${book.url}-${index}`}>
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="block">
                  <EditorialImage src={cover} alt="" loading="lazy" className="aspect-[3/4] w-full bg-cream object-contain" />
                  <p className="text-link p-3">{book.title}</p>
                </a>
              </li>
            );
          })}
        </ul>
      )}
      {linksData.length > 0 && (
        <ul className="surface-card list-disc space-y-3 py-5 pl-9 pr-5 marker:text-gold-ink">
          {linksData.map((entry, index) => (
            <li key={`${entry.url}-${index}`}>
              <a className="text-link" href={entry.url} target="_blank" rel="noopener noreferrer">{entry.title}</a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
