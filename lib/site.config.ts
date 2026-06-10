/**
 * site.config.ts — single source of truth for all client-specific data.
 *
 * Rules (PRD 6):
 *  - No client-specific string is ever hardcoded in a component.
 *  - NAP (name / address / phone) is rendered identically everywhere from here.
 *  - Swapping a client = editing this file + the images in /public/images.
 *
 * Placeholder identity: "Hale Dental Studio" (Dr. Alexandra Hale, DDS).
 * Copy is written as a real boutique cosmetic practice would write it.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export interface BusinessHour {
  /** Schema.org day token, e.g. "Monday" */
  day: string;
  /** Short label for display, e.g. "Mon" */
  short: string;
  /** Opening time, 24h "HH:MM", or null when closed */
  open: string | null;
  /** Closing time, 24h "HH:MM", or null when closed */
  close: string | null;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  /** Full service title for H1 / detail pages */
  title: string;
  /** Compact title for nav and cross-links */
  shortTitle: string;
  /** Letterspaced label above the title */
  eyebrow: string;
  /** Two-line description for the homepage editorial entries */
  excerpt: string;
  /** One-paragraph positioning statement on the detail page */
  positioning: string;
  /** "Is this right for you" — plain-language qualifiers */
  forYou: string[];
  /** Ordered steps — present ONLY when the procedure is genuinely sequential */
  process?: ProcessStep[];
  /** Whether a before/after slider applies to this procedure */
  hasComparison: boolean;
  faqs: Faq[];
  /** Surface as one of the three featured services on the homepage */
  featured: boolean;
  seo: { title: string; description: string };
}

export interface GalleryCase {
  /** Display id, e.g. "014" — rendered as "CASE 014" */
  id: string;
  /** Procedure label for the case and the gallery filter */
  procedure: string;
  /** Service slug this case maps to (filter + cross-link) */
  serviceSlug: string;
  /** Detail line under the case, e.g. "Porcelain veneers, 8 units" */
  detail: string;
  beforeAlt: string;
  afterAlt: string;
}

