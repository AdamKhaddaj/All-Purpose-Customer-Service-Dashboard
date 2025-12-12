import React from 'react';
import type { Ticket, Priority } from '../types';

interface TicketCardProps {
    ticket: Pick<Ticket, 'ticketID' | 'customerName' | 'priority' | 'marketplace' | 'assignedTo' | 'tags' | 'lastUpdatedDate'>;
    onClick: () => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

function TicketCard(props: TicketCardProps) {
    const { ticket, onClick, onDragStart } = props;

    const getPriorityColor = (priority: Priority): string => {
        switch (priority) {
            case 'High':
                return 'bg-red-500';
            case 'Medium':
                return 'bg-amber-500';
            case 'Low':
                return 'bg-green-500';
        }
    };


    const formatDate = (date: Date): string => {
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div
            className="
                group
                relative
                bg-[#3a3f47]
                rounded-lg
                p-3
                mb-3
                w-full
                cursor-pointer
                overflow-hidden
                transition-all duration-200
                hover:bg-[#424950]
                active:scale-[0.99]
                [&.dragging]:opacity-20
                border border-gray-600
            "
            onClick={onClick}
            draggable={true}
            onDragStart={(e) => {
                onDragStart(e);
                e.currentTarget.classList.add('dragging');
            }}
            onDragEnd={(e) => {
                e.currentTarget.classList.remove('dragging');
            }}
        >
            {/* Priority Indicator - Left Vertical Line */}
            <div
                className={`
                    absolute
                    left-0
                    top-0
                    bottom-0
                    w-1
                    rounded-l-lg
                    ${getPriorityColor(ticket.priority)}
                `}
                title={`${ticket.priority} Priority`}
            />

            {/* Customer Name */}
            <div className="mb-1">
                <h3 className="
                    font-bold
                    text-base
                    text-left
                    text-white
                    leading-tight
                ">
                    {ticket.customerName}
                </h3>
            </div>

            {/* Marketplace Badge */}
            <div className="mb-1 text-left">
                <span className={`
                    inline-block
                    px-2 py-0.5
                    rounded
                    text-xs font-medium
                    text-left
                    bg-yellow-500
                `}>
                    {ticket.marketplace}
                </span>
            </div>
            {/* Assigned To */}
            <div className="mb-2 text-left">
                <span className="text-xs text-gray-400">
                    Assigned to: <span className="text-gray-300">{ticket.assignedTo}</span>
                </span>
            </div>

            {/* Tags */}
            {ticket.tags && ticket.tags.length > 0 && (
                <div className="flex gap-1.5 mb-2 flex-wrap">
                    {ticket.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="
                                px-2 py-0.5
                                rounded
                                text-xs font-medium
                                text-white
                            "
                            style={{
                                backgroundColor: tag.color || '#6B7280'
                            }}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer - Ticket ID & Timestamp */}
            <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="font-mono">
                    {ticket.ticketID}
                </div>
                <div className="truncate">
                    Last Updated: {formatDate(ticket.lastUpdatedDate)}
                </div>
            </div>
        </div>
    );
};

export default TicketCard;