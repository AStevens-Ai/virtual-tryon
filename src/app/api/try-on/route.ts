import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        // Parse the incoming JSON data
        const data = await req.json();

        const personImageUrl = data.person_image_url;
        const garmentImageUrl = data.garment_image_url;

        if (!personImageUrl || !garmentImageUrl) {
            return NextResponse.json({ error: "Both person and garment image URLs are required." }, { status: 400 });
        }

        // Prepare data for Pixelcut API
        const pixelcutData = {
            person_image_url: personImageUrl,
            garment_image_url: garmentImageUrl,
        };

        // Send the request to the Pixelcut API
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

        // Return the response from Pixelcut API
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error occurred during try-on request:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
