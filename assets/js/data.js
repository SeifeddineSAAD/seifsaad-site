/* ==========================================================
   CONTENU DU SITE — modifiez ici vos coordonnées, produits, textes.
   ========================================================== */

window.CONTACT = {
  email: "saad.seif@gmail.com",
  phone: "+216 28 05 02 01"
};

const AWS_VERIFY = "https://aws.amazon.com/verification";
window.CERTS = [
  { issuer: "AWS", name: "Solutions Architect – Associate", code: "SAA-C03", img: "aws-saa.jpg", verify: AWS_VERIFY },
  { issuer: "AWS", name: "AI Practitioner", code: "AIF-C01", img: "aws-aif.jpg", verify: AWS_VERIFY },
  { issuer: "AWS", name: "Cloud Practitioner", code: "CLF-C02", img: "aws-clf.jpg", verify: AWS_VERIFY },
  { issuer: "HashiCorp", name: "Terraform Associate", code: "HCTA0-003", img: "terraform.jpg" },
  { issuer: "PMI", name: "Project Management Professional", code: "PMP®", img: "pmp.jpg", verify: "https://www.pmi.org/certifications/certification-resources/registry" },
  { issuer: "PeopleCert · Axelos", name: "ITIL® 4 Foundation", code: "IT Service Management", img: "itil4.jpg", verify: "https://www.peoplecert.org/for-corporations/certificate-verification-service" },
  { issuer: "Scrum.org", name: "Professional Scrum Master™ I", code: "PSM I", img: "psm1.jpg", verify: "https://www.scrum.org/certificates/1015265" },
  { issuer: "AWS", name: "AI Business Strategist", code: "AWS", soon: true }
];

/* Catalogue Gumroad (boutique saadseif.gumroad.com) */
const G = "https://saadseif.gumroad.com/l/";
window.CERT_INFO = {
  clf: { name: "AWS Cloud Practitioner", code: "CLF-C02", cover: "CLF<br>C02", foot: "AWS", traps: 35, tables: 9 },
  aif: { name: "AWS AI Practitioner", code: "AIF-C01", cover: "AIF<br>C01", foot: "AWS", traps: 36 },
  tf:  { name: "Terraform Associate", code: "004", cover: "TF<br>004", foot: "Terraform", traps: 36 }
};

window.PRODUCTS = [
  { id: "pack-integral", cert: "multi", kind: "full", price: 45, was: 75, url: G + "pack-integral", hot: true, cover: "3×", certs: ["clf", "aif", "tf"] },
  { id: "pack-cloud-ia", cert: "multi", kind: "cloudai", price: 32, was: 50, url: G + "pack-cloud-ia", cover: "CLF<br>+AIF", certs: ["clf", "aif"] },
  { id: "clf-pack", cert: "clf", kind: "pack", price: 19, was: 25, url: G + "clf-pack" },
  { id: "aif-pack", cert: "aif", kind: "pack", price: 19, was: 25, url: G + "aif-pack" },
  { id: "terraform-pack", cert: "tf", kind: "pack", price: 19, was: 25, url: G + "terraform-pack" },
  { id: "clf-fiche", cert: "clf", kind: "sheet", price: 7, url: G + "clf-fiche" },
  { id: "clf-pieges", cert: "clf", kind: "traps", price: 9, url: G + "clf-pieges" },
  { id: "clf-quiz", cert: "clf", kind: "quiz", price: 9, url: G + "clf-quiz" },
  { id: "aif-fiche", cert: "aif", kind: "sheet", price: 7, url: G + "aif-fiche" },
  { id: "aif-pieges", cert: "aif", kind: "traps", price: 9, url: G + "aif-pieges" },
  { id: "aif-quiz", cert: "aif", kind: "quiz", price: 9, url: G + "aif-quiz" },
  { id: "terraform-fiche", cert: "tf", kind: "sheet", price: 7, url: G + "terraform-fiche" },
  { id: "terraform-pieges", cert: "tf", kind: "traps", price: 9, url: G + "terraform-pieges" },
  { id: "terraform-quiz", cert: "tf", kind: "quiz", price: 9, url: G + "terraform-quiz" }
];

/* Textes générés pour chaque type de produit */
window.KIND_TEXT = {
  fr: {
    short: { sheet: "Fiche", traps: "Pièges", quiz: "Quiz", pack: "Pack", full: "Intégral", cloudai: "Cloud & IA" },
    label: { sheet: "Fiche de révision", traps: "Pièges d’examen", quiz: "Quiz d’entraînement", pack: "Pack complet", full: "Pack Intégral", cloudai: "Pack Cloud & IA" },
    use: {
      sheet: "Pour réactiver tout le programme en un coup d’œil, la veille de l’examen.",
      traps: "Pour ne plus perdre de points sur les distinctions subtiles entre services.",
      quiz: "Pour mesurer votre niveau et savoir exactement quoi revoir avant le jour J.",
      pack: "La préparation complète d’une certification : comprendre, éviter les pièges, s’entraîner.",
      full: "Trois certifications préparées d’un coup, au meilleur prix du catalogue.",
      cloudai: "Les deux certifications AWS fondamentales, cloud et IA, réunies."
    },
    bullets: (p, c) => ({
      sheet: ["Tout le programme sur 2 pages A4", "Conçue pour une relecture rapide", "2 PDF : français + anglais"],
      traps: [`${c.traps} pièges : l’affirmation trompeuse + l’explication`, c.tables ? `${c.tables} tableaux comparatifs` : "Tableaux comparatifs entre notions proches", "2 PDF : français + anglais"],
      quiz: ["40 questions originales au format examen", "Réponses expliquées une par une", "≈ 0,23 € la question · FR + EN"],
      pack: ["Fiche + Pièges + Quiz", `${c.traps} pièges et 40 questions`, "Chaque document en FR + EN"],
      full: ["9 documents · 3 certifications", "107 pièges · 120 questions", "≈ 50 pages par langue"],
      cloudai: ["6 documents · CLF-C02 + AIF-C01", "71 pièges · 80 questions", "Chaque document en FR + EN"]
    })[p.kind],
    buy: "Acheter",
    save: (n) => `−${n} %`,
    all: "Tout",
    packs: "Packs",
    multiName: { full: "CLF-C02 + AIF-C01 + Terraform 004", cloudai: "AWS CLF-C02 + AIF-C01" }
  },
  en: {
    short: { sheet: "Sheet", traps: "Traps", quiz: "Quiz", pack: "Pack", full: "Full Pack", cloudai: "Cloud & AI" },
    label: { sheet: "Quick Review Sheet", traps: "Exam Traps", quiz: "Practice Quiz", pack: "Complete Pack", full: "Full Pack", cloudai: "Cloud & AI Pack" },
    use: {
      sheet: "Refresh the whole syllabus at a glance, the night before the exam.",
      traps: "Stop losing points on the subtle distinctions between similar services.",
      quiz: "Measure your level and know exactly what to review before exam day.",
      pack: "Complete prep for one certification: understand, avoid the traps, practise.",
      full: "Three certifications prepared in one go, at the best price in the catalogue.",
      cloudai: "The two foundational AWS certifications, cloud and AI, together."
    },
    bullets: (p, c) => ({
      sheet: ["The whole syllabus on 2 A4 pages", "Built for a fast final review", "2 PDFs: French + English"],
      traps: [`${c.traps} traps: the misleading claim + the explanation`, c.tables ? `${c.tables} comparison tables` : "Comparison tables for look-alike concepts", "2 PDFs: French + English"],
      quiz: ["40 original exam-style questions", "Every answer explained", "≈ €0.23 per question · FR + EN"],
      pack: ["Sheet + Traps + Quiz", `${c.traps} traps and 40 questions`, "Every document in FR + EN"],
      full: ["9 documents · 3 certifications", "107 traps · 120 questions", "≈ 50 pages per language"],
      cloudai: ["6 documents · CLF-C02 + AIF-C01", "71 traps · 80 questions", "Every document in FR + EN"]
    })[p.kind],
    buy: "Buy",
    save: (n) => `−${n}%`,
    all: "All",
    packs: "Bundles",
    multiName: { full: "CLF-C02 + AIF-C01 + Terraform 004", cloudai: "AWS CLF-C02 + AIF-C01" }
  }
};

window.COMPARE = {
  fr: {
    head: ["Offre", "Contenu", "Prix", "Séparément", "Économie", ""],
    rows: [
      ["À l’unité", "Fiche 7 € · Pièges 9 € · Quiz 9 €", "dès 7 €", "—", "—", "#catalogue", "Parcourir"],
      ["Pack certification", "Les 3 documents d’une certification", "19 €", "25 €", "−24 % · 6 €", "#catalogue", "Choisir"],
      ["Pack Cloud & IA", "CLF-C02 + AIF-C01 · 6 documents", "32 €", "50 €", "−36 % · 18 €", G + "pack-cloud-ia", "Acheter"],
      ["Pack Intégral", "3 certifications · 9 documents", "45 €", "75 €", "−40 % · 30 €", G + "pack-integral", "Acheter", true]
    ]
  },
  en: {
    head: ["Offer", "What's inside", "Price", "Separately", "You save", ""],
    rows: [
      ["Single document", "Sheet €7 · Traps €9 · Quiz €9", "from €7", "—", "—", "#catalogue", "Browse"],
      ["Certification pack", "All 3 documents for one exam", "€19", "€25", "−24% · €6", "#catalogue", "Choose"],
      ["Cloud & AI Pack", "CLF-C02 + AIF-C01 · 6 documents", "€32", "€50", "−36% · €18", G + "pack-cloud-ia", "Buy"],
      ["Full Pack", "3 certifications · 9 documents", "€45", "€75", "−40% · €30", G + "pack-integral", "Buy", true]
    ]
  }
};

window.FAQ = {
  fr: [
    ["Dans quel format sont les documents ?", "Des PDF au format A4, téléchargeables immédiatement après le paiement. Ils se lisent sur ordinateur, tablette ou téléphone, et s’impriment sans problème."],
    ["Le français et l’anglais sont-ils vraiment inclus tous les deux ?", "Oui. Chaque achat contient la version française et la version anglaise de chaque document, sans supplément. Pratique si vous passez l’examen en anglais mais révisez en français."],
    ["S’agit-il de vraies questions d’examen ?", "Non. Tout le contenu est original, rédigé à partir des guides officiels (CLF-C02 v1.3, AIF-C01 v1.2, objectifs Terraform Associate 004 / Terraform 1.12). L’objectif est de maîtriser les concepts, pas de mémoriser des réponses."],
    ["Ces documents suffisent-ils pour réussir ?", "Ils sont conçus pour la dernière ligne droite et complètent une préparation plus large (cours, pratique, documentation). Leur force : vous faire gagner du temps et éviter les erreurs classiques."],
    ["Je ne prépare qu’une seule certification, que choisir ?", "Le pack de la certification (19 €) : les trois documents à 19 € au lieu de 25 €. Si vous visez les deux examens AWS, le Pack Cloud & IA est plus avantageux."],
    ["Comment se passent le paiement et la livraison ?", "Le paiement est sécurisé par Gumroad. Vous recevez aussitôt un e-mail avec le lien de téléchargement, que vous pouvez réutiliser plus tard."]
  ],
  en: [
    ["What format are the documents in?", "A4 PDFs, available for download right after payment. Read them on a computer, tablet or phone, or print them."],
    ["Are both French and English really included?", "Yes. Every purchase includes the French and the English version of each document at no extra cost — handy if you sit the exam in English but study in French."],
    ["Are these real exam questions?", "No. Everything is original, written from the official exam guides (CLF-C02 v1.3, AIF-C01 v1.2, Terraform Associate 004 objectives / Terraform 1.12). The goal is to master the concepts, not memorise answers."],
    ["Are these documents enough to pass?", "They are built for the final stretch and complement broader preparation (courses, hands-on practice, documentation). Their strength: saving you time and helping you avoid classic mistakes."],
    ["I'm only preparing one certification — what should I get?", "The certification pack (€19): all three documents for €19 instead of €25. If you're aiming for both AWS exams, the Cloud & AI Pack is better value."],
    ["How do payment and delivery work?", "Payment is secured by Gumroad. You immediately receive an email with your download link, which you can reuse later."]
  ]
};

