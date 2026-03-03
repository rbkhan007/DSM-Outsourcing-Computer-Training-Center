import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET single course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const course = await db.course.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...course,
      features: course.features ? JSON.parse(course.features) : [],
      modules: course.modules ? JSON.parse(course.modules) : [],
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

// PUT update course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { name, description, price, duration, level, features, modules, isActive } = data;

    const course = await db.course.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        duration,
        level,
        features: JSON.stringify(features || []),
        modules: JSON.stringify(modules || []),
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if course has enrollments
    const enrollments = await db.enrollment.count({
      where: { courseId: id },
    });

    if (enrollments > 0) {
      // Soft delete - just mark as inactive
      await db.course.update({
        where: { id },
        data: { isActive: false },
      });
      return NextResponse.json({ message: "Course deactivated (has enrollments)" });
    }

    // Hard delete if no enrollments
    await db.course.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
