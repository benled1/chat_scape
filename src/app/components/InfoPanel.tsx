

interface InfoPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
    return (
        <div
            className={`absolute right-0 h-full bg-gray-100 border-r border-gray-300 transition-all duration-300 ${
                isOpen ? "w-[30%]" : "w-0"
            } overflow-hidden`}
        >
            <div className="p-4">
                <h2 className="text-xl font-bold">Info Panel</h2>
            </div>
        </div>
    );
}

