import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// This route seeds the database with initial data
// Force rebuild after schema update
export async function GET() {
  try {
    // Check if admin already exists
    const existingAdmin = await db.admin.findUnique({
      where: { username: "admin" },
    });

    if (!existingAdmin) {
      // Create default admin
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await db.admin.create({
        data: {
          username: "admin",
          password: hashedPassword,
          name: "MD. Administrator",
          email: "admin@dsmoutsourcing.com",
          role: "super_admin",
          isActive: true,
        },
      });
    }

    // Check if courses already exist
    const existingCourses = await db.course.count();

    if (existingCourses === 0) {
      // Create course categories
      const categories = await Promise.all([
        db.courseCategory.create({
          data: { name: "Web Development", slug: "web-development", icon: "code", color: "#3B82F6" },
        }),
        db.courseCategory.create({
          data: { name: "Graphic Design", slug: "graphic-design", icon: "palette", color: "#EC4899" },
        }),
        db.courseCategory.create({
          data: { name: "Digital Marketing", slug: "digital-marketing", icon: "trending-up", color: "#10B981" },
        }),
        db.courseCategory.create({
          data: { name: "Data Science", slug: "data-science", icon: "database", color: "#8B5CF6" },
        }),
      ]);

      // Create sample courses
      const coursesData = [
        {
          name: "Full-Stack Web Development",
          description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and databases.",
          price: 25000,
          duration: "6 months",
          level: "intermediate",
          icon: "code",
          categoryId: categories[0].id,
          features: ["HTML5, CSS3, JavaScript ES6+", "React & Next.js Framework", "Node.js & Express Backend", "MongoDB & MySQL Database", "Real-world Projects", "Job Placement Support"],
          modules: ["Introduction to Web", "HTML & CSS Fundamentals", "JavaScript Deep Dive", "React Development", "Backend with Node.js", "Database Integration", "Deployment & DevOps"],
        },
        {
          name: "Frontend Development with React",
          description: "Learn to build modern, responsive user interfaces with React and related technologies.",
          price: 18000,
          duration: "4 months",
          level: "beginner",
          icon: "code",
          categoryId: categories[0].id,
          features: ["HTML & CSS Mastery", "JavaScript Fundamentals", "React Components & Hooks", "State Management", "API Integration", "Portfolio Projects"],
          modules: ["Web Fundamentals", "JavaScript Essentials", "React Basics", "Advanced React Patterns", "State Management", "Project Work"],
        },
        {
          name: "Graphic Design Masterclass",
          description: "Create stunning visual designs using Adobe Creative Suite and modern design principles.",
          price: 20000,
          duration: "4 months",
          level: "beginner",
          icon: "palette",
          categoryId: categories[1].id,
          features: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Brand Identity Design", "Print & Digital Media", "Portfolio Development"],
          modules: ["Design Principles", "Photoshop Mastery", "Illustrator Techniques", "InDesign for Print", "Brand Design", "Portfolio Project"],
        },
        {
          name: "UI/UX Design Fundamentals",
          description: "Learn user interface and experience design to create intuitive digital products.",
          price: 22000,
          duration: "4 months",
          level: "intermediate",
          icon: "palette",
          categoryId: categories[1].id,
          features: ["User Research Methods", "Wireframing & Prototyping", "Figma & Design Tools", "Design Systems", "Usability Testing", "Real Projects"],
          modules: ["UX Fundamentals", "User Research", "Information Architecture", "Wireframing", "UI Design", "Prototyping", "Portfolio"],
        },
        {
          name: "Digital Marketing Complete",
          description: "Master all aspects of digital marketing including SEO, social media, and paid advertising.",
          price: 15000,
          duration: "3 months",
          level: "beginner",
          icon: "trending-up",
          categoryId: categories[2].id,
          features: ["SEO & SEM", "Social Media Marketing", "Content Marketing", "Email Marketing", "Google Ads & Facebook Ads", "Analytics & Reporting"],
          modules: ["Digital Marketing Overview", "SEO Strategies", "Social Media Marketing", "Paid Advertising", "Content Marketing", "Analytics"],
        },
        {
          name: "Data Analysis with Python",
          description: "Learn to analyze and visualize data using Python, pandas, and visualization libraries.",
          price: 20000,
          duration: "4 months",
          level: "intermediate",
          icon: "database",
          categoryId: categories[3].id,
          features: ["Python Programming", "Pandas & NumPy", "Data Visualization", "SQL for Analysis", "Statistical Analysis", "Real-world Projects"],
          modules: ["Python Basics", "Data Structures", "Pandas Mastery", "Data Visualization", "SQL Integration", "Project Work"],
        },
        {
          name: "Python Programming Fundamentals",
          description: "Start your programming journey with Python - the most versatile programming language.",
          price: 12000,
          duration: "3 months",
          level: "beginner",
          icon: "code",
          categoryId: categories[3].id,
          features: ["Python Syntax & Basics", "Data Structures", "Functions & OOP", "File Handling", "API Development Basics", "Mini Projects"],
          modules: ["Python Basics", "Control Structures", "Functions", "Object-Oriented Programming", "Working with APIs", "Final Project"],
        },
        {
          name: "Freelancing Mastery",
          description: "Learn how to build a successful freelancing career on platforms like Upwork and Fiverr.",
          price: 8000,
          duration: "2 months",
          level: "beginner",
          icon: "trending-up",
          categoryId: categories[2].id,
          features: ["Platform Navigation", "Profile Optimization", "Proposal Writing", "Client Communication", "Pricing Strategies", "Portfolio Building"],
          modules: ["Freelancing Overview", "Upwork Mastery", "Fiverr Success", "Client Management", "Building Reputation", "Scaling Up"],
        },
      ];

      for (let i = 0; i < coursesData.length; i++) {
        const course = coursesData[i];
        await db.course.create({
          data: {
            name: course.name,
            slug: course.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            description: course.description,
            price: course.price,
            duration: course.duration,
            level: course.level,
            icon: course.icon,
            categoryId: course.categoryId,
            features: JSON.stringify(course.features),
            modules: JSON.stringify(course.modules),
            isActive: true,
            order: i,
          },
        });
      }
    }

    // Check if success stories exist
    const existingStories = await db.successStory.count();

    if (existingStories === 0) {
      // Create sample success stories
      const storiesData = [
        {
          name: "Rahim Ahmed",
          course: "Full-Stack Web Development",
          company: "Tech Company BD",
          position: "Senior Developer",
          testimonial: "DSM transformed my career. The hands-on projects and expert guidance helped me land my dream job within 2 months of completing the course.",
          rating: 5,
        },
        {
          name: "Fatima Khatun",
          course: "Graphic Design Masterclass",
          company: "Creative Agency",
          position: "Lead Designer",
          testimonial: "The comprehensive curriculum and real-world projects gave me the confidence and skills to start my own design agency.",
          rating: 5,
        },
        {
          name: "Karim Hassan",
          course: "Digital Marketing Complete",
          company: "Marketing Pro",
          position: "Marketing Manager",
          testimonial: "I went from knowing nothing about digital marketing to managing campaigns for major brands. The ROI on this course is incredible.",
          rating: 5,
        },
        {
          name: "Nusrat Jahan",
          course: "UI/UX Design Fundamentals",
          company: "UX Studio",
          position: "UX Designer",
          testimonial: "The practical approach to learning UX at DSM helped me build a strong portfolio that got me hired at a top design studio.",
          rating: 5,
        },
        {
          name: "Imran Mahmud",
          course: "Python Programming",
          company: "DataTech Solutions",
          position: "Data Analyst",
          testimonial: "The Python course was exactly what I needed to transition into data analysis. The instructor support was exceptional.",
          rating: 5,
        },
        {
          name: "Sabrina Akter",
          course: "Freelancing Mastery",
          company: "Self-employed",
          position: "Freelance Developer",
          testimonial: "Thanks to DSM, I now earn more than I ever did in my previous job, working from home on my own schedule.",
          rating: 5,
        },
      ];

      for (let i = 0; i < storiesData.length; i++) {
        const story = storiesData[i];
        await db.successStory.create({
          data: {
            ...story,
            isActive: true,
            order: i,
          },
        });
      }
    }

    // Create/update statistics
    await db.statistic.upsert({
      where: { key: "students_trained" },
      update: { value: 500 },
      create: { key: "students_trained", value: 500 },
    });

    await db.statistic.upsert({
      where: { key: "years_experience" },
      update: { value: 6 },
      create: { key: "years_experience", value: 6 },
    });

    await db.statistic.upsert({
      where: { key: "success_rate" },
      update: { value: 95 },
      create: { key: "success_rate", value: 95 },
    });

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: {
        admin: !existingAdmin ? "Created default admin (admin/admin123)" : "Admin already exists",
        courses: existingCourses === 0 ? "Created sample courses" : "Courses already exist",
        stories: existingStories === 0 ? "Created success stories" : "Stories already exist",
      },
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
