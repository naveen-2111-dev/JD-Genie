"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GetResume = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const router = useRouter();

    return (
        <div className="p-6 relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
            <div className="absolute inset-0 from-teal-50 via-cyan-50 to-blue-50">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>

            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 w-full max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card
                        className="group relative p-10 flex flex-col items-center justify-center text-center bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-teal-400 transition-all duration-500 cursor-pointer overflow-hidden"
                        onMouseEnter={() => setHoveredCard('upload')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="relative z-10">
                            <div className={`relative mb-6 transition-transform duration-500 ${hoveredCard === 'upload' ? 'scale-110 -rotate-6' : 'scale-100'}`}>
                                <FileText className="w-12 h-12 text-teal-600" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Upload Resume</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Having an resume? Upload it and we'll analyse it for you
                            </p>

                            <div className="space-y-2 mb-8 text-left max-w-xs mx-auto">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                                    <span>Supports PDF, DOCX formats</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                                    <span>Auto-parse your information</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-teal-600 " />
                                    <span>Quick and easy setup</span>
                                </div>
                            </div>

                            <Button
                                className="from-teal-500 to-teal-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base font-semibold"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Choose File
                            </Button>
                        </div>
                    </Card>

                    <Card
                        className="group relative p-10 flex flex-col items-center justify-center text-center bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-teal-400 transition-all duration-500 cursor-pointer overflow-hidden"
                        onMouseEnter={() => setHoveredCard('manual')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="relative z-10">
                            <div className={`relative mb-6 transition-transform duration-500 ${hoveredCard === 'manual' ? 'scale-110 -rotate-6' : 'scale-100'}`}>
                                <FileText className="w-12 h-12 text-teal-600" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Manual Entry</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Start from scratch with our guided step-by-step builder
                            </p>

                            <div className="space-y-2 mb-8 text-left max-w-xs mx-auto">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-teal-600 " />
                                    <span>Guided form experience</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-teal-600 " />
                                    <span>Pre-written suggestions</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-teal-600 " />
                                    <span>Full customization control</span>
                                </div>
                            </div>

                            <Button
                                className=" from-teal-600 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base font-semibold"
                                onClick={() => router.push("/manual-flow")}
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Start Building
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500 mb-4">Trusted by professionals worldwide</p>
                    <div className="flex items-center justify-center gap-8 text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-teal-600" />
                            <span className="text-sm font-medium text-gray-600">ATS-Friendly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-teal-600" />
                            <span className="text-sm font-medium text-gray-600">Free to Use</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-teal-600" />
                            <span className="text-sm font-medium text-gray-600">Match job with ease</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetResume;