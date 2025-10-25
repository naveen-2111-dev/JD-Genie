"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner";

function RegisterPage() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please fill in all fields");
        }

        if (!executeRecaptcha) {
            toast.error("Recaptcha not yet available");
            return;
        }

        const token = await executeRecaptcha("register");

        const payload = {
            email: form.email,
            password: form.password,
            token: token
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            const data = await res.json();
            toast.success(data.message);
        } else {
            toast.error("Registration failed Retry");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50" >
            <Card className="w-full max-w-sm">
                <CardHeader className="flex justify-center">
                    <Image src="/logo.png" alt="JD Genie Logo" width={300} height={100} />
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@outlook.com"
                                    onChange={(e) => setForm((prev) => (
                                        { ...prev, email: e.target.value }
                                    ))}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password"
                                    type="password"
                                    placeholder="********"
                                    onChange={(e) => setForm((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }))}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handleSubmit}>
                        Register
                    </Button>
                    <Button variant="outline" className="w-full">
                        <div className="flex">
                            <FcGoogle size={20} className="mr-2" />
                            <span>Continue with Google</span>
                        </div>
                    </Button>
                </CardFooter>
            </Card>
        </div >
    )
}

export default RegisterPage;