window.TERM = {
  fr: [
    [["p", "$ "], ["", "terraform plan -target=module.seif"]],
    [["c", "# profil chargé depuis linkedin.com/in/seifeddine-saad"]],
    [["", "  + role           = "], ["s", "\"Directeur Informatique\""]],
    [["", "  + cloud          = "], ["s", "\"AWS · Terraform · Serverless\""]],
    [["", "  + experience     = "], ["k", "18"]],
    [["", "  + certifications = "], ["k", "7"]],
    [["", "  + enseigne       = ["], ["s", "\"IA\", \"AWS\", \"Terraform\", \"PMP\""], ["", "]"]],
    [["", "  + langues        = ["], ["s", "\"ar\", \"fr\", \"en\""], ["", "]"]],
    [["ok", "Plan: 1 expert à ajouter, 0 à modifier, 0 à détruire."]],
    [["p", "$ "]]
  ],
  en: [
    [["p", "$ "], ["", "terraform plan -target=module.seif"]],
    [["c", "# profile loaded from linkedin.com/in/seifeddine-saad"]],
    [["", "  + role           = "], ["s", "\"IT Director\""]],
    [["", "  + cloud          = "], ["s", "\"AWS · Terraform · Serverless\""]],
    [["", "  + experience     = "], ["k", "18"]],
    [["", "  + certifications = "], ["k", "7"]],
    [["", "  + teaches        = ["], ["s", "\"AI\", \"AWS\", \"Terraform\", \"PMP\""], ["", "]"]],
    [["", "  + languages      = ["], ["s", "\"ar\", \"fr\", \"en\""], ["", "]"]],
    [["ok", "Plan: 1 expert to add, 0 to change, 0 to destroy."]],
    [["p", "$ "]]
  ]
};

