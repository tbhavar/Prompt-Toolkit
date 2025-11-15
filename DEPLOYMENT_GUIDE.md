# 🚀 GitHub Pages Deployment Guide

## Quick Start Deployment

Follow these steps to deploy your Prompt Engineering Generator to GitHub Pages:

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name it: `prompt-engine` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README (we already have files)
6. Click "Create repository"

### Step 2: Upload Files

#### Option A: Using Git Command Line

\`\`\`bash
# Navigate to your project folder
cd /path/to/prompt-engine

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Prompt Engineering Generator"

# Add remote repository (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/prompt-engine.git

# Push to GitHub
git branch -M main
git push -u origin main
\`\`\`

#### Option B: Using GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Go to File → Add Local Repository
4. Select your project folder
5. Click "Publish repository"
6. Uncheck "Keep this code private"
7. Click "Publish Repository"

#### Option C: Upload via Web Interface

1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all your files
4. Write a commit message
5. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right menu)
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://yourusername.github.io/prompt-engine`

### Step 4: Verify Deployment

1. Click the link provided in the Pages section
2. Test all features:
   - ✅ Theme toggle works
   - ✅ Prompt generation works
   - ✅ Templates load correctly
   - ✅ Copy/Download functions work
   - ✅ Mobile responsive design

## Customization After Deployment

### Update Site Title and Metadata

Edit `index.html`:
\`\`\`html
<title>Your Custom Title | Prompt Generator</title>
<meta name="description" content="Your custom description">
\`\`\`

### Change GitHub Repository Links

Replace all instances of `yourusername/prompt-engine` with your actual repository path in:
- `index.html` (footer and nav links)
- `README.md`

### Update Contact Information

Edit the footer in `index.html`:
\`\`\`html
<p>&copy; 2025 Your Name. Built with ❤️</p>
\`\`\`

## Custom Domain Setup (Optional)

### Using a Custom Domain

1. **Buy a domain** from any provider (Namecheap, GoDaddy, etc.)

2. **Add CNAME file** to your repository:
   \`\`\`bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   \`\`\`

3. **Configure DNS** at your domain provider:

   Add these DNS records:
   \`\`\`
   Type: A
   Host: @
   Value: 185.199.108.153

   Type: A
   Host: @
   Value: 185.199.109.153

   Type: A
   Host: @
   Value: 185.199.110.153

   Type: A
   Host: @
   Value: 185.199.111.153

   Type: CNAME
   Host: www
   Value: yourusername.github.io
   \`\`\`

4. **Enable HTTPS** in GitHub Pages settings
5. Wait 24-48 hours for DNS propagation

## Updating Your Live Site

Whenever you make changes:

\`\`\`bash
# Make your changes to files
# Then commit and push

git add .
git commit -m "Description of changes"
git push
\`\`\`

Changes will be live in 1-2 minutes.

## Troubleshooting

### Site Not Loading

- **Wait 2-5 minutes** after enabling Pages
- Check if Pages is enabled in Settings
- Verify branch is set to `main` and folder to `/ (root)`
- Clear browser cache and try incognito mode

### 404 Error

- Ensure `index.html` is in the root directory (not in a subfolder)
- Check file names are correct (case-sensitive)
- Verify all files were uploaded

### Styles Not Loading

- Check that `style.css` is in the same directory as `index.html`
- Verify the `<link>` tag in `index.html` has correct path
- Check browser console for errors (F12)

### JavaScript Not Working

- Verify both `script.js` and `prompts-data.js` are uploaded
- Check browser console for errors
- Ensure files are in UTF-8 encoding

### Theme Toggle Not Working

- Clear browser cache and localStorage
- Check if JavaScript is enabled in browser
- Verify localStorage is not blocked (works in incognito)

## Performance Optimization

### Enable Caching

GitHub Pages automatically handles caching, but you can improve it:

Add to your repository root:
`.nojekyll` file (empty file to skip Jekyll processing)

### Minify Files (Optional)

For better performance, minify CSS and JS:

\`\`\`bash
# Using online tools or command line
npx minify style.css > style.min.css
npx minify script.js > script.min.js
\`\`\`

Then update references in `index.html`

## Security Best Practices

- Never commit sensitive data (API keys, passwords)
- Use `.gitignore` for local configuration files
- Keep dependencies updated
- Review pull requests carefully

## Monitoring

### GitHub Pages Status

Check deployment status:
- Repository → Actions tab
- Green checkmark = successful deployment
- Red X = build failed (check logs)

### Analytics (Optional)

Add Google Analytics to track visitors:

\`\`\`html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
\`\`\`

## Support

If you encounter issues:

1. Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. Search [GitHub Community](https://github.community)
3. Open an issue in your repository
4. Review browser console for error messages

## Next Steps

After successful deployment:

1. ✅ Share your site on social media
2. ✅ Add to your portfolio
3. ✅ Get feedback from users
4. ✅ Star your own repository
5. ✅ Consider contributing improvements back

---

**Congratulations! Your Prompt Engineering Generator is now live! 🎉**

Visit: `https://yourusername.github.io/prompt-engine`
