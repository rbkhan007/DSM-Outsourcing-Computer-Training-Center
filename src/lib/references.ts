/**
 * Application Configuration & References
 *
 * All configurable values are loaded from environment variables.
 * Update .env.local to customize for your deployment.
 */

// ============================================================================
// APPLICATION METADATA
// ============================================================================

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "DSM Outsourcing & Computer Training Center",
  shortName: "DSM",
  description: "Premier IT training center in Bangladesh offering comprehensive tech courses",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  version: "1.0.0",
  locale: "en_US",
  defaultTheme: "light" as const,
  themes: ["light", "dark"] as const,
} as const;

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export const CONTACT_INFO = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@dsmoutsourcing.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+880 1774 471120",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+880 1774 471120",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "Dinajpur, Bangladesh",
  map: {
    latitude: parseFloat(process.env.NEXT_PUBLIC_MAP_LATITUDE || "25.65034211319672"),
    longitude: parseFloat(process.env.NEXT_PUBLIC_MAP_LONGITUDE || "88.77447727594065"),
    zoom: 15,
  },
  businessHours: {
    weekdays: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "Closed",
    timezone: "Asia/Dhaka",
  },
} as const;

// ============================================================================
// SOCIAL MEDIA LINKS
// ============================================================================

export const SOCIAL_LINKS = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/dsmoutsourcing",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@dsmoutsourcing",
  videoPreview: process.env.NEXT_PUBLIC_VIDEO_PREVIEW_URL || "https://www.youtube.com/embed/A6akU93x8Vw?si=S2Z5cTpBeoYZ-c3M",
} as const;

// ============================================================================
// ADMIN CONFIGURATION
// ============================================================================

export const ADMIN_CONFIG = {
  accessKey: process.env.ADMIN_ACCESS_KEY || "dsm2024secret",
  sessionDuration: 24, // hours
  defaultCredentials: {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123",
    email: "admin@dsmoutsourcing.com",
    name: "MD. Momin Sakar",
    phone: "+880 1774 471120",
  },
} as const;

// ============================================================================
// NAVIGATION
// ============================================================================

export const NAV_CONFIG = {
  mainNav: [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About Us", href: "/?tab=about" },
    { id: "courses", label: "Courses", href: "/?tab=courses" },
    { id: "admission", label: "Admission", href: "/?tab=admission" },
    { id: "stories", label: "Success Stories", href: "/?tab=stories" },
    { id: "student", label: "Student Portal", href: "/?tab=student" },
  ],
} as const;

// ============================================================================
// DEVELOPER CREDITS
// ============================================================================

export const DEVELOPER_CREDITS = {
  name: "Rakibul Hasan",
  message: "Built with ❤️ by",
} as const;

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  courses: "/api/courses",
  stories: "/api/stories",
  settings: "/api/settings",
  adminProfile: "/api/admin/profile",
  adminLogin: "/api/admin/login",
  adminStats: "/api/admin/stats",
  adminStudents: "/api/admin/students",
  adminCourses: "/api/admin/courses",
  adminSettings: "/api/admin/settings",
  studentLogin: "/api/student/login",
  enrollment: "/api/enrollment",
  chat: "/api/chat",
  seed: "/api/seed",
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAdminAccessUrl(): string {
  return `${APP_CONFIG.url}/?access=${ADMIN_CONFIG.accessKey}`;
}

export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString()}`;
}
