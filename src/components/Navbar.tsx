import { useEffect, useRef, useState } from 'react';
import { HiChevronDown, HiMenu, HiX } from 'react-icons/hi';
import { Link, NavLink, useLocation } from 'react-router-dom';

const aboutLinks = [
  { label: 'Executive Profile', to: '/about/profile' },
  { label: 'Professional Work', to: '/about/my-work' },
  { label: 'Education & Credentials', to: '/about/education' },
  { label: 'Fellowships & Scholarships', to: '/about/fellowships-and-scholarships' },
  { label: 'Awards & Recognitions', to: '/about/awards-and-recognitions' },
];

const scholarshipLinks = [
  { label: 'Scholarship Overview', to: '/home#scholarship' },
  { label: 'Research Papers', to: '/writings/papers' },
  { label: 'Textbooks', to: '/writings/textbooks' },
  { label: 'Manuals & Guides', to: '/writings/manuals' },
];

const galleryLinks = [
  { label: 'Keynote & Media Videos', to: '/gallery/videos' },
  { label: 'News & Press', to: '/gallery/news' },
  { label: 'Official Portraits', to: '/gallery/pictures' },
];

const navItems = [
  { label: 'About', id: 'about', links: aboutLinks, match: '/about' },
  { label: 'Impact', to: '/home#impact' },
  { label: 'Innovations', to: '/home#innovation' },
  { label: 'Scholarship', id: 'scholarship', links: scholarshipLinks, match: '/writings' },
  { label: 'Gallery', id: 'gallery', links: galleryLinks, match: '/gallery' },
  { label: 'Blog', to: '/blog' },
];

export default function Navbar() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const disclosureButton = useRef<HTMLButtonElement | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function closeMenus() {
    setMenuOpen(false);
    setOpenGroup(null);
  }

  useEffect(closeMenus, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMenuOpen && !openGroup) return;
    const dismiss = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenus();
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [isMenuOpen, openGroup]);

  function renderLink(label: string, to: string, className: string) {
    if (to.includes('#')) {
      const isCurrent = location.pathname + location.hash === to;
      return <Link className={className} to={to} onClick={closeMenus} aria-current={isCurrent ? 'location' : undefined}>{label}</Link>;
    }
    return <NavLink className={className} to={to} onClick={closeMenus}>{label}</NavLink>;
  }

  return (
    <nav
      ref={navRef}
      className="site-nav site-wrap"
      aria-label="Main navigation"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return;
        if (openGroup) {
          setOpenGroup(null);
          disclosureButton.current?.focus();
        } else if (isMenuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <Link className="site-brand" to="/home" onClick={closeMenus}>
        Mina Ogbanga
        <small>Professor · Advocate · Innovator</small>
      </Link>
      <button
        ref={menuButton}
        type="button"
        className="site-menu-toggle"
        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => {
          setMenuOpen(!isMenuOpen);
          setOpenGroup(null);
        }}
      >
        {isMenuOpen ? <HiX aria-hidden="true" /> : <HiMenu aria-hidden="true" />}
      </button>
      <ul className="site-nav-links" id="site-navigation" data-open={isMenuOpen}>
        {navItems.map((item) => (
          <li className="site-nav-item" key={item.label}>
            {item.links ? (
              <>
                <button
                  type="button"
                  className="site-nav-link"
                  aria-expanded={openGroup === item.id}
                  aria-controls={`site-nav-${item.id}`}
                  data-current={location.pathname.startsWith(item.match)}
                  onClick={(event) => {
                    disclosureButton.current = event.currentTarget;
                    setOpenGroup(openGroup === item.id ? null : item.id);
                  }}
                >
                  {item.label} <HiChevronDown aria-hidden="true" />
                </button>
                <ul className="site-nav-panel" id={`site-nav-${item.id}`} hidden={openGroup !== item.id}>
                  {item.links.map((link) => <li key={link.to}>{renderLink(link.label, link.to, 'site-nav-sublink')}</li>)}
                </ul>
              </>
            ) : renderLink(item.label, item.to, 'site-nav-link')}
          </li>
        ))}
        <li>{renderLink('Collaborate', '/contact', 'site-button')}</li>
      </ul>
    </nav>
  );
}
