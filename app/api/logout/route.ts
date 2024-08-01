import {NextRequest, NextResponse} from "next/server";

import {cookies} from "next/headers";

export async function POST(req: NextRequest) {

    cookies().delete("auth")

    // console.log(cookies().has("auth"))

    return NextResponse.json("Logout Success");
}