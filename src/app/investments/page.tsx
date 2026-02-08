"use client";
import ModulePage from "@/components/ui/ModulePage";

export default function Page() {
    return (
        <ModulePage title="Investments" subtitle="Portfolio & Market Analysis">
            <div className="p-8 border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Connecting to Stock Markets...</p>
            </div>
        </ModulePage>
    );
}
