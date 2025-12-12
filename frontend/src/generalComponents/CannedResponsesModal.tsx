import { Modal } from './Modal';
import { Button } from './Button';
import type { CannedResponse } from '../types';

interface CannedResponsesModalProps {
    onClose: () => void;
    cannedResponses: CannedResponse[];
    onSelectResponse: (response: string) => void;
}

export default function CannedResponsesModal(props: CannedResponsesModalProps) {
    const { onClose, cannedResponses, onSelectResponse } = props;

    const handleSelect = (response: string) => {
        onSelectResponse(response);
        onClose();
    };

    return (
        <Modal onClose={onClose} size="md">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Canned Responses</h2>
                <Button variant="cancel" onClick={onClose} />
            </div>

            <div className="h-[400px] overflow-y-auto space-y-3">
                {cannedResponses.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No canned responses available</p>
                ) : (
                    cannedResponses.map((response) => (
                        <div
                            key={response.ID}
                            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                            onClick={() => handleSelect(response.response)}
                        >
                            <p className="text-gray-200 whitespace-pre-wrap">{response.response}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-700">
                <Button variant="secondary" onClick={onClose} className="w-full">
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}
