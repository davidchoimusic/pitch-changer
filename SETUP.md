# Setup Guide for Pitch Changer

This guide covers setting up the remaining features: Supabase, rate limiting, Google AdSense, and Vercel deployment.

---

## 1. Supabase Setup (Optional - for future features)

Supabase will be used for:
- Transient file storage (1-hour auto-delete)
- Optional user authentication
- User history/presets

### Steps

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Name: `pitch-changer`
   - Database password: Save this securely
   - Region: Choose closest to your users

2. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Create Supabase Client**

   Create `lib/supabase/client.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

4. **Set Environment Variables**

   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Create Storage Bucket**

   In Supabase Dashboard:
   - Go to Storage
   - Create bucket: `audio-files`
   - Make it private
   - Set RLS policies

6. **Set Up Auto-Delete (1 hour)**

   In Supabase SQL Editor:
   ```sql
   -- Enable pg_cron extension
   create extension if not exists pg_cron;

   -- Create function to delete old files
   create or replace function delete_old_audio_files()
   returns void
   language plpgsql
   as $$
   begin
     delete from storage.objects
     where bucket_id = 'audio-files'
     and created_at < now() - interval '1 hour';
   end;
   $$;

   -- Schedule to run every 10 minutes
   select cron.schedule(
     'delete-old-audio-files',
     '*/10 * * * *',
     'select delete_old_audio_files();'
   );
   ```

7. **Upload/Download Functions**

   Create `lib/supabase/storage.ts`:
   ```typescript
   import { supabase } from './client'

   export async function uploadAudio(file: File, userId?: string) {
     const fileName = `${Date.now()}-${file.name}`
     const filePath = userId ? `${userId}/${fileName}` : `public/${fileName}`

     const { data, error } = await supabase.storage
       .from('audio-files')
       .upload(filePath, file)

     if (error) throw error
     return data
   }

   export async function getSignedUrl(path: string) {
     const { data, error } = await supabase.storage
       .from('audio-files')
       .createSignedUrl(path, 3600) // 1 hour

     if (error) throw error
     return data.signedUrl
   }
   ```

---

## 2. IP-Based Rate Limiting

Prevent abuse with IP-based rate limiting (10 uploads/hour per IP).

### Option A: Vercel Edge Middleware (Recommended)

1. **Install Upstash Redis**
   ```bash
   npm install @upstash/redis @upstash/ratelimit
   ```

2. **Create Upstash Redis Database**
   - Go to [upstash.com](https://upstash.com)
   - Create free Redis database
   - Copy REST URL and token

3. **Set Environment Variables**

   Add to `.env.local`:
   ```bash
   UPSTASH_REDIS_REST_URL=your-redis-url
   UPSTASH_REDIS_REST_TOKEN=your-redis-token
   ```

4. **Create Middleware**

   Create `middleware.ts` in root:
   ```typescript
   import { NextResponse } from 'next/server'
   import type { NextRequest } from 'next/server'
   import { Ratelimit } from '@upstash/ratelimit'
   import { Redis } from '@upstash/redis'

   const redis = new Redis({
     url: process.env.UPSTASH_REDIS_REST_URL!,
     token: process.env.UPSTASH_REDIS_REST_TOKEN!,
   })

   const ratelimit = new Ratelimit({
     redis,
     limiter: Ratelimit.slidingWindow(10, '1 h'),
   })

   export async function middleware(request: NextRequest) {
     // Only rate limit file processing endpoint
     if (!request.nextUrl.pathname.startsWith('/api/process')) {
       return NextResponse.next()
     }

     const ip = request.ip ?? '127.0.0.1'
     const { success, reset } = await ratelimit.limit(ip)

     if (!success) {
       return NextResponse.json(
         {
           error: 'Too many requests. Please try again later.',
           resetAt: new Date(reset).toISOString(),
         },
         { status: 429 }
       )
     }

     return NextResponse.next()
   }

   export const config = {
     matcher: '/api/:path*',
   }
   ```

### Option B: Client-Side Only (No Backend)

For now, since you're doing client-side processing only, you can add a simple localStorage check:

Create `utils/rateLimit.ts`:
```typescript
const RATE_LIMIT_KEY = 'pitchChanger_uploads'
const MAX_UPLOADS = 10
const TIME_WINDOW = 3600000 // 1 hour in ms

export function checkRateLimit(): { allowed: boolean; resetAt?: Date } {
  const now = Date.now()
  const stored = localStorage.getItem(RATE_LIMIT_KEY)

  if (!stored) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([now]))
    return { allowed: true }
  }

  const uploads: number[] = JSON.parse(stored)
  const recentUploads = uploads.filter(time => now - time < TIME_WINDOW)

  if (recentUploads.length >= MAX_UPLOADS) {
    const oldestUpload = Math.min(...recentUploads)
    const resetAt = new Date(oldestUpload + TIME_WINDOW)
    return { allowed: false, resetAt }
  }

  recentUploads.push(now)
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentUploads))
  return { allowed: true }
}
```

Use in `PitchControl.tsx`:
```typescript
import { checkRateLimit } from '@/utils/rateLimit'

