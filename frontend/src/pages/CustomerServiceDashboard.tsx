import { useState, useEffect } from 'react';

// Import services
import realTicketService from '../services/CustomerServiceDashboardService';
import mockTicketService from '../services/MockTicketService';
import config from '../config';

// Import components
import TicketTable from '../ticketComponents/TicketTable';
import TicketModal from '../ticketComponents/TicketModal';
import ManagementModal from '../generalComponents/ManagementModal';
import FilterBar from '../generalComponents/FilterBar';
import { Button } from '../generalComponents/Button';
import type { Ticket, Tag, TicketFilters, Agent, CannedResponse } from '../types';

function CustomerServiceManagerPage() {

    // Test mode toggle
    const isTestMode = config.testMode;
    const ticketService = isTestMode ? mockTicketService : realTicketService;

    // Tickets 
    const [tickets, setTickets] = useState<Ticket[]>([]);

    // Tags   
    const [tags, setTags] = useState<Tag[]>([]);

    // Agents 
    const [agents, setAgents] = useState<Agent[]>([]);

    // FAQ Auto Response
    const [autoFAQresponse, setAutoFAQresponse] = useState<string>('');

    // Canned Responses
    const [cannedResponses, setCannedResponses] = useState<CannedResponse[]>([]);

    // Modal visibility 
    const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
    const [selectedTicketForModal, setSelectedTicketForModal] = useState<Ticket | null>(null);

    const [showManagementModal, setShowManagementModal] = useState<boolean>(false);

    // Filter states
    const [filters, setFilters] = useState<TicketFilters>();

    // Loading in data

    const loadTickets = async () => {
        try {
            const ticketsData = await ticketService.getTickets(filters);
            setTickets(ticketsData);
        } catch (err) {
            console.error('Error loading tickets:', err);
            alert('Failed to load tickets: ' + (err as Error).message);
            throw err;
        }
    }

    const loadTags = async () => {
        try {
            const tagsData = await ticketService.getAllTags();
            setTags(tagsData || []);
        } catch (err) {
            console.error('Error loading tags:', err);
            alert('Failed to load tags: ' + (err as Error).message);
            throw err;
        }
    }

    const loadAgents = async () => {
        try {
            const agentsData = await ticketService.getAllAgents();
            setAgents(agentsData || []);
        } catch (err) {
            console.error('Error loading agents:', err);
            alert('Failed to load agents: ' + (err as Error).message);
            throw err;
        }
    }

    const loadCannedResponses = async () => {
        try {
            const cannedResponsesData = await ticketService.getCannedResponses();
            setCannedResponses(cannedResponsesData || []);
        } catch (err) {
            console.error('Error loading canned responses:', err);
            alert('Failed to load canned responses: ' + (err as Error).message);
            throw err;
        }
    }

    const loadFAQAutoResponse = async () => {
        try {
            const faqAutoResponseData = await ticketService.getFAQAutoResponse();
            setAutoFAQresponse(faqAutoResponseData || '');
        } catch (err) {
            console.error('Error loading FAQ auto response:', err);
            alert('Failed to load FAQ auto response: ' + (err as Error).message);
            throw err;
        }
    }

    // Ticket operations (adding tickets are handled by backend, we only need to handle updating)

    const updateTicket = async (ticketId: string, updates: any) => {
        try {
            const updatedTicket = await ticketService.updateTicket(ticketId, updates);

            loadTickets();

            // Update ticket modal
            if (selectedTicketForModal && selectedTicketForModal.ticketID === ticketId) {
                setSelectedTicketForModal(updatedTicket);
            }
        } catch (err) {
            console.error('Error updating ticket:', err);
            alert('Failed to update ticket: ' + (err as Error).message);
            throw err;
        }
    };

    const replyToTicket = async (ticketId: string, message: string) => {
        try {
            const updatedTicket = await ticketService.replyToTicket(ticketId, message);
            loadTickets();
            if (selectedTicketForModal && selectedTicketForModal.ticketID === ticketId) {
                setSelectedTicketForModal(updatedTicket);
            }
        } catch (err) {
            console.error('Error replying to ticket:', err);
            alert('Failed to reply to ticket: ' + (err as Error).message);
            throw err;
        }
    };

    // Tag operations

    const createTag = async (tagData: Tag) => {
        try {
            const data = await ticketService.createTag(tagData);
            loadTags();

        } catch (err) {
            console.error('Error creating tag:', err);
            alert('Failed to create tag: ' + (err as Error).message);
            throw err;
        }
    };

    const updateTag = async (tagId: string, updates: Partial<Tag>) => {
        try {
            const data = await ticketService.updateTag(tagId, updates);
            loadTags();
        } catch (err) {
            console.error('Error updating tag:', err);
            alert('Failed to update tag: ' + (err as Error).message);
            throw err;
        }
    };

    const deleteTag = async (tagId: string) => {
        try {
            const data = await ticketService.deleteTag(tagId);
            loadTags();
        } catch (err) {
            console.error('Error deleting tag:', err);
            alert('Failed to delete tag: ' + (err as Error).message);
            throw err;
        }
    };


    // Agent operations

    const createAgent = async (newAgent: string) => {
        try {
            const data = await ticketService.createAgent(newAgent);
            loadAgents();
        } catch (err) {
            console.error('Error creating agent:', err);
            alert('Failed to create agent: ' + (err as Error).message);
            throw err;
        }
    };

    const updateAgent = async (agentID: string, newAgentName: { 'name': string }) => {
        try {
            const data = await ticketService.updateAgent(agentID, newAgentName);
            loadAgents();
        } catch (err) {
            console.error('Error updating agent:', err);
            alert('Failed to update agent: ' + (err as Error).message);
            throw err;
        }
    };

    const deleteAgent = async (agentID: string) => {
        try {
            const data = await ticketService.deleteAgent(agentID);
            loadAgents();
        } catch (err) {
            console.error('Error deleting agent:', err);
            alert('Failed to delete agent: ' + (err as Error).message);
            throw err;
        }
    };

    // FAQ Auto Response operations

    const updateFAQAutoResponse = async (faqAutoResponseID: string, updates: { 'faqAutoResponse': string }) => {
        try {
            const data = await ticketService.updateFAQautoResponse(faqAutoResponseID, updates);
            loadFAQAutoResponse();
        } catch (err) {
            console.error('Error updating FAQ auto response:', err);
            alert('Failed to update FAQ auto response: ' + (err as Error).message);
            throw err;
        }
    };

    // Canned Response operations

    const createCannedResponse = async (cannedResponse: string) => {
        try {
            const data = await ticketService.createCannedResponse(cannedResponse);
            loadCannedResponses();
        } catch (err) {
            console.error('Error creating canned response:', err);
            alert('Failed to create canned response: ' + (err as Error).message);
            throw err;
        }
    };

    const updateCannedResponse = async (responseID: string, updates: { 'response': string }) => {
        try {
            const data = await ticketService.updateCannedResponse(responseID, updates);
            loadCannedResponses();
        } catch (err) {
            console.error('Error updating canned response:', err);
            alert('Failed to update canned response: ' + (err as Error).message);
            throw err;
        }
    };

    const deleteCannedResponse = async (responseID: string) => {
        try {
            const data = await ticketService.deleteCannedResponse(responseID);
            loadCannedResponses();
        } catch (err) {
            console.error('Error deleting canned response:', err);
            alert('Failed to delete canned response: ' + (err as Error).message);
            throw err;
        }
    };

    // Initialization

    useEffect(() => {
        loadTags();
        loadAgents();
        loadCannedResponses();
        loadFAQAutoResponse();
    }, [isTestMode]); // Reload when switching between test/live mode

    useEffect(() => {
        loadTickets();
    }, [filters, isTestMode]); // Reload when filters change or mode switches


    // Modal handelrs

    const handleOpenTicketModal = (ticket: Ticket) => {
        if (!ticket) return; // Only allow opening modal with existing tickets
        setSelectedTicketForModal(ticket);
        setShowTicketModal(true);
    };


    const handleOpenManagementModal = () => {
        setShowManagementModal(true);
    };



    // ==============================================
    // RENDER
    // ==============================================

    return (
        <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex-shrink-0">
                <div className="max-w-[98%] mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Customer Service Dashboard</h1>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => handleOpenManagementModal()}
                        >
                            Manage
                        </Button>
                    </div>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="px-8 py-4 flex-shrink-0">
                <div className="max-w-[98%] mx-auto">
                    <FilterBar
                        filters={filters}
                        onApplyFilters={(filtersToApply: TicketFilters) => {
                            setFilters(filtersToApply);
                        }}
                        tags={tags}
                        agents={agents}
                    />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 px-8 pb-8 overflow-hidden">
                <div className="max-w-[98%] mx-auto h-full">
                    <TicketTable
                        tickets={tickets}
                        updateTicket={updateTicket}
                        onTicketClick={handleOpenTicketModal}
                    />
                </div>
            </main>

            {/* Modals */}
            {showTicketModal && selectedTicketForModal && (
                <TicketModal
                    ticket={selectedTicketForModal}
                    onClose={() => setShowTicketModal(false)}
                    allTags={tags}
                    allAgents={agents}
                    allCannedResponses={cannedResponses}
                    updateTicket={updateTicket}
                    reply={replyToTicket}
                />
            )}

            {showManagementModal && (
                <ManagementModal
                    isOpen={showManagementModal}
                    onClose={() => setShowManagementModal(false)}
                    tags={tags}
                    agents={agents}
                    cannedResponses={cannedResponses}
                    autoFAQResponse={autoFAQresponse}
                    createTag={createTag}
                    updateTag={updateTag}
                    deleteTag={deleteTag}
                    createAgent={createAgent}
                    updateAgent={updateAgent}
                    deleteAgent={deleteAgent}
                    createCannedResponse={createCannedResponse}
                    updateCannedResponse={updateCannedResponse}
                    deleteCannedResponse={deleteCannedResponse}
                    updateFAQAutoResponse={updateFAQAutoResponse}
                />
            )}
        </div>
    );
}

export default CustomerServiceManagerPage;
