"use client";
import ModulePage from "@/components/ui/ModulePage";

export default function Page() {
    return (
        <ModulePage title="Billing & Subscription" subtitle="Plan Management">
            <div className="p-8 border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Fetching Subscription Details...</p>
            </div>
        </ModulePage>
    );
}
