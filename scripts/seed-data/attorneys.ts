// Office assignment is left unset (null) for everyone except where the old site
// explicitly stated it (Patrick Ochwa, "Partner in Charge of Nairobi Office").
// Assign the rest via the admin once the firm confirms who sits in which office.
//
// Two known inconsistencies from the old site, resolved here per the agreed decisions:
// - Eva Wangui Kahiti is listed sitewide as a Partner; her old bio text still called
//   her "an associate" — that sentence is dropped below.
// - Augustus Wafula's old bio page used the URL slug "augustus-khisa" (a different
//   surname). Using "Wafula" here as used everywhere else on the site — flag for the
//   firm to confirm which surname is correct.

export type AttorneySeed = {
  slug: string;
  name: string;
  title: string;
  tier: "partner" | "associate" | "staff";
  bioHtml: string | null;
  credentials: string | null;
  officeSlug: "nairobi" | "mombasa" | null;
  sortOrder: number;
  practiceAreaSlugs: string[];
};

export const attorneysSeed: AttorneySeed[] = [
  // --- Partners ---
  {
    slug: "patrick-ochwa",
    name: "Patrick Ochwa",
    title: "Partner & Head of Conveyancing; Partner in Charge, Nairobi Office",
    tier: "partner",
    credentials: "LL.B., University of Nairobi (1990); Advocate of the High Court of Kenya (admitted 1992)",
    bioHtml:
      "<p>Patrick heads the firm's Conveyancing practice across both the Nairobi and Mombasa offices, and is the Partner in Charge of the Nairobi office. His practice spans conveyancing and property law, mining law (prospecting, licensing, acquisition, and disputes), litigation, employment and labour law, and environmental law.</p><p>He was lead counsel for mining ventures in the Kwale district, including titanium mining rights negotiations for Tiomin Resources Inc. of Canada on Kenya's South Coast. He is a council member of the Law Society of Kenya – Mombasa Chapter, and Chairman of the executive committee of the Mombasa Sports Club.</p>",
    officeSlug: "nairobi",
    sortOrder: 1,
    practiceAreaSlugs: ["conveyancing-real-estate", "litigation"],
  },
  {
    slug: "samuel-ouma",
    name: "Samuel Ouma",
    title: "Managing Partner & Head of Family, Criminal and Succession Division",
    tier: "partner",
    credentials:
      "LL.B., University of Nairobi (1990); Advocate of the High Court of Kenya (admitted 1991); Commissioner for Oaths; Notary Public; Certified Public Secretary; member, Chartered Institute of Arbitrators",
    bioHtml:
      "<p>Samuel is the firm's Managing Partner. He heads the firm's Family, Criminal and Succession division, with a practice covering family and child law, criminal law, succession and probate, and litigation in security documentation, banking, and property. He also oversees the firm's financial management.</p><p>He has undertaken significant pro bono work for vulnerable children across Kenyan districts, served on the Law Society of Kenya's Disciplinary Committee (2006–2009), and holds Board of Governors roles. He is active in the Rotary Club and the Mombasa Sports Club.</p>",
    officeSlug: null,
    sortOrder: 2,
    practiceAreaSlugs: ["litigation"],
  },
  {
    slug: "job-weloba",
    name: "Job Weloba",
    title: "Partner & Head of Alternative Dispute Resolution",
    tier: "partner",
    credentials:
      "LL.B., University of Nairobi (1991); MBA (Business Strategic & Project Management), JKUAT; Advocate of the High Court of Kenya (admitted 1993); Certified Public Secretary; member, ICPSK; Accredited Governance Auditor (AGA); member, State Corporations Advisory Committee (SCAC); Notary Public; member, Chartered Institute of Arbitrators (London); registered patent agent",
    bioHtml:
      "<p>Job heads the firm's Alternative Dispute Resolution, Arbitration and Mediation practice. His work also spans corporate law, mergers &amp; acquisitions, administrative and management law, intellectual property law, and election petitions law, alongside company secretarial services.</p><p>He has chaired the Mombasa Sports Club (2002–2004) and the Rotary Club of Kilindini (2001), and served on the Law Society of Kenya council (2003, 2005).</p>",
    officeSlug: null,
    sortOrder: 3,
    practiceAreaSlugs: ["arbitration", "corporate-commercial-law", "intellectual-property-law"],
  },
  {
    slug: "augustus-wafula",
    name: "Augustus Wafula",
    title: "Partner & Head of Litigation",
    tier: "partner",
    credentials: "LL.B., University of Nairobi (2007); LLM, University of Nairobi; Advocate of the High Court of Kenya (admitted 2010)",
    bioHtml:
      "<p>Augustus is a seasoned and accomplished litigation lawyer who heads the firm's Litigation practice. His work covers commercial litigation, employment law, environmental law, procurement law, electoral law, and contract drafting and enforcement. He also trains and mentors the firm's interns and pupils.</p>",
    officeSlug: null,
    sortOrder: 4,
    practiceAreaSlugs: ["litigation"],
  },
  {
    slug: "eva-wangui-kahiti",
    name: "Eva Wangui Kahiti",
    title: "Partner, Litigation Department",
    tier: "partner",
    credentials:
      "Graduate, Catholic University of Eastern Africa (2009, Second Class Honours); Advocate of the High Court of Kenya (admitted 20 December 2011); member, East African Law Society, Law Society of Kenya, and FIDA Kenya",
    bioHtml:
      "<p>Eva is a Partner in the firm's Litigation department, specialising in children's rights, family law, and insurance law.</p>",
    officeSlug: null,
    sortOrder: 5,
    practiceAreaSlugs: ["litigation"],
  },

  // --- Associates ---
  {
    slug: "faith-sulwe",
    name: "Faith Sulwe",
    title: "Senior Associate",
    tier: "associate",
    credentials:
      "LLB, University of Nairobi (2014); Master's in International Maritime Law, IMO-International Maritime Law Institute (Malta); currently pursuing a PhD in Law, University of Nairobi; Advocate of the High Court of Kenya (admitted 2017)",
    bioHtml:
      "<p>Faith's practice covers Maritime Law, Mergers &amp; Acquisitions, Corporate Commercial matters, Real Estate &amp; Property, Due Diligence, and Environment &amp; Conservation.</p>",
    officeSlug: null,
    sortOrder: 1,
    practiceAreaSlugs: ["corporate-commercial-law"],
  },
  {
    slug: "lenin-awino",
    name: "Lenin Owuor Awino",
    title: "Senior Associate, Dispute Resolution",
    tier: "associate",
    credentials: "LLB, Kenyatta University; Postgraduate Diploma in Law, Kenya School of Law",
    bioHtml:
      "<p>Lenin's practice covers dispute resolution, insurance litigation, banking and commercial litigation, defamation, and employment and labour disputes. He successfully defended a commercial bank against a KES 200 million constructive-dismissal claim at the Employment and Labour Relations Court, which was fully dismissed.</p>",
    officeSlug: null,
    sortOrder: 2,
    practiceAreaSlugs: ["litigation"],
  },
  {
    slug: "elsie-oile",
    name: "Elsie Oile",
    title: "Associate",
    tier: "associate",
    credentials:
      "LLB (Hons), University of Nairobi; Diploma in Law, Kenya School of Law; currently pursuing an LLM (Corporate & Financial Law), University of Nairobi; Certified Mediator; Level II Arbitrator training (NCIA); Advocate of the High Court of Kenya; member, LSK and East Africa Law Society",
    bioHtml: null,
    officeSlug: null,
    sortOrder: 3,
    practiceAreaSlugs: ["corporate-commercial-law"],
  },
  {
    slug: "clara-atsanga",
    name: "Clara Atsanga",
    title: "Associate",
    tier: "associate",
    credentials: "Advocate of the High Court of Kenya; Commissioner for Oaths",
    bioHtml:
      "<p>Clara's practice covers Employment &amp; Labour Relations Law, Litigation, Corporate Advisory, and Regulatory Compliance. She is passionate about Employment and Labour Relations Law, and is dedicated to helping clients navigate employment matters with practical and strategic legal solutions.</p>",
    officeSlug: null,
    sortOrder: 4,
    practiceAreaSlugs: ["litigation", "corporate-commercial-law"],
  },
  {
    slug: "valerie-mboya",
    name: "Valerie Mboya",
    title: "Associate Advocate",
    tier: "associate",
    credentials: "Advocate of the High Court of Kenya",
    bioHtml:
      "<p>Valerie (full name Mboya Valerie Mutheu) is a results-driven legal practitioner handling matters before the superior courts, subordinate courts, specialised tribunals, and quasi-judicial bodies across Kenya. Her practice covers civil and commercial litigation, insurance law, employment law, family law, estate planning, procurement law, intellectual property, and admiralty and maritime law. Her clients include corporate clients, insurers, financial institutions, public entities, and private individuals.</p>",
    officeSlug: null,
    sortOrder: 5,
    practiceAreaSlugs: ["litigation"],
  },

  // --- Management & Support Staff ---
  { slug: "lucky-kaingu-kangwangu", name: "Lucky Kaingu Kangwangu", title: "Office Manager / Accountant", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 1, practiceAreaSlugs: [] },
  { slug: "john-mwanzia-mutambuki", name: "John Mwanzia Mutambuki", title: "Staff Manager", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 2, practiceAreaSlugs: [] },
  { slug: "beatrice-kariuki-ruguru", name: "Beatrice Kariuki Ruguru", title: "Secretary", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 3, practiceAreaSlugs: [] },
  { slug: "emily-shitoko", name: "Emily Shitoko", title: "Office Messenger", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 4, practiceAreaSlugs: [] },
  { slug: "alfred-soita", name: "Alfred Soita", title: "Senior Clerk", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 5, practiceAreaSlugs: [] },
  { slug: "nicholas-baraza", name: "Nicholas Baraza", title: "Nairobi Office Accounts Manager", tier: "staff", credentials: null, bioHtml: null, officeSlug: "nairobi", sortOrder: 6, practiceAreaSlugs: [] },
  { slug: "sally-chepkemboi", name: "Sally Chepkemboi", title: "Secretary", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 7, practiceAreaSlugs: [] },
  { slug: "evana-adema-ambeni-mukonjero", name: "Evana Adema Ambeni Mukonjero", title: "Secretary", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 8, practiceAreaSlugs: [] },
  { slug: "hellen-akoth-omollo", name: "Hellen Akoth Omollo", title: "Secretary", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 9, practiceAreaSlugs: [] },
  { slug: "irene-nakiete-kihara", name: "Irene Nakiete Kihara", title: "Receptionist", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 10, practiceAreaSlugs: [] },
  { slug: "maurice-ochieng-odongo", name: "Maurice Ochieng Odongo", title: "Senior Clerk", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 11, practiceAreaSlugs: [] },
  { slug: "nelson-mwachambi-nyiro", name: "Nelson Mwachambi Nyiro", title: "Senior Clerk", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 12, practiceAreaSlugs: [] },
  { slug: "roselyne-alwar", name: "Roselyne Alwar", title: "Senior Secretary", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 13, practiceAreaSlugs: [] },
  { slug: "ruth-ndunge-matheka", name: "Ruth Ndunge Matheka", title: "Messenger", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 14, practiceAreaSlugs: [] },
  { slug: "sylvia-rebecca-gombe-ndeleko", name: "Sylvia Rebecca Gombe Ndeleko", title: "Senior Secretary", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 15, practiceAreaSlugs: [] },
  { slug: "yvonne-omollo", name: "Yvonne Omollo", title: "Staff", tier: "staff", credentials: null, bioHtml: null, officeSlug: null, sortOrder: 16, practiceAreaSlugs: [] },
];
