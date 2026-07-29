/* ============================================================
   Nicole P. Marwell — publications data
   Fields: id, year, title, authors[], container, detail?, type,
           themes[], url?, urlLabel?, pdf?, award?, forthcoming?, abstract?
   pdf: path from the site root to a self-hosted copy, e.g.
        'papers/internet-futuring.pdf'. Renders a "PDF ↓" button and tells
        Google Scholar where the full text is (citation_pdf_url).
   type: book | article | chapter | proceedings | essay | review | working
   themes: 'nonprofit' | 'internet'   (AI group has no publications yet)
   ============================================================ */
window.PUBS = [

  /* ── BOOKS ─────────────────────────────────────────────── */
  {
    id: 'mismeasuring', year: 2025, type: 'book', themes: ['nonprofit'],
    title: 'Mismeasuring Impact: How Randomized Controlled Trials Threaten the Nonprofit Sector',
    authors: ['Nicole P. Marwell', 'Jennifer E. Mosley'],
    container: 'Stanford University Press',
    url: 'https://www.sup.org/books/mismeasuring-impact', urlLabel: 'Publisher',
    abstract: 'The push to demonstrate effectiveness has made randomized controlled trials the presumed “gold standard” for nonprofit evaluation. Drawing on extensive interviews with nonprofit managers, evaluators, and foundation officers, this book explains why RCTs are so often the wrong tool for the sector — what happens inside organizations that adopt them, the equity problems they create, and what to do instead.'
  },
  {
    id: 'bargaining', year: 2007, type: 'book', themes: ['nonprofit'],
    title: 'Bargaining for Brooklyn: Community Organizations in the Entrepreneurial City',
    authors: ['Nicole P. Marwell'],
    container: 'University of Chicago Press',
    url: 'https://press.uchicago.edu/ucp/books/book/chicago/B/bo4299967.html', urlLabel: 'Publisher',
    award: 'Honorable Mention, Robert E. Park Distinguished Scholarly Book Award (ASA)',
    abstract: 'Through ethnographic fieldwork at eight community-based organizations in Williamsburg and Bushwick, Marwell shows how the relationships these groups form with larger political and economic institutions outside the neighborhood shape the lives of the poor. The book widens the lens of urban poverty research from individuals and families to the organizations that collectively drive urban life.'
  },

  /* ── ARTICLES, CHAPTERS & PROCEEDINGS ──────────────────── */
  {
    id: 'configuring-geography', year: 2026, type: 'article', themes: ['nonprofit'], forthcoming: true,
    title: 'Configuring the Geography of Social Service Provision: Neighborhood Characteristics, Nonprofit Spatial Strategies, and Public Funding',
    authors: ['Nicole P. Marwell', 'Kevin Credit', 'Ethan Park'],
    container: 'Nonprofit and Voluntary Sector Quarterly'
  },
  {
    id: 'less-is-more', year: 2026, type: 'proceedings', themes: ['internet'], forthcoming: true,
    title: 'Less is More: Optimizing Probe Selection Using Shared Latency Anomalies',
    authors: ['Taveesh Sharma', 'Andrew Chu', 'Paul Schmitt', 'Francesco Bronzino', 'Nicole P. Marwell', 'Nick Feamster'],
    container: 'Proceedings of the ACM on Networking (CoNEXT)', detail: 'Vol. 4, Article 18',
    url: 'https://doi.org/10.1145/3808666', urlLabel: 'DOI',
    abstract: 'Using four months of high-frequency round-trip-time measurements from 99 residential probes in Chicago, this paper detects latency anomalies shared across devices without relying on network topology, and develops a sampling algorithm that covers 95% of aggregate anomaly impact using less than half the probes.'
  },
  {
    id: 'spatial-variation', year: 2026, type: 'proceedings', themes: ['internet'], forthcoming: true,
    title: 'Characterizing Spatial Variation in Internet Access Latency: A Multilevel Approach',
    authors: ['Jonatas Marques', 'Jared N. Schachner', 'Nicole P. Marwell', 'Nick Feamster'],
    container: 'ACM Internet Measurement Conference (IMC)',
    url: 'https://imc2026-cycle1.hotcrp.com/doc/imc2026-cycle1-final32.pdf', urlLabel: 'PDF'
  },
  {
    id: 'internet-futuring', year: 2026, type: 'article', themes: ['internet'],
    title: 'Internet Futuring: How Communities are Connecting Themselves',
    authors: ['Henna Zamurd Butt', 'Nicole P. Marwell', 'Nick Feamster'],
    container: 'Digital Culture & Society', detail: 'Vol. 11(2), pp. 145–166',
    url: 'https://doi.org/10.14361/dcs-2025-0207', urlLabel: 'DOI',
    pdf: 'papers/internet-futuring.pdf',
    abstract: 'In the United States, high-speed internet connectivity is ubiquitous in many places yet markedly absent in others. In the wake of the Covid-19 pandemic, renewed federal efforts toward universal broadband have mobilized billions of dollars aimed at closing infrastructural gaps. We bring together the cases of Detroit, Michigan and a Northern Michigan Tribe (NMT) — two communities where broadband has not yet fully arrived — to consider how ambitions for connectivity are articulated and realized in practice. Efforts to achieve more equitable distribution of the internet’s benefits cannot be meaningfully disengaged from questions of power and control over the internet as both a discursive and material architecture. Adopting a decolonizing stance, this paper situates the contemporary experiences of these two differently marginalized communities within longer histories of settler colonialism and dispossession. Internet futuring and internet management operate as a dialectical analytic, attuned to the ways that power arrangements are unsettled through practices of futuring and stabilized through managerial mechanisms. In Detroit, we trace the Hope Village plan for an open access, municipally owned fibre network, a highly anticipated project that stalled before it began. Further north, in Michigan’s Upper Peninsula, we follow NMT’s path to build a fibre network to serve Tribal members across the region, whilst navigating multiple setbacks and policy constraints. Across both sites, we observe internet management operating through mechanisms of hypervisibility, conditional recognition, and temporality that structure the field of possibility for connectivity. Internet futuring emerges as a localized, relational, and iterative practice of self-determination, producing distinct connectivity demands and outcomes.'
  },
  {
    id: 'beyond-data-points', year: 2025, type: 'proceedings', themes: ['internet'],
    title: 'Beyond Data Points: Regionalizing Crowdsourced Latency Measurements',
    authors: ['Taveesh Sharma', 'Paul Schmitt', 'Francesco Bronzino', 'Nicole P. Marwell', 'Nick Feamster'],
    container: 'ACM SIGMETRICS', detail: 'pp. 1–14',
    url: 'https://dl.acm.org/doi/10.1145/3700416', urlLabel: 'DOI',
    abstract: 'This paper develops a regionalization method for crowdsourced latency data, grouping geographic areas by similarity in internet performance. Applied to a major U.S. city, it reveals coherent regional patterns that cut across administrative boundaries and correlate with network infrastructure — a new lens for understanding internet inequity.'
  },
  {
    id: 'fcc-challenge', year: 2024, type: 'proceedings', themes: ['internet'],
    title: 'Are We Up to the Challenge? An Analysis of the FCC Broadband Data Collection Fixed Internet Availability Challenges',
    authors: ['Jonatas Marques', 'Alexis Schrubbe', 'Nicole P. Marwell', 'Nick Feamster'],
    container: 'Proceedings of the 52nd Research Conference on Communications, Information and Internet Policy (TPRC)',
    url: 'https://arxiv.org/abs/2404.04189', urlLabel: 'arXiv',
    abstract: 'The first systematic analysis of the FCC Broadband Data Collection challenge process — who disputes reported availability, which areas they target, and how often they succeed — revealing gaps that may limit its ability to correct inaccuracies in federal broadband maps.'
  },
  {
    id: 'hitchhikers', year: 2024, type: 'proceedings', themes: ['internet'],
    title: 'The Hitchhiker’s Guide to Analyzing the FCC Broadband Data Collection',
    authors: ['Jonatas Marques', 'Alexis Schrubbe', 'Nicole P. Marwell', 'Nick Feamster'],
    container: 'Proceedings of the 52nd Research Conference on Communications, Information and Internet Policy (TPRC)',
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4913799', urlLabel: 'SSRN',
    abstract: 'A practical guide to the structure, limitations, and analytical possibilities of the FCC Broadband Data Collection — the most comprehensive federal effort to map U.S. internet availability — giving researchers and policymakers the tools to use it responsibly.'
  },
  {
    id: 'rct-equity', year: 2024, type: 'article', themes: ['nonprofit'],
    title: 'Impact, Equity and Philanthropic Foundations: Can Randomized Controlled Trials Help Account for the Democratic Deficit?',
    authors: ['Jennifer E. Mosley', 'Nicole P. Marwell', 'Emily Claypool', 'Cameron Day'],
    container: 'VOLUNTAS: International Journal of Voluntary and Nonprofit Organizations',
    url: 'https://doi.org/10.1007/s11266-024-00673-4', urlLabel: 'DOI',
    abstract: 'Examines whether the use of randomized controlled trials in philanthropic evaluation can address concerns about democratic accountability, finding that while RCTs may improve some accountability dimensions, they introduce new equity concerns that limit their democratic potential.'
  },
  {
    id: 'hyperlocal', year: 2023, type: 'proceedings', themes: ['internet'],
    title: 'A First Look at the Spatial and Temporal Variability of Internet Performance Data in Hyperlocal Geographies',
    authors: ['Taveesh Sharma', 'Jonatas Marques', 'Nick Feamster', 'Nicole P. Marwell'],
    container: 'Proceedings of the 51st Research Conference on Communications, Information and Internet Policy (TPRC)',
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4568668', urlLabel: 'SSRN',
    abstract: 'Internet performance can vary sharply over short distances and times, yet most research aggregates at coarse scales. This paper examines variability at hyperlocal levels — census blocks and below — revealing inequality that larger analyses miss.'
  },
  {
    id: 'ookla', year: 2023, type: 'proceedings', themes: ['internet'],
    title: 'A Comparative Analysis of Ookla Speedtest and Measurement Lab’s Network Diagnostic Test (NDT7)',
    authors: ['Kyle MacMillan', 'Tarun Mangla', 'James Saxon', 'Nicole P. Marwell', 'Nick Feamster'],
    container: 'ACM SIGMETRICS',
    url: 'https://dl.acm.org/doi/10.1145/3579448', urlLabel: 'DOI',
    abstract: 'The first rigorous side-by-side comparison of the two most common speed-test platforms — Ookla Speedtest and M-Lab’s NDT7 — examining how they differ in methodology, user base, and measured outcomes, and what that means for research and policy.'
  },
  {
    id: 'benchmarks', year: 2022, type: 'proceedings', themes: ['internet'],
    title: 'Benchmarks or Equity? A New Approach to Measuring Internet Performance',
    authors: ['Nick Feamster', 'Nicole P. Marwell'],
    container: 'Proceedings of the 50th Research Conference on Communications, Information and Internet Policy (TPRC)',
    abstract: 'Argues that benchmark-based measures of internet performance (fixed minimum speeds) miss the equity dimensions of service, and proposes an equity-centered framework that asks who gets what quality of service relative to others in their community.'
  },
  {
    id: 'best-practices', year: 2022, type: 'proceedings', themes: ['internet'],
    title: 'Best Practices for Collecting Speed Test Data',
    authors: ['Kyle MacMillan', 'Tarun Mangla', 'Nick Feamster', 'Nicole P. Marwell'],
    container: 'Proceedings of the 50th Research Conference on Communications, Information and Internet Policy (TPRC)',
    abstract: 'Develops and evaluates best practices for speed-test data collection — sampling, instrumentation, timing, and reporting — that materially affect the validity of broadband findings.'
  },
  {
    id: 'internet-inequity', year: 2022, type: 'proceedings', themes: ['internet'],
    title: 'Internet Inequity in Chicago: Adoption, Affordability, and Availability',
    authors: ['Kyle MacMillan', 'Tarun Mangla', 'Nick Feamster', 'Nicole P. Marwell'],
    container: 'Proceedings of the 50th Research Conference on Communications, Information and Internet Policy (TPRC)',
    abstract: 'Documents internet inequality in Chicago across three domains — adoption, affordability, and availability — and shows they do not always align, so closing the divide requires policies targeted at each dimension separately.'
  },
  {
    id: 'health-service', year: 2022, type: 'article', themes: ['nonprofit'],
    title: 'Does Health Service Funding Go Where the Need Is? A Prototype Spatial Access Analysis for New Urban Contracts Data',
    authors: ['Julia Koschinsky', 'Nicole P. Marwell', 'Raed Mansour'],
    container: 'BMC Health Services Research', detail: '22(45), 1–12',
    url: 'https://doi.org/10.1186/s12913-021-07370-8', urlLabel: 'DOI',
    abstract: 'Uses a unique dataset of New York City government contracts with nonprofits to study whether social-services funding tracks neighborhood need, distinguishing local organizations serving their immediate area from distributive organizations serving many.'
  },
  {
    id: 'micro-relations', year: 2020, type: 'article', themes: ['nonprofit'],
    title: 'The Micro-Relations of Urban Governance: Patronage and Partnership',
    authors: ['Nicole P. Marwell', 'Erez Aharon Marantz', 'Delia Baldassarri'],
    container: 'American Journal of Sociology', detail: '125, 1559–1601',
    url: 'https://doi.org/10.1086/709250', urlLabel: 'DOI',
    abstract: 'Analyzes the micro-relations of governance across politics and nonprofits, identifying the district-based politician as the key actor linking neighborhood and citywide social organization. Contract-allocation networks reveal two dynamics: exclusive, durable patronage and citywide, short-lived partnership.'
  },
  {
    id: 'urban-poverty-review', year: 2020, type: 'article', themes: ['nonprofit'], award: 'Invited Review',
    title: 'Organizations and the Governance of Urban Poverty',
    authors: ['Nicole P. Marwell', 'Shannon Morrissey'],
    container: 'Annual Review of Sociology', detail: '46, 233–250',
    url: 'https://doi.org/10.1146/annurev-soc-121919-054708', urlLabel: 'DOI',
    abstract: 'Argues that the dominant social-disorganization lens obscures the many ways formal organizations produce and manage urban poverty, and proposes an approach combining urban governance and strategic-action-fields frameworks to open new research directions.'
  },
  {
    id: 'governance-framework', year: 2020, type: 'chapter', themes: ['nonprofit'],
    title: 'Towards a Governance Framework of Government-Nonprofit Relations',
    authors: ['Nicole P. Marwell', 'Maoz Brown'],
    container: 'The Nonprofit Sector: A Research Handbook (3rd ed.), Stanford University Press', detail: 'Chapter 9',
    abstract: 'Proposes a governance framework — drawing on political science and organizational sociology — as an alternative to economic models of government-nonprofit relations, situating those relations within the broader structures of urban governance.'
  },
  {
    id: 'what-works', year: 2019, type: 'article', themes: ['nonprofit'],
    title: 'How the “What Works” Movement is Failing Human Service Organizations, and What Social Work Can Do to Fix It',
    authors: ['Jennifer E. Mosley', 'Nicole P. Marwell', 'Marci Ybarra'],
    container: 'Human Service Organizations: Management, Leadership & Governance', detail: '43(1), 326–335',
    url: 'https://doi.org/10.1080/23303131.2019.1672598', urlLabel: 'DOI',
    abstract: 'Argues that the “what works” movement, as implemented, imposes heavy evaluation burdens on human-service nonprofits without generating knowledge that improves practice, and proposes a social-work-centered alternative prioritizing organizational learning and equity.'
  },
  {
    id: 'deficit-model', year: 2015, type: 'article', themes: ['nonprofit'],
    title: 'A Deficit Model of Collaborative Governance: Government-Nonprofit Fiscal Relations in the Provision of Child Welfare Services',
    authors: ['Nicole P. Marwell', 'Thad Calabrese'],
    container: 'Journal of Public Administration Research and Theory', detail: '25, 1031–1058',
    url: 'https://doi.org/10.1093/jopart/muu047', urlLabel: 'DOI',
    abstract: 'Reframes government funding of nonprofits: rather than asking how public funds constrain private action, it asks how government deploys nonprofits to secure a public good. A New York State child-welfare case reveals a deficit model in which nonprofits are deputized to secure rights but under-resourced to do so.'
  },
  {
    id: 'people-place', year: 2013, type: 'article', themes: ['nonprofit'],
    title: 'People, Place and System: Organizations and the Renewal of Urban Social Theory',
    authors: ['Nicole P. Marwell', 'Michael McQuarrie'],
    container: 'Annals of the American Academy of Political and Social Science', detail: '126–143',
    abstract: 'Offers a framework for how organizations matter to the production and amelioration of urban poverty, using the classical concept of integration to take seriously both organizations’ territorial embeddedness and their field-level dynamics.'
  },
  {
    id: 'inequality-spatial', year: 2013, type: 'article', themes: ['nonprofit'],
    title: 'Inequality in the Spatial Allocation of Social Services: Government Contracts to New York City Nonprofit Organizations',
    authors: ['Nicole P. Marwell', 'Aaron Gullickson'],
    container: 'Social Service Review', detail: '87, 319–353',
    url: 'https://doi.org/10.1086/670910', urlLabel: 'DOI',
    abstract: 'Using 1997–2001 New York City contract data, finds that social-services contract dollars are positively associated with neighborhood disadvantage overall, though distributive organizations are less likely to be located in the neediest neighborhoods.'
  },
  {
    id: 'political-change', year: 2010, type: 'chapter', themes: ['nonprofit'],
    title: 'Political Change and the Institutionalization of the Nonprofit Service Delivery Infrastructure',
    authors: ['Nicole P. Marwell'],
    container: 'Politics and Partnerships (Clemens & Guthrie, eds.), University of Chicago Press', detail: '209–236',
    abstract: 'Traces how the privatization of welfare-state functions produced an extensive nonprofit service-delivery infrastructure in New York City, and how contracting-out from the 1970s–1990s institutionalized a dense system of community organizations intertwined with local government.'
  },
  {
    id: 'missing-org', year: 2009, type: 'article', themes: ['nonprofit'],
    title: 'The Missing Organizational Dimension in Urban Sociology',
    authors: ['Michael McQuarrie', 'Nicole P. Marwell'],
    container: 'City & Community', detail: '8(3), 247–268',
    url: 'https://doi.org/10.1111/j.1540-6040.2009.01288.x', urlLabel: 'DOI',
    abstract: 'Argues that urban sociology — both Marxian political economy and Chicago-school work — treats organizations as derivative rather than productive of urban life, and proposes taking organizations seriously as active producers of urban outcomes.'
  },
  {
    id: 'nonprofit-forprofit', year: 2005, type: 'article', themes: ['nonprofit'],
    title: 'The Nonprofit/For-Profit Continuum: Theorizing the Dynamics of Mixed-Form Markets',
    authors: ['Nicole P. Marwell', 'Paul-Brian McInerney'],
    container: 'Nonprofit and Voluntary Sector Quarterly', detail: '34(1), 7–28',
    abstract: 'Theorizes mixed-form markets in which nonprofits and for-profits compete and collaborate, drawing on organization theory and economic sociology to explain why such markets emerge and what they mean for service quality, access, and equity.'
  },
  {
    id: 'privatizing', year: 2004, type: 'article', themes: ['nonprofit'], award: 'Winner, Robert E. Park Distinguished Scholarly Article Award (ASA)',
    title: 'Privatizing the Welfare State: Nonprofit Community-Based Organizations as Political Actors',
    authors: ['Nicole P. Marwell'],
    container: 'American Sociological Review', detail: '69, 265–291',
    url: 'https://doi.org/10.1177/000312240406900206', urlLabel: 'DOI',
    abstract: 'Shows how publicly funded nonprofit community-based organizations generate greater contract revenue by adding electoral politics to their service and community-building roles — producing a new organizational form, the machine-politics CBO.'
  },
  {
    id: 'ethnic-politics', year: 2004, type: 'chapter', themes: [],
    title: 'Ethnic and Post-Ethnic Politics in New York City: The Dominican Second Generation',
    authors: ['Nicole P. Marwell'],
    container: 'Becoming New Yorkers (Kasinitz, Waters & Mollenkopf, eds.), Russell Sage Foundation', detail: '257–284'
  },

  /* ── INVITED ESSAYS & REPORTS ──────────────────────────── */
  {
    id: 'rct-problem', year: 2025, type: 'essay', themes: ['nonprofit'],
    title: 'The Nonprofit Sector Has an RCT Problem',
    authors: ['Nicole P. Marwell', 'Jennifer E. Mosley'],
    container: 'Stanford Social Innovation Review', detail: 'Fall, 58–67'
  },
  {
    id: 'emerging-directions', year: 2022, type: 'essay', themes: [],
    title: 'Emerging Directions in the Study of the Data-Society Interface',
    authors: ['Nicole P. Marwell', 'Cameron Day'],
    container: 'Robert Wood Johnson Foundation'
  },
  {
    id: 'rethinking-state', year: 2016, type: 'essay', themes: ['nonprofit'],
    title: 'Rethinking the State in Urban Outcasts',
    authors: ['Nicole P. Marwell'],
    container: 'Urban Studies', detail: '53, 1095–1098'
  },
  {
    id: 'bodega', year: 2009, type: 'essay', themes: [],
    title: 'On Bodega Dreams',
    authors: ['Nicole P. Marwell'],
    container: 'Sociological Forum', detail: '24(2), 461–464'
  },
  {
    id: 'robert-moses', year: 2007, type: 'essay', themes: [],
    title: 'Looking for Robert Moses',
    authors: ['Nicole P. Marwell'],
    container: 'Contexts', detail: '6, 75–77'
  },
  {
    id: 'univ-community', year: 2003, type: 'essay', themes: ['nonprofit'],
    title: 'University-Community Partnerships: New York City University-Nonprofit Information Transfer Project Report',
    authors: ['Nicole P. Marwell', 'Françoise Jacobsohn', 'Susan J. Neva', 'Mineko Okamoto'],
    container: 'Center for Urban Research and Policy, Columbia University (Working Paper Series)'
  },
  {
    id: 'honky', year: 2002, type: 'essay', themes: [],
    title: 'Sociological Uses of a Sociological Memoir: Honky by Dalton Conley',
    authors: ['Nicole P. Marwell'],
    container: 'Qualitative Sociology', detail: '25(1), 139–143'
  },
  {
    id: 'social-networks', year: 1999, type: 'essay', themes: ['nonprofit'],
    title: 'Social Networks and Social Capital as Resources for Community Revitalization: Initial Insights',
    authors: ['Nicole P. Marwell'],
    container: 'Aspen Institute Nonprofit Sector Research Fund (Working Paper Series)'
  },

  /* ── BOOK REVIEWS ──────────────────────────────────────── */
  { id: 'r-thinking-economist', year: 2023, type: 'review', themes: [], title: 'Review of Thinking like an Economist: How Efficiency Replaced Equality in U.S. Public Policy (Elizabeth Popp-Berman)', authors: ['Nicole P. Marwell'], container: 'Social Service Review' },
  { id: 'r-redistributing', year: 2022, type: 'review', themes: [], title: 'Review of Redistributing the Poor: Jails, Hospitals, and the Crisis of Law and Fiscal Austerity (Armando Lara-Millán)', authors: ['Nicole P. Marwell'], container: 'Social Forces' },
  { id: 'r-automating', year: 2020, type: 'review', themes: [], title: 'Review of Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor (Virginia Eubanks)', authors: ['Nicole P. Marwell'], container: 'Social Service Review', detail: '94, 175–180' },
  { id: 'r-follow-money', year: 2013, type: 'review', themes: [], title: 'Review of Follow the Money: How Foundation Dollars Change Public School Politics (Sarah Reckhow)', authors: ['Nicole P. Marwell'], container: 'City & Community', detail: '12, 408–409' },
  { id: 'r-philadelphia', year: 2012, type: 'review', themes: [], title: 'Review of The Philadelphia Barrio: The Arts, Branding and Neighborhood Transformation (Frederick Wherry)', authors: ['Nicole P. Marwell'], container: 'Social Service Review', detail: '86, 708–709' },
  { id: 'r-streetwise', year: 2010, type: 'review', themes: [], title: 'Review of Streetwise for Book Smarts: Grassroots Organizing and Education Reform in the Bronx (Celina Su)', authors: ['Nicole P. Marwell'], container: 'Contemporary Sociology', detail: '39, 607–608' },
  { id: 'r-cracks', year: 2010, type: 'review', themes: [], title: 'Review of Cracks in the Pavement: Social Change and Resistance in Poor Neighborhoods (Martín Sánchez-Jankowski)', authors: ['Nicole P. Marwell'], container: 'Social Service Review', detail: '84, 326–328' },
  { id: 'r-double-trouble', year: 2006, type: 'review', themes: [], title: 'Review of Double Trouble: Black Mayors, Black Communities, and the Call for a Deep Democracy (J. Phillip Thompson)', authors: ['Nicole P. Marwell'], container: 'City & Community', detail: '5, 460–462' },
  { id: 'r-no-fire', year: 2004, type: 'review', themes: [], title: 'Review of No Fire Next Time: Black-Korean Conflicts and the Future of America’s Cities (Patrick Joyce)', authors: ['Nicole P. Marwell'], container: 'Political Science Quarterly', detail: '118, 699–700' },
  { id: 'r-settlement', year: 2003, type: 'review', themes: [], title: 'Review of Settlement Houses Under Siege: The Struggle to Sustain Community Organizations in New York City (Fabricant & Fisher)', authors: ['Nicole P. Marwell'], container: 'Urban Studies', detail: '40, 1383–1385' },
  { id: 'r-street-level', year: 2002, type: 'review', themes: [], title: 'Review of Street Level Democracy (Jonathan Barker et al.)', authors: ['Nicole P. Marwell'], container: 'Voluntas', detail: '13, 319–321' },

  /* ── UNDER REVIEW & WORKING PAPERS ─────────────────────── */
  {
    id: 'evidence-clearinghouses', year: 2025, type: 'working', themes: ['nonprofit'],
    title: 'Evidence Clearinghouses as Policy Tools: How Equity Concerns Undermine Legitimacy',
    authors: ['Ariel Maschke', 'Lehn Benjamin', 'Nicole P. Marwell', 'Jennifer E. Mosley', 'Mary Kay Gugerty'],
    container: 'Revise & resubmit, Public Management Review'
  },
  {
    id: 'digital-divide-covid', year: 2025, type: 'working', themes: ['internet'],
    title: 'Heterogeneous Effects of Closing the Digital Divide During COVID-19 on Student Engagement and Achievement',
    authors: ['Jared N. Schachner', 'Nicole P. Marwell', 'Marisa de la Torre', 'Julia Gwynne', 'Elaine Allensworth'],
    container: 'Revise & resubmit, Nature: Humanities and Social Sciences Communications',
    url: 'https://edworkingpapers.com/ai25-1153', urlLabel: 'Working paper'
  },
  {
    id: 'contextual-moderators', year: 2025, type: 'working', themes: ['internet'],
    title: 'Contextual Moderators of Educational Disruption Effects',
    authors: ['Jared N. Schachner', 'Nicole P. Marwell', 'Elaine Allensworth'],
    container: 'In progress'
  }

];
