import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { Tag, Agent, CannedResponse } from '../types';

interface ManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    tags: Tag[];
    agents: Agent[];
    cannedResponses: CannedResponse[];
    autoFAQResponse: string;
    createTag: (tagData: Tag) => Promise<void>;
    updateTag: (tagId: string, updates: Partial<Tag>) => Promise<void>;
    deleteTag: (tagId: string) => Promise<void>;
    createAgent: (agentName: string) => Promise<void>;
    updateAgent: (agentId: string, newName: { name: string }) => Promise<void>;
    deleteAgent: (agentId: string) => Promise<void>;
    createCannedResponse: (response: string) => Promise<void>;
    updateCannedResponse: (responseId: string, updates: { response: string }) => Promise<void>;
    deleteCannedResponse: (responseId: string) => Promise<void>;
    updateFAQAutoResponse: (faqId: string, updates: { faqAutoResponse: string }) => Promise<void>;
}

type TabType = 'tags' | 'agents' | 'canned' | 'faq';

export default function ManagementModal(props: ManagementModalProps) {
    const {
        onClose,
        tags,
        agents,
        cannedResponses,
        autoFAQResponse,
        createTag,
        updateTag,
        deleteTag,
        createAgent,
        updateAgent,
        deleteAgent,
        createCannedResponse,
        updateCannedResponse,
        deleteCannedResponse,
        updateFAQAutoResponse
    } = props;

    const [activeTab, setActiveTab] = useState<TabType>('tags');

    // Tags state
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#3B82F6');
    const [editingTag, setEditingTag] = useState<Tag | null>(null);

    // Agents state
    const [newAgentName, setNewAgentName] = useState('');
    const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

    // Canned Responses state
    const [newCannedResponse, setNewCannedResponse] = useState('');
    const [editingCannedResponse, setEditingCannedResponse] = useState<CannedResponse | null>(null);

    // FAQ state
    const [faqText, setFaqText] = useState(autoFAQResponse);

    // Tag handlers
    const handleCreateTag = async () => {
        if (!newTagName.trim()) return;
        try {
            await createTag({ name: newTagName, color: newTagColor, ID: '' });
            setNewTagName('');
            setNewTagColor('#3B82F6');
        } catch (err) {
            console.error('Error creating tag:', err);
        }
    };

    const handleUpdateTag = async () => {
        if (!editingTag) return;
        try {
            await updateTag(editingTag.ID, { name: editingTag.name, color: editingTag.color });
            setEditingTag(null);
        } catch (err) {
            console.error('Error updating tag:', err);
        }
    };

    const handleDeleteTag = async (tagId: string) => {
        if (!confirm('Are you sure you want to delete this tag?')) return;
        try {
            await deleteTag(tagId);
        } catch (err) {
            console.error('Error deleting tag:', err);
        }
    };

    // Agent handlers
    const handleCreateAgent = async () => {
        if (!newAgentName.trim()) return;
        try {
            await createAgent(newAgentName);
            setNewAgentName('');
        } catch (err) {
            console.error('Error creating agent:', err);
        }
    };

    const handleUpdateAgent = async () => {
        if (!editingAgent) return;
        try {
            await updateAgent(editingAgent.ID, { name: editingAgent.name });
            setEditingAgent(null);
        } catch (err) {
            console.error('Error updating agent:', err);
        }
    };

    const handleDeleteAgent = async (agentId: string) => {
        if (!confirm('Are you sure you want to delete this agent?')) return;
        try {
            await deleteAgent(agentId);
        } catch (err) {
            console.error('Error deleting agent:', err);
        }
    };

    // Canned Response handlers
    const handleCreateCannedResponse = async () => {
        if (!newCannedResponse.trim()) return;
        try {
            await createCannedResponse(newCannedResponse);
            setNewCannedResponse('');
        } catch (err) {
            console.error('Error creating canned response:', err);
        }
    };

    const handleUpdateCannedResponse = async () => {
        if (!editingCannedResponse) return;
        try {
            await updateCannedResponse(editingCannedResponse.ID, { response: editingCannedResponse.response });
            setEditingCannedResponse(null);
        } catch (err) {
            console.error('Error updating canned response:', err);
        }
    };

    const handleDeleteCannedResponse = async (responseId: string) => {
        if (!confirm('Are you sure you want to delete this canned response?')) return;
        try {
            await deleteCannedResponse(responseId);
        } catch (err) {
            console.error('Error deleting canned response:', err);
        }
    };

    // FAQ handler
    const handleUpdateFAQ = async () => {
        try {
            await updateFAQAutoResponse('1', { faqAutoResponse: faqText });
            alert('FAQ auto response updated successfully!');
        } catch (err) {
            console.error('Error updating FAQ:', err);
        }
    };

    return (
        <Modal onClose={onClose} size="lg">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Management Settings</h2>
                <Button variant="cancel" onClick={onClose} />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('tags')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'tags'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    Tags
                </button>
                <button
                    onClick={() => setActiveTab('agents')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'agents'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    Agents
                </button>
                <button
                    onClick={() => setActiveTab('canned')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'canned'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    Canned Responses
                </button>
                <button
                    onClick={() => setActiveTab('faq')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'faq'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    FAQ Auto Response
                </button>
            </div>

            {/* Tab Content */}
            <div className="h-[500px] overflow-y-auto">
                {/* Tags Tab */}
                {activeTab === 'tags' && (
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Manage Tags</h3>

                        {/* Add New Tag */}
                        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Add New Tag</h4>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Tag name"
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    className="flex-1 px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="color"
                                    value={newTagColor}
                                    onChange={(e) => setNewTagColor(e.target.value)}
                                    className="w-20 h-10 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                                />
                                <Button variant="primary" onClick={handleCreateTag}>
                                    Add Tag
                                </Button>
                            </div>
                        </div>

                        {/* Tags List */}
                        <div className="space-y-2">
                            {tags.map((tag) => (
                                <div key={tag.ID} className="p-3 bg-gray-700 rounded-lg flex items-center gap-3">
                                    {editingTag?.ID === tag.ID ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editingTag.name}
                                                onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                                                className="flex-1 px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="color"
                                                value={editingTag.color}
                                                onChange={(e) => setEditingTag({ ...editingTag, color: e.target.value })}
                                                className="w-20 h-10 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                                            />
                                            <Button variant="primary" size="sm" onClick={handleUpdateTag}>
                                                Save
                                            </Button>
                                            <Button variant="secondary" size="sm" onClick={() => setEditingTag(null)}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="w-6 h-6 rounded"
                                                style={{ backgroundColor: tag.color }}
                                            />
                                            <span className="flex-1 text-gray-200">{tag.name}</span>
                                            <Button variant="secondary" size="sm" onClick={() => setEditingTag(tag)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteTag(tag.ID)}>
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Agents Tab */}
                {activeTab === 'agents' && (
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Manage Agents</h3>

                        {/* Add New Agent */}
                        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Add New Agent</h4>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Agent name"
                                    value={newAgentName}
                                    onChange={(e) => setNewAgentName(e.target.value)}
                                    className="flex-1 px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button variant="primary" onClick={handleCreateAgent}>
                                    Add Agent
                                </Button>
                            </div>
                        </div>

                        {/* Agents List */}
                        <div className="space-y-2">
                            {agents.map((agent) => (
                                <div key={agent.ID} className="p-3 bg-gray-700 rounded-lg flex items-center gap-3">
                                    {editingAgent?.ID === agent.ID ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editingAgent.name}
                                                onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                                                className="flex-1 px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <Button variant="primary" size="sm" onClick={handleUpdateAgent}>
                                                Save
                                            </Button>
                                            <Button variant="secondary" size="sm" onClick={() => setEditingAgent(null)}>
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex-1 text-gray-200">{agent.name}</span>
                                            <Button variant="secondary" size="sm" onClick={() => setEditingAgent(agent)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteAgent(agent.ID)}>
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Canned Responses Tab */}
                {activeTab === 'canned' && (
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Manage Canned Responses</h3>

                        {/* Add New Canned Response */}
                        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-300 mb-3">Add New Canned Response</h4>
                            <div className="flex flex-col gap-3">
                                <textarea
                                    placeholder="Type your canned response here..."
                                    value={newCannedResponse}
                                    onChange={(e) => setNewCannedResponse(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                                <Button variant="primary" onClick={handleCreateCannedResponse} className="self-end">
                                    Add Response
                                </Button>
                            </div>
                        </div>

                        {/* Canned Responses List */}
                        <div className="space-y-2">
                            {cannedResponses.map((response) => (
                                <div key={response.ID} className="p-3 bg-gray-700 rounded-lg">
                                    {editingCannedResponse?.ID === response.ID ? (
                                        <>
                                            <textarea
                                                value={editingCannedResponse.response}
                                                onChange={(e) => setEditingCannedResponse({ ...editingCannedResponse, response: e.target.value })}
                                                rows={3}
                                                className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
                                            />
                                            <div className="flex gap-2">
                                                <Button variant="primary" size="sm" onClick={handleUpdateCannedResponse}>
                                                    Save
                                                </Button>
                                                <Button variant="secondary" size="sm" onClick={() => setEditingCannedResponse(null)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-gray-200 mb-3 whitespace-pre-wrap">{response.response}</p>
                                            <div className="flex gap-2">
                                                <Button variant="secondary" size="sm" onClick={() => setEditingCannedResponse(response)}>
                                                    Edit
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => handleDeleteCannedResponse(response.ID)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ Auto Response Tab */}
                {activeTab === 'faq' && (
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">FAQ Auto Response</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            This message will be automatically sent as the first response to new customer inquiries.
                        </p>

                        <div className="p-4 bg-gray-700 rounded-lg">
                            <textarea
                                value={faqText}
                                onChange={(e) => setFaqText(e.target.value)}
                                rows={6}
                                className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
                                placeholder="Enter your FAQ auto response message..."
                            />
                            <Button variant="primary" onClick={handleUpdateFAQ}>
                                Save FAQ Auto Response
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
