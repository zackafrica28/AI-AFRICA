export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-black text-cyan-400 font-orbitron">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500 mb-4 mx-auto"></div>
                <h2 className="text-2xl animate-pulse">INITIALIZING NEURAL LINK...</h2>
                <p className="text-sm text-gray-500 mt-2">Connecting to AI-AFRICA Server Grid</p>
            </div>
        </div>
    );
}
