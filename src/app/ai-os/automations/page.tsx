"use client";
import ModulePage from "@/components/ui/ModulePage";

export default function Page() {
    return (
        <ModulePage title="Automations" subtitle="Workflow & Agent Orchestration">
            <div className="p-8 border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Automation Engine Initializing...</p>
            </div>
        </ModulePage>
    );
}
