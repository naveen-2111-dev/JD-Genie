"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Experience {
    Degree: string;
    institutionName: string;
    location: string;
    startDate: string;
    endDate: string;
    marks: string;
}

const Education = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [experiences, setExperiences] = useState<Experience[]>([
        { Degree: '', institutionName: '', location: '', startDate: '', endDate: '', marks: '' }
    ]);

    const handleChange = <K extends keyof Experience>(index: number, field: K, value: Experience[K]) => {
        const updated = [...experiences];
        updated[index] = { ...updated[index], [field]: value } as Experience;
        setExperiences(updated);
    };

    const handleAddExperience = () => {
        setExperiences([...experiences, { Degree: '', institutionName: '', location: '', startDate: '', endDate: '', marks: '' }]);
    };

    const handleRemoveExperience = (index: number) => {
        const updated = experiences.filter((_, i) => i !== index);
        setExperiences(updated);
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h1 className="font-bold text-2xl">Education</h1>
                <div className='flex gap-3'>
                    <Button variant="ghost" className="cursor-pointer" onClick={() => setStep(prev => prev - 10)}>Prev</Button>
                    <Button className="cursor-pointer" onClick={() => setStep(prev => prev + 10)}>Next</Button>
                </div>
            </div>

            <div className='flex flex-col gap-6'>
                {experiences.map((exp, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-4 relative">
                        {experiences.length > 1 && (
                            <div className="absolute top-2 right-2">
                                <Button
                                    variant="link"
                                    className="cursor-pointer text-red-500"
                                    onClick={() => handleRemoveExperience(index)}
                                >
                                    Remove {`Education ${index + 1}`}
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col">
                            <Label className="mb-1 font-medium">Degree</Label>
                            <Input
                                type="text"
                                value={exp.Degree}
                                onChange={(e) => handleChange(index, 'Degree', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label className="mb-1 font-medium">Institution Name</Label>
                            <Input
                                type="text"
                                value={exp.institutionName}
                                onChange={(e) => handleChange(index, 'institutionName', e.target.value)}
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

                        <div className="flex flex-col">
                            <Label className="mb-1 font-medium">Marks</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 rounded-md"
                                value={exp.marks}
                                onChange={(e) => handleChange(index, 'marks', e.target.value)}
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
                                <Input
                                    type="date"
                                    value={exp.endDate}
                                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                />
                            </div>
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

export default Education;
