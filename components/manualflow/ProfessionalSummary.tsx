"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button'

const ProfessionalSummary = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [summary, setSummary] = useState<string>("");

    return (
        <div>
            <div className='flex justify-between items-center mb-8'>
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-2xl">Professional Summary</h1>
                        <div className='flex gap-3'>
                            <Button variant="ghost" className="cursor-pointer" onClick={() => setStep(prev => prev - 10)}>Prev</Button>
                            <Button className="cursor-pointer" onClick={() => setStep(prev => prev + 10)}>Next</Button>
                        </div>
                    </div>
                    <p>A short paragraph summarizing your experience, goals, and key skills.</p>
                </div>
            </div>
            <textarea
                id="summary"
                rows={6}
                className="border border-gray-300 p-2 rounded-md w-full"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
        </div>
    )
}

export default ProfessionalSummary
