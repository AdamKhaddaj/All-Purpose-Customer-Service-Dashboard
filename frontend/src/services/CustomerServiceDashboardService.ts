import type { Ticket, TicketFilters, Tag, Agent, FAQAutoResponse, CannedResponse } from '../types';

const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:5000/api';

// General request function to use throughout the service
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }

    return res.json() as Promise<T>;
}


class TicketService {

    // Ticket Operations

    async getTickets(filters: TicketFilters = {}): Promise<Ticket[]> {
        // Clean up empty filters and map to backend parameter names
        const queryParams = new URLSearchParams();

        if (filters.searchQuery && filters.searchQuery.trim()) {
            queryParams.append('search', filters.searchQuery.trim());
        }

        if (filters.ticketStatus) {
            queryParams.append('ticketStatus', filters.ticketStatus);
        }

        if (filters.priority) {
            queryParams.append('priority', filters.priority);
        }

        if (filters.assignedTo) {
            queryParams.append('assignedTo', filters.assignedTo);
        }

        if (filters.tags && filters.tags.length > 0) {
            queryParams.append('tags', JSON.stringify(filters.tags));
        }

        if (filters.startDate) {
            queryParams.append('startDate', filters.startDate.toISOString());
        }

        if (filters.endDate) {
            queryParams.append('endDate', filters.endDate.toISOString());
        }

        let endpoint = `${API_BASE_URL}/tickets`;
        const queryString = queryParams.toString();
        if (queryString) {
            endpoint += `?${queryString}`;
        }

        return request<Ticket[]>(endpoint, { method: 'GET' });
    }


    async updateTicket(ticketID: string, field: Partial<Ticket>): Promise<Ticket> {
        return request<Ticket>(`/tickets/${ticketID}`, {
            method: 'PUT',
            body: JSON.stringify(field),
        });
    }

    async replyToTicket(ticketId: string, reply: string): Promise<Ticket> {
        return request<Ticket>(
            `/tickets/${ticketId}/reply`,
            {
                method: 'PUT',
                body: JSON.stringify(reply),
            }
        );
    }


    // Tag Operations

    async getAllTags(): Promise<Tag[]> {
        return request<Tag[]>(
            `/tags`,
            {
                method: 'GET',
            }
        );
    }

    async createTag(tagData: Tag): Promise<Tag> {
        return request<Tag>(
            `/tags`,
            {
                method: 'POST',
                body: JSON.stringify(tagData),
            }
        );
    }

    async updateTag(tagId: string, updates: Partial<Tag>): Promise<Tag> {
        return request<Tag>(
            `/tags/${tagId}`,
            {
                method: 'PUT',
                body: JSON.stringify(updates),
            }
        );
    }

    async deleteTag(tagId: string): Promise<void> {
        return request<void>(
            `/tags/${tagId}`,
            {
                method: 'DELETE',
            }
        );
    }

    // Agent Operations

    async getAllAgents(): Promise<Agent[]> {
        return request<Agent[]>(`/agents`);
    }


    async createAgent(newAgentName: string): Promise<Agent> {
        return request<Agent>(
            `/agents`,
            {
                method: 'POST',
                body: JSON.stringify(newAgentName),
            }
        );
    }

    async updateAgent(agentID: string, updates: Partial<Agent>): Promise<Agent> {
        return request<Agent>(
            `/agents/${agentID}`,
            {
                method: 'PUT',
                body: JSON.stringify(updates),
            }
        );
    }

    async deleteAgent(agentID: string): Promise<void> {
        return request<void>(
            `/agents/${agentID}`,
            {
                method: 'DELETE',
            }
        );
    }


    // FAQ Configuration

    async getFAQAutoResponse(): Promise<string> {
        return request<string>(`/faqAutoResponse`, { method: 'GET' });
    }

    async updateFAQautoResponse(FAQautoResponseID: string, updates: Partial<FAQAutoResponse>): Promise<FAQAutoResponse> {
        return request<FAQAutoResponse>(
            `/faqAutoResponse/${FAQautoResponseID}`,
            {
                method: 'PUT',
                body: JSON.stringify(updates),
            }
        );
    }

    // Canned Responses

    async getCannedResponses(): Promise<CannedResponse[]> {
        return request<CannedResponse[]>(`/cannedResponses`, { method: 'GET' });
    }

    async createCannedResponse(responseData: string): Promise<CannedResponse> {
        return request<CannedResponse>(
            `/cannedResponses`,
            {
                method: 'POST',
                body: JSON.stringify(responseData),
            }
        );
    }

    async updateCannedResponse(responseID: string, updates: Partial<CannedResponse>): Promise<CannedResponse> {
        return request<CannedResponse>(
            `/cannedResponses/${responseID}`,
            {
                method: 'PUT',
                body: JSON.stringify(updates),
            }
        );
    }


    async deleteCannedResponse(responseID: string): Promise<void> {
        return request<void>(
            `/cannedResponses/${responseID}`,
            {
                method: 'DELETE',
            }
        );
    }

}

// Create and export a single instance of the service
const ticketService = new TicketService();

export default ticketService;