const handleProcess = async () => {
  const { allowed, resetAt } = checkRateLimit()

  if (!allowed) {
    alert(`Rate limit exceeded. Try again at ${resetAt?.toLocaleTimeString()}`)
    return
  }

  // ... rest of processing
}
```

---

## 3. Google AdSense Integration

### Steps

1. **Get AdSense Approval**
   - Apply at [adsense.google.com](https://adsense.google.com)
   - Add site: pitchchanger.io
   - Wait for approval (~2-7 days)

2. **Create Ad Script Component**

   Create `components/AdSense.tsx`:
   ```typescript
   'use client'

   import { useEffect } from 'react'

   interface AdSenseProps {
     adSlot: string
     adFormat?: string
     fullWidthResponsive?: boolean
   }

   export function AdSense({
     adSlot,
     adFormat = 'auto',
     fullWidthResponsive = true
   }: AdSenseProps) {
     useEffect(() => {
       try {
         ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
       } catch (err) {
         console.error('AdSense error:', err)
       }
     }, [])

     return (
       <div className="text-center my-4">
         <ins
           className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXX" // Your AdSense client ID
           data-ad-slot={adSlot}
           data-ad-format={adFormat}
           data-full-width-responsive={fullWidthResponsive}
         />
       </div>
     )
   }
   ```

3. **Add AdSense Script to Layout**

   Update `app/layout.tsx`:
   ```typescript
   import Script from 'next/script'

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           {/* AdSense Script */}
           <Script
             async
             src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
             crossOrigin="anonymous"
             strategy="afterInteractive"
           />
         </head>
         <body>{children}</body>
       </html>
     )
   }
   ```

4. **Place Ads Strategically**

   Update `app/page.tsx`:
   ```typescript
   import { AdSense } from '@/components/AdSense'

   export default function Home() {
     return (
       <div>
         {/* Hero section */}

         {/* Ad after hero, before upload */}
         <AdSense adSlot="1234567890" />

         {/* Upload section */}

         {/* Ad after features */}
         <AdSense adSlot="0987654321" />
       </div>
     )
   }
   ```

5. **Performance Optimization**
   - Use `strategy="afterInteractive"` to load after page is interactive
   - Keep ads OFF the main processing view (no ads during audio work)
   - Limit to 2-3 ad units per page to avoid CLS issues

---

## 4. Vercel Deployment

### Steps

1. **Install Vercel CLI** (Optional)
   ```bash
   npm i -g vercel
   ```

2. **Create `vercel.json` (Optional)**

   Create `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "framework": "nextjs",
     "regions": ["sfo1"],
     "env": {
       "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
       "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
     }
   }
   ```

3. **Deploy via GitHub (Recommended)**

   - Push code to GitHub:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/pitch-changer.git
     git push -u origin main
     ```

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `.next`

   - Add Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `UPSTASH_REDIS_REST_URL` (if using)
     - `UPSTASH_REDIS_REST_TOKEN` (if using)

   - Click "Deploy"

4. **Deploy via CLI**
   ```bash
   vercel
   # Follow prompts
   ```

5. **Configure Custom Domain**

   In Vercel Dashboard:
   - Go to Project Settings → Domains
   - Add `pitchchanger.io`
   - Follow DNS configuration steps
   - Add A record pointing to Vercel's IP
   - Wait for DNS propagation (5-60 min)

6. **Optimize for Free Tier**

   - Vercel free tier includes:
     - 100 GB bandwidth/month
     - Unlimited static sites
     - 100 serverless function hours/month

   - Since this is client-side only, you'll stay well within limits
   - Monitor usage in Vercel dashboard

---

## 5. Mobile Optimization Checklist

- [x] Touch targets ≥44px (sliders, buttons)
- [x] Responsive layout (mobile-first)
- [x] Safe area insets for notched devices
- [ ] Test on iOS Safari (Web Audio API quirks)
- [ ] Test file upload on mobile
- [ ] Test audio playback on mobile
- [ ] Add service worker for offline support (optional)

---

## 6. Performance Checklist

- [x] Client-side processing only (no server costs)
- [x] Lightweight CSS with Tailwind
- [x] Web Audio API for processing
- [ ] Lazy-load AdSense
- [ ] Lighthouse score >90
- [ ] Core Web Vitals within thresholds
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

---

## Next Steps

1. Test the app locally at http://localhost:3001
2. Set up Supabase (when ready for user features)
3. Implement rate limiting (start with client-side)
4. Apply for Google AdSense
5. Deploy to Vercel
6. Configure pitchchanger.io domain
7. Monitor analytics and performance

---

## Troubleshooting

### Audio not playing on iOS
- iOS requires user interaction before audio playback
- Add a "tap to enable audio" prompt

### File upload fails on mobile
- Check file size limits
- Ensure proper MIME types

### AdSense not showing
- Ensure site is approved
- Check for ad blockers
- Verify correct client ID

### Rate limit not working
- Check localStorage permissions
- Verify Upstash Redis connection (if using)

---

For questions or issues, refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
