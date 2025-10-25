import getCollection from "@/lib/db/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const { email, password, token } = await request.json();

    if (!token) {
        return NextResponse.json({ success: false, message: "Token not provided" }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
    const params = new URLSearchParams({ secret: secretKey, response: token });
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
    });

    const verification = await res.json();

    if (!verification.success || verification.score < 0.5) {
        return NextResponse.json({ success: false, score: verification.score }, { status: 400 });
    }

    const collection = await getCollection("users");
    const user = await collection.findOne({ email });

    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    }

    const authToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    (await cookies()).set("token", authToken, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true, score: verification.score, token: authToken }, { status: 200 });
}
