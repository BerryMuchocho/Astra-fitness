import { GalleryItem, Testimonial, MembershipTier } from './types';

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'core',
    name: 'CORE',
    price: 15000,
    period: '/month',
    features: [
      'Unlimited Gym Access',
      'Locker Room & Showers',
      'Initial Assessment'
    ],
    missingFeatures: [
      'Guest Passes',
      'All Group Classes',
      'Sauna & Cold Plunge'
    ],
    ctaText: 'Begin Private Assessment'
  },
  {
    id: 'elite',
    name: 'ASTRA ELITE',
    price: 25000,
    period: '/month',
    isPopular: true,
    features: [
      'Unlimited Club Access',
      'Recovery Lounge',
      'Personal Performance Assessment',
      'Private Coaching Options'
    ],
    ctaText: 'Join Astra Elite'
  },
  {
    id: 'platinum',
    name: 'BESPOKE PLATINUM',
    price: 45000,
    period: '/month',
    features: [
      'All Elite Features',
      '2 PT Sessions / Month',
      'Nutrition Coaching',
      'Reserved Parking'
    ],
    ctaText: 'Claim Bespoke Platinum Entry'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'James Sterling',
    role: 'Elite Member for 2 Years',
    text: 'Astra Fitness completely redefined what I thought was possible for my physique. The environment is so intense, you have no choice but to improve.',
    stars: 5,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCliqFJkvZlV2AZVjfEsG3gapW3Gf_fYHFhgfm0jnt4XTCY1XZjYIMU7W7pARUF4FQ9IR3_e7zKrGxsZLzkgTqmR6qbZbTVdowgKtFsd0hJgG-G5WN1Tyvuczha6pyYAFbv9IY1DvXaVQUVUkoTeHSUIhJM0uGGMbDTxGHkDUEtuJrr6UHelAp1bHwyjsi5u90Pa4r-JNBRIICC8DE6bcPl6RcKiyzzYTYo1p1inAYHBrQ1acLUWHsHds_HF_u2X13dTVc28WVdHGRR'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'HIIT Athlete',
    text: 'The trainers here are on another level. This is not just a gym; it is a high-performance lab where we refine our bodies and minds every single day.',
    stars: 5,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCii2tOxsqoI_nK02fmFpba8w2EhBnszG65NiyiwuA1GdPxFhkMvFOcoiqGUVjel4LupvhuRrU9VUOE5EIay-gkAGZOkFME2qtAJJtlfxjTa_t72ZTql8VKUkfA4Yt2ca5ldIsvoficOE-E8e8eyCAC-KpuSAuBU8Vad0vMBnAv9LNUjsefQty9nwu7W0zYDGshsA_S8dsL2kGIBNPmeCTET-uFH-xAVY1kRx28_5gNzORjxAl2Tf4YVe_c8HJjZYiCp8Cz6GPJJDBr'
  },
  {
    id: '3',
    name: 'Marcus Vance',
    role: 'Powerlifting Competitor',
    text: 'The caliber of equipment here is unmatched. From competition plates to high-end recovery pods, Astra provides the absolute edge required to dominate.',
    stars: 5,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCliqFJkvZlV2AZVjfEsG3gapW3Gf_fYHFhgfm0jnt4XTCY1XZjYIMU7W7pARUF4FQ9IR3_e7zKrGxsZLzkgTqmR6qbZbTVdowgKtFsd0hJgG-G5WN1Tyvuczha6pyYAFbv9IY1DvXaVQUVUkoTeHSUIhJM0uGGMbDTxGHkDUEtuJrr6UHelAp1bHwyjsi5u90Pa4r-JNBRIICC8DE6bcPl6RcKiyzzYTYo1p1inAYHBrQ1acLUWHsHds_HF_u2X13dTVc28WVdHGRR'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Bicep & Core Strength Split',
    category: 'Strength',
    imageUrl: '/src/assets/images/kenyan_woman_dumbbell_curls.jpg',
    intensity: 'High',
    coach: 'Coach Miller',
    duration: '45 mins',
    equipment: 'Dumbbells',
    description: 'Focused upper body bicep curls and stability sets in our Lavington athletic conditioning zone.'
  },
  {
    id: 'gal-2',
    title: 'Peak Intensity Power Lifts',
    category: 'Strength',
    imageUrl: '/src/assets/images/kenyan_man_weightlifting_focus.jpg',
    intensity: 'Elite',
    coach: 'Coach Angela Wambui',
    duration: '50 mins',
    equipment: 'Olympic Plates',
    description: 'Explosive lifting patterns targeting absolute force output under coaching supervision.'
  },
  {
    id: 'gal-3',
    title: 'Barbell Row Lat Isolation',
    category: 'Strength',
    imageUrl: '/src/assets/images/kenyan_man_barbell_rows.jpg',
    intensity: 'Elite',
    coach: 'Coach Sterling',
    duration: '60 mins',
    equipment: 'Olympic Barbell',
    description: 'Bent-over barbell rows focusing on lat isolation and mechanical spinal alignment.'
  },
  {
    id: 'gal-4',
    title: 'Barbell Squat Mechanics',
    category: 'Strength',
    imageUrl: '/src/assets/images/kenyan_woman_barbell_squat.jpg',
    intensity: 'Elite',
    coach: 'Coach Chen',
    duration: '50 mins',
    equipment: 'Barbell & Rack',
    description: 'Olympic back squats prioritizing deep quadricep loading and kinetic spine safety.'
  },
  {
    id: 'gal-5',
    title: 'Recovery Vinyasa Flow',
    category: 'Yoga',
    imageUrl: '/src/assets/images/lavington_yoga_recovery_1780661455309.png',
    intensity: 'Medium',
    coach: 'Yogi Nekesa',
    duration: '50 mins',
    equipment: 'Eco Grip Mat',
    description: 'Restorative decompression flow to accelerate muscular healing and neural down-regulation.'
  },
  {
    id: 'gal-6',
    title: 'Joint Mobility Decompression',
    category: 'Recovery',
    imageUrl: '/src/assets/images/luxury_kenyan_recovery_v2.png',
    intensity: 'Medium',
    coach: 'Coach Miller',
    duration: '30 mins',
    equipment: 'Resistance Bands',
    description: 'Dynamic stretching sequences designed to improve joint longevity and open up tight hips.'
  },
  {
    id: 'gal-7',
    title: 'Cardio Altitude Zone',
    category: 'Open Gym',
    imageUrl: '/src/assets/images/treadmill_cardio.jpg',
    intensity: 'High',
    coach: 'Self Guided',
    duration: 'Self Paced',
    equipment: 'Technogym Treadmills',
    description: 'High-altitude cardiorespiratory conditioning zone with climate-controlled woodway treadmills.'
  }
];