export interface Testimonial {
  quote: string;
  /** Patient first name only */
  name: string;
  procedure: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const siteConfig = {
  /** Canonical production origin — no trailing slash. */
  url: "https://haledentalstudio.com",

  practice: {
    name: "Hale Dental Studio",
    /** Used where the full name is too long (mobile wordmark fallback) */
    shortName: "Hale",
    tagline: "Cosmetic & Restorative Dentistry",
    /** Default meta description / sitewide schema description */
    description:
      "A boutique cosmetic dental studio in Westbrook focused on veneers, smile makeovers, and Invisalign. Quiet, unhurried care from Dr. Alexandra Hale.",
    foundedYear: 2009,
    phone: "(555) 555-0142",
    phoneHref: "tel:+15555550142",
    email: "hello@haledentalstudio.com",
    address: {
      street: "118 Garrison Street",
      suite: "Suite 200",
      city: "Westbrook",
      state: "OR",
      zip: "97214",
    },
    geo: { lat: 45.5152, lng: -122.6784 },
    /** Google Maps embed src — placeholder until the real listing is wired */
    mapEmbedUrl:
      "https://www.google.com/maps?q=118+Garrison+Street+Westbrook+OR&output=embed",
    parkingNote:
      "Street parking on Garrison; a small lot behind the building is reserved for patients during appointment hours.",
    /** GHL / scheduling embed or external booking target */
    bookingUrl: "#book",
  },

  hours: [
    { day: "Monday", short: "Mon", open: "08:00", close: "17:00" },
    { day: "Tuesday", short: "Tue", open: "08:00", close: "17:00" },
    { day: "Wednesday", short: "Wed", open: "08:00", close: "17:00" },
    { day: "Thursday", short: "Thu", open: "08:00", close: "17:00" },
    { day: "Friday", short: "Fri", open: "08:00", close: "14:00" },
    { day: "Saturday", short: "Sat", open: null, close: null },
    { day: "Sunday", short: "Sun", open: null, close: null },
  ] satisfies BusinessHour[],

  doctor: {
    name: "Dr. Alexandra Hale, DDS",
    firstName: "Alexandra",
    /** Name without the post-nominal, for running prose */
    displayName: "Dr. Hale",
    credentials: [
      "DDS — Oregon Health & Science University",
      "Accredited Member, American Academy of Cosmetic Dentistry",
      "Kois Center Graduate",
    ],
    /** Short bio for the About page intro and schema */
    bio: "Dr. Alexandra Hale founded Hale Dental Studio in 2009 after a decade spent learning that the best cosmetic work is the kind no one can point to. She trained at OHSU, completed her accreditation through the AACD, and continues her restorative study at the Kois Center. She sees a small number of patients each day so that no appointment feels rushed.",
    /** First-person statement for the homepage doctor section (display italic) */
    statement:
      "I would rather do a little than too much. A good result is one that looks like it was always yours.",
  },

  /** Credibility strip — text-first, not badge-heavy (PRD 4.1) */
  credibility: {
    items: [
      "In practice since 2009",
      "AACD Accredited Member",
      "Kois Center Graduate",
      "Member, American Dental Association",
    ],
  },

  services: [
    {
      slug: "veneers",
      title: "Porcelain Veneers",
      shortTitle: "Veneers",
      eyebrow: "Cosmetic Dentistry",
      excerpt:
        "Hand-layered porcelain shaped to your face, not a template. The work most people mean when they say they want a new smile.",
      positioning:
        "Veneers are thin shells of porcelain bonded to the front of your teeth to change their shape, color, and proportion. Done well, they are the closest dentistry comes to portraiture — every unit is designed around your face, your bite, and the way you actually speak and smile. We design conservatively and remove as little tooth structure as the result allows.",
      forYou: [
        "Your teeth are healthy, but you have never liked their shape, length, or color.",
        "Whitening has not given you the brightness you are after, or it does not last.",
        "You have small chips, worn edges, or gaps you would like closed without braces.",
        "You want a change that looks deliberate and natural, not obvious.",
      ],
      process: [
        {
          title: "Consultation",
          description:
            "We talk through what bothers you, photograph and measure your smile, and decide together whether veneers are the right tool.",
        },
        {
          title: "Design",
          description:
            "We design your smile digitally and in wax, then preview it in your mouth as a temporary mock-up so you can approve the shape before anything is permanent.",
        },
        {
          title: "Preparation",
          description:
            "We prepare the teeth conservatively and fit you with provisional veneers to wear while the ceramist builds the final units by hand.",
        },
        {
          title: "Placement",
          description:
            "We bond the finished veneers, refine the bite, and polish. You leave with the smile you approved at the design stage.",
        },
      ],
      hasComparison: true,
      faqs: [
        {
          question: "What do veneers cost?",
          answer:
            "Most veneer cases at the studio range from $1,400 to $2,200 per tooth depending on the material and the complexity of the design. We give you a written plan with a fixed price before you commit to anything, and we offer monthly financing through CareCredit and Cherry.",
        },
        {
          question: "Does it hurt?",
          answer:
            "Preparation is done under local anesthetic and is comfortable. Some patients notice mild sensitivity to temperature for a few days while wearing provisionals; it resolves once the final veneers are bonded.",
        },
        {
          question: "How long do veneers last?",
          answer:
            "Well-made porcelain veneers typically last 10 to 15 years, and often longer. Longevity depends on your bite, your home care, and whether you wear a night guard if you grind. We plan for the long term, not the photograph.",
        },
        {
          question: "Will they look fake?",
          answer:
            "Only if they are designed to. We work with ceramists who layer color and translucency the way natural enamel does, and we design proportions around your face. The goal is that no one can tell — they just notice you look well.",
        },
        {
          question: "Do you have to file down my teeth?",
          answer:
            "We remove a small amount of enamel — usually less than a millimeter — so the porcelain sits flush. In some cases we can place veneers with little or no reduction. We always remove the least the result allows.",
        },
        {
          question: "Does insurance cover veneers?",
          answer:
            "Veneers are usually considered cosmetic and are not covered by dental insurance. If any part of your treatment is restorative, we document it so you can submit for whatever benefit applies. Our team will walk you through it.",
        },
      ],
      featured: true,
      seo: {
        title: "Porcelain Veneers in Westbrook",
        description:
          "Hand-layered porcelain veneers designed around your face by Dr. Alexandra Hale at Hale Dental Studio in Westbrook. Conservative, natural, and lasting.",
      },
    },
    {
      slug: "smile-makeover",
      title: "Smile Makeover",
      shortTitle: "Smile Makeover",
      eyebrow: "Comprehensive Cosmetic",
      excerpt:
        "When the answer is more than one procedure. A single plan that sequences everything toward one result.",
      positioning:
        "A smile makeover is not a product — it is a plan. When a smile needs more than one kind of work, whitening, veneers, alignment, gum recontouring, the order matters as much as the procedures. We design the whole result first, preview it before we begin, then sequence treatment so each step supports the next.",
      forYou: [
        "Several things bother you at once, and you are not sure where to start.",
        "Previous dental work no longer matches the rest of your smile.",
        "You have a date in mind — a wedding, a milestone — and want a realistic timeline.",
        "You want one practice to design and carry out the whole plan, not a referral maze.",
      ],
      process: [
        {
          title: "Consultation & records",
          description:
            "We photograph, scan, and measure your smile, then listen to what you want changed and what you want left alone.",
        },
        {
          title: "Digital design & preview",
          description:
            "We design the finished result digitally and let you preview it in your own mouth before any treatment begins.",
        },
        {
          title: "Phased treatment",
          description:
            "We carry out the plan in the right order — alignment, whitening, and restorative work sequenced so nothing is redone.",
        },
        {
          title: "Reveal & refine",
          description:
            "We complete the final restorations, refine the details, and give you a maintenance plan to protect the work.",
        },
      ],
      hasComparison: true,
      faqs: [
        {
          question: "How much does a smile makeover cost?",
          answer:
            "Because every plan is different, cost ranges widely — from a few thousand dollars for whitening and bonding to a comprehensive veneer case. After your consultation you receive a written plan with a fixed total and a phased payment option, so there are no surprises.",
        },
        {
          question: "How long does the whole process take?",
          answer:
            "A straightforward makeover can be finished in a few weeks. A plan involving alignment or implants may run several months because we let tissue heal and teeth settle properly. We give you a realistic timeline up front.",
        },
        {
          question: "Will the work look natural together?",
          answer:
            "That is the point of designing the whole result first. By planning every element against one design, the finished smile reads as a single, coherent result rather than a collection of procedures.",
        },
        {
          question: "Can I see the result before we start?",
          answer:
            "Yes. We preview your designed smile as a temporary mock-up in your own mouth so you can approve the shape and proportion before any permanent work begins.",
        },
        {
          question: "Is any of it covered by insurance?",
          answer:
            "Cosmetic elements generally are not, but restorative portions may be. We itemize the plan so you can see what might qualify, and our team helps you submit claims for eligible work.",
        },
      ],
      featured: true,
      seo: {
        title: "Smile Makeover in Westbrook",
        description:
          "A single, sequenced plan for a complete smile makeover at Hale Dental Studio in Westbrook. Designed and previewed before treatment begins.",
      },
    },
    {
      slug: "teeth-whitening",
      title: "Teeth Whitening",
      shortTitle: "Whitening",
      eyebrow: "Cosmetic Dentistry",
      excerpt:
        "Professional whitening calibrated to your enamel — brighter, not blinding, and without the sensitivity of over-the-counter kits.",
      positioning:
        "Whitening is the simplest way to make a smile look healthier, but the drugstore version is a blunt instrument. We measure your starting shade, protect your gums, and use professional-strength gel either in a single in-office visit or in custom trays you control at home. The result is even, controlled, and kind to your enamel.",
      forYou: [
        "Your teeth are healthy but have dulled or yellowed over time.",
        "Strips and store kits have left you with uneven results or sensitivity.",
        "You want a noticeable lift before an event without committing to veneers.",
        "You would like to maintain the brightness of recent cosmetic work.",
      ],
      hasComparison: false,
      faqs: [
        {
          question: "How much does professional whitening cost?",
          answer:
            "In-office whitening is $450. Custom take-home trays with professional gel are $300, and we keep your trays on file so refills are inexpensive. We will recommend the option that fits your goal.",
        },
        {
          question: "Will it make my teeth sensitive?",
          answer:
            "Some sensitivity is normal and short-lived. Because we control the concentration and protect your gums, professional whitening is usually far gentler than over-the-counter strips. We can also pre-treat sensitive teeth to minimize it.",
        },
        {
          question: "How long do the results last?",
          answer:
            "Most people enjoy results for one to two years. Coffee, tea, and red wine shorten that; an occasional touch-up with your take-home trays keeps the shade where you want it.",
        },
        {
          question: "Does whitening work on veneers or crowns?",
          answer:
            "No — porcelain and bonding do not lighten. If you are considering both, we whiten first and then match any new restorations to your brighter shade.",
        },
        {
          question: "Is whitening covered by insurance?",
          answer:
            "Whitening is cosmetic and is not covered by dental insurance. It is one of the more affordable ways to improve a smile, and we are happy to fold it into a financing plan if you are combining it with other work.",
        },
      ],
      featured: false,
      seo: {
        title: "Teeth Whitening in Westbrook",
        description:
          "Professional in-office and custom take-home teeth whitening at Hale Dental Studio in Westbrook. Even, controlled results without drugstore sensitivity.",
      },
    },
    {
      slug: "invisalign",
      title: "Invisalign Clear Aligners",
      shortTitle: "Invisalign",
      eyebrow: "Clear Alignment",
      excerpt:
        "Straighten quietly. Clear aligners planned in our studio, often as the first step toward a cosmetic result.",
      positioning:
        "Invisalign moves teeth with a series of clear, removable aligners — no brackets, no wires. For many of our patients it is the foundation of a cosmetic plan: aligning teeth first means we can do less restorative work later, and remove less tooth structure when we do. We plan every case in the studio and supervise it closely.",
      forYou: [
        "You have mild to moderate crowding, spacing, or a bite that has shifted over the years.",
        "You wore braces once and your teeth have relapsed.",
        "You want to straighten without the look of traditional braces.",
        "You are considering veneers and want to move teeth first so less porcelain is needed.",
      ],
      process: [
        {
          title: "Consultation & scan",
          description:
            "We take a digital scan — no putty — and assess whether aligners can achieve what you want, on their own or as part of a larger plan.",
        },
        {
          title: "Treatment plan",
          description:
            "We map every movement and show you a preview of the final position before your aligners are made.",
        },
        {
          title: "Aligners",
          description:
            "You wear a series of clear aligners, changing them on schedule, with brief check-ins at the studio to keep things on track.",
        },
        {
          title: "Retention",
          description:
            "When teeth are in position we fit retainers to hold the result, and plan any cosmetic finishing if it is part of your goal.",
        },
      ],
      hasComparison: true,
      faqs: [
        {
          question: "How much does Invisalign cost here?",
          answer:
            "Most cases at the studio range from $4,500 to $6,500 depending on how much movement is needed. You receive a fixed quote after your scan, and we offer monthly financing through CareCredit and Cherry.",
        },
        {
          question: "How long does treatment take?",
          answer:
            "Simple cases can finish in as little as four to six months; comprehensive cases run twelve to eighteen. Wearing your aligners the recommended twenty to twenty-two hours a day is the single biggest factor.",
        },
        {
          question: "Does it hurt?",
          answer:
            "Each new aligner brings a day or two of pressure as teeth begin to move — a sign it is working. Most patients describe it as mild and easily managed. There are no wires to tighten and nothing sharp.",
        },
        {
          question: "Will people be able to tell I am wearing them?",
          answer:
            "The aligners are clear and fit closely. Most people will not notice them, and you remove them to eat and to clean your teeth.",
        },
        {
          question: "Does dental insurance help with Invisalign?",
          answer:
            "Many plans include an orthodontic benefit that applies to Invisalign. We verify your coverage before you start and file the claim for you so you know your real cost up front.",
        },
      ],
      featured: false,
      seo: {
        title: "Invisalign in Westbrook",
        description:
          "Clear aligner treatment planned and supervised at Hale Dental Studio in Westbrook — straighten quietly, often as the first step toward a cosmetic result.",
      },
    },
    {
      slug: "dental-implants",
      title: "Dental Implants",
      shortTitle: "Implants",
      eyebrow: "Restorative Dentistry",
      excerpt:
        "Replace a missing tooth so completely that it disappears into your smile — root, crown, and everything between.",
      positioning:
        "A dental implant replaces the root of a missing tooth with a titanium post, then carries a crown built to match the teeth beside it. It is the most complete way to replace a tooth because it stands on its own — it does not lean on neighbors or come out at night. We plan implants with the same cosmetic eye we bring to veneers, so the finished tooth disappears into your smile.",
      forYou: [
        "You are missing a tooth, or facing an extraction, and want a permanent replacement.",
        "A bridge or partial denture no longer fits or feels right.",
        "You want a replacement that you care for like a natural tooth.",
        "You want the restoration to match your other teeth, not just fill a gap.",
      ],
      process: [
        {
          title: "Consultation & imaging",
          description:
            "We take 3D imaging to assess bone and plan the implant position precisely around the final tooth, not the other way around.",
        },
        {
          title: "Placement",
          description:
            "We place the titanium post in a short, comfortable procedure and fit a temporary so you are never without a tooth in view.",
        },
        {
          title: "Healing",
          description:
            "The implant integrates with the bone over a few months. We see you periodically to confirm it is settling as planned.",
        },
        {
          title: "Restoration",
          description:
            "We attach the final crown, color-matched to your neighboring teeth, and refine the bite so it feels like it was always there.",
        },
      ],
      hasComparison: false,
      faqs: [
        {
          question: "What does a dental implant cost?",
          answer:
            "A single implant with its crown typically runs $4,000 to $5,500 at the studio, including the post, abutment, and final restoration. We provide a written plan after imaging, and financing is available.",
        },
        {
          question: "Is the procedure painful?",
          answer:
            "Placement is done under local anesthetic and most patients are surprised by how comfortable it is — often easier than an extraction. Mild soreness for a few days afterward is managed with over-the-counter medication.",
        },
        {
          question: "How long do implants last?",
          answer:
            "The implant itself can last a lifetime with good care. The crown on top may need replacing after fifteen years or so, the same as any restoration. Daily cleaning and regular visits are what protect the investment.",
        },
        {
          question: "How long does the whole process take?",
          answer:
            "From placement to final crown is usually three to six months, most of it healing time during which you wear a natural-looking temporary. Some cases allow a faster timeline; we tell you which applies to you.",
        },
        {
          question: "Does insurance cover implants?",
          answer:
            "Coverage varies. Many plans contribute toward the crown even when they exclude the implant itself. We verify your benefits and document the treatment so you receive every dollar you are entitled to.",
        },
      ],
      featured: false,
      seo: {
        title: "Dental Implants in Westbrook",
        description:
          "Natural-looking dental implants planned with a cosmetic eye at Hale Dental Studio in Westbrook. A complete, permanent way to replace a missing tooth.",
      },
    },
    {
      slug: "general-dentistry",
      title: "General Dentistry",
      shortTitle: "General Dentistry",
      eyebrow: "Everyday Care",
      excerpt:
        "The quiet, careful checkups and repairs that keep a cosmetic smile looking the way it should for years.",
      positioning:
        "Cosmetic work only lasts if the foundation is sound. We provide the everyday care that protects it — cleanings, exams, tooth-colored fillings, and night guards — at the same unhurried pace as the rest of the studio. If you are a cosmetic patient, this is how we keep your result looking new; if you are not yet, it is a calm place to start.",
      forYou: [
        "You want a dentist who takes time and explains what they see.",
        "You are due for a cleaning and exam and would prefer somewhere unhurried.",
        "You need a filling or repair done in a tooth-colored material that blends in.",
        "You grind or clench and want a properly fitted night guard.",
      ],
      hasComparison: false,
      faqs: [
        {
          question: "Do you take new patients for general care?",
          answer:
            "Yes. Many of our cosmetic patients began with a routine cleaning and exam. We keep room in the schedule for new patients and you do not need a cosmetic plan to be seen.",
        },
        {
          question: "What does a checkup and cleaning cost?",
          answer:
            "A new-patient exam, full set of images, and cleaning is $295 without insurance. With insurance, preventive care is typically covered at or near one hundred percent — we verify your plan before your visit.",
        },
        {
          question: "Are your fillings tooth-colored?",
          answer:
            "Always. We use bonded, tooth-colored composite for fillings so repairs blend into the tooth rather than showing as silver. Where a filling is too large to last, we will tell you honestly and discuss alternatives.",
        },
        {
          question: "How often should I come in?",
          answer:
            "Most people do well with a cleaning and exam every six months. If you are prone to gum issues or grinding, we may suggest a different rhythm and explain why.",
        },
        {
          question: "Do you accept dental insurance?",
          answer:
            "We are happy to work with most PPO plans and will file your claims for you. We are not a managed-care office, which is part of how we keep appointments unhurried; our team will give you a clear estimate of your portion before any treatment.",
        },
      ],
      featured: true,
      seo: {
        title: "General Dentistry in Westbrook",
        description:
          "Unhurried cleanings, exams, tooth-colored fillings, and night guards at Hale Dental Studio in Westbrook — the everyday care that protects a cosmetic smile.",
      },
    },
  ] satisfies Service[],

  /** Smile gallery cases (PRD 3 / 4.3). One maps to the hero (CASE 014). */
  gallery: [
    {
      id: "014",
      procedure: "Porcelain Veneers",
      serviceSlug: "veneers",
      detail: "Porcelain veneers, 8 units",
      beforeAlt:
        "Close-up of a patient's smile before treatment, with worn and slightly discolored upper front teeth.",
      afterAlt:
        "The same patient's smile after eight porcelain veneers, with even, natural-looking upper teeth.",
    },
    {
      id: "021",
      procedure: "Smile Makeover",
      serviceSlug: "smile-makeover",
      detail: "Invisalign, whitening, and four veneers",
      beforeAlt:
        "A smile before a makeover, showing mild crowding and uneven tooth color.",
      afterAlt:
        "The same smile after alignment, whitening, and four veneers, now straight and bright.",
    },
    {
      id: "009",
      procedure: "Teeth Whitening",
      serviceSlug: "teeth-whitening",
      detail: "In-office professional whitening",
      beforeAlt:
        "Teeth before professional whitening, with an overall yellow cast.",
      afterAlt:
        "The same teeth after professional whitening, several shades brighter and even.",
    },
    {
      id: "017",
      procedure: "Invisalign",
      serviceSlug: "invisalign",
      detail: "Clear aligners, eleven months",
      beforeAlt:
        "A smile before Invisalign, with noticeable crowding of the lower front teeth.",
      afterAlt:
        "The same smile after eleven months of Invisalign, with aligned lower teeth.",
    },
    {
      id: "025",
      procedure: "Dental Implants",
      serviceSlug: "dental-implants",
      detail: "Single anterior implant and crown",
      beforeAlt:
        "A smile with a missing upper front tooth before implant treatment.",
      afterAlt:
        "The same smile after a single implant and color-matched crown fills the gap.",
    },
    {
      id: "031",
      procedure: "Porcelain Veneers",
      serviceSlug: "veneers",
      detail: "Porcelain veneers, 6 units, gap closure",
      beforeAlt:
        "A smile with a visible gap between the upper front teeth before treatment.",
      afterAlt:
        "The same smile after six porcelain veneers closed the gap and refined the edges.",
    },
  ] satisfies GalleryCase[],

  testimonials: [
    {
      quote:
        "I spent years hiding my smile in photos. Dr. Hale never oversold me — she did less than I expected and the result is exactly right. People say I look rested, not like I had work done.",
      name: "Maren",
      procedure: "Porcelain veneers",
    },
    {
      quote:
        "I came in for whitening before my daughter's wedding and ended up trusting them with a full plan. Every appointment ran on time and nothing was rushed. The photos speak for themselves.",
      name: "David",
      procedure: "Smile makeover",
    },
    {
      quote:
        "I was nervous about Invisalign at my age. The studio made it simple, and aligning my teeth first meant I needed far less work afterward than I feared.",
      name: "Priya",
      procedure: "Invisalign",
    },
    {
      quote:
        "Losing a front tooth was the thing I dreaded most. The implant they placed is indistinguishable from the others — I forget which one it is.",
      name: "Tom",
      procedure: "Dental implant",
    },
  ] satisfies Testimonial[],

  /** New-patient information (PRD 3 / 4) */
  newPatients: {
    intro:
      "If this is your first visit, here is what to expect and how to make it simple. We keep the first appointment unhurried so there is time to talk before we talk about treatment.",
    firstVisit: [
      "Plan for about ninety minutes. Your first visit includes a full set of images, an unhurried exam, and a conversation about what you would like to change.",
      "You will not be sold a plan on the spot. If treatment makes sense, you leave with a written proposal to consider at home.",
      "If you have had recent dental work or x-rays elsewhere, bring them or have them sent ahead.",
    ],
    financing: [
      "We provide a written, fixed-price plan before any treatment begins — no estimates that move.",
      "Monthly financing is available through CareCredit and Cherry, including interest-free options for qualifying plans.",
      "We accept most PPO insurance and file your claims for you. We are not a managed-care office, which is part of how we keep appointments unhurried.",
    ],
    forms: [
      "New-patient forms are sent by secure link when you book, so you can complete them before you arrive.",
      "If you prefer, arrive fifteen minutes early and our team will help you complete them in the studio.",
    ],
  },

  /** Primary navigation — 4 items plus the Book Consultation CTA (PRD 2.4) */
  nav: {
    main: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Smile Gallery", href: "/smile-gallery" },
      { label: "New Patients", href: "/new-patients" },
    ] satisfies NavItem[],
    /** Booking CTA label, reused in header and bands */
    bookLabel: "Book a Consultation",
    /** Footer column groupings */
    footer: {
      explore: [
        { label: "About the Practice", href: "/about" },
        { label: "Smile Gallery", href: "/smile-gallery" },
        { label: "New Patients", href: "/new-patients" },
        { label: "Contact", href: "/contact" },
      ] satisfies NavItem[],
      services: [
        { label: "Porcelain Veneers", href: "/services/veneers" },
        { label: "Smile Makeover", href: "/services/smile-makeover" },
        { label: "Teeth Whitening", href: "/services/teeth-whitening" },
        { label: "Invisalign", href: "/services/invisalign" },
        { label: "Dental Implants", href: "/services/dental-implants" },
        { label: "General Dentistry", href: "/services/general-dentistry" },
      ] satisfies NavItem[],
    },
  },

