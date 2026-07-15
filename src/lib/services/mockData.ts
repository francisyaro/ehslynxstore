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
    logo: 'Svantek logo',
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
    id: 'prod-sv-977d',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Sonomètre de classe 1 et Analyseur de vibrations',
    model: 'SV 977D',
    manufacturer_reference: 'SV977D-STD',
    slug: 'sonometre-sv-977d',
    short_description: 'Sonomètre de précision ultime pour l\'acoustique du bâtiment, la sécurité au travail et l\'analyse des vibrations corporelles.',
    long_description: 'Le SV 977D est le fleuron des sonomètres de classe 1. Doté de capacités avancées de mesure des vibrations, d\'enregistrement audio en temps réel et de connectivité Bluetooth intégrée, il est conçu pour les professionnels exigeant le maximum de précision et de conformité réglementaire (CEI 61672-1). Grâce à son boîtier robuste, il convient aux environnements industriels difficiles comme les mines, la pétrochimie et la construction lourde.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Cartographie sonore de sites industriels',
      'Mesure du bruit environnemental urbain',
      'Mesure de vibrations mains-bras et corps entier',
      'Acoustique du bâtiment et isolation'
    ],
    sectors: ['Mines', 'BTP', 'Cabinets HSE', 'Laboratoires de recherche'],
    advantages: [
      'Garantie constructeur de 3 ans',
      'Génération automatique de rapports conformes aux normes ISO',
      'Robustesse extrême aux chocs et intempéries (IP65 en mallette)',
      'Connectivité Bluetooth et USB'
    ],
    standards_certifications: [
      'CEI 61672-1:2013 (Classe 1)',
      'CEI 61260-1:2014 (Filtres d\'octave)',
      'ISO 8041-1:2017 (Vibrations)'
    ],
    images: ['/products/sv977d.jpg'],
    public_documents: [
      { name: 'Brochure technique SV 977D.pdf', url: '#', size: '2.4 MB' },
      { name: 'Guide d\'utilisation rapide.pdf', url: '#', size: '1.1 MB' }
    ],
    technical_specifications: [
      {
        group: 'Mesure Acoustique',
        items: [
          { key: 'Plage de mesure', value: '25 dBA à 140 dBA Peak' },
          { key: 'Pondérations fréquentielles', value: 'A, C, Z, G' },
          { key: 'Pondérations temporelles', value: 'Lente, Rapide, Impulsion' },
          { key: 'Filtres en temps réel', value: '1/1 d\'octave ou 1/3 d\'octave (options)' }
        ]
      },
      {
        group: 'Alimentation & Autonomie',
        items: [
          { key: 'Piles / Batterie', value: '4x AA rechargeables ou alimentation externe USB' },
          { key: 'Autonomie', value: 'Jusqu\'à 24 heures en fonctionnement continu' }
        ]
      },
      {
        group: 'Mémoire & Connectivité',
        items: [
          { key: 'Stockage', value: 'Carte MicroSD amovible jusqu\'à 128 Go' },
          { key: 'Communication', value: 'USB 2.0, Bluetooth Low Energy (BLE)' }
        ]
      }
    ]
  },
  {
    id: 'prod-sv-104a',
    brand_id: 'brand-svantek',
    category_id: 'cat-noise',
    name: 'Dosimètre de bruit individuel',
    model: 'SV 104A',
    manufacturer_reference: 'SV104A-DOS',
    slug: 'dosimetre-bruit-sv-104a',
    short_description: 'Dosimètre de bruit compact avec microphone incassable en technologie MEMS et écran couleur OLED haute visibilité.',
    long_description: 'Le SV 104A révolutionne la dosimétrie du bruit au travail. Fini les câbles fragiles : le dosimètre s\'attache directement sur l\'épaule du travailleur. Doté d\'un microphone MEMS breveté garanti à vie contre les dommages mécaniques, il offre des analyses fréquentielles en temps réel (1/1 octave) et un enregistrement audio complet pour valider la nature des pics de bruit.',
    availability_status: 'disponible',
    status: 'actif',
    applications: [
      'Évaluation de l\'exposition individuelle au bruit au travail',
      'Contrôle de l\'efficacité des protecteurs auditifs (casques/bouchons)',
      'Mesures de conformité OSHA, MSHA et ACGIH'
    ],
    sectors: ['Mines & Carrières', 'Manufacture & Métallurgie', 'Secteur Pétrole/Gaz'],
    advantages: [
      'Microphone MEMS indestructible garanti à vie',
      'Pas de câble d\'interconnexion pour une sécurité totale de l\'opérateur',
      'Détection automatique de retrait du dosimètre par accéléromètre',
      'Écran couleur OLED lisible en plein soleil ou sous terre'
    ],
    standards_certifications: [
      'CEI 61252',
      'ANSI S1.25',
      'Intrinsèquement Sûr (ATEX / IECEx)'
    ],
    images: ['/products/sv104a.jpg'],
    public_documents: [
      { name: 'Fiche technique SV 104A.pdf', url: '#', size: '1.8 MB' }
    ],
    technical_specifications: [
      {
        group: 'Mesure',
        items: [
          { key: 'Plage dynamique', value: '60 dBA à 140 dBA Peak' },
          { key: 'Pondérations', value: 'A, C et Z simultanés' },
          { key: 'Résolution fréquentielle', value: 'Analyse en bande d\'octave 1/1 (option)' }
        ]
      },
      {
        group: 'Physique & Ergonomie',
        items: [
          { key: 'Poids', value: '117 grammes' },
          { key: 'Affichage', value: 'OLED couleur haute résolution 128x64' },
          { key: 'Fixation', value: 'Double pince robuste pour vêtements' }
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
