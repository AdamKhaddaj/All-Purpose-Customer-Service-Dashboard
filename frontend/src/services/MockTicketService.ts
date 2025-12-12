import type { Ticket, TicketFilters, Tag, Agent, FAQAutoResponse, CannedResponse } from '../types';

// Mock data storage
let mockTags: Tag[] = [
    { ID: '1', name: 'WaitingOnShop', color: '#FF6B6B' },
    { ID: '2', name: 'WaitingOnCustomer', color: '#4ECDC4' },
    { ID: '3', name: 'AutoResponded', color: '#95E1D3' },
    { ID: '4', name: 'WaitingOnRestock', color: '#FFE66D' },
    { ID: '5', name: 'Urgent', color: '#FF0000' },
];

let mockAgents: Agent[] = [
    { ID: '1', name: 'Adam' },
    { ID: '2', name: 'Daniel' },
    { ID: '3', name: 'Unassigned' },
];

let mockCannedResponses: CannedResponse[] = [
    { ID: '1', response: 'Thank you for contacting us! We will get back to you shortly.' },
    { ID: '2', response: 'We have received your inquiry and are looking into it.' },
    { ID: '3', response: 'Your order has been shipped and you should receive tracking information soon.' },
    { ID: '4', response: 'We apologize for the inconvenience. Let us make this right for you.' },
    { ID: '5', response: 'Thank you for your patience. We are currently checking on this for you.' },
];

let mockFAQAutoResponse: FAQAutoResponse = {
    ID: '1',
    faqAutoResponse: 'Thank you for your message! This is an automated response. We will review your inquiry and get back to you within 24 hours.'
};