  /** sameAs targets for schema + footer links */
  social: {
    instagram: "https://www.instagram.com/haledentalstudio",
    facebook: "https://www.facebook.com/haledentalstudio",
    google: "https://www.google.com/maps?q=Hale+Dental+Studio+Westbrook",
  },

  /**
   * Per-page headings + SEO. Titles are the page-specific half; the layout's
   * title template appends " | {practice.name}". Descriptions are <=155 chars.
   */
  pages: {
    about: {
      eyebrow: "About the Studio",
      heading: "A small studio, by design",
      intro:
        "Hale Dental Studio is one dentist, a short list of services, and the time to do them well. That is a deliberate choice, not a limitation.",
      seo: {
        title: "About Dr. Alexandra Hale",
        description:
          "Meet Dr. Alexandra Hale and the philosophy behind Hale Dental Studio in Westbrook — conservative cosmetic dentistry at an unhurried pace.",
      },
    },
    services: {
      eyebrow: "Services",
      heading: "Considered cosmetic and restorative care",
      intro:
        "A short list of services, each done exceptionally. Every plan is designed around your face and your bite, and explained before anything begins.",
      seo: {
        title: "Cosmetic & Restorative Services",
        description:
          "Veneers, smile makeovers, whitening, Invisalign, implants, and general dentistry at Hale Dental Studio in Westbrook.",
      },
    },
    smileGallery: {
      eyebrow: "Smile Gallery",
      heading: "Real work, shown plainly",
      intro:
        "Every case here was treated at the studio. Drag any divider to compare before and after, and filter by the kind of work you are considering.",
      seo: {
        title: "Smile Gallery",
        description:
          "Before-and-after cases from Hale Dental Studio in Westbrook — veneers, smile makeovers, whitening, Invisalign, and implants.",
      },
    },
    newPatients: {
      eyebrow: "New Patients",
      heading: "Your first visit",
      seo: {
        title: "New Patients",
        description:
          "What to expect on your first visit to Hale Dental Studio in Westbrook, plus financing, insurance, and new-patient forms.",
      },
    },
    contact: {
      eyebrow: "Contact",
      heading: "Visit the studio",
      intro:
        "Send a note or call, and we will find a time that works. Consultations are unhurried and there is no obligation to begin treatment.",
      seo: {
        title: "Contact & Booking",
        description:
          "Contact Hale Dental Studio in Westbrook. Call, send a message, or book a consultation. Hours, parking, and directions.",
      },
    },
  },

