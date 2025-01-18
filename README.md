# 🚀 AI Form Builder with Drizzle ORM

## 📝 Project Overview
AI Form Builder is a powerful web application that enables users to create custom forms effortlessly using AI-driven technologies and robust database management with Drizzle ORM.

## ✨ Key Features
- 🤖 AI-Powered Form Generation
- 🔒 Secure Authentication with Clerk
- 💾 Efficient Database Management with Drizzle ORM
- 🎨 Responsive Tailwind CSS Design
- 🚀 Next.js 13/14 Framework

## 🛠 Tech Stack
- Next.js 13/14
- React
- Tailwind CSS
- Drizzle ORM
- PostgreSQL/MySQL
- Clerk Authentication
- Groq AI

## 🚦 Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL/MySQL Database
- Clerk Account
- Groq API Key

## 📦 Project Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/ai-form-builder.git
cd ai-form-builder
```

### 2. Install Dependencies
```bash
npm install # Core dependencies
npm install drizzle-orm @clerk/nextjs
npm install -D drizzle-kit tailwindcss
```

### 3. Environment Configuration
Create a `.env.local` file:
```env
# Database Connection
DATABASE_URL=postgresql://username:password@localhost:5432/yourdbname

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Groq AI
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key

# Application Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Drizzle ORM Configuration
**Drizzle Config**
```typescript
// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
} satisfies Config;
```

**Database Schema**
```typescript
// src/db/schema.ts
import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  userId: text('user_id').notNull(),
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').defaultNow()
});
```

### 5. Database Scripts
Add the following scripts to your `package.json`:
```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 6. Run Development Server
```bash
npm run dev # or yarn dev
```

## 🔐 Authentication Setup
1. Create a Clerk Account.
2. Create a new application.
3. Copy Publishable and Secret Keys.
4. Configure Clerk settings in `.env.local`.

## 🌈 Deployment Options
### Recommended Platforms
- Vercel
- Netlify
- Railway
- Render

### Deployment Steps
1. Choose a platform.
2. Connect your GitHub repository.
3. Set environment variables.
4. Deploy.

## 🤝 Contributing
### How to Contribute
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request.

### Contribution Guidelines
- Follow existing code style.
- Write clear commit messages.
- Add tests for new features.
- Update documentation.

## 🐛 Reporting Issues
1. Check existing issues.
2. Provide a detailed description.
3. Include reproduction steps.
4. Share error logs or screenshots.

## 🌟 Support the Project
### Ways to Support
- Star the repository
- Share with your network
- Contribute code
- Report bugs
- Suggest features

### Sponsorship
Consider supporting the project's development:
- GitHub Sponsors
- Open Collective
- Buy Me a Coffee

## 📞 Contact & Community
### Get in Touch
- Email: nimjesujal2004@gmail.com

### Project Links
- GitHub Repository: [AI Form Builder](https://github.com/devsujal/ai-form-builder)
- Live Demo: [AI Form Builder Demo](https://ai-form-builder-delta-sooty.vercel.app/)

## 🙏 Acknowledgements
- Next.js Team
- Drizzle ORM Developers
- Clerk Authentication
- Open Source Community

Happy Form Building! 🚀📝

