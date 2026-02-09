"use client";
import ModulePage from "@/components/ui/ModulePage";
import styles from "./pipeline.module.css";


const stages = ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "CLOSED"];

export default function CRMPipeline() {
    return (
        <ModulePage title="Sales Pipeline" subtitle="Visualizing your revenue funnel across the continent.">
            <div className={styles.pipeline}>
                {stages.map((stage) => (
                    <div key={stage} className={styles.stage}>
                        <h4 className={styles.stageTitle}>{stage}</h4>
                        <div className={styles.dropZone}>
                            <div className={styles.card}>
                                <p>Nig-Rail Project</p>
                                <span>$2.4M</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ModulePage>
    );
}
