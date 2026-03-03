import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [totalStudents, totalCourses, paidEnrollments, pendingPayments] = await Promise.all([
      db.student.count(),
      db.course.count({ where: { isActive: true } }),
      db.enrollment.count({ where: { paymentStatus: "paid" } }),
      db.enrollment.count({ where: { paymentStatus: "pending" } }),
    ]);

    return NextResponse.json({
      totalStudents,
      totalCourses,
      paidEnrollments,
      pendingPayments,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
