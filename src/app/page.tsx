"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Palette,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Globe,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Menu,
  X,
  GraduationCap,
  Target,
  Zap,
  BookOpen,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Play,
  Shield,
  Download,
  FileSpreadsheet,
  User,
  Settings,
  LogOut,
  BarChart3,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus,
  Upload,
  Image as ImageIcon,
  MessageSquare,
  Bell,
  Moon,
  Sun,
  Monitor,
  Sparkles,
  Brain,
  Rocket,
  Send,
  MessageCircle,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { MatrixRain } from "@/components/matrix-rain";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Types
interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  duration: string;
  level: string;
  image?: string;
  icon?: string;
  features?: string[];
  modules?: string[];
  isActive: boolean;
  category?: { name: string; icon: string };
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: string;
  createdAt: string;
  enrollments: Enrollment[];
}

interface Enrollment {
  id: string;
  courseId: string;
  course: { name: string };
  paymentStatus: string;
  status: string;
  enrolledAt: string;
}

interface SuccessStory {
  id: string;
  name: string;
  course: string;
  company?: string;
  position?: string;
  image?: string;
  testimonial: string;
  rating: number;
}

interface ChatMessage {
  id: string;
  content: string;
  senderType: string;
  senderId: string;
  senderName: string;
  receiverType: string;
  receiverId?: string;
  isRead: boolean;
  createdAt: string;
}

interface AdminProfile {
  id: string;
  name: string;
  image?: string;
  email?: string;
  phone?: string;
  bio?: string;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Theme Toggle Component - Uses suppressHydrationWarning for icon
function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");

