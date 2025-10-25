import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded !== "object" || !decoded.email) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        request.headers.set("X-User-Email", decoded.email as string);
        return NextResponse.next();
    } catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export const config = {
    matcher: ["/api/pdf-parser/:path*"]
}