  /** About-page narrative + principles (doctor-led story, PRD 3/4) */
  about: {
    story: [
      "Dr. Alexandra Hale opened the studio in 2009 with a simple idea: that the best cosmetic dentistry is the kind no one can point to. After a decade of training and practice, she had seen enough overdone smiles to know she wanted to build something quieter.",
      "She trained at Oregon Health & Science University, earned her accreditation through the American Academy of Cosmetic Dentistry — a credential fewer than one in twenty cosmetic dentists hold — and continues her restorative study at the Kois Center. That training shows up not as flash but as restraint.",
      "The studio sees a small number of patients each day. No double-booking, no rushing between rooms. It means appointments cost a little more and run a little longer, and it means the work is done the way it should be.",
    ],
    values: [
      {
        title: "Conservative by default",
        body: "We remove the least tooth structure a result allows, and we will tell you when the answer is to do nothing at all.",
      },
      {
        title: "Designed around your face",
        body: "Every smile is planned against your features, your bite, and the way you actually speak — never a template shade and shape.",
      },
      {
        title: "Unhurried by choice",
        body: "We see fewer patients a day so that no appointment feels rushed and every question has time to be answered.",
      },
    ],
  },

  /** Contact-form configuration (PRD 4.4) */
  contact: {
    preferredTimes: [
      "Morning (8am – 11am)",
      "Midday (11am – 2pm)",
      "Afternoon (2pm – 5pm)",
      "No preference",
    ],
    formNote:
      "We reply within one business day. For anything urgent, please call the studio directly.",
    /** Shown to set expectations; this template form is not yet wired to a backend. */
    successMessage:
      "Thank you — your message has reached the studio. We will be in touch within one business day.",
  },

  analytics: { gtmId: "" },
} as const;

export type SiteConfig = typeof siteConfig;
