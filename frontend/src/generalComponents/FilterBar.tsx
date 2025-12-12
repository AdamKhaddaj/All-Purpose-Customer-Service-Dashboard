import { useState, useEffect } from 'react';
import type { TicketFilters, Tag, Agent, TicketStatus, Priority } from '../types';

interface FilterBarProps {
    filters?: TicketFilters;
    onApplyFilters: (filters: TicketFilters) => void;
    tags: Tag[];
    agents: Agent[];
}

const STATUSES: TicketStatus[] = ['New', 'In Progress', 'Completed'];
const PRIORITIES: Priority[] = ['Low', 'Medium', 'High'];

function FilterBar({ filters, onApplyFilters, tags, agents }: FilterBarProps) {
    const [searchQuery, setSearchQuery] = useState<string>(filters?.searchQuery || '');
    const [selectedStatus, setSelectedStatus] = useState<TicketStatus | ''>(filters?.ticketStatus || '');
    const [selectedPriority, setSelectedPriority] = useState<Priority | ''>(filters?.priority || '');
    const [selectedAgent, setSelectedAgent] = useState<string>(filters?.assignedTo || '');
    const [earliestDate, setEarliestDate] = useState<string>(
        filters?.startDate ? filters.startDate.toISOString().split('T')[0] : ''
    );
    const [selectedTags, setSelectedTags] = useState<Tag[]>(filters?.tags || []);
    const [showTagDropdown, setShowTagDropdown] = useState<boolean>(false);

    // Apply filters whenever any filter value changes
    useEffect(() => {
        const newFilters: TicketFilters = {};

        if (searchQuery) newFilters.searchQuery = searchQuery;
        if (selectedStatus) newFilters.ticketStatus = selectedStatus;
        if (selectedPriority) newFilters.priority = selectedPriority;
        if (selectedAgent) newFilters.assignedTo = selectedAgent;
        if (earliestDate) newFilters.startDate = new Date(earliestDate);
        if (selectedTags.length > 0) newFilters.tags = selectedTags;

        onApplyFilters(newFilters);
    }, [searchQuery, selectedStatus, selectedPriority, selectedAgent, earliestDate, selectedTags]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedStatus('');
        setSelectedPriority('');
        setSelectedAgent('');
        setEarliestDate('');
        setSelectedTags([]);
    };

    const toggleTag = (tag: Tag) => {
        setSelectedTags(prev => {
            const isSelected = prev.some(t => t.ID === tag.ID);
            if (isSelected) {
                return prev.filter(t => t.ID !== tag.ID);
            } else {
                return [...prev, tag];
            }
        });
    };

    const isTagSelected = (tag: Tag): boolean => {
        return selectedTags.some(t => t.ID === tag.ID);
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex flex-wrap gap-4 items-end">
                {/* Search Bar */}
                <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                    <label htmlFor="search" className="text-xs font-medium text-gray-300 uppercase">Search</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                </div>

                {/* Status Dropdown */}
                <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
                    <label htmlFor="status" className="text-xs font-medium text-gray-300 uppercase">Status</label>
                    <select
                        id="status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as TicketStatus | '')}
                        className="px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-200 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <option value="">All Statuses</option>
                        {STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {/* Priority Dropdown */}
                <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
                    <label htmlFor="priority" className="text-xs font-medium text-gray-300 uppercase">Priority</label>
                    <select
                        id="priority"
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value as Priority | '')}
                        className="px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-200 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <option value="">All Priorities</option>
                        {PRIORITIES.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                        ))}
                    </select>
                </div>

                {/* Agent Dropdown */}
                <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
                    <label htmlFor="agent" className="text-xs font-medium text-gray-300 uppercase">Agent</label>
                    <select
                        id="agent"
                        value={selectedAgent}
                        onChange={(e) => {
                            setSelectedAgent(e.target.value);
                        }}
                        className="px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-200 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <option value="">All Agents</option>
                        {agents.map(agent => (
                            <option key={agent.ID} value={agent.ID}>{agent.name}</option>
                        ))}
                    </select>
                </div>

                {/* Earliest Date Picker */}
                <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
                    <label htmlFor="earliestDate" className="text-xs font-medium text-gray-300 uppercase">Earliest Date</label>
                    <input
                        id="earliestDate"
                        type="date"
                        value={earliestDate}
                        onChange={(e) => setEarliestDate(e.target.value)}
                        className="px-3 py-2 border border-gray-600 rounded bg-gray-700 text-gray-200 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                </div>

                {/* Tags Filter */}
                <div className="flex flex-col gap-1 flex-1 min-w-[180px] relative">
                    <label htmlFor="tags" className="text-xs font-medium text-gray-300 uppercase">Tags</label>
                    <div className="relative">
                        <button
                            type="button"
                            className="w-full px-3 py-2 text-left border border-gray-600 rounded bg-gray-700 text-gray-200 text-sm cursor-pointer hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            onClick={() => setShowTagDropdown(!showTagDropdown)}
                        >
                            {selectedTags.length > 0
                                ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`
                                : 'Select tags...'}
                        </button>
                        {showTagDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 max-h-[300px] overflow-y-auto bg-gray-700 border border-gray-600 rounded shadow-lg z-50 p-1">
                                {tags.length === 0 ? (
                                    <div className="p-4 text-center text-gray-400 text-sm">No tags available</div>
                                ) : (
                                    tags.map(tag => (
                                        <label key={tag.ID} className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-600 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={isTagSelected(tag)}
                                                onChange={() => toggleTag(tag)}
                                                className="cursor-pointer"
                                            />
                                            <span
                                                className="inline-block px-2.5 py-1 rounded text-xs font-medium text-white"
                                                style={{ backgroundColor: tag.color }}
                                            >
                                                {tag.name}
                                            </span>
                                        </label>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Clear Filters Button */}
                <div className="min-w-auto">
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="px-4 py-2 whitespace-nowrap bg-gray-700 text-gray-200 border border-gray-600 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-700">
                    <span className="text-xs font-medium text-gray-300">Active tags:</span>
                    {selectedTags.map(tag => (
                        <span
                            key={tag.ID}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: tag.color }}
                        >
                            {tag.name}
                            <button
                                type="button"
                                className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white text-base leading-none p-0 bg-transparent border-0"
                                onClick={() => toggleTag(tag)}
                                aria-label={`Remove ${tag.name} tag`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FilterBar;
