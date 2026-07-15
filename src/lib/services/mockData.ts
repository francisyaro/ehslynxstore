export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Specification {
  key: string;
  value: string;
}

export interface SpecificationGroup {
  group: string;
  items: Specification[];
}

export interface Product {
  id: string;
  brand_id: string;
  category_id: string;
  name: string;
  model: string;
  manufacturer_reference: string;
  slug: string;
  short_description: string;
  long_description: string;
  technical_specifications: SpecificationGroup[];
  applications: string[];
  sectors: string[];
  advantages: string[];
  standards_certifications: string[];
  images: string[];
  public_documents: { name: string; url: string; size: string }[];
  availability_status: 'disponible' | 'sur_commande' | 'bientot';
  status: 'actif' | 'inactif';
}

export interface QuoteRequestItem {
  id: string;
  product_id: string;
  product_name: string;
  product_brand: string;
  product_model: string;
  quantity: number;
  configuration: string;
  comment: string;
}

export interface QuoteRequest {
  id: string;
  reference: string;
  contact_name: string;
  job_title: string;
  phone: string;
  whatsapp: string;
  email: string;
  company_name: string;
  sector: string;
  country: string;
  city: string;
  delivery_location: string;
  desired_delivery_date: string;
  preferred_contact_channel: 'formulaire' | 'whatsapp' | 'email';
  general_comment: string;
  status: string;
  assigned_to?: string;
  estimated_value?: number;
  currency: string;
  created_at: string;
  updated_at: string;
  items: QuoteRequestItem[];
  activity_logs: { id: string; action: string; comment: string; actor: string; created_at: string }[];
}

