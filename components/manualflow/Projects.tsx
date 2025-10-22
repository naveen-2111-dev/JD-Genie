"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

const Projects = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [projects, setProjects] = useState([{ name: "", description: "", link: "" }]);
    const router = useRouter();

    const handleAddProject = () => {
        setProjects([...projects, { name: "", description: "", link: "" }]);
    };

    const handleRemoveProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...projects];
        updated[index] = { ...updated[index], [field]: value };
        setProjects(updated);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl mb-8">Projects</h1>
                <div className="flex gap-3">
                    <Button
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => setStep((prev) => prev - 10)}
                    >
                        Prev
                    </Button>
                    <Button onClick={() => router.push("/chat")} className="cursor-pointer">Complete</Button>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <Label className="font-medium text-lg">Projects</Label>
                    <Button variant="link" onClick={handleAddProject} className="p-0">
                        Add Project
                    </Button>
                </div>

                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded-lg shadow-sm flex flex-col gap-3 bg-gray-50"
                    >
                        <div className="flex flex-col">
                            <Label htmlFor={`name-${index}`} className="mb-1 font-medium">
                                Project Name
                            </Label>
                            <Input
                                id={`name-${index}`}
                                value={project.name}
                                onChange={(e) => handleChange(index, "name", e.target.value)}
                                placeholder="e.g. MealForge - AI Recipe Generator"
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label htmlFor={`description-${index}`} className="mb-1 font-medium">
                                Description
                            </Label>
                            <textarea
                                id={`description-${index}`}
                                value={project.description}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                                rows={4}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <Label htmlFor={`link-${index}`} className="mb-1 font-medium">
                                Project Link (optional)
                            </Label>
                            <Input
                                id={`link-${index}`}
                                value={project.link}
                                onChange={(e) => handleChange(index, "link", e.target.value)}
                            />
                        </div>

                        {projects.length > 1 && (
                            <Button
                                variant="link"
                                onClick={() => handleRemoveProject(index)}
                            >
                                Remove Project
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