let mockTickets: Ticket[] = [
    {
        ticketID: 'TKT-001',
        marketplace: 'Reverb',
        marketplaceConversationID: 'RVB-CONV-98765',
        customerName: 'Sarah Johnson',
        priority: 'High',
        ticketStatus: 'In Progress',
        assignedTo: 'Adam',
        tags: [mockTags[0]],
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
        tags: [mockTags[1]],
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
        tags: [mockTags[2], mockTags[3]],
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
        tags: [mockTags[0]],
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
        tags: [mockTags[1], mockTags[2]],
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
        tags: [mockTags[0]],
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
        tags: [mockTags[3]],
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

// Helper to simulate async delay
const delay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to filter tickets based on filters
function filterTickets(tickets: Ticket[], filters: TicketFilters): Ticket[] {
    return tickets.filter(ticket => {
        // Search filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const matchesSearch =
                ticket.customerName.toLowerCase().includes(query) ||
                ticket.ticketID.toLowerCase().includes(query) ||
                ticket.messages.some(m => m.message.toLowerCase().includes(query));
            if (!matchesSearch) return false;
        }

        // Status filter
        if (filters.ticketStatus && ticket.ticketStatus !== filters.ticketStatus) {
            return false;
        }

        // Priority filter
        if (filters.priority && ticket.priority !== filters.priority) {
            return false;
        }

        // Agent filter
        if (filters.assignedTo && ticket.assignedTo !== filters.assignedTo) {
            return false;
        }

        // Tags filter
        if (filters.tags && filters.tags.length > 0) {
            const hasAllTags = filters.tags.every(filterTag =>
                ticket.tags.some(ticketTag => ticketTag.ID === filterTag.ID)
            );
            if (!hasAllTags) return false;
        }

        // Date filter
        if (filters.startDate && ticket.conversationStartDate < filters.startDate) {
            return false;
        }

        if (filters.endDate && ticket.conversationStartDate > filters.endDate) {
            return false;
        }

        return true;
    });
}

class MockTicketService {

    // Ticket Operations

    async getTickets(filters: TicketFilters = {}): Promise<Ticket[]> {
        await delay();
        console.log('Mock Service: Getting tickets with filters', filters);
        return filterTickets([...mockTickets], filters);
    }

    async updateTicket(ticketID: string, field: Partial<Ticket>): Promise<Ticket> {
        await delay();
        console.log('Mock Service: Updating ticket', ticketID, field);

        const ticketIndex = mockTickets.findIndex(t => t.ticketID === ticketID);
        if (ticketIndex === -1) {
            throw new Error(`Ticket ${ticketID} not found`);
        }

        mockTickets[ticketIndex] = {
            ...mockTickets[ticketIndex],
            ...field,
            lastUpdatedDate: new Date()
        };

        return mockTickets[ticketIndex];
    }

    async replyToTicket(ticketId: string, reply: string): Promise<Ticket> {
        await delay();
        console.log('Mock Service: Replying to ticket', ticketId, reply);

        const ticketIndex = mockTickets.findIndex(t => t.ticketID === ticketId);
        if (ticketIndex === -1) {
            throw new Error(`Ticket ${ticketId} not found`);
        }

        const newMessage = {
            message: reply,
            authored: true,
            date: new Date().toISOString(),
            imageAttachments: []
        };

        mockTickets[ticketIndex].messages.push(newMessage);
        mockTickets[ticketIndex].lastUpdatedDate = new Date();

        return mockTickets[ticketIndex];
    }

    // Tag Operations

    async getAllTags(): Promise<Tag[]> {
        await delay();
        console.log('Mock Service: Getting all tags');
        return [...mockTags];
    }

    async createTag(tagData: Tag): Promise<Tag> {
        await delay();
        console.log('Mock Service: Creating tag', tagData);

        const newTag: Tag = {
            ...tagData,
            ID: `${mockTags.length + 1}`
        };
        mockTags.push(newTag);
        return newTag;
    }

    async updateTag(tagId: string, updates: Partial<Tag>): Promise<Tag> {
        await delay();
        console.log('Mock Service: Updating tag', tagId, updates);

        const tagIndex = mockTags.findIndex(t => t.ID === tagId);
        if (tagIndex === -1) {
            throw new Error(`Tag ${tagId} not found`);
        }

        mockTags[tagIndex] = {
            ...mockTags[tagIndex],
            ...updates
        };

        return mockTags[tagIndex];
    }

    async deleteTag(tagId: string): Promise<void> {
        await delay();
        console.log('Mock Service: Deleting tag', tagId);

        const tagIndex = mockTags.findIndex(t => t.ID === tagId);
        if (tagIndex === -1) {
            throw new Error(`Tag ${tagId} not found`);
        }

        // Remove tag from all tickets
        mockTickets.forEach(ticket => {
            ticket.tags = ticket.tags.filter(tag => tag.ID !== tagId);
        });

        mockTags.splice(tagIndex, 1);
    }

    // Agent Operations

    async getAllAgents(): Promise<Agent[]> {
        await delay();
        console.log('Mock Service: Getting all agents');
        return [...mockAgents];
    }

    async createAgent(newAgentName: string): Promise<Agent> {
        await delay();
        console.log('Mock Service: Creating agent', newAgentName);

        const newAgent: Agent = {
            ID: `${mockAgents.length + 1}`,
            name: newAgentName
        };
        mockAgents.push(newAgent);
        return newAgent;
    }

    async updateAgent(agentID: string, updates: Partial<Agent>): Promise<Agent> {
        await delay();
        console.log('Mock Service: Updating agent', agentID, updates);

        const agentIndex = mockAgents.findIndex(a => a.ID === agentID);
        if (agentIndex === -1) {
            throw new Error(`Agent ${agentID} not found`);
        }

        mockAgents[agentIndex] = {
            ...mockAgents[agentIndex],
            ...updates
        };

        return mockAgents[agentIndex];
    }

    async deleteAgent(agentID: string): Promise<void> {
        await delay();
        console.log('Mock Service: Deleting agent', agentID);

        const agentIndex = mockAgents.findIndex(a => a.ID === agentID);
        if (agentIndex === -1) {
            throw new Error(`Agent ${agentID} not found`);
        }

        const agentName = mockAgents[agentIndex].name;

        // Unassign all tickets assigned to this agent
        mockTickets.forEach(ticket => {
            if (ticket.assignedTo === agentName) {
                ticket.assignedTo = 'Unassigned';
            }
        });

        mockAgents.splice(agentIndex, 1);
    }

    // FAQ Configuration

    async getFAQAutoResponse(): Promise<string> {
        await delay();
        console.log('Mock Service: Getting FAQ auto response');
        return mockFAQAutoResponse.faqAutoResponse;
    }

    async updateFAQautoResponse(FAQautoResponseID: string, updates: Partial<FAQAutoResponse>): Promise<FAQAutoResponse> {
        await delay();
        console.log('Mock Service: Updating FAQ auto response', FAQautoResponseID, updates);

        mockFAQAutoResponse = {
            ...mockFAQAutoResponse,
            ...updates
        };

        return mockFAQAutoResponse;
    }

    // Canned Responses

    async getCannedResponses(): Promise<CannedResponse[]> {
        await delay();
        console.log('Mock Service: Getting canned responses');
        return [...mockCannedResponses];
    }

    async createCannedResponse(responseData: string): Promise<CannedResponse> {
        await delay();
        console.log('Mock Service: Creating canned response', responseData);

        const newResponse: CannedResponse = {
            ID: `${mockCannedResponses.length + 1}`,
            response: responseData
        };
        mockCannedResponses.push(newResponse);
        return newResponse;
    }

    async updateCannedResponse(responseID: string, updates: Partial<CannedResponse>): Promise<CannedResponse> {
        await delay();
        console.log('Mock Service: Updating canned response', responseID, updates);

        const responseIndex = mockCannedResponses.findIndex(r => r.ID === responseID);
        if (responseIndex === -1) {
            throw new Error(`Canned response ${responseID} not found`);
        }

        mockCannedResponses[responseIndex] = {
            ...mockCannedResponses[responseIndex],
            ...updates
        };

        return mockCannedResponses[responseIndex];
    }

    async deleteCannedResponse(responseID: string): Promise<void> {
        await delay();
        console.log('Mock Service: Deleting canned response', responseID);

        const responseIndex = mockCannedResponses.findIndex(r => r.ID === responseID);
        if (responseIndex === -1) {
            throw new Error(`Canned response ${responseID} not found`);
        }

        mockCannedResponses.splice(responseIndex, 1);
    }
}

// Create and export a single instance of the mock service
const mockTicketService = new MockTicketService();

export default mockTicketService;
