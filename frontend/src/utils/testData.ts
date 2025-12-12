import type { Tag, Agent, CannedResponse, Ticket } from '../types';

export const testTags: Tag[] = [
    { ID: '1', name: 'WaitingOnShop', color: '#FF6B6B' },
    { ID: '2', name: 'WaitingOnCustomer', color: '#4ECDC4' },
    { ID: '3', name: 'AutoResponded', color: '#95E1D3' },
    { ID: '4', name: 'WaitingOnRestock', color: '#FFE66D' },
    { ID: '5', name: 'Urgent', color: '#FF0000' },
];

export const testAgents: Agent[] = [
    { ID: '1', name: 'Adam' },
    { ID: '2', name: 'Daniel' },
    { ID: '3', name: 'Unassigned' },
];

export const testCannedResponses: CannedResponse[] = [
    { ID: '1', response: 'Thank you for contacting us! We will get back to you shortly.' },
    { ID: '2', response: 'We have received your inquiry and are looking into it.' },
    { ID: '3', response: 'Your order has been shipped and you should receive tracking information soon.' },
    { ID: '4', response: 'We apologize for the inconvenience. Let us make this right for you.' },
    { ID: '5', response: 'Thank you for your patience. We are currently checking on this for you.' },
];

export const testAutoFAQResponse = 'Thank you for your message! This is an automated response. We will review your inquiry and get back to you within 24 hours.';