export const BRANDS: Brand[] = [
  {
    id: 'brand-svantek',
    name: 'SVANTEK',
    slug: 'svantek',
    logo: '/brands/svantek-logo.png',
    description: 'Leader mondial de la mesure acoustique et vibratoire de précision pour la santé au travail et l\'environnement.'
  },
  {
    id: 'brand-sensidyne',
    name: 'SENSIDYNE',
    slug: 'sensidyne',
    logo: '/brands/sensidyne-logo.png',
    description: 'Expert incontournable des pompes de prélèvement d\'air individuelles et de la détection de gaz industrielle.'
  },
  {
    id: 'brand-slatesafety',
    name: 'SLATESAFETY',
    slug: 'slatesafety',
    logo: '/brands/slatesafety-logo.png',
    description: 'Pionnier des solutions de biosurveillance connectées en temps réel pour prévenir le stress thermique des équipes de terrain.'
  },
  {
    id: 'brand-ohd',
    name: 'OHD',
    slug: 'ohd',
    logo: 'OHD logo',
    description: 'Le standard mondial pour les essais d\'ajustement quantitatifs rapides et précis des masques de protection respiratoire.'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-noise',
    name: 'Mesure du Bruit & Vibrations',
    slug: 'bruit-et-vibrations',
    description: 'Sonomètres, dosimètres, calibrateurs et analyseurs vibratoires de classe professionnelle.'
  },
  {
    id: 'cat-air',
    name: 'Échantillonnage d\'Air & Poussières',
    slug: 'echantillonnage-d-air',
    description: 'Pompes individuelles, préleveurs haut débit, cassettes de filtres et étalonneurs.'
  },
  {
    id: 'cat-thermal',
    name: 'Stress Thermique & Physiologique',
    slug: 'stress-thermique',
    description: 'Bracelets et capteurs connectés pour le suivi en temps réel de la température interne et de la fréquence cardiaque.'
  },
  {
    id: 'cat-respiratory',
    name: 'Protection Respiratoire (Fit Test)',
    slug: 'protection-respiratoire',
    description: 'Systèmes de test d\'ajustement quantitatif des masques par pression négative contrôlée.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-sv-958',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Analyseur de vibrations et de bruit à 4 canaux',
    model: 'SV 958',
    manufacturer_reference: 'SV958-STD',
    slug: 'analyseur-vibrations-sv-958',
    short_description: 'Analyseur de vibrations à quatre canaux de classe 1, idéal pour l\'hygiène au travail et la mesure des vibrations corporelles.',
    long_description: 'Le SV 958 est le standard mondial des analyseurs de vibrations à quatre canaux. Il permet de mesurer simultanément les vibrations mains-bras, corps entier et le bruit. Doté d\'une bande passante exceptionnelle de 20 kHz et d\'analyses FFT en temps réel, cet instrument est indispensable aux cabinets HSE, aux mines et à l\'industrie lourde.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Évaluation de l\'exposition humaine aux vibrations',
      'Mesures acoustiques à 4 canaux indépendants',
      'Analyses spectrales FFT en temps réel'
    ],
    sectors: ['Mines', 'BTP & Génie Civil', 'Industrie Lourde', 'Laboratoires de recherche'],
    advantages: [
      '4 canaux de mesure indépendants simultanés',
      'Analyse fréquentielle 1/1, 1/3 octave et FFT',
      'Mesure simultanée bruit et vibrations',
      'Conformité totale ISO 8041-1'
    ],
    standards_certifications: [
      'CEI 61672-1 (Classe 1)',
      'ISO 8041-1:2017 (Vibrations)',
      'ISO 2631 (Corps Entier)'
    ],
    images: ['/products/sv-958.jpg'],
    public_documents: [
      { name: 'Brochure technique SV 958.pdf', url: '#', size: '2.8 MB' }
    ],
    technical_specifications: [
      {
        group: 'Mesure',
        items: [
          { key: 'Canaux de mesure', value: '4 canaux indépendants (bruit ou vibrations)' },
          { key: 'Filtres', value: '1/1 octave, 1/3 octave, FFT' },
          { key: 'Bande passante', value: '0.5 Hz à 20 kHz' }
        ]
      },
      {
        group: 'Alimentation & Autonomie',
        items: [
          { key: 'Batterie', value: '4x AA rechargeables ou alimentation USB' },
          { key: 'Autonomie', value: 'Jusqu\'à 15 heures' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-971',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Sonomètre de classe 1 compact',
    model: 'SV 971',
    manufacturer_reference: 'SV971-STD',
    slug: 'sonometre-compact-sv-971',
    short_description: 'Le plus petit sonomètre de classe 1 au monde, idéal pour l\'évaluation du bruit en milieu industriel.',
    long_description: 'Le SV 971 est un sonomètre de Classe 1 révolutionnaire par sa compacité. Il tient dans la main tout en offrant des mesures acoustiques d\'une précision de laboratoire. Avec enregistrement audio, filtres en bandes d\'octave et connectivité Bluetooth intégrée, il est l\'outil privilégié des préventeurs HSE sur le terrain.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Évaluation réglementaire du bruit au travail',
      'Contrôle des protections auditives',
      'Mesures environnementales de base'
    ],
    sectors: ['HSE en usine & mines', 'Bureaux d\'études', 'Collectivités locales'],
    advantages: [
      'Format de poche ultra-léger (225g)',
      'Microphone de classe 1 de précision',
      'Enregistrement audio des événements sonores',
      'Connectivité Bluetooth BLE intégrée'
    ],
    standards_certifications: [
      'CEI 61672-1:2013 (Classe 1)',
      'CEI 61260-1 (Filtres d\'octave)'
    ],
    images: ['/products/sv-971.jpg'],
    public_documents: [
      { name: 'Brochure Svantek SV 971.pdf', url: '#', size: '1.9 MB' }
    ],
    technical_specifications: [
      {
        group: 'Mesure',
        items: [
          { key: 'Plage de mesure', value: '25 dBA à 140 dBA Peak' },
          { key: 'Filtres', value: 'Filtres en temps réel 1/1 ou 1/3 octave' }
        ]
      },
      {
        group: 'Alimentation',
        items: [
          { key: 'Batterie', value: '4x AAA piles ou USB' },
          { key: 'Autonomie', value: 'Jusqu\'à 24 heures' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-307',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Station de surveillance du bruit extérieur',
    model: 'SV 307',
    manufacturer_reference: 'SV307-OUTDOOR',
    slug: 'station-bruit-outdoor-sv-307',
    short_description: 'Station de surveillance acoustique tout-en-un étanche avec modem 4G intégré et calibrage à distance.',
    long_description: 'Le SV 307 est une station de surveillance du bruit environnemental tout-en-un révolutionnaire. Conçue pour résister aux intempéries (IP65) et dotée d\'une technologie d\'étalonnage acoustique automatique intégrée, elle transmet en temps réel les niveaux sonores mesurés via sa carte SIM 4G intégrée vers la plateforme Cloud.',
    availability_status: 'sur_commande',
    status: 'actif',
    applications: [
      'Surveillance du bruit de chantier',
      'Mesures de bruit aéroportuaire et routier',
      'Suivi du bruit environnemental industriel'
    ],
    sectors: ['BTP & Travaux Publics', 'Ports & Aéroports', 'Exploitations Minières', 'Collectivités'],
    advantages: [
      'Boîtier étanche tout-en-un (IP65)',
      'Autocalibrage breveté à distance',
      'Modem 4G / GPS intégré pour alertes en temps réel',
      'Batterie intégrée longue autonomie et alimentation solaire optionnelle'
    ],
    standards_certifications: [
      'CEI 61672-1 (Classe 1)',
      'Indice d\'étanchéité IP65'
    ],
    images: ['/products/sv-307.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 307.pdf', url: '#', size: '3.5 MB' }
    ],
    technical_specifications: [
      {
        group: 'Mesure',
        items: [
          { key: 'Plage de mesure', value: '30 dBA à 120 dBA' },
          { key: 'Étalonnage', value: 'Calibrage électrostatique automatique intégré' }
        ]
      },
      {
        group: 'Boîtier & Alimentation',
        items: [
          { key: 'Protection', value: 'IP65 étanche aux pluies tropicales' },
          { key: 'Autonomie', value: 'Jusqu\'à 6 jours sur batterie interne' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-803',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Terminal de surveillance des vibrations en temps réel',
    model: 'SV 803',
    manufacturer_reference: 'SV803-VIB',
    slug: 'terminal-vibrations-sv-803',
    short_description: 'Terminal de surveillance des vibrations des bâtiments avec accéléromètre triaxial et modem cellulaire 4G.',
    long_description: 'Le SV 803 est un terminal de mesure et de surveillance continue des vibrations subies par les structures de bâtiments ou d\'infrastructures sensibles lors de dynamitages miniers, de chantiers de BTP ou de passages ferroviaires. Équipé d\'un capteur triaxial de haute sensibilité et d\'un modem 4G, il envoie des alertes SMS/E-mail immédiates en cas de dépassement de seuil réglementaire.',
    availability_status: 'sur_commande',
    status: 'actif',
    applications: [
      'Surveillance des vibrations de dynamitage (mines/carrières)',
      'Suivi d\'impact de battage de pieux (BTP)',
      'Préservation des monuments historiques'
    ],
    sectors: ['Mines & Carrières', 'Génie Civil & BTP', 'Bureaux d\'études géotechniques'],
    advantages: [
      'Mesure triaxiale simultanée X, Y, Z',
      'Alertes temps réel par SMS et e-mail',
      'Modem 4G et récepteur GPS intégrés',
      'Boîtier durci étanche IP66'
    ],
    standards_certifications: [
      'DIN 4150-3',
      'BS 7385-2',
      'Indice IP66'
    ],
    images: ['/products/sv-803.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 803.pdf', url: '#', size: '2.1 MB' }
    ],
    technical_specifications: [
      {
        group: 'Capteur de Vibration',
        items: [
          { key: 'Type de capteur', value: 'Accéléromètre MEMS triaxial haute sensibilité' },
          { key: 'Bande passante', value: '1 Hz à 800 Hz' }
        ]
      },
      {
        group: 'Alimentation',
        items: [
          { key: 'Batterie', value: 'Interne Li-Ion rechargeable' },
          { key: 'Autonomie', value: 'Jusqu\'à 10 jours en transmission continue' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-258-pro',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Station de surveillance des vibrations et du bruit',
    model: 'SV 258 PRO',
    manufacturer_reference: 'SV258-PRO',
    slug: 'station-surveillance-vibrations-sv-258-pro',
    short_description: 'Station de surveillance des vibrations de chantier et du bruit avec modem 4G intégré, conforme à la norme DIN 4150-3.',
    long_description: 'Le SV 258 PRO est une station de surveillance outdoor complète logée dans une valise ultra-robuste et étanche. Elle intègre un accéléromètre triaxial haute performance fixé sur une embase à trois pointes pour la mesure des vibrations au sol et des structures (bâtiments, tunnels). Elle permet également la connexion d\'un microphone de classe 1 pour le suivi acoustique simultané, avec alertes instantanées par SMS et e-mail.',
    availability_status: 'sur_commande',
    status: 'actif',
    applications: [
      'Suivi d\'impact vibratoire de chantiers de BTP',
      'Surveillance des structures historiques',
      'Mesure simultanée bruit et vibrations au sol'
    ],
    sectors: ['BTP & Génie Civil', 'Mines & Carrières', 'Cabinets géotechniques'],
    advantages: [
      'Valise étanche de protection IP65',
      'Embase de sol triaxiale lourde incluse',
      'Autonomie sur batterie externe de plusieurs semaines',
      'Transmission automatique Cloud'
    ],
    standards_certifications: [
      'DIN 4150-3 (Vibrations structures)',
      'BS 7385-2',
      'CEI 61672-1 (Classe 1)'
    ],
    images: ['/products/sv-258.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 258 PRO.pdf', url: '#', size: '2.5 MB' }
    ],
    technical_specifications: [
      {
        group: 'Vibrations',
        items: [
          { key: 'Nombre d\'axes', value: '3 axes (X, Y, Z)' },
          { key: 'Plage de fréquence', value: '1 Hz à 120 Hz' }
        ]
      },
      {
        group: 'Physique & Connectivité',
        items: [
          { key: 'Protection', value: 'IP65' },
          { key: 'Communication', value: 'Modem LTE (4G), Wi-Fi, GPS' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-104',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Dosimètre de bruit individuel',
    model: 'SV 104',
    manufacturer_reference: 'SV104-DOS',
    slug: 'dosimetre-individuel-sv-104',
    short_description: 'Dosimètre de bruit compact avec microphone MEMS et écran couleur OLED, idéal pour l\'évaluation de l\'exposition professionnelle.',
    long_description: 'Le SV 104 est un dosimètre de bruit robuste conçu pour s\'attacher directement à l\'épaule des travailleurs sans aucun fil encombrant. Il intègre un microphone MEMS très résistant aux chocs et une batterie longue durée pour couvrir l\'exposition des équipes sur toute leur journée de travail.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Évaluation de l\'exposition individuelle au bruit',
      'Mesures de conformité en usine et mines',
      'Cartographie de dose de bruit'
    ],
    sectors: ['Mines & Carrières', 'Industrie lourde', 'Manufacture', 'Cabinets HSE'],
    advantages: [
      'Format compact sans fil d\'épaule',
      'Écran couleur OLED ultra-lisible',
      'Microphone MEMS haute performance',
      'Autonomie supérieure à 20 heures'
    ],
    standards_certifications: [
      'CEI 61252',
      'ANSI S1.25'
    ],
    images: ['/products/sv-104.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 104.pdf', url: '#', size: '1.6 MB' }
    ],
    technical_specifications: [
      {
        group: 'Spécifications',
        items: [
          { key: 'Plage de mesure', value: '60 dBA à 140 dBA Peak' },
          { key: 'Microphone', value: 'MEMS 1/2 pouce incassable' }
        ]
      },
      {
        group: 'Autonomie & Poids',
        items: [
          { key: 'Autonomie', value: '20 heures en continu' },
          { key: 'Poids', value: '115 grammes' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-102',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Dosimètre acoustique double canal',
    model: 'SV 102A',
    manufacturer_reference: 'SV102A-STD',
    slug: 'dosimetre-double-canal-sv-102a',
    short_description: 'Dosimètre de bruit à double canal permettant de mesurer simultanément l\'exposition dans l\'oreille gauche et droite.',
    long_description: 'Le SV 102A est un dosimètre acoustique double canal de Classe 1 qui redéfinit les mesures de bruit d\'exposition. Il est idéal pour l\'évaluation binaurale (oreille gauche / oreille droite) ou pour mesurer simultanément le niveau sonore à l\'intérieur et à l\'extérieur d\'un casque de protection auditive afin d\'en vérifier l\'atténuation réelle sur le terrain.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Mesures d\'exposition binaurale (gauche/droite)',
      'Vérification de l\'efficacité réelle des casques antibruit (méthode MIRE)',
      'Mesure de bruit de Classe 1'
    ],
    sectors: ['Industrie navale & aéronautique', 'Mines', 'Laboratoires de recherche HSE'],
    advantages: [
      'Double canal de mesure simultané',
      'Méthode MIRE de microphone dans l\'oreille',
      'Classe 1 métrologique de précision',
      'Analyse par bande d\'octave 1/1 ou 1/3 octave'
    ],
    standards_certifications: [
      'CEI 61252 (Classe 1)',
      'CEI 61672-1 (Classe 1)'
    ],
    images: ['/products/sv-102.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 102A.pdf', url: '#', size: '2.3 MB' }
    ],
    technical_specifications: [
      {
        group: 'Acoustique',
        items: [
          { key: 'Nombre de canaux', value: '2 canaux de mesure indépendants' },
          { key: 'Filtres', value: '1/1 octave et 1/3 octave en temps réel' }
        ]
      },
      {
        group: 'Alimentation',
        items: [
          { key: 'Piles', value: '2x piles AA ou alimentation externe USB' },
          { key: 'Autonomie', value: 'Jusqu\'à 30 heures' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-111',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Calibrateur de vibrations portable',
    model: 'SV 111',
    manufacturer_reference: 'SV111-STD',
    slug: 'calibrateur-vibrations-sv-111',
    short_description: 'Calibrateur de vibrations triaxial portable de terrain pour la vérification rapide des capteurs et accéléromètres.',
    long_description: 'Le SV 111 est un calibrateur vibratoire portable de précision conçu pour le contrôle de l\'ensemble de la chaîne de mesure (capteurs de vibrations corporelles, mains-bras ou géophones) sur le terrain avant et après chaque campagne de mesure. Il génère une accélération stable à plusieurs fréquences sélectionnables.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Calibrage de terrain de capteurs de vibrations triaxiaux',
      'Vérification métrologique sur site de chantiers',
      'Assurance qualité des mesures vibratoires'
    ],
    sectors: ['Bureaux d\'études géotechniques', 'Cabinets de diagnostic HSE', 'Laboratoires'],
    advantages: [
      'Génération vibratoire triaxiale automatique',
      'Plusieurs niveaux d\'accélération et fréquences',
      'Écran LCD de contrôle',
      'Valise de transport autonome sur batterie'
    ],
    standards_certifications: [
      'ISO 8041-1',
      'CE'
    ],
    images: ['/products/sv-111.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 111.pdf', url: '#', size: '1.7 MB' }
    ],
    technical_specifications: [
      {
        group: 'Calibrage',
        items: [
          { key: 'Fréquences de test', value: '16 Hz, 79.58 Hz, 159.2 Hz' },
          { key: 'Amplitude d\'accélération', value: '1 m/s² à 10 m/s²' }
        ]
      },
      {
        group: 'Physique',
        items: [
          { key: 'Charge maximale', value: 'Jusqu\'à 1 kg de capteur' },
          { key: 'Alimentation', value: 'Batterie rechargeable intégrée' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-103',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Dosimètre de vibrations mains-bras',
    model: 'SV 103',
    manufacturer_reference: 'SV103-STD',
    slug: 'dosimetre-vibrations-mains-bras-sv-103',
    short_description: 'Dosimètre de vibrations individuelles mains-bras en temps réel fixé directement sur la main de l\'opérateur.',
    long_description: 'Le SV 103 est un dosimètre de vibrations corporelles révolutionnaire pour le suivi de l\'exposition mains-bras (norme ISO 5349). Fixé confortablement à la main et au poignet de l\'opérateur, il enregistre en continu les vibrations générées par les outils portatifs (marteaux-piqueurs, meuleuses) directement à la source d\'entrée.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Évaluation de l\'exposition aux vibrations mains-bras',
      'Évaluation d\'impact des outils vibrants industriels',
      'Prévention des troubles musculo-squelettiques (TMS)'
    ],
    sectors: ['BTP', 'Mines & Carrières', 'Manufacture & Construction Navale', 'HSE'],
    advantages: [
      'Fixation directe sur la main via sangle ajustable',
      'Mesure triaxiale en direct de l\'exposition',
      'Détection automatique de force de contact de l\'outil',
      'Conformité totale ISO 5349'
    ],
    standards_certifications: [
      'ISO 5349-1',
      'ISO 5349-2',
      'ISO 8041-1'
    ],
    images: ['/products/sv-103.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 103.pdf', url: '#', size: '2.0 MB' }
    ],
    technical_specifications: [
      {
        group: 'Mesure',
        items: [
          { key: 'Axes de mesure', value: 'Triaxial (X, Y, Z)' },
          { key: 'Normes de pondération', value: 'Wh conforme ISO 5349' }
        ]
      },
      {
        group: 'Physique',
        items: [
          { key: 'Interface capteur', value: 'Capteur MEMS léger sur sangle de doigt' },
          { key: 'Autonomie', value: 'Jusqu\'à 24 heures' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-36',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Calibrateur acoustique de Classe 1',
    model: 'SV 36',
    manufacturer_reference: 'SV36-CAL',
    slug: 'calibrateur-acoustique-sv-36',
    short_description: 'Calibrateur acoustique de Classe 1 portable (94 dB / 114 dB à 1 kHz) pour le contrôle sur site des sonomètres.',
    long_description: 'Le SV 36 est un calibrateur acoustique de Classe 1 portable et extrêmement robuste, conçu pour la vérification réglementaire sur site de la sensibilité des sonomètres et dosimètres de bruit avant et après chaque session de mesure. Doté d\'un capteur de pression atmosphérique et de température interne, il auto-corrige le signal sonore généré pour garantir une précision absolue conforme à la norme CEI 60942:2017.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Calibrage de terrain de sonomètres de Classe 1 & 2',
      'Calibrage de dosimètres de bruit individuel',
      'Assurance qualité métrologique sur site'
    ],
    sectors: ['Cabinets d\'études acoustiques', 'Préventeurs HSE', 'Laboratoires de métrologie'],
    advantages: [
      'Précision de Classe 1 métrologique',
      'Double niveau de sortie : 94 dB et 114 dB à 1 kHz',
      'Correction automatique de température et pression',
      'Facibilité d\'utilisation avec un seul bouton de mise en marche'
    ],
    standards_certifications: [
      'CEI 60942:2017 (Classe 1)',
      'CE'
    ],
    images: ['/products/sv-36.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 36.pdf', url: '#', size: '1.4 MB' }
    ],
    technical_specifications: [
      {
        group: 'Sortie Acoustique',
        items: [
          { key: 'Niveaux de pression', value: '94 dB et 114 dB' },
          { key: 'Fréquence de sortie', value: '1000 Hz' },
          { key: 'Précision', value: '± 0.25 dB' }
        ]
      },
      {
        group: 'Alimentation',
        items: [
          { key: 'Piles', value: '2x piles AAA' },
          { key: 'Autonomie', value: 'Jusqu\'à 30 heures' }
        ]
      }
    ]
  },
  {
    id: 'prod-gilair-plus',
    brand_id: 'brand-sensidyne',
    category_id: 'cat-air',
    name: 'Pompe d\'échantillonnage d\'air individuelle',
    model: 'GilAir Plus',
    manufacturer_reference: '901201-STD',
    slug: 'pompe-echantillonnage-gilair-plus',
    short_description: 'Pompe d\'échantillonnage d\'air ultra-polyvalente couvrant des débits de 20 à 5000 mL/min sans adaptateurs externes.',
    long_description: 'La GilAir Plus est la référence mondiale de l\'échantillonnage d\'air professionnel. Grâce à sa technologie QuadMode brevetée, elle élimine le besoin d\'accessoires basse pression complexes. Capable d\'effectuer des prélèvements à débit constant ou à pression constante, elle dispose d\'un système de correction automatique de la température et de la pression pour garantir une intégrité parfaite de la mesure.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Échantillonnage de gaz, vapeurs et poussières inhalables/alvéolaires',
      'Mesures de silice cristalline, amiante et métaux lourds dans l\'air',
      'Hygiène industrielle en usine et mines'
    ],
    sectors: ['HSE en milieu minier', 'Laboratoires d\'analyse', 'Amiante & Dépollution'],
    advantages: [
      'Plage de débit immense : de 20 à 5000 mL/min',
      'Correction automatique STP (température et pression standardisées)',
      'Mémoire d\'activité exportable via station de recharge intelligente',
      'Option intrinsèquement sûre pour environnements explosifs'
    ],
    standards_certifications: [
      'ISO 13137:2013',
      'Certifié ATEX II 1 G Ex ia IIC T4 Ga',
      'CE, RoHS'
    ],
    images: ['/products/gilair-plus.png'],
    public_documents: [
      { name: 'Brochure GilAir Plus (FR).pdf', url: '#', size: '3.2 MB' }
    ],
    technical_specifications: [
      {
        group: 'Débits d\'échantillonnage',
        items: [
          { key: 'Haut débit', value: '450 à 5000 mL/min' },
          { key: 'Bas débit', value: '20 à 499 mL/min (sans adaptateur)' },
          { key: 'Précision du débit', value: '± 5% du point de consigne' }
        ]
      },
      {
        group: 'Alimentation & Batterie',
        items: [
          { key: 'Batterie', value: 'NiMH rechargeable haute capacité' },
          { key: 'Autonomie', value: 'Min. 8 heures à 4000 mL/min sous forte perte de charge' }
        ]
      }
    ]
  },
  {
    id: 'prod-ap-20s',
    brand_id: 'brand-sensidyne',
    category_id: 'cat-air',
    name: 'Pompe de détection de gaz par tubes colorimétriques',
    model: 'AP-20S',
    manufacturer_reference: 'AP-20S-KIT',
    slug: 'pompe-detection-gaz-ap-20s',
    short_description: 'Pompe de prélèvement manuelle à piston pour la détection rapide de gaz toxiques à l\'aide de tubes réactifs colorimétriques.',
    long_description: 'La pompe Sensidyne AP-20S est un système d\'échantillonnage de gaz manuel ultra-précis par aspiration à piston. Idéale pour les diagnostics rapides sur site ou les situations d\'urgence, elle permet de détecter et quantifier instantanément plus de 300 gaz et vapeurs toxiques grâce à une large gamme de tubes réactifs gradués à lecture directe.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Détection rapide de fuites de gaz toxiques',
      'Contrôle instantané de la qualité de l\'air en espace confiné',
      'Mesures d\'urgence environnementales'
    ],
    sectors: ['Pétrole & Gaz', 'Assainissement & Eau', 'Industrie Chimique', 'Protection Civile'],
    advantages: [
      'Mécanisme à piston de précision (100 mL de course)',
      'Poignée ergonomique avec indicateur de fin d\'aspiration',
      'Coupe-tube intégré sur le corps de la pompe',
      'Aucune alimentation électrique requise (totalement autonome)'
    ],
    standards_certifications: [
      'Conformité EN 1231',
      'Certifié ATEX (Sécurité Intrinsèque manuelle)'
    ],
    images: ['/products/ap-20s.jpg'],
    public_documents: [
      { name: 'Guide des tubes réactifs Sensidyne.pdf', url: '#', size: '4.8 MB' }
    ],
    technical_specifications: [
      {
        group: 'Prélèvement',
        items: [
          { key: 'Volume d\'aspiration', value: '50 mL ou 100 mL (demi-course ou pleine course)' },
          { key: 'Principe physique', value: 'Aspiration par vide sous piston' }
        ]
      },
      {
        group: 'Poids & Dimensions',
        items: [
          { key: 'Poids', value: '280 grammes' },
          { key: 'Accessoires inclus', value: 'Pompe AP-20S, graisse silicone, embouts de rechange, étui' }
        ]
      }
    ]
  },
  {
    id: 'prod-dustlight',
    brand_id: 'brand-sensidyne',
    category_id: 'cat-air',
    name: 'Moniteur de poussières individuel en temps réel',
    model: 'Gilian Dustlight',
    manufacturer_reference: 'DUSTLIGHT-STD',
    slug: 'moniteur-poussieres-dustlight',
    short_description: 'Appareil portable de mesure continue de la concentration en poussières fines inhalables (PM10, PM2.5, PM1.0, fraction alvéolaire).',
    long_description: 'Le Gilian Dustlight est un moniteur de poussières individuel en temps réel compact et robuste. Il mesure en continu les concentrations de poussières inhalables et alvéolaires en utilisant le principe de la diffusion de lumière laser. Conçu pour le port à la ceinture ou sur l\'épaule, il émet des alertes visuelles (barre lumineuse verte/orange/rouge) et vibrantes lorsque les limites de santé au travail sont dépassées.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Suivi en temps réel de l\'exposition individuelle aux poussières',
      'Détection immédiate de pics de pollution de l\'air de travail',
      'Vérification de l\'efficacité des extracteurs de poussières'
    ],
    sectors: ['BTP & Cimenteries', 'Mines & Carrières', 'Menuiseries & Agroalimentaire'],
    advantages: [
      'Rendu des mesures instantané (PM1, PM2.5, PM4/Alvéolaires, PM10)',
      'Indicateur lumineux tricolore de statut de qualité de l\'air',
      'Poids plume et format ultra-robuste antichoc',
      'Connectivité Bluetooth avec application mobile HSE'
    ],
    standards_certifications: [
      'Conformité CE',
      'Indice de protection IP54'
    ],
    images: ['/products/dustlight.jpg'],
    public_documents: [
      { name: 'Fiche produit Gilian Dustlight.pdf', url: '#', size: '2.2 MB' }
    ],
    technical_specifications: [
      {
        group: 'Technologie de Mesure',
        items: [
          { key: 'Détecteur', value: 'Photomètre laser à diffusion de lumière' },
          { key: 'Plage de mesure', value: '0 à 20 000 µg/m³' },
          { key: 'Canaux mesurés', value: 'PM1.0, PM2.5, PM4.0 (Alvéolaire), PM10' }
        ]
      },
      {
        group: 'Physique & Batterie',
        items: [
          { key: 'Batterie', value: 'Lithium-Polymère rechargeable' },
          { key: 'Autonomie', value: 'Jusqu\'à 16 heures de mesure continue' }
        ]
      }
    ]
  },
  {
    id: 'prod-gocal-pro',
    brand_id: 'brand-sensidyne',
    category_id: 'cat-air',
    name: 'Calibrateur de débit d\'air primaire de précision',
    model: 'Go-Cal Pro',
    manufacturer_reference: 'GOCAL-PRO-KIT',
    slug: 'calibrateur-debit-air-gocal-pro',
    short_description: 'Calibrateur de débit primaire portable à écran tactile pour l\'étalonnage précis des pompes d\'échantillonnage d\'air.',
    long_description: 'Le Gilian Go-Cal Pro est un calibrateur de débit d\'air primaire portable de haute précision. Doté d\'un écran tactile couleur et d\'un capteur de débit à déplacement thermique breveté, il permet d\'étalonner rapidement les pompes d\'échantillonnage individuelles et haut débit. Il compense automatiquement les variations de pression et de température pour fournir des débits standardisés (STP) d\'une précision inégalée de ± 0.75 %.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Étalonnage quotidien obligatoire de terrain des pompes d\'échantillonnage',
      'Certification métrologique de laboratoire des débits d\'air',
      'Contrôle d\'intégrité des lignes de prélèvement'
    ],
    sectors: ['Laboratoires de métrologie', 'Cabinets d\'audit HSE', 'Services de maintenance industrielle'],
    advantages: [
      'Précision de débit primaire de ± 0.75% de la mesure',
      'Écran tactile couleur intuitif avec graphiques intégrés',
      'Trois plages de débits disponibles couvrant de 10 mL/min à 20 L/min',
      'Correction automatique STP de la pression et de la température'
    ],
    standards_certifications: [
      'Traçabilité NIST',
      'Conforme aux exigences d\'étalonnage ISO 13137'
    ],
    images: ['/products/gocal-pro.png'],
    public_documents: [
      { name: 'Fiche technique Gilian Go-Cal Pro.pdf', url: '#', size: '2.6 MB' }
    ],
    technical_specifications: [
      {
        group: 'Métrologie',
        items: [
          { key: 'Plage de débit', value: 'Modèle High: 4 000 à 20 000 cc/min (autres modèles dispo)' },
          { key: 'Précision', value: '± 0.75% ou ± 0.005 LPM' },
          { key: 'Unités de mesure', value: 'cc/min, mL/min, LPM' }
        ]
      },
      {
        group: 'Interface & Physique',
        items: [
          { key: 'Affichage', value: 'Écran tactile couleur 4.3 pouces' },
          { key: 'Connectivité', value: 'Port USB de transfert de données de calibrage' }
        ]
      }
    ]
  },
  {
    id: 'prod-gilian-800i',
    brand_id: 'brand-sensidyne',
    category_id: 'cat-air',
    name: 'Pompe d\'échantillonnage d\'air individuelle bas débit',
    model: 'Gilian 800i',
    manufacturer_reference: 'Gilian-800i',
    slug: 'pompe-echantillonnage-gilian-800i',
    short_description: 'Pompe de prélèvement d\'air individuelle de haute performance couvrant des débits de 20 à 800 mL/min.',
    long_description: 'La Gilian 800i est une pompe d\'échantillonnage d\'air individuelle bas débit certifiée ATEX/IECEx (Intrinsèquement Sûre). Spécialement conçue pour les prélèvements de gaz et vapeurs sur charbon actif ou gels de silice avec des débits stables entre 20 et 800 mL/min, elle offre une régulation électronique de débit extrêmement précise et compense les pertes de charges élevées.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Échantillonnage de gaz et vapeurs à bas débit sur tubes réactifs',
      'Mesures d\'exposition individuelle aux solvants organiques',
      'Hygiène du travail en raffineries et industrie chimique'
    ],
    sectors: ['Pétrole & Gaz', 'Industries Chimiques', 'Bureaux d\'études HSE'],
    advantages: [
      'Régulation de débit électronique ultra-précise',
      'Homologation ATEX zone 0 intrinsèquement sûre',
      'Écran LCD affichant le débit et le temps de prélèvement',
      'Indicateur de défaut de débit avec arrêt automatique sécurisé'
    ],
    standards_certifications: [
      'Certifié ATEX / IECEx Zone 0',
      'ISO 13137',
      'CE'
    ],
    images: ['/products/gilian-800i.png'],
    public_documents: [
      { name: 'Fiche technique Gilian 800i.pdf', url: '#', size: '1.9 MB' }
    ],
    technical_specifications: [
      {
        group: 'Plage de Débit',
        items: [
          { key: 'Plage de débit', value: '20 à 800 mL/min' },
          { key: 'Contrôle du débit', value: 'Électronique à débit constant avec compensation de charge' }
        ]
      },
      {
        group: 'Alimentation',
        items: [
          { key: 'Batterie', value: 'Bloc NiMH rechargeable intégré' },
          { key: 'Autonomie', value: 'Jusqu\'à 12 heures de fonctionnement à débit max.' }
        ]
      }
    ]
  },
  {
    id: 'prod-gilibrator-2',
    brand_id: 'brand-sensidyne',
    category_id: 'cat-air',
    name: 'Calibrateur de débit d\'air primaire à bulles',
    model: 'Gilibrator 2',
    manufacturer_reference: 'GILIBRATOR-2',
    slug: 'calibrateur-bulles-gilibrator-2',
    short_description: 'Système de calibrage de débit d\'air primaire à bulles de savon de référence pour pompes de prélèvement.',
    long_description: 'Le Gilibrator 2 est le système d\'étalonnage de débit d\'air de référence standard de l\'industrie. Basé sur le principe de la bulle de savon montante dans une cellule de verre graduée par détection optique, il permet de certifier avec une précision primaire absolue le débit des pompes individuelles et haut débit. Il est livré avec trois cellules interchangeables (bas, standard et haut débit).',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Certification primaire métrologique en laboratoire',
      'Étalonnage périodique réglementaire de pompes de prélèvement',
      'Vérification de chaînes d\'échantillonnage d\'hygiène du travail'
    ],
    sectors: ['Laboratoires d\'étalonnage', 'Organismes de contrôle HSE', 'Universités & Centres de recherche'],
    advantages: [
      'Principe physique de calibrage primaire indiscutable',
      '3 cellules de débit interchangeables (de 1 cc/min à 30 LPM)',
      'Calcul et moyennage automatique des échantillons de test',
      'Sortie imprimante et liaison PC pour rapports métrologiques'
    ],
    standards_certifications: [
      'Traçabilité primaire NIST',
      'Conforme aux normes ISO 17025'
    ],
    images: ['/products/gilibrator-2.jpg'],
    public_documents: [
      { name: 'Manuel d\'utilisation Gilibrator 2.pdf', url: '#', size: '3.1 MB' }
    ],
    technical_specifications: [
      {
        group: 'Cellules de Débit',
        items: [
          { key: 'Cellule Bas Débit', value: '1 à 250 cc/min' },
          { key: 'Cellule Débit Standard', value: '20 cc/min à 6 LPM' },
          { key: 'Cellule Haut Débit', value: '2 à 30 LPM' }
        ]
      },
      {
        group: 'Base Métrologique',
        items: [
          { key: 'Précision', value: 'Supérieure à ± 0.5% du débit' },
          { key: 'Alimentation', value: 'Secteur ou batterie interne rechargeable' }
        ]
      }
    ]
  },
  {
    id: 'prod-band-v2',
    brand_id: 'brand-slatesafety',
    category_id: 'cat-thermal',
    name: 'Bracelet connecté de biosurveillance en temps réel',
    model: 'BAND V2',
    manufacturer_reference: 'SS-BAND-V2',
    slug: 'bracelet-biosurveillance-band-v2',
    short_description: 'Bracelet industriel connecté pour le suivi en temps réel de la charge thermique et physiologique des équipes exposées aux chaleurs extrêmes.',
    long_description: 'Le BAND V2 de SlateSafety est un bracelet connecté robuste spécialement conçu pour l\'industrie minière, la métallurgie et les chantiers de BTP en zone tropicale. Il surveille en continu la fréquence cardiaque et estime la température interne corporelle à l\'aide d\'algorithmes validés cliniquement. En cas de dépassement de seuil, le bracelet vibre et alerte instantanément les superviseurs sur une console cloud connectée en réseau cellulaire ou local.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Prévention des coups de chaleur (stress thermique)',
      'Suivi physiologique des équipes d\'intervention d\'urgence (pompiers, sauveteurs)',
      'Sécurisation des travaux en espaces confinés et chantiers de surface'
    ],
    sectors: ['Mines à ciel ouvert et souterraines', 'Fonderies & Aciéries', 'Secours & Protection Civile'],
    advantages: [
      'Alertes locales vibrantes sur le poignet de l\'opérateur',
      'Transmission sans fil longue portée (LTE-M, LoRa ou Bluetooth)',
      'Matériaux résistants à la sueur, aux flammes et aux chocs',
      'Dashboard cloud centralisé pour les responsables HSE'
    ],
    standards_certifications: [
      'IP68 (imperméabilité totale sous l\'eau)',
      'Normes FCC/CE',
      'Certifications de biocompatibilité des matériaux'
    ],
    images: ['/products/band-v2.jpg'],
    public_documents: [
      { name: 'Présentation SlateSafety BAND V2.pdf', url: '#', size: '1.5 MB' }
    ],
    technical_specifications: [
      {
        group: 'Capteurs embarqués',
        items: [
          { key: 'Fréquence cardiaque', value: 'Plage 30-220 bpm (Capteur optique PPG)' },
          { key: 'Température estimée', value: 'Précision ±0.3°C (Algorithme breveté)' },
          { key: 'Accéléromètre', value: '3 axes pour la détection d\'activité et de chute' }
        ]
      },
      {
        group: 'Connectivité & Batterie',
        items: [
          { key: 'Réseau cellulaire', value: 'LTE-M / NB-IoT intégré' },
          { key: 'Autonomie', value: '24 à 48 heures selon la fréquence d\'émission' }
        ]
      }
    ]
  },
  {
    id: 'prod-slatesafety-starter-kit',
    brand_id: 'brand-slatesafety',
    category_id: 'cat-thermal',
    name: 'Kit de démarrage de biosurveillance industrielle',
    model: 'Starter Kit Case V2',
    manufacturer_reference: 'SS-KIT-V2',
    slug: 'kit-demarrage-biosurveillance-v2',
    short_description: 'Mallette de transport étanche contenant un kit complet de 4 à 8 bracelets BAND V2, la passerelle cellular Gateway V2 et les accessoires.',
    long_description: 'Le SlateSafety Starter Kit Case V2 est une solution de déploiement autonome clé en main pour la protection thermique de vos équipes. Logé dans une mallette de transport renforcée et étanche, ce kit contient des bracelets connectés BAND V2, une passerelle de communication Gateway V2 locale (pour remonter les alertes même sans réseau cellulaire), des stations de recharge individuelles et multiples, un guide de démarrage rapide et tous les câbles nécessaires.',
    availability_status: 'sur_commande',
    status: 'actif',
    applications: [
      'Déploiement rapide de biosurveillance sur nouveaux chantiers',
      'Protection thermique temporaire lors d\'arrêts techniques d\'usines',
      'Kit d\'intervention d\'urgence pour équipes de secours'
    ],
    sectors: ['Mines & Carrières', 'Métallurgie & Aciéries', 'Secours & Pompiers'],
    advantages: [
      'Mallette de transport de chantier ultra-robuste avec mousse pré-découpée',
      'Système de communication Gateway V2 inclus',
      'Multi-chargeur haute vitesse intégré pour recharger tous les bracelets en même temps',
      'Autonomie totale du kit sur batterie externe optionnelle'
    ],
    standards_certifications: [
      'IP67 (Mallette fermée)',
      'Normes CE/FCC'
    ],
    images: ['/products/starter-kit-v2.jpg'],
    public_documents: [
      { name: 'Guide de démarrage rapide Starter Kit.pdf', url: '#', size: '2.8 MB' }
    ],
    technical_specifications: [
      {
        group: 'Contenu du Kit',
        items: [
          { key: 'Bracelets inclus', value: '4 ou 8x bracelets connectés BAND V2' },
          { key: 'Passerelle', value: '1x Gateway V2 avec alimentation' },
          { key: 'Recharge', value: '1x Multi-chargeur V2 + chargeurs individuels' }
        ]
      },
      {
        group: 'Boîtier physique',
        items: [
          { key: 'Dimensions', value: '45 x 35 x 18 cm' },
          { key: 'Poids total du kit', value: 'Environ 4.5 kg' }
        ]
      }
    ]
  },
  {
    id: 'prod-slatesafety-beacon',
    brand_id: 'brand-slatesafety',
    category_id: 'cat-thermal',
    name: 'Balise de localisation et relais réseau',
    model: 'BEACON V2',
    manufacturer_reference: 'SS-BEACON-V2',
    slug: 'balise-relais-beacon-v2',
    short_description: 'Balise Bluetooth étanche pour la localisation précise en intérieur/souterrain et le relais des signaux des bracelets.',
    long_description: 'La balise SlateSafety BEACON V2 est un appareil compact destiné à étendre la couverture de localisation et à relayer les données physiologiques des bracelets BAND V2 dans les zones difficiles d\'accès comme les mines souterraines, les cales de navires ou les structures industrielles massives en béton et acier. Dotée d\'une autonomie de plusieurs années sur pile interne, elle est totalement autonome et étanche.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Localisation de précision des travailleurs en intérieur',
      'Relais réseau Bluetooth dans les galeries souterraines',
      'Délimitation de zones de danger / alertes de proximité'
    ],
    sectors: ['Mines Souterraines', 'Chantiers de BTP Souterrains', 'Maintenance Industrielle complexe'],
    advantages: [
      'Boîtier ultra-compact et robuste',
      'Autonomie de 3 à 5 ans sur pile interne',
      'Installation simplifiée sans câblage nécessaire (sans fil)',
      'Indice de protection IP67 étanche à la poussière minérale'
    ],
    standards_certifications: [
      'IP67',
      'CE/FCC'
    ],
    images: ['/products/beacon-v2.jpg'],
    public_documents: [
      { name: 'Fiche technique BEACON V2.pdf', url: '#', size: '1.2 MB' }
    ],
    technical_specifications: [
      {
        group: 'Spécifications',
        items: [
          { key: 'Portée Bluetooth', value: 'Jusqu\'à 50 mètres en champ libre' },
          { key: 'Fréquence d\'émission', value: 'Bluetooth Low Energy 5.0' }
        ]
      },
      {
        group: 'Physique',
        items: [
          { key: 'Dimensions', value: '5.5 x 5.5 x 1.8 cm' },
          { key: 'Température de service', value: '-20°C à +60°C' }
        ]
      }
    ]
  },
  {
    id: 'prod-quantifit2',
    brand_id: 'brand-ohd',
    category_id: 'cat-respiratory',
    name: 'Système d\'essai d\'ajustement quantitatif des masques',
    model: 'QuantiFit2',
    manufacturer_reference: 'OHD-QF2',
    slug: 'fit-test-quantifit2',
    short_description: 'L\'appareil de Fit Testing le plus rapide au monde fonctionnant par technologie exclusive de pression négative contrôlée (PNC) sans aérosols ni consommables.',
    long_description: 'Le QuantiFit2 d\'OHD utilise la technologie brevetée de pression négative contrôlée pour mesurer scientifiquement les fuites d\'un masque de protection respiratoire. Contrairement aux compteurs de particules traditionnels, il n\'exige aucune génération de particules salines ou d\'huile, et fonctionne simplement avec l\'air ambiant. L\'essai complet prend moins de 2 minutes et peut s\'effectuer en extérieur comme en intérieur, même par grand vent.',
    availability_status: 'sur_commande',
    status: 'actif',
    applications: [
      'Essais d\'ajustement réglementaires annuels (OSHA/HSE)',
      'Vérification de l\'étanchéité des masques complets, demi-masques et appareils respiratoires autonomes',
      'Protection contre les poussières minérales fines (mines)'
    ],
    sectors: ['Mines & Cimenteries', 'Secteur Médical & Laboratoires P3/P4', 'Services d\'Incendie & Sécuritaire'],
    advantages: [
      'Test le plus rapide du marché : moins de 2 minutes chronomètre en main',
      'Zéro consommable requis (pas de sel, d\'alcool ou de chambres de test)',
      'Fonctionne sur batterie portable pour utilisation directe sur le terrain',
      'Logiciel d\'édition de rapports et synchronisation cloud intégrée'
    ],
    standards_certifications: [
      'ISO 16975-3',
      'Norme OSHA 29 CFR 1910.134',
      'CE / CSA'
    ],
    images: ['/products/quantifit2.jpg'],
    public_documents: [
      { name: 'Brochure QuantiFit2 (FR).pdf', url: '#', size: '4.5 MB' }
    ],
    technical_specifications: [
      {
        group: 'Technologie de Test',
        items: [
          { key: 'Méthode', value: 'Pression Négative Contrôlée (PNC)' },
          { key: 'Fluide de test', value: 'Air ambiant (aucun gaz requis)' },
          { key: 'Plage de facteur de fit', value: '1 à 10 000+' }
        ]
      },
      {
        group: 'Interface & Autonomie',
        items: [
          { key: 'Écran', value: 'Écran tactile couleur de 7 pouces' },
          { key: 'Batterie optionnelle', value: 'Autonomie de 6 heures sur batterie Lithium-Ion' },
          { key: 'Connexions', value: 'USB, Bluetooth, Ethernet' }
        ]
      }
    ]
  }
];

export function getStoredRequests(): QuoteRequest[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('ehs_lynx_quote_requests');
  return stored ? JSON.parse(stored) : [];
}

export function saveStoredRequests(requests: QuoteRequest[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ehs_lynx_quote_requests', JSON.stringify(requests));
}

export function generateRFQReference(): string {
  const year = new Date().getFullYear();
  const requests = getStoredRequests();
  const num = String(requests.length + 1).padStart(6, '0');
  return `RFQ-${year}-${num}`;
}
