import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const personImageUrl = data.person_image_url;
        const garmentImageUrl = data.garment_image_url;

        if (!personImageUrl || !garmentImageUrl) {
            return NextResponse.json({ error: "Both person and garment image URLs are required." }, { status: 400 });
        }

        const pixelcutData = {
            person_image_url: personImageUrl,
            garment_image_url: garmentImageUrl,
        };

        const response = await axios.post(
            "https://api.developer.pixelcut.ai/v1/try-on",
            pixelcutData,
            {
                headers: {
                    "X-API-KEY": process.env.PIXELCUT_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error occurred during try-on request:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
