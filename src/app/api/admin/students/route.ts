import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const students = await db.student.findMany({
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
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
