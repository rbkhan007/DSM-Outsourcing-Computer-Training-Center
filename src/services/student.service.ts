/**
 * Student Service
 *
 * Business logic for student management.
 */

import { prisma } from "@/lib/prisma";
import { StudentStatus, PaymentStatus, EnrollmentStatus } from "@prisma/client";

export interface StudentInput {
  name: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  education?: string;
  nid?: string;
  photo?: string;
}

export interface EnrollmentInput {
  studentId: string;
  courseId: string;
  paymentMethod?: string;
  transactionId?: string;
  amount?: number;
}

/**
 * Get all students
 */
export async function getStudents(status?: StudentStatus) {
  return prisma.student.findMany({
    where: status ? { status } : undefined,
    include: {
      enrollments: {
        include: { course: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get student by ID
 */
export async function getStudent(id: string) {
  return prisma.student.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: { course: true },
      },
    },
  });
}

/**
 * Create a new student
 */
export async function createStudent(data: StudentInput) {
  return prisma.student.create({
    data,
  });
}

/**
 * Update a student
 */
export async function updateStudent(id: string, data: Partial<StudentInput>) {
  return prisma.student.update({
    where: { id },
    data,
  });
}

/**
 * Enroll student in a course
 */
export async function enrollStudent(data: EnrollmentInput) {
  return prisma.enrollment.create({
    data: {
      studentId: data.studentId,
      courseId: data.courseId,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId,
      amount: data.amount,
      paymentStatus: data.transactionId ? PaymentStatus.PAID : PaymentStatus.PENDING,
    },
  });
}

/**
 * Update enrollment status
 */
export async function updateEnrollmentStatus(
  id: string,
  status: EnrollmentStatus
) {
  return prisma.enrollment.update({
    where: { id },
    data: {
      status,
      completedAt: status === EnrollmentStatus.COMPLETED ? new Date() : undefined,
    },
  });
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  const [totalStudents, totalCourses, paidEnrollments, pendingPayments] =
    await Promise.all([
      prisma.student.count(),
      prisma.course.count({ where: { isActive: true } }),
      prisma.enrollment.count({ where: { paymentStatus: PaymentStatus.PAID } }),
      prisma.enrollment.count({ where: { paymentStatus: PaymentStatus.PENDING } }),
    ]);

  return {
    totalStudents,
    totalCourses,
    paidEnrollments,
    pendingPayments,
  };
}
