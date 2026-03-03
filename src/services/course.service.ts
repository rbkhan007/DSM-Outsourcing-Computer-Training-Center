/**
 * Course Service
 *
 * Business logic for course management.
 */

import { prisma } from "@/lib/prisma";
import { CourseLevel } from "@prisma/client";

export interface CourseInput {
  name: string;
  description: string;
  price: number;
  duration: string;
  level: CourseLevel;
  categoryId?: string;
  features?: string[];
  modules?: string[];
  image?: string;
  icon?: string;
}

/**
 * Get all active courses
 */
export async function getCourses() {
  return prisma.course.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { order: "asc" },
  });
}

/**
 * Get course by slug
 */
export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: { category: true },
  });
}

/**
 * Create a new course
 */
export async function createCourse(data: CourseInput) {
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return prisma.course.create({
    data: {
      ...data,
      slug,
      features: data.features ? JSON.stringify(data.features) : null,
      modules: data.modules ? JSON.stringify(data.modules) : null,
    },
  });
}

/**
 * Update a course
 */
export async function updateCourse(id: string, data: Partial<CourseInput>) {
  return prisma.course.update({
    where: { id },
    data: {
      ...data,
      features: data.features ? JSON.stringify(data.features) : undefined,
      modules: data.modules ? JSON.stringify(data.modules) : undefined,
    },
  });
}

/**
 * Delete a course (soft delete)
 */
export async function deleteCourse(id: string) {
  return prisma.course.update({
    where: { id },
    data: { isActive: false },
  });
}

/**
 * Get course categories
 */
export async function getCategories() {
  return prisma.courseCategory.findMany({
    orderBy: { order: "asc" },
  });
}
