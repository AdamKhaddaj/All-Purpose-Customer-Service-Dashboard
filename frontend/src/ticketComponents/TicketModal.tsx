import { useState } from 'react';
import type { Ticket, Priority, Tag, Agent, CannedResponse } from '../types';
import { Modal } from '../generalComponents/Modal';
import { Button } from '../generalComponents/Button';
import CannedResponsesModal from '../generalComponents/CannedResponsesModal';

interface TicketModalProps {
    ticket: Partial<Ticket>;
    allTags: Tag[];
    allAgents: Agent[];
    allCannedResponses: CannedResponse[];
    onClose: () => void;
    updateTicket: (ticketID: string, field: Partial<Ticket>) => Promise<void>;
    reply: (ticketID: string, message: string) => Promise<void>;
}

function TicketModal(props: TicketModalProps) {
    const { ticket, updateTicket, reply, onClose, allTags, allAgents, allCannedResponses } = props;

    const [replyText, setReplyText] = useState('');
    const [showCannedResponses, setShowCannedResponses] = useState(false);
    const draftKey = `ticket-draft-${ticket.ticketID}`;

    const saveDraft = (text: string) => {
        if (text.trim()) {
            localStorage.setItem(draftKey, text);
        } else {
            localStorage.removeItem(draftKey);
        }
    };

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getPriorityColor = (priority: Priority | undefined) => {
        switch (priority) {
            case 'High': return 'bg-red-500';
            case 'Medium': return 'bg-amber-500';
            case 'Low': return 'bg-green-500';
        }
    };


    const handleReply = async () => {
        try {
            await reply(ticket.ticketID || '', replyText);
            setReplyText('');
            saveDraft('');
        }
        catch (error) {
            console.error('Error sending reply:', error);
        }
    }

    return (
        <Modal onClose={onClose} size="lg">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-700">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{ticket.customerName || 'Customer'}</h2>
                    <p className="text-sm text-white font-mono">#{ticket.ticketID || 'N/A'}</p>
                </div>
                <Button variant="cancel" onClick={onClose} />
            </div>

            {/* Ticket Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="text-xs font-semibold text-gray-300 uppercase">Marketplace</label>
                    <div className="mt-1">
                        <span className={`inline-block px-3 py-1 rounded text-sm font-medium bg-yellow-500`}>
                            {ticket.marketplace || 'N/A'}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-300 uppercase">Priority</label>
                    <div className="mt-1 flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`} />
                        <span className="text-sm text-gray-300 font-medium">{ticket.priority || 'N/A'}</span>
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-300 uppercase">Status</label>
                    <p className="text-sm text-gray-300 mt-1">{ticket.ticketStatus || 'N/A'}</p>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-300 uppercase">Assigned To</label>
                    <select
                        className="mt-1 w-full px-3 py-1.5 bg-gray-700 text-gray-200 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={ticket.assignedTo || ''}
                        onChange={(e) => updateTicket(ticket.ticketID || '', { assignedTo: e.target.value })}
                    >
                        <option value="">Unassigned</option>
                        {allAgents.map(agent => (
                            <option key={agent.ID} value={agent.name}>{agent.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-300 uppercase">Created</label>
                    <p className="text-sm text-gray-300 mt-1">{formatDate(ticket.conversationStartDate)}</p>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-300 uppercase">Last Updated</label>
                    <p className="text-sm text-gray-300 mt-1">{formatDate(ticket.lastUpdatedDate)}</p>
                </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
                <label className="text-xs font-semibold text-gray-300 uppercase mb-2 block">Tags</label>
                <div className="flex gap-2 flex-wrap mb-3">
                    {ticket.tags && ticket.tags.length > 0 ? (
                        ticket.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: tag.color || '#6B7280' }}
                            >
                                {tag.name}
                                <Button
                                    variant="cancel"
                                    size="sm"
                                    onClick={() => updateTicket(ticket.ticketID || '', { tags: (ticket.tags || []).filter(t => t.name !== tag.name) })}
                                    className="!px-1 !py-0 ml-1 text-white hover:text-gray-200"
                                />
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No tags</p>
                    )}
                </div>
                <select
                    className="px-11 py-1.5 bg-gray-700 text-gray-200 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                        if (e.target.value) {
                            updateTicket(ticket.ticketID || '', { tags: [...(ticket.tags || []), allTags.find(t => t.name === e.target.value)!] });
                            e.target.value = ''; // Reset dropdown
                        }
                    }}
                    defaultValue=""
                >
                    <option value="">Add a tag...</option>
                    {allTags
                        .filter(tag => !ticket.tags?.some(t => t.name === tag.name))
                        .map(tag => (
                            <option key={tag.name} value={tag.name}>{tag.name}</option>
                        ))}
                </select>
            </div>

            {/* Related Listing Info */}
            {
                ticket.relatedListingURL && (
                    <div className="mb-4">
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Related Listing</label>
                        <a
                            href={ticket.relatedListingURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                            View Listing
                        </a>
                    </div>
                )
            }

            {/* Messages Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Conversation</h3>
                <div className="max-h-96 overflow-y-auto space-y-3 bg-gray-900 rounded-lg p-4">
                    {ticket.messages && ticket.messages.length > 0 ? (
                        ticket.messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${message.authored ? 'bg-blue-300 ml-8' : 'bg-gray-700 mr-8'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-gray-300">
                                        {message.authored ? ticket.assignedTo : ticket.customerName}
                                    </span>
                                    <span className="text-xs text-gray-400">{formatDate(new Date(message.date))}</span>
                                </div>
                                <p className="text-sm text-gray-200 whitespace-pre-wrap">{message.message}</p>
                                {message.imageAttachments && message.imageAttachments.length > 0 && (
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {message.imageAttachments.map((img, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={img}
                                                alt="attachment"
                                                className="max-w-xs rounded border border-gray-300"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-8">No messages yet</p>
                    )}
                </div>
            </div>

            {/* Reply Section */}
            <div className="mb-6">
                <label className="text-xs font-semibold text-gray-300 uppercase mb-2 block">Your Reply</label>
                <textarea
                    className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    onChange={(e) => {
                        setReplyText(e.target.value);
                        saveDraft(e.target.value);
                    }}
                    placeholder="Type your reply here..."
                    rows={4}
                    value={replyText}
                ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-700">
                <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                >
                    Send Reply
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => setShowCannedResponses(true)}
                >
                    Canned Responses
                </Button>
            </div>

            {/* Canned Responses Modal */}
            {showCannedResponses && (
                <CannedResponsesModal
                    onClose={() => setShowCannedResponses(false)}
                    cannedResponses={allCannedResponses}
                    onSelectResponse={(response) => {
                        setReplyText(replyText ? replyText + '\n\n' + response : response);
                        saveDraft(replyText ? replyText + '\n\n' + response : response);
                    }}
                />
            )}
        </Modal >
    );
};

export default TicketModal;
