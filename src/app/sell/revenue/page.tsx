"use client";
import ModulePage from "@/components/ui/ModulePage";

export default function Page() {
    return (
        <ModulePage title="Revenue" subtitle="Financial Performance">
            <div className="p-8 border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Calculating Income Streams...</p>
            </div>
        </ModulePage>
    );
}
