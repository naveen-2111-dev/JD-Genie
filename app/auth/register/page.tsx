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
import { FcGoogle } from "react-icons/fc"

function RegisterPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
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
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="********" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
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
        </div>
    )
}

export default RegisterPage;