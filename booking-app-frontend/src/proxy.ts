import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  console.log(accessToken);

  if (!accessToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const response = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!sign-in|sign-up|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
