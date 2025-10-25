import getCollection from "@/lib/db/link";
import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export async function POST(request: NextRequest) {
    const email = request.headers.get("X-User-Email");
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdf = new PDFParse({ data: buffer });
    const data = await pdf.getText();

    const prompt = {
        contents: [
            {
                parts: [
                    {
                        text: `
                            Extract all the information from the following resume and return it in this JSON format exactly:

                            {
                                "name": "",
                                "email": "",
                                "phone": "",
                                "address": "",
                                "socials": ["", ""],
                                "summary": "",
                                "experiences": [
                                    { "totalExperience": "[overall] count the startdate and enddate gap and insert here" },
                                    {
                                        "jobTitle": "",
                                        "companyname": "",
                                        "location": "",
                                        "startdate": "",
                                        "enddate": "",
                                        "responsibilities": "",
                                        "present": false
                                    }
                                ],
                                "education": [
                                    {
                                        "Degree": "",
                                        "Institution": "",
                                        "Location": "",
                                        "Startdate": "",
                                        "Enddate": "",
                                        "mark": ""
                                    }
                                ],
                                "skills": ["", "", "", ""],
                                "languages": ["", ""],
                                "certifications": [
                                    {
                                        "name": "",
                                        "organization": "",
                                        "CredentialId": "",
                                        "CredentialUrl": ""
                                    }
                                ],
                                "projects": [
                                    {
                                        "title": "",
                                        "description": "",
                                        "link": ""
                                    }
                                ]
                            }

                            Resume:
                            ${data.text}
                            Return only the JSON object, no extra text.`
                    }
                ]
            }
        ]
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
        },
        body: JSON.stringify(prompt),
    });

    const jsondata = await res.json();
    let rawText = jsondata.candidates[0].content.parts[0].text;
    rawText = rawText.replaceAll(/```json|```/g, "").trim();

    const parsedJSON = JSON.parse(rawText);
    const collection = await getCollection("resumes");

    const OBJ = {
        email,
        ...parsedJSON
    }

    const insert_res = await collection.insertOne({ data: OBJ });

    if (!insert_res.acknowledged) {
        return NextResponse.json({ error: "Failed to store parsed data" }, { status: 500 });
    }

    return NextResponse.json({ id: insert_res.insertedId, data: "data added successfully" });
}
