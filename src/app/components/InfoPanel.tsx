import { Channel } from "../types";

interface InfoPanelProps {
    isOpen: string;
    onClose: () => void;
    channelData: Channel
}

export default function InfoPanel(props : InfoPanelProps) {
    return (
        <div
            className={`absolute right-0 h-full bg-gray-100 border-r border-gray-300 transition-all duration-300 ${
                props.isOpen ? "w-[30%]" : "w-0"
            } overflow-hidden`}
        >
            <div className="p-4">
                <button className="absolute right-10" onClick={props.onClose}>Close</button>
                <h2 className="text-xl font-bold">{props.channelData.channel}</h2>
            </div>
        </div>
    );
}

