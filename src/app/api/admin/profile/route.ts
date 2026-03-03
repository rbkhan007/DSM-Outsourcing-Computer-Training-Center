import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET admin profile (public)
export async function GET() {
  try {
    const admin = await db.admin.findFirst({
      where: { isActive: true },
    });
    
    if (!admin) {
      return NextResponse.json(null);
    }
    
    // Return only public fields
    return NextResponse.json({
      id: admin.id,
      name: admin.name,
      image: admin.image,
      email: admin.email,
      phone: admin.phone,
      bio: admin.bio,
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