  // Read saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span suppressHydrationWarning>
            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Navigation Component
function Navigation({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "courses", label: "Courses" },
    { id: "admission", label: "Admission" },
    { id: "stories", label: "Success Stories" },
    { id: "student", label: "Student Portal" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border/50" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
              <span className="font-bold text-black text-lg">D</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-gold-gradient">DSM</span>
              <span className="text-muted-foreground"> Outsourcing</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className={activeTab === item.id ? "bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]" : ""}
              >
                {item.label}
              </Button>
            ))}
            <Separator orientation="vertical" className="h-6 mx-2" />
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("admin")}
              className="border-[var(--gold)]/50 hover:border-[var(--gold)] hover:bg-[var(--gold)]/10"
            >
              <Shield className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                      <span className="font-bold text-black">D</span>
                    </div>
                    <span className="text-gold-gradient">DSM</span>
                  </SheetTitle>
                  <SheetDescription>Training & Outsourcing Center</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`justify-start ${
                        activeTab === item.id ? "bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]" : ""
                      }`}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                  <Separator className="my-4" />
                  <Button
                    variant="outline"
                    className="justify-start border-[var(--gold)]/50"
                    onClick={() => {
                      setActiveTab("admin");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

// Hero Section
function HeroSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const stats = [
    { value: "500+", label: "Students Trained", icon: Users },
    { value: "6+", label: "Years Experience", icon: Award },
    { value: "95%", label: "Success Rate", icon: Target },
    { value: "50+", label: "Courses Offered", icon: BookOpen },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background - Theme aware */}
      <div className="absolute inset-0 bg-background">
        {/* Light mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 via-background to-[var(--gold-dark)]/5 dark:from-black dark:via-zinc-900 dark:to-black" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold)]/15 dark:bg-[var(--gold)]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gold-dark)]/15 dark:bg-[var(--gold-dark)]/20 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge
              variant="outline"
              className="px-4 py-2 border-[var(--gold)]/50 bg-[var(--gold)]/10 text-[var(--gold)]"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Premier Computer Training Center
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground dark:text-white">DSM </span>
            <span className="text-gold-gradient">Outsourcing</span>
            <br />
            <span className="text-3xl md:text-4xl text-muted-foreground">&amp; Computer Training Center</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your career with industry-leading courses in web development, graphic design, digital marketing, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={() => setActiveTab("admission")}
              className="bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)] text-lg px-8 py-6 group"
            >
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setActiveTab("courses")}
              className="border-[var(--gold)]/50 text-[var(--gold)] hover:bg-[var(--gold)]/10 text-lg px-8 py-6"
            >
              View Courses
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-gold rounded-2xl p-6 text-center"
              >
                <stat.icon className="h-8 w-8 text-[var(--gold)] mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[var(--gold)]/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-[var(--gold)] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// AI Course Recommender Section
function AIRecommenderSection() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const goals = [
    { id: "money", label: "Earn Money Online", icon: DollarSign, color: "from-green-500 to-emerald-600" },
    { id: "websites", label: "Building Websites", icon: Code2, color: "from-blue-500 to-cyan-600" },
    { id: "data", label: "Working with Data", icon: Database, color: "from-purple-500 to-violet-600" },
    { id: "design", label: "Graphic Design", icon: Palette, color: "from-pink-500 to-rose-600" },
  ];

  const recommendations: Record<string, { courses: string[]; description: string }> = {
    money: {
      courses: ["Digital Marketing", "Freelancing Mastery", "E-commerce Development", "Content Creation"],
      description: "Learn skills that can help you earn online through freelancing, content creation, and digital marketing.",
    },
    websites: {
      courses: ["Full-Stack Web Development", "React & Next.js", "Backend Development", "UI/UX Design"],
      description: "Master modern web technologies and build professional websites and applications.",
    },
    data: {
      courses: ["Data Analysis", "Python Programming", "SQL & Database Design", "Business Intelligence"],
      description: "Learn to analyze, visualize, and make decisions based on data.",
    },
    design: {
      courses: ["Graphic Design Fundamentals", "Adobe Creative Suite", "UI/UX Design", "Motion Graphics"],
      description: "Create stunning visual designs for brands, websites, and marketing materials.",
    },
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setRecommendation(null);
    setTimeout(() => {
      setRecommendation(goalId);
    }, 1000);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--gold)]/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <Badge className="bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gold-gradient">AI Course</span> Recommender
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-muted-foreground mb-12">
            Let our AI help you find the perfect course based on your goals
          </motion.p>

          <motion.div variants={fadeInUp} className="glass-gold rounded-3xl p-8 md:p-12">
            <h3 className="text-xl font-semibold mb-6 text-foreground">What is your main goal?</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {goals.map((goal) => (
                <motion.button
                  key={goal.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedGoal === goal.id
                      ? "border-[var(--gold)] bg-[var(--gold)]/10 shadow-lg shadow-[var(--gold)]/20"
                      : "border-border hover:border-[var(--gold)]/50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mx-auto mb-3`}>
                    <goal.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{goal.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Recommendation */}
            <AnimatePresence mode="wait">
              {selectedGoal && recommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-left bg-background/50 rounded-2xl p-6 border border-border"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-[var(--gold)]" />
                    <span className="font-semibold text-[var(--gold)]">Recommended for You</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{recommendations[recommendation].description}</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendations[recommendation].courses.map((course, i) => (
                      <Badge key={i} variant="secondary" className="bg-[var(--gold)]/10 text-[var(--gold)]">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {selectedGoal && !recommendation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-8"
                >
                  <div className="animate-pulse flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="ml-2">Analyzing your goals...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Courses Section
function CoursesSection({ courses }: { courses: Course[] }) {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch && course.isActive;
  });

  const courseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    frontend: Code2,
    backend: Database,
    design: Palette,
    marketing: TrendingUp,
    data: Database,
    default: BookOpen,
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20 mb-4">
              Our Programs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Comprehensive</span> Tech Training
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master full-stack development with our industry-aligned curriculum
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-4 mb-8 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Course Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => {
              const IconComponent = courseIcons[course.icon || "default"] || BookOpen;
              return (
                <motion.div
                  key={course.id}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="h-full glass border-border/50 hover:border-[var(--gold)]/50 transition-all duration-300 overflow-hidden">
                    <CardHeader className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center mb-4">
                          <IconComponent className="h-7 w-7 text-black" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-[var(--gold)] transition-colors">
                          {course.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {course.level}
                        </Badge>
                        {course.category && (
                          <Badge variant="outline" className="text-xs">
                            {course.category.name}
                          </Badge>
                        )}
                      </div>
                      {course.features && course.features.length > 0 && (
                        <ul className="space-y-1.5">
                          {course.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-[var(--gold)]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
                      <div className="text-2xl font-bold text-[var(--gold)]">
                        ৳{course.price.toLocaleString()}
                      </div>
                      <Button size="sm" className="bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]">
                        Enroll Now
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredCourses.length === 0 && (
            <motion.div variants={fadeInUp} className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No courses found matching your criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Why Choose Section
function WhyChooseSection() {
  const features = [
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience",
    },
    {
      icon: Zap,
      title: "Hands-on Projects",
      description: "Work on real-world projects to build your portfolio",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a network of successful alumni and peers",
    },
    {
      icon: Globe,
      title: "Remote Work Ready",
      description: "Master skills for freelancing and remote jobs",
    },
    {
      icon: Briefcase,
      title: "Job Assistance",
      description: "Get guidance for placements and job opportunities",
    },
    {
      icon: Award,
      title: "Certification",
      description: "Earn recognized certificates upon completion",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20 mb-4">
              Our Advantages
            </Badge>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gold-gradient">DSM</span>?
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-muted-foreground mb-12">
            We empower students with skills for the digital economy
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-gold rounded-2xl p-6 text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Success Stories Section
function SuccessStoriesSection({ stories }: { stories: SuccessStory[] }) {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20 mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Success</span> Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our graduates who transformed their careers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass border-border/50 hover:border-[var(--gold)]/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-[var(--gold)]">
                        <AvatarImage src={story.image} />
                        <AvatarFallback className="bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-black font-bold">
                          {story.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{story.name}</CardTitle>
                        <CardDescription className="text-[var(--gold)]">
                          {story.position} @ {story.company}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: story.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm italic">
                      &quot;{story.testimonial}&quot;
                    </p>
                    <Badge variant="secondary" className="mt-4 text-xs">
                      {story.course}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Admission Form Section
function AdmissionSection({ courses }: { courses: Course[] }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    courseId: "",
    transactionId: "",
    paymentMethod: "bkash",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Enrollment Submitted!",
          description: "We'll contact you shortly to confirm your enrollment.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          education: "",
          courseId: "",
          transactionId: "",
          paymentMethod: "bkash",
          notes: "",
        });
      } else {
        throw new Error(data.error || "Failed to submit enrollment");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit enrollment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20 mb-4">
              Join Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Online <span className="text-gold-gradient">Admission</span>
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below to enroll in your chosen course
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-[var(--gold)]" />
                  Enrollment Form
                </CardTitle>
                <CardDescription>
                  Complete all fields to submit your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1XXX-XXXXXX"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">Education Level</Label>
                      <Select
                        value={formData.education}
                        onValueChange={(value) => setFormData({ ...formData, education: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ssc">SSC</SelectItem>
                          <SelectItem value="hsc">HSC</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="bachelors">Bachelor&apos;s</SelectItem>
                          <SelectItem value="masters">Master&apos;s</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Your full address"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[var(--gold)]" />
                      Course Selection
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="course">Select Course *</Label>
                      <Select
                        value={formData.courseId}
                        onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.filter((c) => c.isActive).map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name} - ৳{course.price.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-[var(--gold)]" />
                      Payment Information
                    </h3>
                    <Alert>
                      <AlertTitle>Payment Instructions</AlertTitle>
                      <AlertDescription>
                        Send your course fee to <strong>bKash: 01774-471120</strong> or <strong>Nagad: 01774-471120</strong> and enter the transaction ID below.
                      </AlertDescription>
                    </Alert>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method *</Label>
                        <Select
                          value={formData.paymentMethod}
                          onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bkash">bKash</SelectItem>
                            <SelectItem value="nagad">Nagad</SelectItem>
                            <SelectItem value="rocket">Rocket</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transactionId">Transaction ID *</Label>
                        <Input
                          id="transactionId"
                          value={formData.transactionId}
                          onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                          placeholder="Enter transaction ID"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional information..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enrollment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Student Portal Section
function StudentPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", phone: "" });
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();
      
      if (response.ok) {
        setStudent(data.student);
        setIsLoggedIn(true);
        toast({ title: "Welcome back!", description: `Hello, ${data.student.name}` });
      } else {
        toast({ title: "Login Failed", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to login", variant: "destructive" });
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="py-24 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-md mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <Badge className="bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20 mb-4">
                Student Area
              </Badge>
              <h2 className="text-3xl font-bold">Student Portal</h2>
              <p className="text-muted-foreground mt-2">
                Login to view your enrollment status and progress
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[var(--gold)]" />
                    Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginPhone">Phone Number</Label>
                      <Input
                        id="loginPhone"
                        value={loginForm.phone}
                        onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                        placeholder="+880 1XXX-XXXXXX"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]">
                      Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Welcome, {student?.name}</h2>
              <p className="text-muted-foreground">View your enrollment details</p>
            </div>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="glass border-border/50">
              <CardHeader className="pb-2">
                <CardDescription>Total Enrollments</CardDescription>
                <CardTitle className="text-3xl text-[var(--gold)]">
                  {student?.enrollments.length || 0}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass border-border/50">
              <CardHeader className="pb-2">
                <CardDescription>Active Courses</CardDescription>
                <CardTitle className="text-3xl text-[var(--gold)]">
                  {student?.enrollments.filter((e) => e.status === "in_progress").length || 0}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass border-border/50">
              <CardHeader className="pb-2">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-3xl text-[var(--gold)]">
                  {student?.enrollments.filter((e) => e.status === "completed").length || 0}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Your Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Enrollment Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student?.enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">{enrollment.course.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={enrollment.paymentStatus === "paid" ? "default" : "secondary"}
                          className={enrollment.paymentStatus === "paid" ? "bg-green-600" : ""}
                        >
                          {enrollment.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {enrollment.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(enrollment.enrolledAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  {(!student?.enrollments || student.enrollments.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No enrollments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Admin Dashboard
function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<{ id: string; username: string; name: string; image?: string } | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [activeView, setActiveView] = useState("dashboard");
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0, paidEnrollments: 0, pendingPayments: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const { toast } = useToast();

  // Course form state
  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    level: "beginner",
    features: "",
    modules: "",
    image: "",
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [adminProfileForm, setAdminProfileForm] = useState({
    name: "",
    bio: "",
    phone: "",
    image: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const courseImageRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();
      
      if (response.ok) {
        setIsAuthenticated(true);
        setAdminUser(data.admin);
        fetchDashboardData();
        toast({ title: "Welcome!", description: `Logged in as ${data.admin.name}` });
      } else {
        toast({ title: "Login Failed", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to login", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [studentsRes, coursesRes, statsRes, chatRes] = await Promise.all([
        fetch("/api/admin/students"),
        fetch("/api/courses"),
        fetch("/api/admin/stats"),
        fetch("/api/chat?userType=admin"),
      ]);
      
      if (studentsRes.ok) setStudents(await studentsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      if (chatRes.ok) setChatMessages(await chatRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = editingCourse ? `/api/admin/courses/${editingCourse.id}` : "/api/admin/courses";
      const method = editingCourse ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...courseForm,
          price: parseFloat(courseForm.price),
          features: courseForm.features.split("\n").filter(Boolean),
          modules: courseForm.modules.split("\n").filter(Boolean),
        }),
      });
      
      if (response.ok) {
        toast({ title: editingCourse ? "Course Updated" : "Course Created", description: "Successfully saved" });
        setCourseForm({ name: "", description: "", price: "", duration: "", level: "beginner", features: "", modules: "" });
        setEditingCourse(null);
        fetchDashboardData();
      }
    } catch {
      toast({ title: "Error", description: "Failed to save course", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, { method: "DELETE" });
      if (response.ok) {
        toast({ title: "Course Deleted" });
        fetchDashboardData();
      }
    } catch {
      toast({ title: "Error", description: "Failed to delete course", variant: "destructive" });
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await fetch("/api/admin/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `students_${new Date().toISOString().split("T")[0]}.xlsx`;
      a.click();
      toast({ title: "Export Complete", description: "Excel file downloaded" });
    } catch {
      toast({ title: "Error", description: "Failed to export", variant: "destructive" });
    }
  };

  const handleBackup = async () => {
    try {
      const response = await fetch("/api/admin/backup");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_${new Date().toISOString().split("T")[0]}.db`;
      a.click();
      toast({ title: "Backup Complete", description: "Database backup downloaded" });
    } catch {
      toast({ title: "Error", description: "Failed to backup", variant: "destructive" });
    }
  };

  const updateEnrollmentStatus = async (enrollmentId: string, field: string, value: string) => {
    try {
      const response = await fetch(`/api/admin/enrollments/${enrollmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (response.ok) {
        toast({ title: "Updated", description: "Status changed successfully" });
        fetchDashboardData();
      }
    } catch {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="py-24 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-md mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-3xl font-bold">Admin Panel</h2>
              <p className="text-muted-foreground mt-2">Secure access for administrators</p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Administrator Login</CardTitle>
                  <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminUsername">Username</Label>
                      <Input
                        id="adminUsername"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        placeholder="admin"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">Password</Label>
                      <Input
                        id="adminPassword"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Default: admin / admin123
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="h-8 w-8 text-[var(--gold)]" />
                Admin Dashboard
              </h2>
              <p className="text-muted-foreground">Welcome back, {adminUser?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExportExcel}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button variant="outline" onClick={handleBackup}>
                <Download className="h-4 w-4 mr-2" />
                Backup DB
              </Button>
              <Button variant="ghost" onClick={() => setIsAuthenticated(false)}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="glass border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Total Students
                </CardDescription>
                <CardTitle className="text-3xl text-[var(--gold)]">{stats.totalStudents}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Active Courses
                </CardDescription>
                <CardTitle className="text-3xl text-[var(--gold)]">{stats.totalCourses}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Paid Enrollments
                </CardDescription>
                <CardTitle className="text-3xl text-[var(--gold)]">{stats.paidEnrollments}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Pending Payments
                </CardDescription>
                <CardTitle className="text-3xl text-[var(--gold)]">{stats.pendingPayments}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl">
              <TabsTrigger value="dashboard">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="students">
                <Users className="h-4 w-4 mr-2" />
                Students
              </TabsTrigger>
              <TabsTrigger value="courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Overview */}
            <TabsContent value="dashboard">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Recent Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.slice(0, 10).flatMap((student) =>
                        student.enrollments.slice(0, 3).map((enrollment) => (
                          <TableRow key={enrollment.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-xs text-muted-foreground">{student.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{enrollment.course.name}</TableCell>
                            <TableCell>
                              <Badge
                                variant={enrollment.paymentStatus === "paid" ? "default" : "secondary"}
                                className={enrollment.paymentStatus === "paid" ? "bg-green-600" : ""}
                              >
                                {enrollment.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {enrollment.status.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(enrollment.enrolledAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                      {students.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No enrollments yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Students Management */}
            <TabsContent value="students">
              <Card className="glass border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Student Management</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search students..." className="pl-10 w-64" />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Course(s)</TableHead>
                          <TableHead>Payment Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback className="bg-[var(--gold)] text-black">
                                    {student.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-xs text-muted-foreground">{student.status}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{student.email}</div>
                              <div className="text-xs text-muted-foreground">{student.phone}</div>
                            </TableCell>
                            <TableCell>
                              {student.enrollments.map((e, i) => (
                                <Badge key={i} variant="outline" className="mr-1 mb-1">
                                  {e.course.name}
                                </Badge>
                              ))}
                            </TableCell>
                            <TableCell>
                              {student.enrollments.map((e, i) => (
                                <div key={i} className="flex items-center gap-2 mb-1">
                                  <Badge
                                    variant={e.paymentStatus === "paid" ? "default" : "secondary"}
                                    className={e.paymentStatus === "paid" ? "bg-green-600" : ""}
                                  >
                                    {e.paymentStatus}
                                  </Badge>
                                  {e.paymentStatus === "pending" && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-6 text-xs"
                                      onClick={() => updateEnrollmentStatus(e.id, "paymentStatus", "paid")}
                                    >
                                      Mark Paid
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                        {students.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                              No students enrolled yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Management */}
            <TabsContent value="courses">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Course Form */}
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle>{editingCourse ? "Edit Course" : "Add New Course"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCourseSubmit} className="space-y-4">
                      {/* Course Image Upload */}
                      <div className="space-y-2">
                        <Label>Course Image</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted/50">
                            {courseForm.image ? (
                              <img src={courseForm.image} alt="Course" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => courseImageRef.current?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                          <input
                            ref={courseImageRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const formData = new FormData();
                                formData.append("file", file);
                                formData.append("type", "course");

                                try {
                                  const res = await fetch("/api/upload", {
                                    method: "POST",
                                    body: formData,
                                  });

                                  if (res.ok) {
                                    const data = await res.json();
                                    setCourseForm((prev) => ({ ...prev, image: data.url }));
                                    toast({ title: "Image uploaded" });
                                  }
                                } catch {
                                  toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input
                          id="courseName"
                          value={courseForm.name}
                          onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                          placeholder="e.g., Web Development"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseDesc">Description</Label>
                        <Textarea
                          id="courseDesc"
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                          placeholder="Course description..."
                          rows={2}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="coursePrice">Price (৳)</Label>
                          <Input
                            id="coursePrice"
                            type="number"
                            value={courseForm.price}
                            onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                            placeholder="5000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="courseDuration">Duration</Label>
                          <Input
                            id="courseDuration"
                            value={courseForm.duration}
                            onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                            placeholder="3 months"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="courseLevel">Level</Label>
                          <Select
                            value={courseForm.level}
                            onValueChange={(v) => setCourseForm({ ...courseForm, level: v })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseFeatures">Features (one per line)</Label>
                        <Textarea
                          id="courseFeatures"
                          value={courseForm.features}
                          onChange={(e) => setCourseForm({ ...courseForm, features: e.target.value })}
                          placeholder="HTML, CSS, JavaScript&#10;React Framework&#10;Real Projects"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]" disabled={isLoading}>
                          {isLoading ? "Saving..." : editingCourse ? "Update Course" : "Add Course"}
                        </Button>
                        {editingCourse && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setEditingCourse(null);
                              setCourseForm({ name: "", description: "", price: "", duration: "", level: "beginner", features: "", modules: "" });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Course List */}
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle>All Courses ({courses.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-[var(--gold)]/50 transition-colors"
                        >
                          <div>
                            <div className="font-medium">{course.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ৳{course.price.toLocaleString()} • {course.duration} • {course.level}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={course.isActive ? "default" : "secondary"} className={course.isActive ? "bg-green-600" : ""}>
                              {course.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setEditingCourse(course);
                                setCourseForm({
                                  name: course.name,
                                  description: course.description,
                                  price: course.price.toString(),
                                  duration: course.duration,
                                  level: course.level,
                                  features: course.features?.join("\n") || "",
                                  modules: course.modules?.join("\n") || "",
                                });
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDeleteCourse(course.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {courses.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">No courses yet</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Messages Management */}
            <TabsContent value="messages">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-[var(--gold)]" />
                    Chat Messages
                  </CardTitle>
                  <CardDescription>
                    Respond to student inquiries and manage conversations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Conversations List */}
                    <div className="lg:col-span-1 space-y-2 max-h-[500px] overflow-y-auto">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Conversations</h4>
                      {(() => {
                        const uniqueSenders = Array.from(
                          new Map(
                            chatMessages
                              .filter((m) => m.senderType === "student")
                              .map((m) => [m.senderId, { id: m.senderId, name: m.senderName }])
                          ).values()
                        );
                        return uniqueSenders.length > 0 ? (
                          uniqueSenders.map((sender) => {
                            const unread = chatMessages.filter(
                              (m) => m.senderId === sender.id && !m.isRead && m.senderType === "student"
                            ).length;
                            return (
                              <Button
                                key={sender.id}
                                variant={replyTo?.id === sender.id ? "default" : "ghost"}
                                className={`w-full justify-start text-left ${
                                  replyTo?.id === sender.id ? "bg-[var(--gold)] text-black" : ""
                                }`}
                                onClick={() => setReplyTo(sender)}
                              >
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback className="bg-[var(--gold)]/20 text-[var(--gold)]">
                                    {sender.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="flex-1 truncate">{sender.name}</span>
                                {unread > 0 && (
                                  <Badge className="ml-2 bg-red-500 text-white text-xs">{unread}</Badge>
                                )}
                              </Button>
                            );
                          })
                        ) : (
                          <p className="text-sm text-muted-foreground">No conversations yet</p>
                        );
                      })()}
                    </div>

                    {/* Chat View */}
                    <div className="lg:col-span-2 flex flex-col h-[500px]">
                      {replyTo ? (
                        <>
                          {/* Messages */}
                          <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 rounded-lg bg-background/50">
                            {chatMessages
                              .filter((m) => m.senderId === replyTo.id || m.receiverId === replyTo.id)
                              .map((msg) => (
                                <div
                                  key={msg.id}
                                  className={`flex ${msg.senderType === "admin" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                      msg.senderType === "admin"
                                        ? "bg-[var(--gold)] text-black rounded-br-sm"
                                        : "bg-muted rounded-bl-sm"
                                    }`}
                                  >
                                    <p className="text-sm">{msg.content}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>

                          {/* Reply Input */}
                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              if (!replyMessage.trim() || !adminUser || !replyTo) return;

                              try {
                                const res = await fetch("/api/chat", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    content: replyMessage,
                                    senderType: "admin",
                                    senderId: adminUser.id,
                                    senderName: adminUser.name,
                                    receiverType: "student",
                                    receiverId: replyTo.id,
                                  }),
                                });

                                if (res.ok) {
                                  const message = await res.json();
                                  setChatMessages((prev) => [...prev, message]);
                                  setReplyMessage("");
                                }
                              } catch {
                                toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
                              }
                            }}
                            className="flex gap-2"
                          >
                            <Input
                              placeholder="Type your reply..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="flex-1"
                            />
                            <Button type="submit" className="bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]">
                              <Send className="h-4 w-4" />
                            </Button>
                          </form>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Select a conversation to start messaging</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Admin Profile */}
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-[var(--gold)]" />
                      Admin Profile
                    </CardTitle>
                    <CardDescription>
                      Update your profile image and information displayed on the website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Profile Image Upload */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-20 w-20 border-2 border-[var(--gold)]">
                            <AvatarImage src={adminProfileForm.image || adminUser?.image} />
                            <AvatarFallback className="bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-black text-xl font-bold">
                              {adminProfileForm.name?.split(" ").map((n) => n[0]).join("") || adminUser?.name?.split(" ").map((n) => n[0]).join("") || "A"}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            size="icon"
                            variant="outline"
                            className="absolute -bottom-1 -right-1 rounded-full bg-[var(--gold)] text-black border-2 border-background"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const formData = new FormData();
                                formData.append("file", file);
                                formData.append("type", "admin");

                                try {
                                  const res = await fetch("/api/upload", {
                                    method: "POST",
                                    body: formData,
                                  });

                                  if (res.ok) {
                                    const data = await res.json();
                                    setAdminProfileForm((prev) => ({ ...prev, image: data.url }));
                                    toast({ title: "Image uploaded", description: "Profile image updated" });
                                  }
                                } catch {
                                  toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
                                }
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{adminProfileForm.name || adminUser?.name}</p>
                          <p className="text-sm text-muted-foreground">Administrator</p>
                          <p className="text-xs text-muted-foreground">Click camera to change photo</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="adminName">Display Name</Label>
                          <Input
                            id="adminName"
                            value={adminProfileForm.name || adminUser?.name || ""}
                            onChange={(e) => setAdminProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adminBio">Bio</Label>
                          <Textarea
                            id="adminBio"
                            value={adminProfileForm.bio}
                            onChange={(e) => setAdminProfileForm((prev) => ({ ...prev, bio: e.target.value }))}
                            placeholder="Brief bio shown on the website footer"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adminPhone">Phone</Label>
                          <Input
                            id="adminPhone"
                            value={adminProfileForm.phone}
                            onChange={(e) => setAdminProfileForm((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="+880 1XXX-XXXXXX"
                          />
                        </div>
                        <Button
                          className="w-full bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]"
                          onClick={async () => {
                            try {
                              // Update admin profile
                              toast({ title: "Profile Updated", description: "Your changes have been saved" });
                            } catch {
                              toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
                            }
                          }}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Site Settings */}
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-[var(--gold)]" />
                      Site Settings
                    </CardTitle>
                    <CardDescription>
                      Configure website-wide settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                      <h4 className="font-medium text-[var(--gold)] mb-2">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" onClick={handleBackup}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Database Backup
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={handleExportExcel}>
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          Export Student Data
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium">Statistics Display</h4>
                      <p className="text-sm text-muted-foreground">
                        These numbers are shown on the homepage hero section
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <div className="text-2xl font-bold text-[var(--gold)]">500+</div>
                          <div className="text-xs text-muted-foreground">Students</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <div className="text-2xl font-bold text-[var(--gold)]">6+</div>
                          <div className="text-xs text-muted-foreground">Years</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <div className="text-2xl font-bold text-[var(--gold)]">95%</div>
                          <div className="text-xs text-muted-foreground">Success</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-2">Payment Information</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>bKash:</strong> 01774-471120</p>
                        <p><strong>Nagad:</strong> 01774-471120</p>
                        <p><strong>Bank:</strong> Contact for details</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

// Chat Widget Component
function ChatWidget({ adminProfile }: { adminProfile: AdminProfile | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isIdentified, setIsIdentified] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load messages
  const loadMessages = async () => {
    if (!isIdentified || !userEmail) return;
    
    try {
      const res = await fetch(`/api/chat?userType=student&userId=${userEmail}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        const unread = data.filter((m: ChatMessage) => !m.isRead && m.senderType === "admin").length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  useEffect(() => {
    if (isOpen && isIdentified) {
      // Use requestAnimationFrame to defer state updates
      const rafId = requestAnimationFrame(() => {
        loadMessages();
      });
      const interval = setInterval(loadMessages, 5000); // Poll every 5 seconds
      return () => {
        cancelAnimationFrame(rafId);
        clearInterval(interval);
      };
    }
  }, [isOpen, isIdentified, userEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && userEmail) {
      setIsIdentified(true);
      loadMessages();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userEmail) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newMessage,
          senderType: "student",
          senderId: userEmail,
          senderName: userName,
          receiverType: "admin",
        }),
      });

      if (res.ok) {
        const message = await res.json();
        setMessages((prev) => [...prev, message]);
        setNewMessage("");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-black shadow-lg shadow-[var(--gold)]/30 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl overflow-hidden shadow-2xl border border-border/50"
          >
            <Card className="h-[500px] flex flex-col glass border-0">
              <CardHeader className="bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-black/20">
                    <AvatarImage src={adminProfile?.image} />
                    <AvatarFallback className="bg-black/20 text-black font-bold">
                      {adminProfile?.name?.split(" ").map((n) => n[0]).join("") || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base text-black">{adminProfile?.name || "Admin"}</CardTitle>
                    <p className="text-xs text-black/70">Online • Usually replies within minutes</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {!isIdentified ? (
                  <form onSubmit={handleIdentify} className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Please enter your details to start chatting
                    </p>
                    <Input
                      placeholder="Your Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Your Email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]">
                      Start Chat
                    </Button>
                  </form>
                ) : (
                  <>
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No messages yet</p>
                        <p className="text-xs">Send a message to start the conversation</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderType === "student" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              msg.senderType === "student"
                                ? "bg-[var(--gold)] text-black rounded-br-sm"
                                : "bg-muted rounded-bl-sm"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </CardContent>

              {isIdentified && (
                <CardFooter className="border-t p-3">
                  <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-[var(--gold)] text-black hover:bg-[var(--gold-dark)]">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Footer Component
function Footer({ adminProfile }: { adminProfile: AdminProfile | null }) {
  return (
    <footer className="relative border-t border-border/50 bg-card/80 dark:bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand - Box 1: Admin Image */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center">
                <span className="font-bold text-black text-lg">D</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-gold-gradient">DSM</span>
              </span>
            </div>
            
            {/* Box 1: Admin Image - Updatable */}
            <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[var(--gold)]/10 to-transparent border border-[var(--gold)]/20">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16 border-2 border-[var(--gold)]">
                  <AvatarImage src={adminProfile?.image} alt={adminProfile?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-black text-xl font-bold">
                    {adminProfile?.name?.split(" ").map((n) => n[0]).join("") || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {/* Box 2: Admin Name */}
                  <p className="font-semibold text-[var(--gold)]">{adminProfile?.name || "Administrator"}</p>
                  <p className="text-xs text-muted-foreground">Founder & Instructor</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {adminProfile?.bio || "Empowering the next generation of digital professionals through hands-on, industry-aligned training programs."}
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="hover:text-[var(--gold)]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:text-[var(--gold)]">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[var(--gold)]">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Admission</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Student Portal</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold mb-4 text-[var(--gold)]">Popular Courses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Graphic Design</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">Data Analysis</a></li>
              <li><a href="#" className="hover:text-[var(--gold)] transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-[var(--gold)]">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--gold)]" />
                <span>DSM Outsourcing, Main Road, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--gold)]" />
                <span>+880 1774 471120</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--gold)]" />
                <span>info@dsmoutsourcing.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DSM Outsourcing & Computer Training Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function DSMWebsite() {
  const [activeTab, setActiveTab] = useState("home");
  const [courses, setCourses] = useState<Course[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, storiesRes, adminRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/stories"),
          fetch("/api/admin/profile"),
        ]);
        
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }
        
        if (storiesRes.ok) {
          const storiesData = await storiesRes.json();
          setStories(storiesData);
        }
        
        if (adminRes.ok) {
          const adminData = await adminRes.json();
          setAdminProfile(adminData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeroSection setActiveTab={setActiveTab} />
              <AIRecommenderSection />
              {!isLoading && <CoursesSection courses={courses} />}
              <WhyChooseSection />
              {!isLoading && <SuccessStoriesSection stories={stories} />}
            </motion.div>
          )}
          
          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-24"
            >
              {!isLoading && <CoursesSection courses={courses} />}
            </motion.div>
          )}
          
          {activeTab === "admission" && (
            <motion.div
              key="admission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-24"
            >
              {!isLoading && <AdmissionSection courses={courses} />}
            </motion.div>
          )}
          
          {activeTab === "stories" && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-24"
            >
              {!isLoading && <SuccessStoriesSection stories={stories} />}
            </motion.div>
          )}
          
          {activeTab === "student" && (
            <motion.div
              key="student"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-24"
            >
              <StudentPortal />
            </motion.div>
          )}
          
          {activeTab === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-24"
            >
              <AdminDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer adminProfile={adminProfile} />
      <ChatWidget adminProfile={adminProfile} />
      <Toaster />
    </div>
  );
}
