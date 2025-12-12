import React from 'react';
import TicketCard from './TicketCard';
import type { Ticket, TicketStatus } from '../types';

interface TicketColumnProps {
    status: TicketStatus;
    tickets: Ticket[];
    onTicketClick: (ticket: Ticket) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, ticket: Ticket) => void;
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    isDragOver: boolean;
}

function TicketColumn(props: TicketColumnProps) {
    const { status, tickets, onTicketClick, onDragStart, onDragEnter, onDragLeave, onDragOver, onDrop, isDragOver } = props;

    const getStatusColor = () => {
        switch (status) {
            case 'New': return 'from-blue-600 to-blue-700';
            case 'In Progress': return 'from-amber-600 to-amber-700';
            case 'Completed': return 'from-green-600 to-green-700';
            default: return 'from-gray-600 to-gray-700';
        }
    };

    return (
        <div
            className={`flex flex-col bg-gray-800 rounded-lg overflow-hidden transition-all duration-150 min-w-[420px] border-2 ${isDragOver ? 'ring-4 ring-blue-500 ring-opacity-50 shadow-xl border-blue-500' : 'shadow-lg border-transparent'
                }`}
            data-status={status}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {/* Column Header */}
            <div className={`bg-gradient-to-r ${getStatusColor()} px-4 py-2`}>
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-lg font-semibold m-0">{status}</h3>
                    <span className="bg-white/30 text-white text-sm font-bold px-3 py-1.5 rounded-full min-w-[2.5rem] text-center">
                        {tickets.length}
                    </span>
                </div>
            </div>

            {/* Separator Line */}
            <div className="h-px bg-gray-600 mx-4 my-0"></div>

            {/* Tickets List */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-350px)] bg-gray-800">
                {tickets.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
                        <p>No {status.toLowerCase()} tickets</p>
                    </div>
                ) : (
                    tickets.map(ticket => (
                        <TicketCard
                            key={ticket.ticketID}
                            ticket={ticket}
                            onClick={() => onTicketClick(ticket)}
                            onDragStart={(e: React.DragEvent<HTMLDivElement>) => onDragStart(e, ticket)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TicketColumn;
