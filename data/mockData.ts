
import { Place, Event, CulturalStory, Champion } from '../types';

export const PLACES: Place[] = [
  {
    id: 'p1',
    name: 'Iron Gate Cafe',
    category: 'Food',
    description: 'A charming breakfast and lunch spot located in a historic brownstone.',
    address: '182 Washington Ave, Albany, NY',
    geo: { lat: 42.6526, lng: -73.7562 },
    hours: '8:00 AM - 3:00 PM',
    rating: 4.8,
    image: 'https://picsum.photos/seed/irongate/400/300',
    tags: ['Coffee', 'Healthy', 'Casual']
  },
  {
    id: 'p2',
    name: 'Olde English Pub',
    category: 'Food',
    description: 'Classic British fare served in the historic Quackenbush House.',
    address: '25 Quackenbush Square, Albany, NY',
    geo: { lat: 42.6548, lng: -73.7483 },
    hours: '11:00 AM - 11:00 PM',
    rating: 4.6,
    image: 'https://picsum.photos/seed/oldeenglish/400/300',
    tags: ['Social', 'Casual', 'Pub']
  },
  {
    id: 'p3',
    name: 'Empire State Plaza Art Collection',
    category: 'Culture',
    description: 'One of the most important collections of modern art in the world.',
    address: 'S Mall Arterial, Albany, NY',
    geo: { lat: 42.6506, lng: -73.7597 },
    hours: '24/7 (Outdoor)',
    rating: 4.9,
    image: 'https://picsum.photos/seed/plaza/400/300',
    tags: ['Art', 'Culture', 'Free']
  }
];

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Alive at Five',
    description: 'Free outdoor concert series at Jennings Landing.',
    time: '2024-06-15T17:00:00Z',
    location: 'Jennings Landing',
    organizer: 'City of Albany',
    tags: ['Music', 'Social', 'Free'],
    image: 'https://picsum.photos/seed/alive5/400/300',
    price: 0
  },
  {
    id: 'e2',
    title: 'Albany Tulip Festival',
    description: 'Annual spring festival featuring thousands of tulips and live music.',
    time: '2024-05-11T10:00:00Z',
    location: 'Washington Park',
    organizer: 'City of Albany',
    tags: ['Festival', 'Culture', 'Family'],
    image: 'https://picsum.photos/seed/tulip/400/300',
    price: 0
  },
  {
    id: 'e3',
    title: 'Jazz Night at The Larkin',
    description: 'Intimate jazz performance with local quartets.',
    time: '2024-06-20T19:30:00Z',
    location: 'The Larkin Hi-Fi',
    organizer: 'Larkin Management',
    tags: ['Music', 'Nightlife', 'Paid'],
    image: 'https://picsum.photos/seed/jazz/400/300',
    price: 15
  }
];

export const STORIES: CulturalStory[] = [
  {
    id: 's1',
    title: 'The Ghost of the Capitol',
    content: 'Legend has it that the New York State Capitol is haunted by a former night watchman who perished in the Great Fire of 1911.',
    location: 'NYS Capitol Building',
    geo: { lat: 42.6525, lng: -73.7572 },
    source: 'Albany Archives'
  },
  {
    id: 's2',
    title: 'Erie Canal Gateway',
    content: 'Albany served as the eastern terminus of the Erie Canal, transforming it into a major hub of global commerce in the 19th century.',
    location: 'Quackenbush Square',
    geo: { lat: 42.6548, lng: -73.7483 },
    source: 'NY History Museum'
  }
];

export const CHAMPIONS: Champion[] = [
  {
    id: 'c1',
    name: 'Sarah "The History Buff"',
    category: 'History',
    tagline: 'Uncovering Albany\'s hidden colonial secrets.',
    bio: 'A local archivist who knows every brick of Pearl Street.',
    rating: 4.9,
    pricePerHour: 45,
    availability: ['Mon-Fri After 5 PM', 'Weekends'],
    image: 'https://picsum.photos/seed/sarah/400/400',
    experiences: [
      {
        id: 'ex1',
        championId: 'c1',
        title: 'Hidden Alleyways Tour',
        duration: '90 mins',
        price: 45,
        description: 'Walk through the paths only locals know.',
        meetingPoint: 'Capitol Steps'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Marcus "Palate Master"',
    category: 'Foodie',
    tagline: 'The best wings and burgers in the 518.',
    bio: 'Food blogger and former chef exploring Albany\'s food scene.',
    rating: 4.7,
    pricePerHour: 35,
    availability: ['Lunch Hours', 'Fri-Sat Night'],
    image: 'https://picsum.photos/seed/marcus/400/400',
    experiences: [
      {
        id: 'ex2',
        championId: 'c2',
        title: 'Speakeasy Food Walk',
        duration: '2 hours',
        price: 60,
        description: 'Discover the best secret bites and drinks.',
        meetingPoint: 'Empire State Plaza'
      }
    ]
  },
  {
    id: 'c3',
    name: 'Elena "The Chef"',
    category: 'Foodie',
    tagline: 'Farm-to-table secrets of the Hudson Valley.',
    bio: 'Former culinary instructor passionate about local sourcing.',
    rating: 5.0,
    pricePerHour: 50,
    availability: ['Weekends', 'Evenings'],
    image: 'https://picsum.photos/seed/elena/400/400',
    experiences: [
      {
        id: 'ex3',
        championId: 'c3',
        title: 'Farmers Market Breakfast Crawl',
        duration: '2.5 hours',
        price: 55,
        description: 'Taste the best seasonal ingredients from local vendors.',
        meetingPoint: 'State St & Pearl'
      }
    ]
  }
];
