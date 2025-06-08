# SaaS Frontend

A modern, responsive frontend for the SaaS multi-tenancy platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Authentication & Authorization
- **SignupForm**: Complete registration with email, password, name, and company fields
- **ForgotPasswordForm**: Password recovery with email verification
- **ResetPasswordForm**: Secure password reset with token validation
- **Protected Routes**: Route protection with `withAuth` HOC
- **Auth Middleware**: Global route protection middleware
- **Auth State Management**: Zustand-based authentication state management

### Dashboard
- **Layout**: Responsive dashboard layout with:
  - Dynamic sidebar navigation
  - User menu
  - Mobile-responsive design
- **Pages**:
  - **Main Dashboard**: Stats cards and activity feed
  - **Profile**: User profile management
  - **Settings**: Notification and security preferences
  - **Analytics**: Business metrics and charts
  - **Team**: Team member management with invite system

### Components
- **Common**:
  - LoadingSpinner: Reusable loading indicator
  - ErrorBoundary: Global error handling
- **Forms**:
  - Formik integration for form handling
  - Yup validation schemas
  - Accessible form controls
- **UI Elements**:
  - Modern design with Tailwind CSS
  - Headless UI components
  - Responsive layouts

## Tech Stack
- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: Formik + Yup
- **UI Components**: Headless UI
- **Icons**: Heroicons

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── SignupForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── withAuth.tsx
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   └── layouts/
│       └── DashboardLayout.tsx
├── hooks/
│   └── useAuth.ts
├── pages/
│   └── dashboard/
│       ├── index.tsx
│       ├── profile.tsx
│       ├── settings.tsx
│       ├── analytics.tsx
│       └── team.tsx
└── middleware.ts
```

## Development Guidelines
- Use TypeScript for all new components
- Follow the existing component structure
- Maintain responsive design
- Keep accessibility in mind
- Add proper error handling
- Use loading states for async operations

## Authentication Flow
1. User signs up with email, password, name, and company
2. Protected routes check auth state via `withAuth` HOC
3. Global middleware handles route protection
4. Auth state managed via Zustand store

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript checks

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