export const testTickets: Ticket[] = [
    {
        ticketID: 'TKT-001',
        marketplace: 'Reverb',
        marketplaceConversationID: 'RVB-CONV-98765',
        customerName: 'Sarah Johnson',
        priority: 'High',
        ticketStatus: 'In Progress',
        assignedTo: 'Adam',
        tags: [testTags[0]],
        conversationStartDate: new Date('2025-12-01T09:30:00Z'),
        lastUpdatedDate: new Date('2025-12-04T14:22:00Z'),
        messages: [
            {
                message: 'Hello, I ordered a guitar pedal 3 days ago and haven\'t received any shipping updates. Can you help?',
                authored: false,
                date: '2025-12-01T09:30:00Z',
                imageAttachments: []
            },
            {
                message: 'Hi Sarah! Thanks for reaching out. Let me check on your order status right away.',
                authored: true,
                date: '2025-12-01T10:15:00Z',
                imageAttachments: []
            },
            {
                message: 'I found your order! It\'s being prepared for shipment and should go out today. You\'ll receive a tracking number within 24 hours.',
                authored: true,
                date: '2025-12-01T10:18:00Z',
                imageAttachments: []
            },
            {
                message: 'Thank you so much! I appreciate the quick response.',
                authored: false,
                date: '2025-12-01T11:05:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: ['ORD-1001', 'ORD-0892'],
        relatedListingURL: 'https://reverb.com/item/89012'
    },
    {
        ticketID: 'TKT-002',
        marketplace: 'eBay',
        marketplaceConversationID: 'EBAY-MSG-54321',
        customerName: 'Michael Chen',
        priority: 'Medium',
        ticketStatus: 'In Progress',
        assignedTo: 'Daniel',
        tags: [testTags[1]],
        conversationStartDate: new Date('2025-12-02T14:20:00Z'),
        lastUpdatedDate: new Date('2025-12-03T16:45:00Z'),
        messages: [
            {
                message: 'The amplifier I received has a slight buzz. Is this normal?',
                authored: false,
                date: '2025-12-02T14:20:00Z',
                imageAttachments: []
            },
            {
                message: 'Hi Michael, thanks for letting us know. A slight buzz can sometimes be normal depending on the amp. Could you send me a video showing the issue?',
                authored: true,
                date: '2025-12-02T15:30:00Z',
                imageAttachments: []
            },
            {
                message: 'Sure, here\'s a video of the buzz',
                authored: false,
                date: '2025-12-03T10:15:00Z',
                imageAttachments: ['https://dgsimages.s3.amazonaws.com/1FBS_1PR.jpg']
            },
            {
                message: 'Thanks for the video. That buzz doesn\'t sound normal. We\'d like to offer you a full refund or replacement. Which would you prefer?',
                authored: true,
                date: '2025-12-03T16:45:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: ['ORD-1023'],
        relatedListingURL: 'https://ebay.com/itm/345678'
    },
    {
        ticketID: 'TKT-003',
        marketplace: 'Reverb',
        marketplaceConversationID: 'RVB-CONV-11223',
        customerName: 'Emily Rodriguez',
        priority: 'Low',
        ticketStatus: 'In Progress',
        assignedTo: 'Adam',
        tags: [testTags[2], testTags[3]],
        conversationStartDate: new Date('2025-11-28T08:15:00Z'),
        lastUpdatedDate: new Date('2025-11-29T09:00:00Z'),
        messages: [
            {
                message: 'Do you have the vintage delay pedal in stock? The listing shows out of stock.',
                authored: false,
                date: '2025-11-28T08:15:00Z',
                imageAttachments: []
            },
            {
                message: 'Thank you for your message! We\'re currently restocking this item. We\'ll notify you as soon as it\'s available again.',
                authored: true,
                date: '2025-11-28T08:17:00Z',
                imageAttachments: []
            },
            {
                message: 'We expect to have the vintage delay pedal back in stock within 1-2 weeks. I can add you to our notification list!',
                authored: true,
                date: '2025-11-29T09:00:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: [],
        relatedListingURL: 'https://reverb.com/item/56789'
    },
    {
        ticketID: 'TKT-004',
        marketplace: 'eBay',
        marketplaceConversationID: 'EBAY-MSG-99887',
        customerName: 'David Thompson',
        priority: 'High',
        ticketStatus: 'In Progress',
        assignedTo: 'Daniel',
        tags: [testTags[0]],
        conversationStartDate: new Date('2025-12-03T11:00:00Z'),
        lastUpdatedDate: new Date('2025-12-04T13:30:00Z'),
        messages: [
            {
                message: 'I need to return this microphone. It\'s not what I expected based on the description.',
                authored: false,
                date: '2025-12-03T11:00:00Z',
                imageAttachments: []
            },
            {
                message: 'I\'m sorry to hear that! We want to make this right. Can you tell me what specifically didn\'t match the description?',
                authored: true,
                date: '2025-12-03T12:15:00Z',
                imageAttachments: []
            },
            {
                message: 'The listing said it was a condenser mic but this appears to be dynamic. Here are photos.',
                authored: false,
                date: '2025-12-03T14:20:00Z',
                imageAttachments: ['https://dgsimages.s3.amazonaws.com/1FBS_1PR.jpg']
            },
            {
                message: 'You\'re absolutely right - that\'s our mistake. We\'ll send you a prepaid return label and process a full refund immediately. I sincerely apologize for the error.',
                authored: true,
                date: '2025-12-04T13:30:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: ['ORD-1045'],
        relatedListingURL: 'https://ebay.com/itm/112233'
    },
    {
        ticketID: 'TKT-005',
        marketplace: 'Reverb',
        marketplaceConversationID: 'RVB-CONV-44556',
        customerName: 'Jessica Martinez',
        priority: 'Medium',
        ticketStatus: 'In Progress',
        assignedTo: 'Adam',
        tags: [testTags[1], testTags[2]],
        conversationStartDate: new Date('2025-11-30T16:45:00Z'),
        lastUpdatedDate: new Date('2025-12-02T10:30:00Z'),
        messages: [
            {
                message: 'Is the synthesizer compatible with MIDI controllers?',
                authored: false,
                date: '2025-11-30T16:45:00Z',
                imageAttachments: []
            },
            {
                message: 'Thank you for your question! Let me check the specifications for you.',
                authored: true,
                date: '2025-11-30T16:47:00Z',
                imageAttachments: []
            },
            {
                message: 'Yes! This synthesizer has both MIDI in and MIDI out, so it\'s fully compatible with MIDI controllers. It supports all standard MIDI messages.',
                authored: true,
                date: '2025-12-01T09:20:00Z',
                imageAttachments: []
            },
            {
                message: 'Perfect! One more question - does it come with the power adapter?',
                authored: false,
                date: '2025-12-02T10:30:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: [],
        relatedListingURL: 'https://reverb.com/item/334455'
    },
    {
        ticketID: 'TKT-006',
        marketplace: 'Reverb',
        marketplaceConversationID: 'RVB-CONV-77889',
        customerName: 'Robert Williams',
        priority: 'Low',
        ticketStatus: 'Completed',
        assignedTo: 'Daniel',
        tags: [],
        conversationStartDate: new Date('2025-11-25T13:20:00Z'),
        lastUpdatedDate: new Date('2025-11-26T14:00:00Z'),
        messages: [
            {
                message: 'Just received my order! Everything looks great, thank you!',
                authored: false,
                date: '2025-11-25T13:20:00Z',
                imageAttachments: []
            },
            {
                message: 'That\'s wonderful to hear! We\'re so glad everything arrived in perfect condition. Thank you for your purchase and enjoy your new gear!',
                authored: true,
                date: '2025-11-26T14:00:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: ['ORD-0956', 'ORD-0823'],
        relatedListingURL: 'https://reverb.com/item/998877'
    },
    {
        ticketID: 'TKT-007',
        marketplace: 'eBay',
        marketplaceConversationID: 'EBAY-MSG-66554',
        customerName: 'Amanda Lee',
        priority: 'High',
        ticketStatus: 'New',
        assignedTo: 'Adam',
        tags: [testTags[0]],
        conversationStartDate: new Date('2025-12-04T08:00:00Z'),
        lastUpdatedDate: new Date('2025-12-04T08:05:00Z'),
        messages: [
            {
                message: 'I just placed an order but I need to change the shipping address! Can you help?',
                authored: false,
                date: '2025-12-04T08:00:00Z',
                imageAttachments: []
            },
            {
                message: 'Absolutely! I\'m looking into this right now. What\'s the correct shipping address?',
                authored: true,
                date: '2025-12-04T08:05:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: ['ORD-1078']
    },
    {
        ticketID: 'TKT-008',
        marketplace: 'Reverb',
        marketplaceConversationID: 'RVB-CONV-22114',
        customerName: 'Christopher Brown',
        priority: 'Medium',
        ticketStatus: 'In Progress',
        assignedTo: 'Daniel',
        tags: [testTags[3]],
        conversationStartDate: new Date('2025-11-29T10:30:00Z'),
        lastUpdatedDate: new Date('2025-12-01T15:45:00Z'),
        messages: [
            {
                message: 'Will you be getting more of the vintage tube amps in stock?',
                authored: false,
                date: '2025-11-29T10:30:00Z',
                imageAttachments: []
            },
            {
                message: 'Great question! We\'re actively looking for more vintage tube amps. I\'ll add you to our notification list.',
                authored: true,
                date: '2025-11-30T09:15:00Z',
                imageAttachments: []
            },
            {
                message: 'We just acquired a similar model! It\'s a 1965 Fender Deluxe Reverb. Would you like more details?',
                authored: true,
                date: '2025-12-01T15:45:00Z',
                imageAttachments: []
            }
        ],
        orderHistory: ['ORD-0734']
    }
];
