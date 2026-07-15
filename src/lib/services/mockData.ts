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
    logo: 'Sensidyne logo',
    description: 'Expert incontournable des pompes de prélèvement d\'air individuelles et de la détection de gaz industrielle.'
  },
  {
    id: 'brand-slatesafety',
    name: 'SLATESAFETY',
    slug: 'slatesafety',
    logo: 'SlateSafety logo',
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
    images: ['/products/gilairplus.jpg'],
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
    images: ['/products/bandv2.jpg'],
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
