# 🌐 Custom Domain & Analytics Setup Guide

## Custom Domain: spot-music.com

### Step 1: Add Domain in Vercel Dashboard

1. Go to: https://vercel.com/sean-mcdonnells-projects-4fbf31ab/empulse-music/settings/domains
2. Click "Add Domain"
3. Enter: `spot-music.com`
4. Click "Add"

### Step 2: Configure DNS Records

Vercel will provide DNS configuration instructions. For your setup:

**Option A: Use Vercel's Nameservers (Recommended)**

- Update your domain registrar to use Vercel's nameservers
- Vercel will automatically configure all DNS records

**Option B: Manual DNS Configuration**
If you need to use your own DNS provider:

1. **A Record** (Root domain):

   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   ```

2. **CNAME Record** (WWW subdomain):

   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

3. **Verify in Vercel Dashboard**:
   - Wait for DNS propagation (can take up to 48 hours)
   - Vercel will show "Valid Configuration" when ready

### Step 3: SSL Certificate

- Vercel automatically provisions SSL certificates via Let's Encrypt
- HTTPS will be enabled automatically once DNS is configured

## Analytics: Enable Vercel Analytics

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/sean-mcdonnells-projects-4fbf31ab/empulse-music/settings/analytics
2. Enable "Web Analytics"
3. Enable "Speed Insights" (optional, recommended)
4. Copy the analytics snippet if needed

### Method 2: Via Next.js (if using @vercel/analytics)

```bash
npm install @vercel/analytics @vercel/speed-insights
```

Then add to `app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Method 3: Via Vercel CLI

```bash
# Enable analytics (requires project settings access)
vercel env add ANALYTICS_ID
```

## Current Deployment Status

**Live URL**: https://empulse-music.vercel.app

**Features Ready**:

- ✅ Player/EQ controls
- ✅ Audio visualizers (spectrum/3D)
- ✅ Mood discovery
- ✅ Radio streaming
- ✅ Search/Library
- ✅ Mobile responsive

## Verification Steps

### 1. Test Current Deployment

```bash
# Check if site is live
curl -I https://empulse-music.vercel.app

# Test in browser
open https://empulse-music.vercel.app
```

### 2. Verify Custom Domain

```bash
# After DNS propagation
curl -I https://spot-music.com
curl -I https://www.spot-music.com
```

### 3. Check Analytics

- Go to Vercel Dashboard → Analytics
- View real-time visitor data
- Check performance metrics

## DNS Configuration Details

**Domain**: spot-music.com  
**A Record IP**: 76.76.21.21  
**Provider**: Your DNS provider (where domain is registered)

**Important Notes**:

- DNS changes can take 24-48 hours to propagate globally
- Use `dig spot-music.com` or `nslookup spot-music.com` to verify DNS
- Vercel will show domain status in dashboard (Pending → Valid → Active)

## Troubleshooting

### Domain Not Resolving

```bash
# Check DNS propagation
dig spot-music.com
nslookup spot-music.com

# Check Vercel domain status
vercel domains ls
```

### SSL Certificate Issues

- Vercel automatically provisions SSL
- Wait for DNS to fully propagate
- Check Vercel dashboard for certificate status

### Analytics Not Showing

- Ensure analytics is enabled in Vercel dashboard
- Check browser console for errors
- Verify @vercel/analytics package is installed (if using)

## Quick Commands

```bash
# List domains
vercel domains ls

# Add domain (if supported)
vercel domains add spot-music.com

# Check deployment
vercel ls

# View analytics (dashboard only)
# https://vercel.com/[project]/analytics
```

---

**Next Steps**:

1. Add domain in Vercel dashboard
2. Configure DNS records at your domain registrar
3. Enable analytics in Vercel dashboard
4. Wait for DNS propagation
5. Test: https://spot-music.com

**Live Now**: https://empulse-music.vercel.app 🎧
