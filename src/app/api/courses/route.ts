import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const courses = await db.course.findMany({
      where: { isActive: true },
      include: {
        category: true,
      },
      orderBy: { order: "asc" },
    });

    // Parse JSON fields
    const parsedCourses = courses.map((course) => ({
      ...course,
      features: course.features ? JSON.parse(course.features) : [],
      modules: course.modules ? JSON.parse(course.modules) : [],
      requirements: course.requirements ? JSON.parse(course.requirements) : [],
    }));

    return NextResponse.json(parsedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
