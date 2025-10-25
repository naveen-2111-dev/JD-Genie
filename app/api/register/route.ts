import getCollection from "@/lib/db/link";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const { email, password, token } = await request.json();

    if (!token) {
        return NextResponse.json({ success: false, message: "Token not provided" }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const params = new URLSearchParams();
    params.append("secret", secretKey as string);
    params.append("response", token);

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
    });

    const Verification = await res.json();

    if (!Verification.success || Verification.score < 0.5) {
        return NextResponse.json({ success: false, score: Verification.score }, { status: 400 });
    }

    const collection = await getCollection("users");
    const existingUser = await collection.findOne({ email });

    const hash = await bcrypt.hash(password, 10);

    if (existingUser) {
        return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    const Insert_res = await collection.insertOne({ email, password: hash, createdAt: new Date() });

    if (Insert_res.insertedId) {
        return NextResponse.json({ success: true, score: Verification.score, message: "user inserted successfully" }, { status: 201 });
    }

    return NextResponse.json({ success: false, score: Verification.score, message: "failed to add user" }, { status: 500 });
}