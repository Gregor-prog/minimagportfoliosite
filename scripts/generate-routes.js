import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = 'https://www.minaogbanga.com';
const name = 'Professor Mina Margaret Ogbanga';
const homePath = '/home';

const routes = [
  {
    path: homePath,
    heading: name,
    description: 'Professor Mina Margaret Ogbanga is a Professor of Social Work and Environmental Sustainability, Ford Foundation Fellow, and Editor-in-Chief of IJSDS.',
    summary: 'Professor Mina Margaret Ogbanga works across social work, environmental sustainability, public policy and community development. She is an Ashoka Fellow and a Ford Foundation Fellow. She is affiliated with the Centre for Water and Sanitation Studies at Rivers State University and is a Global Associate at the IUPUI School of Social Work.',
  },
  {
    path: '/about/profile',
    heading: 'Executive Profile',
    description: 'Biography and academic affiliations of Professor Mina Margaret Ogbanga, Editor-in-Chief of the International Journal of Social Work and Development Studies (IJSDS).',
    summary: 'Professor Mina Margaret Ogbanga’s work connects academic leadership, environmental sustainability and community development. Her profile covers her Ashoka Fellowship and her academic work at Rivers State University in Port Harcourt, Nigeria.',
    type: 'ProfilePage',
    related: ['/about/my-work', '/about/education', '/about/fellowships-and-scholarships', '/about/awards-and-recognitions'],
  },
  {
    path: '/about/my-work',
    heading: 'Professional Work & Initiatives',
    description: 'Explore Professor Mina Margaret Ogbanga’s work in community development, environmental restoration, extractive-sector accountability, and water and sanitation.',
    summary: 'Her work includes environmental restoration, community participation in extractive-sector decisions, and water, sanitation and hygiene initiatives. These projects connect social work practice with public policy and sustainable development.',
    type: 'AboutPage',
    related: ['/about/profile', '/writings/papers', '/writings/manuals', '/contact'],
  },
  {
    path: '/about/education',
    heading: 'Education & Credentials',
    description: 'Professor Mina Margaret Ogbanga’s doctoral research in sustainable development and executive studies at the University of Cambridge and Harvard University.',
    summary: 'Professor Ogbanga holds a Ph.D. in Sustainable Development Studies and completed executive studies at the University of Cambridge and Harvard University.',
    related: ['/about/profile', '/about/fellowships-and-scholarships', '/writings/papers'],
  },
  {
    path: '/about/fellowships-and-scholarships',
    heading: 'Fellowships & Scholarships',
    description: 'Ashoka and Ford Foundation fellowships and academic research awards listed in Professor Mina Margaret Ogbanga’s portfolio.',
    summary: 'Professor Mina Margaret Ogbanga was elected to the Ashoka Fellowship in September 2024 for her extractive justice work in Nigeria. She is also a Ford Foundation Fellow.',
    type: 'CollectionPage',
    related: ['/about/education', '/about/awards-and-recognitions', '/about/profile'],
  },
  {
    path: '/about/awards-and-recognitions',
    heading: 'Awards & Recognitions',
    description: 'Recognition for Professor Mina Margaret Ogbanga’s work in women’s development, mangrove restoration and management.',
    summary: 'Recognitions listed in the portfolio include the EU AID Women in Development Award, the UN-Habitat Award for Mangrove Restoration, and the Nigerian Institute of Management and Mobil Best Young Manager Award.',
    type: 'CollectionPage',
    related: ['/about/profile', '/about/fellowships-and-scholarships', '/about/my-work'],
  },
  {
    path: '/writings/papers',
    heading: 'Academic Papers & Publications',
    description: 'Browse Professor Mina Margaret Ogbanga’s research on environmental social work, sustainability, conflict resolution, and the extractive sector.',
    summary: 'The publication catalogue brings together research papers, scholarly monographs and policy research. The interactive catalogue lets readers search and filter publications and access citation details.',
    type: 'CollectionPage',
    related: ['/writings/textbooks', '/writings/manuals', '/about/my-work'],
  },
  {
    path: '/writings/textbooks',
    heading: 'Textbooks',
    description: 'Textbooks and scholarly books from Professor Mina Margaret Ogbanga’s academic portfolio.',
    summary: 'This collection lists Professor Mina Margaret Ogbanga’s books and textbooks. Explore her academic papers for research articles or her manuals for practical resources.',
    type: 'CollectionPage',
    related: ['/writings/papers', '/writings/manuals'],
  },
  {
    path: '/writings/manuals',
    heading: 'Manuals',
    description: 'Training manuals, field guides and practical toolkits listed by Professor Mina Margaret Ogbanga.',
    summary: 'Manuals are coming soon.',
    type: 'CollectionPage',
    related: ['/writings/papers', '/writings/textbooks', '/about/my-work'],
  },
  {
    path: '/gallery/videos',
    heading: 'Keynotes & Media Appearances',
    description: 'Video gallery of talks, lectures and media appearances by Professor Mina Margaret Ogbanga.',
    summary: 'The video gallery collects recordings of Professor Mina Margaret Ogbanga’s talks and media appearances. For press coverage and portrait photography, see the related gallery pages.',
    type: 'CollectionPage',
    related: ['/gallery/news', '/gallery/pictures', '/contact'],
  },
  {
    path: '/gallery/news',
    heading: 'News & Press',
    description: 'Press coverage and news items featured in Professor Mina Margaret Ogbanga’s official portfolio.',
    summary: 'The news gallery gathers media coverage and press items featuring Professor Mina Margaret Ogbanga. The video gallery covers recorded appearances, and the contact page handles inquiries.',
    type: 'CollectionPage',
    related: ['/gallery/videos', '/gallery/pictures', '/contact'],
  },
  {
    path: '/gallery/pictures',
    heading: 'Official Portraits',
    description: 'View portrait photography in Professor Mina Margaret Ogbanga’s official gallery.',
    summary: 'The portrait gallery collects photographs of Professor Mina Margaret Ogbanga. Use the contact page to inquire about speaking engagements or media appearances.',
    type: 'CollectionPage',
    related: ['/gallery/news', '/gallery/videos', '/contact'],
  },
  {
    path: '/blog',
    heading: 'Articles & Perspectives',
    description: 'Articles and perspectives from Professor Mina Margaret Ogbanga’s academic portfolio.',
    summary: 'Blog posts are coming soon. The Academic Papers & Publications page lists currently available scholarly writing.',
    related: ['/writings/papers', '/about/profile'],
  },
  {
    path: '/contact',
    heading: 'Engagements, Advisory & Contact',
    description: 'Contact Professor Mina Margaret Ogbanga about speaking engagements, policy advisory work, academic collaborations or media inquiries.',
    summary: 'Use this page to inquire about keynote lectures, policy advisory, research collaborations or conference panels.',
    type: 'ContactPage',
    email: 'info@minaogbanga.com',
    related: ['/about/profile', '/about/my-work', '/gallery/videos'],
  },
];

