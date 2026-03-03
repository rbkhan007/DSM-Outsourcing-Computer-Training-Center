import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, address, education, courseId, transactionId, paymentMethod, notes } = data;

    // Validate required fields
    if (!name || !email || !phone || !courseId || !transactionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if student already exists
    let student = await db.student.findUnique({
      where: { email },
    });

    // Create or update student
    if (!student) {
      student = await db.student.create({
        data: {
          name,
          email,
          phone,
          address: address || null,
          education: education || null,
          status: "active",
        },
      });
    } else {
      // Update existing student info
      student = await db.student.update({
        where: { id: student.id },
        data: {
          name,
          phone,
          address: address || student.address,
          education: education || student.education,
        },
      });
    }

    // Check if already enrolled in this course
    const existingEnrollment = await db.enrollment.findFirst({
      where: {
        studentId: student.id,
        courseId,
      },
    });

    if (existingEnrollment) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 });
    }

    // Get course price
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Create enrollment
    const enrollment = await db.enrollment.create({
      data: {
        studentId: student.id,
        courseId,
        transactionId,
        paymentMethod,
        amount: course.price,
        paymentStatus: "pending",
        status: "enrolled",
        notes: notes || null,
      },
    });

    return NextResponse.json({
      success: true,
      enrollment,
      message: "Enrollment submitted successfully",
    });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json({ error: "Failed to submit enrollment" }, { status: 500 });
  }
}
