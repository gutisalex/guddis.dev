import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/";

  // Verify the secret token
  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 },
    );
  }

  try {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 },
    );
  }
}