const routeByPath = new Map(routes.map((route) => [route.path, route]));
const home = routeByPath.get(homePath);

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function replaceRequired(source, pattern, replacement) {
  if (!pattern.test(source)) {
    throw new Error(`Vite HTML template is missing ${pattern}`);
  }
  return source.replace(pattern, () => replacement);
}

function renderSummary(route) {
  const relatedPages = route === home
    ? routes.filter((page) => page !== home)
    : [home, ...route.related.map((relatedPath) => routeByPath.get(relatedPath))];
  const links = relatedPages.map((page) =>
    `          <li><a class="text-link" href="${escapeHtml(page.path)}">${escapeHtml(page === home ? 'Home' : page.heading)}</a></li>`,
  ).join('\n');
  const email = route.email
    ? `\n        <p>Email <a class="text-link" href="mailto:${escapeHtml(route.email)}">${escapeHtml(route.email)}</a>.</p>`
    : '';

  const editorialRole = route === home || route.type === 'ProfilePage'
    ? '\n        <p>Professor Ogbanga serves as Editor-in-Chief of the <a class="text-link" href="https://www.ijsds.org/">International Journal of Social Work and Development Studies (IJSDS)</a>.</p>'
    : '';

  return `<div id="root">
      <main class="site-wrap page-shell">
        <h1>${escapeHtml(route.heading)}</h1>
        <p>${escapeHtml(route.summary)}</p>${editorialRole}${email}
        <nav class="mt-6" aria-label="${route === home ? 'Portfolio pages' : 'Related pages'}">
          <ul>
${links}
          </ul>
        </nav>
      </main>
    </div>`;
}

