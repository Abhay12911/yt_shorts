import { request } from "http";
import { url } from "inspector";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
    privateKey: process.env.NEXT_PRIVATE_IMAGEKITIO || "",
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT || "",
});

export async function GET(request: Request) {
    return NextResponse.json(imagekit.getAuthenticationParameters())
} 