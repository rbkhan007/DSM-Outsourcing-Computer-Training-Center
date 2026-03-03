import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get all students with their enrollment data
    const students = await db.student.findMany({
      include: {
        enrollments: {
          include: {
            course: {
              select: { name: true, price: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform data for Excel export
    const data = students.flatMap((student) => {
      if (student.enrollments.length === 0) {
        return [{
          Name: student.name,
          Email: student.email,
          Phone: student.phone,
          Address: student.address || "",
          Education: student.education || "",
          Status: student.status,
          Course: "",
          "Payment Status": "",
          "Enrollment Status": "",
          Amount: "",
          "Transaction ID": "",
          "Enrolled Date": "",
          "Created At": new Date(student.createdAt).toLocaleDateString(),
        }];
      }

      return student.enrollments.map((enrollment) => ({
        Name: student.name,
        Email: student.email,
        Phone: student.phone,
        Address: student.address || "",
        Education: student.education || "",
        Status: student.status,
        Course: enrollment.course.name,
        "Payment Status": enrollment.paymentStatus,
        "Enrollment Status": enrollment.status,
        Amount: enrollment.amount?.toString() || enrollment.course.price.toString(),
        "Transaction ID": enrollment.transactionId || "",
        "Enrolled Date": new Date(enrollment.enrolledAt).toLocaleDateString(),
        "Created At": new Date(student.createdAt).toLocaleDateString(),
      }));
    });

    // Return JSON that can be converted to Excel on client side
    // For now, return CSV format
    const headers = Object.keys(data[0] || {});
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => `"${(row as Record<string, string>)[h] || ""}"`).join(",")
      ),
    ].join("\n");

    return new NextResponse(csvRows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="students_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