export interface LuxuryHeroSlide {
  url: string;
  alt: string;
  caption: string;
  mood: string;
}

export const LUXURY_HERO_SLIDES: LuxuryHeroSlide[] = [
  {
    url: '/src/assets/images/astra_building_entrance.jpg',
    alt: 'Sleek luxury glass facade of the Astra Fitness club building entrance with warm lights',
    caption: 'Exclusivity Redefined',
    mood: 'Prestige. Exclusivity. Community.'
  },
  {
    url: '/src/assets/images/luxury_cardio_equipment.png',
    alt: 'Premium state-of-the-art Technogym cardio equipment at Astra Fitness',
    caption: 'World-Class Equipment',
    mood: 'Innovation. Technology. Performance.'
  },
  {
    url: '/src/assets/images/luxury_kenyan_coaching.png',
    alt: 'Elite Kenyan fitness coach guiding an executive client at Astra Fitness',
    caption: 'Personalized Coaching',
    mood: 'Expert Guidance. Results.'
  },
  {
    url: '/src/assets/images/luxury_kenyan_recovery_option3.png',
    alt: 'Kenyan executive relaxing in the ultra-luxury spa wellness recovery lounge',
    caption: 'Recovery Reimagined',
    mood: 'Recovery. Balance. Longevity.'
  },
  {
    url: '/src/assets/images/luxury_kenyan_community_option2.png',
    alt: 'Local Kenyan executives networking in the luxury private lounge bar at Astra Fitness',
    caption: 'Members-Only Lounge',
    mood: 'Quiet workspace and private bar for networking.'
  },
  {
    url: '/src/assets/images/luxury_athlete_strength.png',
    alt: 'Focused high-definition athletic performance training at Astra Fitness Lavington',
    caption: 'Peak Performance',
    mood: 'Strength. Discipline. Excellence.'
  }
];
