// Usage (depuis la racine du site) : node tools/jsonld.js .   → à relancer après un changement de prix dans data.js
// Génère les blocs JSON-LD à partir de assets/js/data.js (prix toujours synchronisés)
const fs = require('fs');
const site = process.argv[2];
global.window = {};
eval(fs.readFileSync(site + '/assets/js/data.js', 'utf8'));
const W = global.window, B = 'https://www.seifsaad.com/';
const K = W.KIND_TEXT.fr, C = W.CERT_INFO;
const person = { '@type': 'Person', '@id': B + '#seifeddine', name: 'Seifeddine Saad', url: B };
const brand = { '@type': 'Brand', name: 'Exam Eve' };

const products = W.PRODUCTS.map((p, i) => {
  const c = C[p.cert];
  const name = p.cert === 'multi' ? `${K.label[p.kind]} — ${K.multiName[p.kind]}` : `${K.label[p.kind]} ${c.name} (${c.code})`;
  const bullets = K.bullets(p, c || { traps: 0 }).join(' · ');
  return { '@type': 'ListItem', position: i + 1, item: {
    '@type': 'Product', name, description: `${K.use[p.kind]} ${bullets}`,
    image: B + 'assets/img/og-livres.jpg', brand, category: 'Guide de révision de certification (PDF)',
    offers: { '@type': 'Offer', url: p.url, price: p.price.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock', seller: person }
  }};
});
const livres = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'CollectionPage', '@id': B + 'livres.html', url: B + 'livres.html', name: 'Guides de révision AWS & Terraform — Exam Eve', inLanguage: ['fr', 'en'], author: person },
  { '@type': 'ItemList', name: 'Catalogue Exam Eve', numberOfItems: products.length, itemListElement: products },
  { '@type': 'FAQPage', mainEntity: W.FAQ.fr.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: B },
    { '@type': 'ListItem', position: 2, name: 'Livres', item: B + 'livres.html' } ] }
]};
const home = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebSite', '@id': B + '#site', url: B, name: 'Seifeddine Saad', inLanguage: ['fr', 'en'] },
  { ...person, jobTitle: 'Architecte cloud, formateur et chef de projet IT',
    email: 'mailto:' + W.CONTACT.email, telephone: W.CONTACT.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Gafsa', addressCountry: 'TN' },
    knowsLanguage: ['ar', 'fr', 'en', 'de'],
    knowsAbout: ['AWS', 'Terraform', 'Cloud migration', 'DevOps', 'Intelligence artificielle', 'Gestion de projet IT', 'ITIL 4', 'Scrum'],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'ENSI — École Nationale des Sciences de l’Informatique' },
    hasCredential: W.CERTS.filter(c => !c.soon).map(c => ({ '@type': 'EducationalOccupationalCredential', name: `${c.issuer} ${c.name}`, credentialCategory: 'certification' })),
    sameAs: ['https://www.linkedin.com/in/seifeddine-saad', 'https://github.com/SeifeddineSAAD', 'https://saadseif.gumroad.com'] }
]};
const out = { 'livres.html': livres, 'index.html': home };
for (const [f, data] of Object.entries(out)) {
  const path = site + '/' + f;
  let s = fs.readFileSync(path, 'utf8');
  const block = `  <script type="application/ld+json" id="seo-jsonld">\n${JSON.stringify(data, null, 1)}\n  </script>\n`;
  s = s.replace(/  <script type="application\/ld\+json" id="seo-jsonld">[\s\S]*?<\/script>\n/, '');
  s = s.replace('</head>', block + '</head>');
  fs.writeFileSync(path, s);
  console.log(f, 'OK', JSON.stringify(data).length, 'octets');
}