function renderPage(template, route, siteSchema) {
  const url = `${origin}${route.path}`;
  const title = route === home ? name : `${route.heading} - ${name}`;
  const person = siteSchema['@graph'].find((entity) => entity['@type'] === 'Person');
  const website = siteSchema['@graph'].find((entity) => entity['@type'] === 'WebSite');
  const personReference = { '@id': person['@id'] };
  const webpage = {
    '@type': route.type || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description: route.description,
    isPartOf: { '@id': website['@id'] },
    inLanguage: 'en',
    about: personReference,
  };
  const schema = { ...siteSchema, '@graph': [...siteSchema['@graph'], webpage] };

  if (route === home || route.type === 'ProfilePage') {
    webpage.mainEntity = personReference;
  }
  if (route !== home) {
    webpage.breadcrumb = { '@id': `${url}#breadcrumb` };
    schema['@graph'].push({
      '@type': 'BreadcrumbList',
      '@id': webpage.breadcrumb['@id'],
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}${homePath}` },
        { '@type': 'ListItem', position: 2, name: route.heading, item: url },
      ],
    });
  }

  let html = replaceRequired(template, /<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceRequired(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${url}" />`);
  const meta = [
    ['name', 'description', route.description],
    ['property', 'og:title', title],
    ['property', 'og:description', route.description],
    ['property', 'og:url', url],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', route.description],
  ];
  for (const [attribute, key, value] of meta) {
    html = replaceRequired(html, new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i'),
      `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  }
  const json = JSON.stringify(schema, null, 2).replace(/</g, '\\u003c');
  html = replaceRequired(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${json}\n    </script>`);
  return replaceRequired(html, /<div id="root"><\/div>/, renderSummary(route));
}

function writeDiscoveryFiles() {
  const urls = routes.map((route) => `  <url><loc>${origin}${route.path}</loc></url>`).join('\n');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

  const groups = [
    ['Overview', [home]],
    ['Biography and academic work', routes.filter((route) => route.path.startsWith('/about/'))],
    ['Publications', routes.filter((route) => route.path.startsWith('/writings/'))],
    ['Media', routes.filter((route) => route.path.startsWith('/gallery/'))],
    ['Articles and contact', [routeByPath.get('/blog'), routeByPath.get('/contact')]],
  ];
  const sections = groups.map(([heading, pages]) => {
    const links = pages.map((route) => `- [${route.heading}](${origin}${route.path}): ${route.description}`);
    return [`## ${heading}`, '', ...links].join('\n');
  });
  fs.writeFileSync(path.join(distDir, 'llms.txt'), `# ${name}\n\n> ${home.summary}\n\n${sections.join('\n\n')}\n`);
}

const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');
const schemaBlock = template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
if (!schemaBlock) {
  throw new Error('Vite HTML template is missing its site JSON-LD');
}
const siteSchema = JSON.parse(schemaBlock[1]);

for (const route of routes) {
  const output = path.join(distDir, `${route.path.slice(1)}.html`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, renderPage(template, route, siteSchema));
}
fs.writeFileSync(templatePath, renderPage(template, home, siteSchema));
writeDiscoveryFiles();
console.log(`Generated ${routes.length} static routes with crawlable HTML and structured data, plus sitemap.xml and llms.txt.`);
