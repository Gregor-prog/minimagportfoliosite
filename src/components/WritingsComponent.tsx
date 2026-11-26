import { urlFor } from '../../sanityApiClient/sanityClient';
import EditorialImage from './EditorialImage';
import PageHeader from './PageHeader';

interface WritingLink {
  title?: string;
  url?: string;
}

interface Book extends WritingLink {
  purchaseAvailable?: boolean;
  image?: { asset?: { _id?: string } };
}

interface WritingsProps {
  title: string;
  linksData?: WritingLink[];
  booksData?: Book[];
  status?: string;
  emptyMessage?: string;
}

function parseWritingUrl(value?: string) {
  try {
    const url = new URL(value?.trim() ?? '');
    if (/^https?:$/.test(url.protocol) && /^[a-z\d.-]+\.[a-z]{2,}$/i.test(url.hostname)) return url;
  } catch {
    // The CMS can still contain older records with invalid or missing URLs.
  }
  return undefined;
}

function isSelar(url?: URL): url is URL {
  return url !== undefined && /^(?:www\.)?selar\.(?:co|com)$/i.test(url.hostname);
}

function catalogueKey(title: string, url?: URL) {
  if (isSelar(url)) return 'selar:' + url.pathname.replace(/\/+$/, '').toLowerCase();
  return 'title:' + title.replace(/&/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '').toLowerCase();
}

export default function WritingsComponent({
  title,
  linksData = [],
  booksData = [],
  status,
  emptyMessage = 'No entries are available.',
}: WritingsProps) {
  const groupedBooks = new Map<string, { title: string; url?: URL; asset?: string; purchaseAvailable?: boolean }>();
  for (const book of booksData) {
    const name = book.title?.trim();
    if (!name || /^coming soon[.!]*$/i.test(name)) continue;
    const url = parseWritingUrl(book.url);
    const key = catalogueKey(name, url);
    const asset = book.image?.asset?._id;
    const existing = groupedBooks.get(key);
    if (!existing || (!existing.asset && asset)) {
      groupedBooks.set(key, { title: name, url, asset, purchaseAvailable: book.purchaseAvailable ?? existing?.purchaseAvailable });
    } else if (existing.purchaseAvailable === undefined) {
      existing.purchaseAvailable = book.purchaseAvailable;
    }
  }
  const books = [...groupedBooks.entries()];
  const usedCovers = new Set<string>();
  const links = linksData.flatMap((entry) => {
    const name = entry.title?.trim();
    const url = parseWritingUrl(entry.url);
    return name && url && !/^coming soon[.!]*$/i.test(name) ? [{ name, url }] : [];
  });

  return (
    <section className="site-wrap page-shell">
      <PageHeader eyebrow="Scholarship" title={title} />
      {status && <p role="status">{status}</p>}
      {!status && books.length === 0 && links.length === 0 && <p>{emptyMessage}</p>}
      {links.length > 0 && (
        <ul className="surface-card mb-6 list-disc space-y-3 py-5 pl-9 pr-5 marker:text-gold-ink">
          {links.map(({ name, url }) => (
            <li key={url.href}>
              <a className="text-link" href={url.href} target="_blank" rel="noopener noreferrer">
                {isSelar(url) && url.pathname.startsWith('/m/') ? 'Visit Mina Ogbanga’s Selar store' : name}
              </a>
            </li>
          ))}
        </ul>
      )}
      {books.length > 0 && (
        <ul className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map(([key, book]) => {
            const asset = book.asset && !usedCovers.has(book.asset) ? book.asset : undefined;
            if (asset) usedCovers.add(asset);
            const cover = asset ? urlFor(asset).width(480).quality(80).format('webp').url() : undefined;
            const product = isSelar(book.url) && !book.url.pathname.startsWith('/m/');
            const unavailable = product ? book.purchaseAvailable !== true : book.purchaseAvailable === false;
            return (
              <li className="surface-card flex flex-col overflow-hidden" key={key}>
                <div className="relative aspect-[2/3] bg-cream">
                  <EditorialImage src={cover} alt="" loading="lazy" className="absolute inset-0 block h-full w-full object-contain" />
                </div>
                <div className="flex flex-1 flex-col items-start gap-3 p-3 sm:p-4">
                  <h2 className="text-base leading-snug">{book.title}</h2>
                  {book.url && !unavailable ? (
                    <a className="text-link mt-auto" href={book.url.href} target="_blank" rel="noopener noreferrer"
                      aria-label={(product ? 'Buy ' : 'View ') + book.title + (product ? ' on Selar' : '')}>
                      {product ? 'Buy on Selar' : 'View title'}
                    </a>
                  ) : (
                    <p className="mt-auto text-sm text-muted">{unavailable && product ? 'Unavailable on Selar' : 'Purchase link unavailable'}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

    </section>
  );
}
