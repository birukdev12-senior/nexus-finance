# Nexus Finance — FinTech Dashboard

A full-stack financial dashboard built with Next.js 14, TypeScript, Tailwind CSS, Chart.js, MongoDB, NextAuth.js, and Stripe.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Chart.js + react-chartjs-2 |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js (credentials + JWT) |
| Payments | Stripe (PaymentIntents + Webhooks) |

## Quick start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local.example .env.local
```

Fill in:
- `MONGODB_URI` — your MongoDB Atlas connection string
- `NEXTAUTH_SECRET` — run `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` — from Stripe dashboard
- `STRIPE_WEBHOOK_SECRET` — from `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### 3. Seed demo data
```bash
npx ts-node lib/seed.ts
```
Creates user **admin@nexus.com** / **password123** and sample transactions.

### 4. Run dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel project settings
4. Deploy — done!

## Stripe webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Project structure

```
nexus-finance/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth handler
│   │   ├── dashboard/             # Metrics API
│   │   ├── transactions/          # CRUD transactions
│   │   └── stripe/
│   │       ├── payment-intent/    # Create PaymentIntent
│   │       └── webhook/           # Stripe event handler
│   ├── dashboard/                 # Protected dashboard pages
│   │   ├── layout.tsx             # Auth guard + Sidebar
│   │   ├── page.tsx               # Overview
│   │   ├── payments/              # Stripe payment form
│   │   └── transactions/          # Transaction list
│   ├── login/                     # Sign-in page
│   ├── layout.tsx                 # Root layout
│   └── providers.tsx              # SessionProvider
├── components/
│   ├── charts/                    # RevenueChart, SpendingDonut
│   ├── layout/                    # Sidebar, Topbar
│   └── ui/                        # MetricCard, TransactionRow
├── lib/
│   ├── mongodb.ts                 # DB connection (cached)
│   ├── stripe.ts                  # Stripe helpers
│   ├── auth.ts                    # requireAuth helper
│   └── seed.ts                    # Demo data seeder
├── models/
│   ├── User.ts                    # Mongoose user model + bcrypt
│   └── Transaction.ts             # Transaction model
└── types/index.ts                 # Shared TypeScript types
```
