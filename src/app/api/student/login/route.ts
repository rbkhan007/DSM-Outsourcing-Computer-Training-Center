import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json();

    if (!email || !phone) {
      return NextResponse.json({ error: "Email and phone are required" }, { status: 400 });
    }

    const student = await db.student.findFirst({
      where: {
        email,
        phone,
      },
      include: {
        enrollments: {
          include: {
            course: {
              select: { name: true },
            },
          },
          orderBy: { enrolledAt: "desc" },
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error("Error logging in student:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