/* Traductions anglaises (le français est lu directement dans le HTML) */
window.EN = {
  "brand.sub": "Cloud · Training · Projects",
  "nav.profile": "Profile", "nav.services": "Expertise", "nav.training": "Training", "nav.path": "Track record",
  "nav.books": "Books", "nav.contact": "Contact", "nav.cta": "Get in touch",
  "hero.eyebrow": "Available for training & consulting · Gafsa, Tunisia",
  "hero.title": "I help teams <em>move to the cloud</em> — and pass their certifications.",
  "hero.lead": "Cloud architect, trainer and IT project manager for more than 18 years. Today an IT Director in public transport, I bring that field experience to your projects, your teams and your exams.",
  "hero.cta1": "See training", "hero.cta2": "Explore the books", "hero.sticker": "certs",
  "stats.years": "years in IT", "stats.certs": "AWS, PMI, HashiCorp… certifications", "stats.books": "published study guides", "stats.lang": "training in three languages",
  "p.title": "Between the server room and the <em>boardroom</em>.",
  "p.t1": "I design cloud architectures, run IT programmes and train the people who keep them alive. My focus: making technology <span class=\"mark\">understandable, cost-effective and under control</span>.",
  "p.t2": "As IT Director of a regional public transport company, I combine a decision-maker’s view with an engineer’s practice: AWS infrastructure in production with Terraform, PMP-certified project management, and coaching managers through AI adoption.",
  "p.f1k": "Role", "p.f1v": "IT Director", "p.f2k": "Core", "p.f2v": "AWS Cloud · DevOps · IaC", "p.f3k": "Method", "p.f4k": "Languages", "p.f4v": "Arabic · French (C2) · English (C1) · German (A2)",
  "s.title": "Four ways to <em>work together</em>.",
  "s.1t": "Training", "s.1d": "Hands-on sessions for managers, project leads and technical teams: applied AI, AWS, Terraform, project management.",
  "s.2t": "Project leadership", "s.2d": "Scoping, planning, governance and delivery of IT projects — from the business case to go-live.",
  "s.3t": "Cloud migration", "s.3d": "Assessment of what you have, target architecture on AWS, migration plan, cost control, security and high availability.",
  "s.4t": "Automation & IaC", "s.4d": "Infrastructure as Code with Terraform, CI/CD pipelines and business-process automation — including with AI.",
  "t.title": "Training means <em>passing on</em> what really works.",
  "t.intro": "Every course starts from real cases, ends with concrete actions and adapts to your level — on site or remote.",
  "t.fTag": "Flagship course · Managers & project leads",
  "t.fTitle": "Applied AI for managers and project leads",
  "t.fDesc": "Decide with clarity: why adopt AI, where it creates value in your organisation, and how to roll it out safely.",
  "t.m1": "Why", "t.m1d": "Stakes, limits and real return on investment.",
  "t.m2": "Where", "t.m2d": "Spot the high-impact use cases.",
  "t.m3": "How", "t.m3d": "Lead the project, the data and the team.",
  "t.i1": "AWS cloud and generative-AI fundamentals, with exam preparation.",
  "t.i2": "Design resilient, secure and cost-optimised architectures.",
  "t.i3": "Infrastructure as Code end to end: modules, state, workflows and best practice.",
  "t.i4t": "Project management & Agile", "t.i4": "Predictive and agile methods applied to IT and transformation projects.",
  "t.meta1": "On site or remote", "t.meta2": "Français · English · العربية", "t.meta3": "Tailored in-house sessions",
  "c.title": "Seven certifications, <em>one standard</em>.",
  "c.view": "View certificate", "c.verify": "Verify", "c.soon": "In progress", "c.soonTxt": "Exam in preparation", "c.close": "Close",
  "m.1k": "Today", "m.1t": "IT Director", "m.1d": "IT strategy, information systems and modernisation projects for a regional public transport company.",
  "m.2k": "In production", "m.2t": "AWS infrastructure with Terraform", "m.2d": "Multi-tier platform (VPC, ALB, Auto Scaling, RDS Multi-AZ) and a serverless AI document-management system.",
  "m.3k": "18+ years", "m.3t": "Cloud, DevOps & IT programmes", "m.3d": "Architecture, automation and programme leadership, from design to operations.",
  "b.title": "My exam notes, <em>on the shelf</em>.",
  "b.intro": "Review sheets, explained traps and original quizzes for AWS and Terraform. Every document in French and English, from €7.",
  "b.cta": "Open the library",
  "ct.title": "Let’s talk about <em>your project</em>.", "ct.phone": "Phone",
  "f.books": "Books", "f.home": "Home", "f.loc": "Gafsa, Tunisia",
  "sh.fPrice": "€45", "sh.fWas": "€75", "sh.k4p": "€7",
  /* parcours page */
  "pc.eyebrow": "Track record · Since 2008 · Gafsa, Tunisia",
  "pc.title": "Eighteen years <em>running the IT</em> of a public service.",
  "pc.lead": "From the server room to AWS: an infrastructure migrated, codified in Terraform and delivered continuously, serving a regional transport company with more than 1,000 employees and 200 vehicles.",
  "pc.n1": "Impact", "pc.iTitle": "Results that are <em>measured</em>, not promised.",
  "pc.i1": "lower IT operating costs after the move to AWS (up to)", "pc.i1s": "lower IT costs after the AWS migration (up to)",
  "pc.i2": "system availability",
  "pc.i3v": "4 wks → 3 days", "pc.i3": "release cycle, thanks to CI/CD",
  "pc.i4": "to provision the infrastructure with Terraform, instead of several days",
  "pc.i5v": "RTO &lt; 2 h", "pc.i5": "and RPO &lt; 1 h: disaster recovery plan",
  "pc.i6": "of projects delivered on time, across a portfolio of 10+ projects",
  "pc.i7": "incident resolution time (ITIL 4); SLA compliance from 70% to 95%",
  "pc.i8": "people: IT team built and led",
  "pc.more": "See the full track record",
  "pc.n2": "Experience", "pc.eTitle": "One role, <em>many trades</em>.",
  "pc.e1when": "2008 → today",
  "pc.e1t": "IT Director · Cloud Architect",
  "pc.e1o": "SRTG — Regional Transport Company of Gafsa (Ministry of Transport)",
  "pc.e1b1": "<b>Cloud migration:</b> moved the on-premises infrastructure to AWS — multi-AZ EC2, public/private VPC, RDS Multi-AZ (PostgreSQL), ALB, Auto Scaling, S3, CloudWatch and CloudTrail.",
  "pc.e1b2": "<b>Infrastructure as Code:</b> Terraform and CloudFormation modules (network, compute, database, security, monitoring) with remote state.",
  "pc.e1b3": "<b>DevOps:</b> Jenkins and GitLab CI/CD pipelines, 5 monolith services containerised with Docker, automated health checks and cost reports (Python, Bash, Lambda).",
  "pc.e1b4": "<b>Security &amp; governance:</b> MFA, least-privilege IAM, EBS/S3 encryption, VPC Flow Logs, GuardDuty, tagging and cost-allocation policies.",
  "pc.e1b5": "<b>Delivery:</b> portfolio of 10+ IT projects (Agile, Waterfall, hybrid), service desk redesigned on ITIL 4, 8+ vendors and integrators managed against their SLAs.",
  "pc.e2t": "Engineering degree in Computer Science",
  "pc.e2o": "ENSI — National School of Computer Science, Tunis",
  "pc.n3": "Skills", "pc.sTitle": "The full <em>toolbox</em>.",
  "pc.skTf": "Modules · S3 state + DynamoDB locking", "pc.skObs": "Observability", "pc.skArch": "Architecture &amp; security",
  "pc.skHa": "High availability · DR", "pc.skIam": "Least-privilege IAM", "pc.skEnc": "Encryption", "pc.skHyb": "Hybrid cloud",
  "pc.skCode": "Scripting &amp; data", "pc.skPm": "Delivery &amp; methods",
  "pc.lgK": "Languages", "pc.lg1": "Arabic <i>native</i>", "pc.lg2": "French <i>C2</i>", "pc.lg3": "English <i>C1</i>", "pc.lg4": "German <i>A2</i>",
  "pc.gTitle": "Code, <em>in the open</em>.",
  "pc.gIntro": "Three public projects, actually deployed and tested, each with its documentation.",
  "pc.g1t": "Multi-tier AWS platform", "pc.g1d": "100% Terraform: VPC, ALB, EC2 Auto Scaling, RDS Multi-AZ, ElastiCache and CloudWatch, deployed and tested in eu-west-2.",
  "pc.g2t": "EKS cluster managed with Helm", "pc.g2d": "ingress-nginx, cert-manager with Let’s Encrypt TLS and kube-prometheus-stack, with architecture documentation.",
  "pc.g3t": "Serverless AI document management", "pc.g3d": "Event-driven pipeline: API Gateway, Lambda, S3, DynamoDB, Textract (OCR) and Rekognition.",
  "pc.ctaT": "A cloud project, a team to train? <em>Let’s talk</em>.",
  /* shop */
  "sh.navCat": "Catalogue", "sh.navPacks": "Bundles",
  "sh.eyebrow": "Exam Eve · Up to date with the October 2026 guides",
  "sh.title": "Review what matters. <em>Outsmart</em> the traps.",
  "sh.lead": "The documents I wish I’d had before my own exams: sheets that condense the whole syllabus, the traps that cost points, and original quizzes to test yourself. In French <strong>and</strong> English, in every purchase.",
  "sh.cta1": "See the catalogue", "sh.cta2": "Compare bundles",
  "sh.k1": "explained traps", "sh.k2": "original questions, fully explained", "sh.k3": "comparison tables", "sh.k4": "to get started, FR + EN included",
  "sh.howNum": "Method", "sh.howTitle": "Three documents, <em>three exam reflexes</em>.",
  "sh.howIntro": "Every certification is covered by the same trio, designed to be used back-to-back in the final days before your exam.",
  "sh.s1k": "Review sheet", "sh.s1t": "See it all at a glance", "sh.s1d": "The official syllabus condensed onto 2 A4 pages. Ideal the night before, to reactivate everything you know in minutes.",
  "sh.s2k": "Exam traps", "sh.s2t": "Stop mixing things up", "sh.s2d": "Each trap: the misleading claim, a clear explanation and a memory hook. Plus comparison tables to decide between similar services.",
  "sh.s3k": "Practice quiz", "sh.s3t": "Test yourself for real", "sh.s3d": "40 original exam-style questions, explained answers and a score by domain so you know exactly what to review.",
  "sh.fRibbon": "★ Best deal · −40%", "sh.fTitle": "The <em>Full</em> Pack",
  "sh.fDesc": "Three certifications, nine documents, two languages. Everything you need to prepare AWS Cloud Practitioner, AWS AI Practitioner and Terraform Associate.",
  "sh.fc1": "3 review sheets of 2 A4 pages", "sh.fc2": "107 explained traps and 25 comparison tables", "sh.fc3": "120 original questions with explained answers", "sh.fc4": "Every PDF in French and English (≈ 50 pages per language)",
  "sh.fSave": "€30 saved", "sh.buyPack": "Get the Full Pack",
  "sh.catTitle": "Pick your <em>certification</em>.",
  "sh.cmpTitle": "The more you prepare, <em>the less you pay</em>.",
  "sh.cmpIntro": "Bundles contain exactly the same documents as single purchases, at a lower price. Do the maths.",
  "sh.faqTitle": "Frequently asked <em>questions</em>.",
  "sh.disc": "Original content, contains no real exam questions. Independent products, not affiliated with Amazon Web Services or HashiCorp. AWS is a trademark of Amazon.com, Inc.; Terraform is a trademark of HashiCorp. Secure payment and file delivery by Gumroad."
};
