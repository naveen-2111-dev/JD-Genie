"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Experience {
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: string;
    endDate?: string;
    responsibilities: string;
    present?: boolean;
}

const WorkExperience = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [experiences, setExperiences] = useState<Experience[]>([
        { jobTitle: '', companyName: '', location: '', startDate: '', endDate: '', responsibilities: '', present: false }
    ]);

    const handleChange = <K extends keyof Experience>(index: number, field: K, value: Experience[K]) => {
        const updated = [...experiences];
        updated[index] = { ...updated[index], [field]: value } as Experience;
        setExperiences(updated);
    };

    const handleAddExperience = () => {
        setExperiences([...experiences, { jobTitle: '', companyName: '', location: '', startDate: '', endDate: '', responsibilities: '', present: false }]);
    };

    const handleRemoveExperience = (index: number) => {
        const updated = experiences.filter((_, i) => i !== index);
        setExperiences(updated);
    };

    console.log(experiences);

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h1 className="font-bold text-2xl">Work Experience</h1>
                <div className='flex gap-3'>
                    <Button variant="ghost" className="cursor-pointer" onClick={() => setStep(prev => prev - 10)}>Prev</Button>
                    <Button className="cursor-pointer" onClick={() => setStep(prev => prev + 10)}>Next</Button>
                </div>
            </div>

            <div className='flex flex-col gap-6'>
                {experiences.map((exp, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-4 relative">
                        {experiences.length > 1 && (
                            <Button
                                variant="link"
                                className="absolute top-2 right-2 cursor-pointer text-red-500"
                                onClick={() => handleRemoveExperience(index)}
                            >
                                Remove
                            </Button>
                        )}

                        <div className="flex flex-col">
                            <Label className="mb-1 font-medium">Job Title</Label>
                            <Input
                                type="text"
                                value={exp.jobTitle}
                                onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label className="mb-1 font-medium">Company Name</Label>
                            <Input
                                type="text"
                                value={exp.companyName}
                                onChange={(e) => handleChange(index, 'companyName', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label className="mb-1 font-medium">Location</Label>
                            <Input
                                type="text"
                                value={exp.location}
                                onChange={(e) => handleChange(index, 'location', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className="mb-1 font-medium">Start & End Date</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="date"
                                    value={exp.startDate}
                                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                />
                                {!exp.present && (
                                    <Input
                                        type="date"
                                        value={exp.endDate}
                                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                    />)}
                                <div className="flex items-center gap-1">
                                    <Input
                                        type="checkbox"
                                        id={`present-${index}`}
                                        checked={!!exp.present}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, 'present', e.target.checked)}
                                    />
                                    <Label htmlFor={`present-${index}`} className="font-medium">Present</Label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Label className="mb-1 font-medium">Key Responsibilities / Achievements</Label>
                            <textarea
                                rows={4}
                                className="border border-gray-300 p-2 rounded-md"
                                value={exp.responsibilities}
                                onChange={(e) => handleChange(index, 'responsibilities', e.target.value)}
                            />
                        </div>
                    </div>
                ))}

                <Button variant="link" className="self-start" onClick={handleAddExperience}>
                    + Add Another Experience
                </Button>
            </div>
        </div>
    )
}

export default WorkExperience;
