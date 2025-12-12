// Core type definitions for the Customer Service Dashboard

export type Marketplace = 'Reverb' | 'eBay' | 'Amazon' | 'Etsy';

export type Priority = 'Low' | 'Medium' | 'High';

export type TicketStatus = 'New' | 'In Progress' | 'Completed';

export interface Tag {
    name: string;
    color: string;
    ID: string;
}

export interface Agent {
    name: string;
    ID: string;
}

export interface FAQAutoResponse {
    faqAutoResponse: string;
    ID: string;
}

export interface CannedResponse {
    response: string;
    ID: string;
}

export interface Message {
    message: string;
    authored: boolean;
    date: string;
    imageAttachments: string[];
}

export interface Ticket {
    ticketID: string;
    marketplace: Marketplace;
    marketplaceConversationID: string;
    customerName: string;
    priority: Priority;
    ticketStatus: TicketStatus;
    assignedTo: string;
    tags: Tag[];
    conversationStartDate: Date;
    lastUpdatedDate: Date;
    messages: Message[];
    orderHistory?: string[];
    relatedListingURL?: string;
}

export type TicketFilters = {
    searchQuery?: string;
    ticketStatus?: TicketStatus;
    priority?: Priority;
    assignedTo?: string;
    tags?: Tag[];
    startDate?: Date;
    endDate?: Date;
}