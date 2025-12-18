import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the PDF from the public directory
    const pdfPath = join(
      process.cwd(),
      "public",
      "Alexander_Gutheil_Resume.pdf"
    );
    const pdfBuffer = await readFile(pdfPath);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Alexander_Gutheil_Resume.pdf"',
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return NextResponse.json(
      {
        error:
          "Resume not found. Please run 'bun run resume:generate' to generate the PDF.",
      },
      { status: 404 }
    );
  }
}
