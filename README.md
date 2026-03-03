# DSM Outsourcing & Computer Training Center

A production-ready Next.js application for managing IT training courses, student enrollments, and administrative tasks.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (Supabase)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

```
src/
├── actions/          # Server Actions
├── app/              # Next.js App Router
│   ├── api/          # API Routes
│   ├── layout.tsx    # Root Layout
│   └── page.tsx      # Home Page
├── components/       # React Components
│   ├── ui/           # shadcn/ui Components (Atoms)
│   └── modules/      # Feature Components
├── hooks/            # Custom React Hooks
├── lib/              # Utilities & Singletons
│   ├── prisma.ts     # Prisma Client
│   └── utils.ts      # Helper Functions
├── services/         # Business Logic Services
└── styles/           # Global Styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- PostgreSQL database (Supabase recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidmomin/DSMOUTSORCEING.git
   cd DSMOUTSORCEING
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your database credentials:
   ```env
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
   DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
   ```

4. **Set up the database**
   ```bash
   # Push schema to database
   npm run db:push

   # Seed initial data (optional)
   curl http://localhost:3000/api/seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:migrate` | Create and run migrations |

## Admin Access

- **URL**: Add `?access=dsm2024secret` to your domain
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ Change the default password after first login!

## Database Management

### View Data with Prisma Studio

```bash
npm run db:studio
```

Opens a GUI at [http://localhost:5555](http://localhost:5555) to view and edit your database.

### Database Schema

The application includes the following models:

- **Admin** - Administrator accounts
- **Course** - Training courses
- **CourseCategory** - Course categories
- **Student** - Student records
- **Enrollment** - Student enrollments
- **SuccessStory** - Student testimonials
- **ChatMessage** - Chat messages
- **Setting** - Application settings
- **Statistic** - Dashboard statistics

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_ACCESS_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## Features

- 🎓 Comprehensive IT Training Courses
- 👨‍💼 Admin Dashboard for Management
- 📝 Student Portal
- 💬 Chat Support
- 🎬 Video Preview Section
- 🌓 Dark/Light Theme Support
- 📱 Fully Responsive Design
- 🔐 Secure Admin Access

## License

MIT License

## Developer

Built with ❤️ by Rakibul Hasan

## Contact

- **Email**: info@dsmoutsourcing.com
- **Phone**: +880 1774 471120
- **Location**: Dinajpur, Bangladesh
