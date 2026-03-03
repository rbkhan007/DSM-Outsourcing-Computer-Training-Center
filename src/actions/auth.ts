"use server";

/**
 * Authentication Server Actions
 *
 * Server actions for admin authentication and session management.
 * These run on the server and can be called from client components.
 */

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email?: string | null;
  image?: string | null;
  role: string;
}

/**
 * Authenticate admin user
 */
export async function loginAdmin(
  username: string,
  password: string
): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username, isActive: true },
    });

    if (!admin) {
      return { success: false, error: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return { success: false, error: "Invalid credentials" };
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
    });

    return {
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        image: admin.image,
        role: admin.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An error occurred" };
  }
}

/**
 * Logout admin user
 */
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Get current admin user
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

    if (!sessionId) return null;

    const admin = await prisma.admin.findUnique({
      where: { id: sessionId, isActive: true },
    });

    if (!admin) return null;

    return {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      email: admin.email,
      image: admin.image,
      role: admin.role,
    };
  } catch {
    return null;
  }
}
