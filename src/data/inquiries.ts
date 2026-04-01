export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: 'new' | 'pending' | 'replied' | 'quoted' | 'closed';
  date: string;
  source: string;
  interestedProduct?: string;
  internalNotes?: string;
}

export const mockInquiries: Inquiry[] = [
  {
    id: 'INQ-2026-001',
    name: 'Michael Chen',
    email: 'm.chen@hospitality-group.com',
    phone: '+1 (555) 123-4567',
    company: 'OceanView Resorts',
    subject: 'Bulk Order Query for Outdoor Loungers',
    message: 'We are renovating our poolside area in Q3 and need to replace exactly 150 sun loungers. We are very interested in your Teak Wood collections. Please provide a quote including estimated shipping to Miami, FL.',
    status: 'new',
    date: '2026-03-27T08:30:00Z',
    source: 'Product Page',
    interestedProduct: 'p001', // Aria Dining Table (mock link)
  },
  {
    id: 'INQ-2026-002',
    name: 'Sarah Jenkins',
    email: 's.jenkins@designstudio.uk',
    phone: '+44 20 7123 4567',
    company: 'SJ Architect & Interiors',
    subject: 'Trade Account Application & Catalog Request',
    message: 'I would like to open a trade account. Our firm specializes in high-end residential projects across London. Do you offer custom fabrics for the modular sofa sets?',
    status: 'replied',
    date: '2026-03-26T14:15:00Z',
    source: 'Contact Form',
    internalNotes: 'Sent digital catalog and trade application link on Mar 26.',
  },
  {
    id: 'INQ-2026-003',
    name: 'Hiroshi Tanaka',
    email: 'htanaka@pacific-imports.jp',
    phone: '+81 3 1234 5678',
    company: 'Pacific Imports Ltd.',
    subject: 'Distributor Inquiry - Japan Region',
    message: 'We are a major furniture distributor based in Tokyo. We are interested in representing DHT Furniture in the Japanese market. Are you open to exclusive distributor agreements?',
    status: 'pending',
    date: '2026-03-25T09:00:00Z',
    source: 'Direct Email',
    internalNotes: 'Forwarded to Executive Board for review.',
  },
  {
    id: 'INQ-2026-004',
    name: 'Emma Dubois',
    email: 'emma.d@bistro-paris.fr',
    phone: '+33 1 23 45 67 89',
    company: 'Le Petit Bistro',
    subject: 'Outdoor Dining Chairs for Cafe',
    message: 'Hello, we need 40 outdoor dining chairs that can withstand heavy rain and are easily stackable. Can you recommend the best models and provide pricing?',
    status: 'quoted',
    date: '2026-03-24T16:45:00Z',
    source: 'WhatsApp',
    interestedProduct: 'p002', // Bali Rattan Set
    internalNotes: 'Quoted $4,500 total inclusive of shipping. Awaiting response.',
  },
  {
    id: 'INQ-2026-005',
    name: 'David Smith',
    email: 'dsmith@residential.com',
    phone: '+61 2 9876 5432',
    company: 'Individual',
    subject: 'Warranty Claim - Table Top',
    message: 'The outdoor table I purchased last year has started to show a crack on the surface. How do I proceed with a warranty claim?',
    status: 'closed',
    date: '2026-03-10T11:20:00Z',
    source: 'WhatsApp',
    internalNotes: 'Warranty department handled. Replacement top shipped on Mar 12.',
  },
];
