# 🏋️ AI Fitness Dairy

An AI-powered fitness journal to track your workouts, nutrition, and progress.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## ☁️ Deploy to Azure

⚠️ **IMPORTANT**: If you have previously shared Azure credentials publicly, see [SECURITY_WARNING.md](./SECURITY_WARNING.md) immediately.

This project is configured for deployment to Azure App Service. See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for detailed instructions on:

- Creating an Azure Service Principal
- Configuring GitHub Secrets
- Setting up automatic deployment via GitHub Actions

Quick start:
1. Create an Azure Web App
2. Configure GitHub Secrets (see `AZURE_DEPLOYMENT.md`)
3. Push to `main` branch to trigger deployment

## 🚂 Deploy to Railway

1. Push your code to GitHub
2. Connect your repository to Railway
3. Set up environment variables (see `.env.example`)
4. Deploy!

## 📦 Built With

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- pnpm

## 🔧 Environment Variables

For local development with Azure services:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your actual Azure credentials

See [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md) for detailed configuration instructions.

**⚠️ Security Note:** Never commit `.env.local` or actual credentials to git. Use GitHub Secrets for deployment.

## 📝 Features

- 📔 Daily fitness diary entries
- 🤖 AI-powered insights
- 📊 Progress tracking
- 💪 Workout logging
- 🥗 Nutrition tracking

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📄 License

MIT
