import { useState } from 'react';
import TicketColumn from './TicketColumn';
import type { Ticket, TicketStatus } from '../../../frontend/src/types';


interface TicketTableProps {
    tickets: Ticket[];
    updateTicket: (ticketID: string, field: Partial<Ticket>) => void;
    onTicketClick: (ticket: Ticket) => void;
}

function TicketTable(props: TicketTableProps) {
    const { tickets, updateTicket, onTicketClick } = props;
    const [dragCounters, setDragCounters] = useState<Record<TicketStatus, number>>({
        'New': 0,
        'In Progress': 0,
        'Completed': 0
    });

    const onTicketDragStart = (e: React.DragEvent<HTMLDivElement>, ticket: Ticket) => {
        e.dataTransfer.setData('text/plain', ticket.ticketID);
        e.dataTransfer.setData('ticketStatus', ticket.ticketStatus);
    };

    const handleDragEnter = (status: TicketStatus) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragCounters(prev => ({ ...prev, [status]: prev[status] + 1 }));
    };

    const handleDragLeave = (status: TicketStatus) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragCounters(prev => ({ ...prev, [status]: prev[status] - 1 }));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    };

    const handleDrop = (status: TicketStatus) => async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragCounters(prev => ({ ...prev, [status]: 0 }));

        const ticketId = e.dataTransfer.getData('text/plain');
        const currentStatus = e.dataTransfer.getData('ticketStatus');

        // Don't update if dropped in the same column
        if (currentStatus === status) {
            return;
        }

        updateTicket(ticketId, { ticketStatus: status });
    };

    if (tickets.length === 0) {
        return (
            <div className="h-full p-5 bg-gray-900 text-gray-200 rounded-lg">
                <div className="
                    text-center
                    py-16 px-5
                    text-gray-400
                    bg-gray-800
                    rounded-lg
                    border border-gray-700
                ">
                    <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
                    <p className="text-sm">There are no tickets matching your current filters.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gray-900 text-gray-200 rounded-lg flex flex-col">

            {/* Ticket table header */}
            <div className="text-gray-400 text-sm pb-4 pt-6 px-6">
                <span>Total: {tickets.length} tickets</span>
            </div>

            {/* Ticket columns */}
            <div className="flex-1 grid grid-cols-3 gap-6 px-6 pb-6 overflow-hidden">
                <TicketColumn
                    status="New"
                    tickets={tickets.filter(ticket => ticket.ticketStatus === 'New')}
                    onTicketClick={onTicketClick}
                    onDragStart={onTicketDragStart}
                    onDragEnter={handleDragEnter('New')}
                    onDragLeave={handleDragLeave('New')}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop('New')}
                    isDragOver={dragCounters['New'] > 0}
                />

                <TicketColumn
                    status="In Progress"
                    tickets={tickets.filter(ticket => ticket.ticketStatus === 'In Progress')}
                    onTicketClick={onTicketClick}
                    onDragStart={onTicketDragStart}
                    onDragEnter={handleDragEnter('In Progress')}
                    onDragLeave={handleDragLeave('In Progress')}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop('In Progress')}
                    isDragOver={dragCounters['In Progress'] > 0}
                />

                <TicketColumn
                    status="Completed"
                    tickets={tickets.filter(ticket => ticket.ticketStatus === 'Completed')}
                    onTicketClick={onTicketClick}
                    onDragStart={onTicketDragStart}
                    onDragEnter={handleDragEnter('Completed')}
                    onDragLeave={handleDragLeave('Completed')}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop('Completed')}
                    isDragOver={dragCounters['Completed'] > 0}
                />
            </div>
        </div>
    );
};

export default TicketTable;
