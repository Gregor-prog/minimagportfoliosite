import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { urlFor } from '../../sanityApiClient/sanityClient';
import { fetchHomePageHeroImage } from '../../sanityApiClient/useSanityClient';
import { useAuthorContext } from '../hooks/AuthorContext';
import EditorialImage from '../components/EditorialImage';

const defaultName = 'Professor Mina Margaret Ogbanga';

const impactAreas = [
  {
    category: 'Academia',
    title: 'Social Work & Education',
    description: 'Teaching, practice learning and research for the next generation of social work professionals.',
    to: '/about/education',
    link: 'Explore education',
  },
  {
    category: 'Policy',
    title: 'Environmental & Extractive Justice',
    description: 'Environmental restoration, extractive-sector accountability and community participation.',
    to: '/about/my-work',
    link: 'Explore professional work',
  },
  {
    category: 'Development',
    title: 'Civil Society & Governance',
    description: 'Community empowerment, sustainable development and public policy engagement in Nigeria and beyond.',
    to: '/about/my-work',
    link: 'See development initiatives',
  },
];

export default function HomePage() {
  const { authorName } = useAuthorContext();
  const displayName = authorName || defaultName;
  const isProfessorOgbanga = displayName.replace(/,\s*ph\.?d\.?$/i, '').toLowerCase() === defaultName.toLowerCase();
  const { data: portraits } = useQuery<{ image?: { asset?: { _id?: string } } }[]>({
    queryKey: ['homePortrait'],
    queryFn: fetchHomePageHeroImage,
    staleTime: 5 * 60 * 1000,
  });
  const portraitId = portraits?.[0]?.image?.asset?._id;
  const portraitUrl = portraitId ? urlFor(portraitId).format('webp').quality(85) : null;

  useEffect(() => {
    document.title = `Home - ${displayName}`;
  }, [displayName]);

  return (
    <div className="homepage">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="site-wrap home-hero-grid">
          <div>
            <p className="eyebrow">A voice for people, planet and progress</p>
            <h1 id="hero-title">
              {isProfessorOgbanga ? (
                <>Professor Mina<br />Margaret <em>Ogbanga</em></>
              ) : displayName}
            </h1>
            <p className="home-lead">Advancing social welfare, environmental sustainability and inclusive development through scholarship, policy leadership and community engagement.</p>
            <div className="home-actions">
              <Link to="/home#about" className="site-button">Discover My Work <span aria-hidden="true">→</span></Link>
              <Link to="/contact" className="site-button site-button-outline">Explore Collaboration</Link>
            </div>
          </div>
          <div className="home-portrait">
            <span className="portrait-monogram" aria-hidden="true">MO</span>
            {portraitUrl && (
              <EditorialImage
                className="home-portrait-image"
                src={portraitUrl.width(640).url()}
                srcSet={[400, 640, 960].map((width) => `${portraitUrl.width(width).url()} ${width}w`).join(', ')}
                sizes="(max-width: 520px) calc(100vw - 56px), (max-width: 800px) 410px, 42vw"
                alt={`Portrait of ${displayName}`}
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </section>

      <div className="credentials-strip">
        <ul className="site-wrap">
          <li>Ford Foundation Fellow</li>
          <li>Rivers State University</li>
          <li>Global Associate · IUPUI</li>
        </ul>
      </div>

      <section className="home-section" id="about" aria-labelledby="about-title">
        <div className="site-wrap home-two-column">
          <div>
            <p className="eyebrow">The person behind the work</p>
            <h2 id="about-title">Scholarship with purpose. Leadership with conscience.</h2>
            <p className="home-lead">Professor Mina Margaret Ogbanga works at the intersection of social work, environmental sustainability, public policy and community development.</p>
            <p className="mt-4">Her work spans academic leadership, civil society engagement, extractive justice and sustainable development.</p>
            <Link className="site-button mt-6" to="/about/profile">Read the Executive Profile</Link>
          </div>
          <aside className="home-feature">
            <p className="eyebrow">Academic affiliations</p>
            <p>Rivers State University’s Centre for Water and Sanitation Studies</p>
            <small>Global Associate, IUPUI School of Social Work</small>
          </aside>
        </div>
      </section>

      <section className="home-section home-section-soft" id="impact" aria-labelledby="impact-title">
        <div className="site-wrap">
          <p className="eyebrow">Areas of work</p>
          <h2 id="impact-title">Connecting ideas to lasting impact</h2>
          <p className="home-lead">Teaching, advocacy and institution building across social work and sustainable development.</p>
          <div className="home-card-grid">
            {impactAreas.map(({ category, title, description, to, link }) => (
              <article className="home-card" key={title}>
                <p className="eyebrow">{category}</p>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link className="text-link" to={to}>{link} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section-dark" id="innovation" aria-labelledby="innovation-title">
        <div className="site-wrap">
          <p className="eyebrow">Innovation in practice</p>
          <h2 id="innovation-title">Platforms for learning and public engagement</h2>
          <div className="home-card-grid">
            <article className="home-card">
              <p className="eyebrow">Media & ideas</p>
              <h3>SocialWorkTV</h3>
              <p>A WhatsApp channel for social work and public-interest discussion.</p>
              <a className="text-link" href="https://whatsapp.com/channel/0029VbAgJc93rZZiq90LxD1j">Visit SocialWorkTV <span aria-hidden="true">↗</span></a>
            </article>
            <article className="home-card">
              <p className="eyebrow">Academic publishing</p>
              <h3>International Journal of Social Work and Development Studies (IJSDS)</h3>
              <p>Professor Ogbanga serves as Editor-in-Chief.</p>
              <a className="text-link" href="https://www.ijsds.org/">Visit the journal <span aria-hidden="true">↗</span></a>
            </article>
            <article className="home-card">
              <p className="eyebrow">Community development</p>
              <h3>Centre for Development Support Initiatives</h3>
              <Link className="text-link" to="/about/my-work">Explore the portfolio’s initiatives <span aria-hidden="true">→</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section" id="scholarship" aria-labelledby="scholarship-title">
        <div className="site-wrap home-two-column">
          <div>
            <p className="eyebrow">Scholarship</p>
            <h2 id="scholarship-title">Research, writing and public dialogue</h2>
            <p className="home-lead">Explore research papers, authored books and development manuals on social work, sustainability and the extractive sector.</p>
            <Link className="site-button mt-6" to="/writings/papers">Explore Publications</Link>
          </div>
          <aside className="home-feature home-reading">
            <p className="eyebrow">Selected writings</p>
            <ul>
              <li><Link to="/writings/papers">Research papers</Link></li>
              <li><Link to="/writings/textbooks">Textbooks</Link></li>
              <li><Link to="/writings/manuals">Manuals and guides</Link></li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="home-section home-contact" id="contact" aria-labelledby="collaborate-title">
        <div className="site-wrap">
          <p className="eyebrow">Collaboration</p>
          <h2 id="collaborate-title">Partnership begins with a conversation.</h2>
          <p className="home-lead">Get in touch about research partnerships, keynote speaking, advisory opportunities and institutional engagement.</p>
          <Link className="site-button site-button-light mt-6" to="/contact">Get in Touch <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}
