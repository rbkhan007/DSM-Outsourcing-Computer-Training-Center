import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// PATCH update enrollment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { paymentStatus, status } = data;

    const enrollment = await db.enrollment.update({
      where: { id },
      data: {
        ...(paymentStatus && { paymentStatus }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Error updating enrollment:", error);
    return NextResponse.json({ error: "Failed to update enrollment" }, { status: 500 });
  }
}
