# Deployment Guide

This guide explains how to deploy the CAB Frontend Prototype to GitHub Pages.

## Automatic Deployment (Recommended)

The project is configured for automatic deployment via GitHub Actions:

1. **Push to main branch** - Any push to the `main` branch triggers automatic deployment
2. **GitHub Actions workflow** - Located in `.github/workflows/deploy.yml`
3. **Built and deployed** - Site is automatically built and deployed to GitHub Pages

### Setup Steps:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - No branch selection needed (handled by workflow)

2. **Set permissions** for GitHub Actions:
   - Go to Settings → Actions → General
   - Workflow permissions: "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

3. **Push your code** to the main branch:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

4. **Check deployment status**:
   - Go to Actions tab to see workflow progress
   - Once complete, your site will be available at: `https://[username].github.io/cab-proto/`

## Manual Deployment

For manual deployment using gh-pages:

1. **Install gh-pages** (if not already installed):
   ```bash
   npm install -g gh-pages
   ```

2. **Update homepage** in `package.json`:
   ```json
   "homepage": "https://[your-username].github.io/cab-proto/"
   ```

3. **Deploy manually**:
   ```bash
   npm run deploy
   ```

## Local Testing

To test the build locally before deployment:

```bash
# Build the project
npm run build

# Preview the built site
npm run preview
```

## Configuration Details

### Vite Configuration (`vite.config.ts`):
- **Base URL**: Set to `/cab-proto/` for GitHub Pages
- **Output directory**: `dist/`
- **Assets directory**: `assets/`

### GitHub Actions Workflow:
- **Trigger**: Push to main branch
- **Node version**: 18.x
- **Build command**: `npm run build`
- **Deploy target**: `./dist` directory

## Troubleshooting

### Common Issues:

1. **404 on deployment**: Check that `base` in `vite.config.ts` matches your repository name
2. **CSS not loading**: Ensure assets are properly referenced with the correct base path
3. **Workflow fails**: Check that repository has proper permissions for GitHub Actions

### Custom Domain (Optional):

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the workflow if needed

## Environment Variables

For development with live APIs (when implemented):

```bash
# Copy example environment file
cp .env.example .env.local

# Add your configuration
VITE_CLAUDE_MODE=mock  # or 'proxy' for live API
VITE_PROXY_BASE=/api
```

Note: Never commit actual API keys to the repository. Use GitHub Secrets for sensitive values in production workflows.
