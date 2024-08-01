import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken"

import {cookies} from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY || "TESTED123"
const USERNAME = process.env.USERNAME || "TESTED123"
const PASSWORD = process.env.PASSWORD || "TESTED123"

export async function POST(req: NextRequest) {
    let {username, password} = await req.json()

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    cookies().set("auth", token);

    if (username != USERNAME && password != PASSWORD) {
        cookies().delete("auth")
        return new NextResponse("Invalid Credentials", {status: 401});
    }


    return NextResponse.json({ token });
}