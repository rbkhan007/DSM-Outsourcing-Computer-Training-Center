import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all courses (including inactive)
export async function GET() {
  try {
    const courses = await db.course.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });

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

// POST create new course
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, description, price, duration, level, features, modules } = data;

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const course = await db.course.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        duration,
        level,
        features: JSON.stringify(features || []),
        modules: JSON.stringify(modules || []),
        isActive: true,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
