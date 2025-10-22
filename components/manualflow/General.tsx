"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const General = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [form, setForm] = useState({
        skills: [""],
        languages: [""],
        certifications: [
            {
                name: "",
                issuingOrganization: "",
                credentialID: "",
                credentialURL: "",
            },
        ],
    });

    const handleAddSkill = () => setForm({ ...form, skills: [...form.skills, ""] });
    const handleRemoveSkill = (index: number) =>
        setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) });

    const handleSkillChange = (index: number, value: string) => {
        const updated = [...form.skills];
        updated[index] = value;
        setForm({ ...form, skills: updated });
    };

    const handleAddLanguage = () => setForm({ ...form, languages: [...form.languages, ""] });
    const handleRemoveLanguage = (index: number) =>
        setForm({ ...form, languages: form.languages.filter((_, i) => i !== index) });

    const handleLanguageChange = (index: number, value: string) => {
        const updated = [...form.languages];
        updated[index] = value;
        setForm({ ...form, languages: updated });
    };

    const handleAddCertification = () =>
        setForm({
            ...form,
            certifications: [
                ...form.certifications,
                {
                    name: "",
                    issuingOrganization: "",
                    credentialID: "",
                    credentialURL: "",
                },
            ],
        });

    const handleRemoveCertification = (index: number) =>
        setForm({
            ...form,
            certifications: form.certifications.filter((_, i) => i !== index),
        });

    const handleCertificationChange = (index: number, field: string, value: string) => {
        const updated = [...form.certifications];
        updated[index] = { ...updated[index], [field]: value };
        setForm({ ...form, certifications: updated });
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl mb-8">General Information</h1>
                <div className="flex gap-3">
                    <Button variant="ghost" className="cursor-pointer" onClick={() => setStep((prev) => prev - 10)}>
                        Prev
                    </Button>
                    <Button className="cursor-pointer" onClick={() => setStep((prev) => prev + 10)}>
                        Next
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <Label className="font-medium">Technical Skills</Label>
                        <Button variant="link" onClick={handleAddSkill} className="p-0">
                            Add Skill
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {form.skills.map((skill, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input
                                    value={skill}
                                    onChange={(e) => handleSkillChange(index, e.target.value)}
                                />
                                {form.skills.length > 1 && (
                                    <Button
                                        variant="link"
                                        onClick={() => handleRemoveSkill(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <Label className="font-medium">Languages Known</Label>
                        <Button variant="link" onClick={handleAddLanguage} className="p-0">
                            Add Language
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {form.languages.map((language, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input
                                    value={language}
                                    onChange={(e) => handleLanguageChange(index, e.target.value)}
                                />
                                {form.languages.length > 1 && (
                                    <Button
                                        variant="link"
                                        onClick={() => handleRemoveLanguage(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <Label className="font-medium">Certifications</Label>
                        <Button variant="link" onClick={handleAddCertification} className="p-0">
                            Add Certification
                        </Button>
                    </div>

                    {form.certifications.map((cert, index) => (
                        <div key={index} className="p-4 border rounded-lg flex flex-col gap-3 mb-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="mb-1">Certification Name</Label>
                                    <Input
                                        value={cert.name}
                                        onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="mb-1">Issuing Organization</Label>
                                    <Input
                                        value={cert.issuingOrganization}
                                        onChange={(e) => handleCertificationChange(index, "issuingOrganization", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="mb-1">Credential ID</Label>
                                    <Input
                                        value={cert.credentialID}
                                        onChange={(e) => handleCertificationChange(index, "credentialID", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="mb-1">Credential URL</Label>
                                    <Input
                                        value={cert.credentialURL}
                                        onChange={(e) => handleCertificationChange(index, "credentialURL", e.target.value)}
                                    />
                                </div>
                            </div>

                            {form.certifications.length > 1 && (
                                <Button
                                    variant="link"
                                    onClick={() => handleRemoveCertification(index)}
                                >
                                    Remove Certification
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default General;
