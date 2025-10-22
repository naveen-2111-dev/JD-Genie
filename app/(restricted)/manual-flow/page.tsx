"use client";

import Education from "@/components/manualflow/Education";
import General from "@/components/manualflow/General";
import PersonalInfo from "@/components/manualflow/PersonalInfo";
import ProfessionalSummary from "@/components/manualflow/ProfessionalSummary";
import Projects from "@/components/manualflow/Projects";
import WorkExperience from "@/components/manualflow/WorkExperience";
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

const ManualFlowPage = () => {
    const [step, setStep] = useState<number>(10);

    return (
        <div>
            <Progress value={step} max={60} />

            <div className="p-10">
                {
                    step === 10 && <PersonalInfo setStep={setStep} />
                }
                {
                    step === 20 && <ProfessionalSummary setStep={setStep} />
                }
                {
                    step === 30 && <WorkExperience setStep={setStep} />
                }
                {
                    step === 40 && <Education setStep={setStep} />
                }
                {
                    step === 50 && <General setStep={setStep} />
                }
                {
                    step === 60 && <Projects setStep={setStep} />
                }
            </div>
        </div>
    )
}

export default ManualFlowPage
