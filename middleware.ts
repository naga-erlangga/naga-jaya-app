import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";

// Function to check if the user is authenticated
const isAuthenticated = (): boolean => {
    const token = cookies().get("auth")

    return token !== undefined
};

export function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;

    // If the user is trying to access the root path and is not authenticated
    if (pathname !== "/" && !cookies().has("auth")) {
        // console.log("path is not / and cookies is not found" )

        // Redirect unauthenticated users to the login page
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Continue to the requested route
    return NextResponse.next();
}

// Define the paths where the middleware should be applied
export const config = {
    matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all paths except API and static assets
};
