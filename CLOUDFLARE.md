# ⛅ Deploying to Cloudflare for Free

Devanshi World is a fully responsive React SPA built with Vite. It can be hosted **100% free** with lightning-fast global delivery on **Cloudflare Pages** (`.pages.dev`) or **Cloudflare Workers** (`.workers.dev`).

Here are the two easiest and most reliable methods to deploy your application.

---

## Method 1: Instant Deployment via Command Line 💻

No GitHub setup is required for this method. You can deploy directly from your local terminal.

### 1. Build your application
Before deploying, compile the optimized production-ready bundle of your application:
```bash
npm run build
```
This will compile all React files and Tailwind styles into the `./dist` folder.

### 2. Deploy using Wrangler CLI
Cloudflare's `wrangler` CLI compiles, runs, and deploys projects instantly. Simply execute:
```bash
npx wrangler pages deploy dist --project-name=devanshi-world
```

### 3. Complete the login flow
* If you aren't logged in, `wrangler` will open a browser window to securely authorize your Cloudflare Account.
* The CLI will automatically upload your built files and output a live public URL (e.g., `https://devanshi-world.pages.dev`).

---

## Method 2: Git-connected Auto Deployment (Recommended) 🔄

Connect your repository (GitHub/GitLab) so Cloudflare Page rebuilds and updates your live site automatically every time you push code.

1. **Push your code to GitHub**: Create a repository on GitHub and push your current project files.
2. **Log into Cloudflare Dashboard**: Go to [dash.cloudflare.com](https://dash.cloudflare.com) and navigate to **Workers & Pages**.
3. **Create a Pages Application**:
   - Click **Create Application** -> **Pages** tab -> **Connect to Git**.
   - Select your GitHub account and your `devanshi-world` repository.
4. **Configure your Build Settings**:
   - **Framework Preset**: `Vite` (or `None`)
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
5. **Click Save and Deploy**: Cloudflare will execute the build in their secure pipeline and deploy your application on a free `.pages.dev` subdomain!

---

## Technical Specifications
* **Pricing**: 100% Free tier includes 100 builds per month, unlimited bandwidth, and free SSL certificates.
* **Routing Policy**: Automatic fallback is set up via Vite SPA configs so internal routes work flawlessly.
* **Domain Customization**: You can map your own custom domain (e.g., `www.yourstore.com`) to the `.pages.dev` subdomain for free in the Cloudflare settings panel.
