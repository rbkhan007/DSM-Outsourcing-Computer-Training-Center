"use server";

/**
 * Settings Server Actions
 *
 * Server actions for managing application settings.
 */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface Settings {
  site_name?: string;
  site_description?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  map_latitude?: string;
  map_longitude?: string;
  video_preview_url?: string;
  facebook_url?: string;
  youtube_url?: string;
}

// Public settings keys (safe to expose to frontend)
const PUBLIC_KEYS = [
  "site_name",
  "site_description",
  "contact_email",
  "contact_phone",
  "contact_address",
  "map_latitude",
  "map_longitude",
  "video_preview_url",
  "facebook_url",
  "youtube_url",
];

// Default settings
const DEFAULTS: Settings = {
  site_name: "DSM Outsourcing & Computer Training Center",
  site_description: "Premier IT training center in Bangladesh",
  contact_email: "info@dsmoutsourcing.com",
  contact_phone: "+880 1774 471120",
  contact_address: "Dinajpur, Bangladesh",
  map_latitude: "25.65034211319672",
  map_longitude: "88.77447727594065",
  video_preview_url: "https://www.youtube.com/embed/A6akU93x8Vw?si=S2Z5cTpBeoYZ-c3M",
  facebook_url: "https://facebook.com/dsmoutsourcing",
  youtube_url: "https://youtube.com/@dsmoutsourcing",
};

/**
 * Get public settings
 */
export async function getPublicSettings(): Promise<Settings> {
  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: { in: PUBLIC_KEYS },
      },
    });

    const result: Settings = { ...DEFAULTS };
    settings.forEach((s) => {
      (result as Record<string, string>)[s.key] = s.value;
    });

    return result;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return DEFAULTS;
  }
}

/**
 * Update settings (admin only)
 */
export async function updateSettings(
  settings: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  try {
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}

/**
 * Get a single setting value
 */
export async function getSetting(key: string): Promise<string | null> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key },
    });
    return setting?.value ?? (DEFAULTS as Record<string, string>)[key] ?? null;
  } catch {
    return null;
  }
}
