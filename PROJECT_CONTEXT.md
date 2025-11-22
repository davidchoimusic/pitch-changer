# PROJECT_CONTEXT.md

**TL;DR:** MVP completed - Next.js audio pitch-shifting app with dual-mode processing, running locally | 2025-11-22 02:54

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** Not connected to remote yet
- **Domain:** pitchchanger.io (owned, DNS not yet configured)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** abbaa44 (Initial commit with core features)
- **Open PRs/Issues:** None
- **Local Dev:** Running at http://localhost:3001

---

## Project Overview

**What it does:**
Web-based audio pitch shifting tool where users upload MP3/WAV files (max 25MB), adjust pitch ±12 semitones with or without duration change, preview the result, and download as WAV. Fully client-side processing.

**Purpose:**
Provide musicians, audio engineers, and creators with a free, fast, browser-based pitch-shifting tool. Monetized via Google AdSense ads.

**Audience:**
~2,000 users/month initially - musicians, podcasters, content creators needing quick pitch adjustments.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.0.3 (App Router, React 19)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.17 (dark minimalist theme)
- **Font:** Inter (300, 400, 500 weights)

### Audio Processing
- **Web Audio API:** Native browser API for audio manipulation
- **Two modes:**
  1. Simple/Fast: Time-coupled (changes pitch AND duration via playbackRate)
  2. Preserve Duration: Time-independent (granular synthesis, pitch without duration change)

### Infrastructure
- **Deployment:** Vercel (free tier, optimized for static/SSG)
- **Storage:** Supabase (planned, 1-hour auto-delete)
- **Rate Limiting:** Client-side localStorage (10 uploads/hour) + Upstash Redis (future)
- **Monetization:** Google AdSense (pending approval)

### Key Dependencies
```json
{
  "next": "^16.0.3",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "typescript": "^5.9.3",
  "tailwindcss": "^4.1.17",
  "autoprefixer": "^10.4.22",
  "postcss": "^8.5.6"
}
```

---

## Deployments

- **Status:** Local development only
- **Domain:** pitchchanger.io (owned, not configured)
- **Production URL:** https://pitchchanger.io (not live yet)
- **Deployment Target:** Vercel (free tier)
- **Release Process:**
  - Push to GitHub → Auto-deploy via Vercel
  - See SETUP.md:134-180 for deployment instructions

---

## Data

- **Databases:** None (client-side only)
- **Storage:**
  - Current: None (files processed in-memory)
  - Future: Supabase Storage (1-hour auto-delete)
- **Migrations Applied:** None
- **Seed State:** N/A

---

## Access/Config

### Required Env Vars (Future)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL (rate limiting)
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

### External Services
- **Supabase:** Not yet configured (see SETUP.md:13-98)
- **Google AdSense:** Pending approval (see SETUP.md:205-289)
- **Upstash Redis:** Not yet configured (see SETUP.md:106-168)

### DNS/Domain
- **Domain:** pitchchanger.io (owned, not configured)
- **Registrar:** [UNKNOWN]
- **DNS:** Not pointed to Vercel yet

---

## Current State

### Working Features
✅ File upload with drag-and-drop (MP3/WAV, max 25MB)
✅ File validation (type, size)
✅ Pitch shifting ±12 semitones
✅ Two processing modes:
  - Simple/Fast (time-coupled)
  - Preserve Duration (granular synthesis)
✅ Audio preview playback
✅ WAV export/download
✅ Dark minimalist UI with electric blue accent (#00D4FF)
✅ Responsive mobile design
✅ Client-side processing (no server costs)

### Working Flows
1. **Upload → Process → Download:**
   - User uploads MP3/WAV
   - Selects pitch shift (-12 to +12 semitones)
   - Chooses mode (Simple or Preserve Duration)
   - Clicks "Process Audio"
   - Previews result
   - Downloads as WAV

### Working Integrations
- None yet (fully standalone)

---

## Known Issues & Workarounds

### Current Issues
1. **iOS Safari Audio Quirks**
   - Issue: iOS requires user interaction before audio playback
   - Workaround: Planned "tap to enable audio" prompt
   - Status: Not yet implemented

2. **Preserve Duration Mode Quality**
   - Issue: Granular synthesis implementation is basic, not production-grade
   - Note: For MVP, quality is "good enough" (no formant correction)
   - Future: Consider Rubber Band Library via WASM or Tone.js

3. **Large Files on Mobile**
   - Issue: 25MB files may crash on low-end devices
   - Workaround: Clear error message, suggest compressing files
   - Future: Add memory limit detection

### Temporary Fixes
- None currently

---

## Architecture Decisions

### Key Choices

1. **Next.js 16 (App Router)**
   - Why: Modern React framework, excellent Vercel integration, SSG for free tier
   - File: next.config.js:1-14

2. **Tailwind CSS over CSS Modules**
   - Why: Despite GROK's concern about bloat, modern Tailwind with PurgeCSS is ~10KB gzipped
   - Fast iteration, tree-shaking eliminates unused styles
   - File: tailwind.config.js:1-18

3. **Client-Side Only Processing**
   - Why: Avoids Vercel serverless costs, keeps everything free tier
   - Web Audio API is powerful enough for pitch shifting
   - File: utils/audio/pitchShift.ts:1-172

4. **Dual-Mode Pitch Shifting**
   - Why: Gives users choice between speed (simple) and quality (preserve duration)
   - Simple mode: playbackRate (instant)
   - Preserve mode: Granular synthesis (slower but maintains duration)
   - File: utils/audio/pitchShift.ts:17-89

5. **25MB File Limit**
   - Why: Keeps memory usage low on mobile, prevents browser crashes
   - Can expand to 50MB after testing on low-end devices
   - File: components/FileUpload.tsx:8-10

6. **No Auth Required (Optional Later)**
   - Why: Removes barrier to entry, IP rate limiting prevents abuse
   - Optional sign-in for history/presets later
   - File: SETUP.md:100-168

7. **1-Hour Auto-Delete (Supabase)**
   - Why: Cheaper than 24-hour, users download immediately anyway
   - File: SETUP.md:51-73

### Important Files

#### Core Audio Processing
- `utils/audio/pitchShift.ts:1-172` - Pitch shifting algorithms, WAV encoding
  - `simplePitchShift()` - Time-coupled mode
  - `preserveDurationPitchShift()` - Granular synthesis
  - `encodeToWav()` - WAV export

#### UI Components
- `components/ui/Button.tsx:1-42` - Primary/secondary/ghost button variants
- `components/ui/Slider.tsx:1-65` - Custom range slider with electric blue accent
- `components/FileUpload.tsx:1-81` - Drag-and-drop upload with validation
- `components/PitchControl.tsx:1-168` - Main audio processing interface

#### Pages & Layout
- `app/page.tsx:1-87` - Homepage with hero, upload, features
- `app/layout.tsx:1-45` - Root layout with header/footer
- `app/globals.css:1-31` - Tailwind config, dark theme, glow effects

#### Configuration
- `tailwind.config.js:1-18` - Custom colors (charcoal, electric-blue)
- `next.config.js:1-14` - Next.js optimization for Vercel
- `tsconfig.json:1-41` - TypeScript strict mode, path aliases

---

## TODO

### Must Have
- [x] Choose web framework (Next.js)
- [x] Choose audio processing (Web Audio API)
- [x] Define MVP scope
- [x] Set up project scaffolding
- [x] Implement pitch shifting (both modes)
- [x] Create file upload UI
- [x] Create pitch controls UI
- [ ] Test on iOS Safari (audio playback quirks)
- [ ] Apply for Google AdSense
- [ ] Deploy to Vercel
- [ ] Configure pitchchanger.io DNS

### Should Have
- [ ] Set up Supabase (storage + auth)
- [ ] Implement IP rate limiting (Upstash)
- [ ] Add waveform visualization
- [ ] Integrate Google AdSense
- [ ] Add analytics (Vercel Analytics or Google Analytics)
- [ ] Create FAQ/Help section
- [ ] Add keyboard shortcuts (Space = play/pause, etc)

### Nice to Have
- [ ] MP3 export (requires encoder library)
- [ ] Batch processing (multiple files)
- [ ] Preset saves (requires auth)
- [ ] Advanced effects (reverb, EQ)
- [ ] Real-time pitch preview (during slider drag)
- [ ] PWA/offline support
- [ ] Dark/light theme toggle

---

## Troubleshooting

### Common Errors

1. **"Failed to decode audio data"**
   - Cause: Corrupted file or unsupported codec
   - Fix: Re-export audio in standard MP3/WAV format
   - File: utils/audio/pitchShift.ts:124

2. **"File size must be less than 25MB"**
   - Cause: File too large for client-side processing
   - Fix: Compress file using Audacity or online tool
   - File: components/FileUpload.tsx:30-33

3. **Page stuck on "Processing..."**
   - Cause: Browser tab backgrounded (audio processing paused)
   - Fix: Keep tab active during processing
   - Future: Use Web Worker to avoid blocking

4. **No audio on iOS**
   - Cause: iOS requires user interaction before audio
   - Fix: Tap screen after upload (will add prompt)
   - File: components/PitchControl.tsx:65-85

### Debugging Tips

- **Check browser console** for Web Audio API errors
- **Monitor memory usage** in Chrome DevTools Performance tab
- **Test with small files first** (< 5MB) to isolate issues
- **Disable browser extensions** (ad blockers can interfere)
- **Use Chrome/Edge** for best Web Audio API support

---

## Recently Completed

### This Session (2025-11-22)
- ✅ Initialized Next.js 16 project with TypeScript + Tailwind
- ✅ Created dark minimalist UI with electric blue accent
- ✅ Implemented dual-mode pitch shifting (simple + preserve duration)
- ✅ Built file upload with drag-and-drop and validation (25MB max)
- ✅ Created pitch control interface with slider and mode toggle
- ✅ Added audio preview playback
- ✅ Implemented WAV export functionality
- ✅ Set up responsive mobile design
- ✅ Created SETUP.md with Supabase, rate limiting, AdSense, Vercel guides
- ✅ Made initial git commit
- ✅ Tested app locally (running on http://localhost:3001)

---

## File Structure

```
pitch-changer/
├── app/
│   ├── globals.css          # Tailwind imports + dark theme
│   ├── layout.tsx            # Root layout (header/footer)
│   └── page.tsx              # Homepage (upload + pitch control)
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Reusable button component
│   │   └── Slider.tsx        # Custom range slider
│   ├── FileUpload.tsx        # Drag-and-drop file upload
│   └── PitchControl.tsx      # Main audio processing UI
├── utils/
│   └── audio/
│       └── pitchShift.ts     # Pitch shifting algorithms + WAV export
├── lib/
│   └── supabase/             # (Future) Supabase integration
├── public/                   # Static assets
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── PROJECT_CONTEXT.md        # This file
├── SETUP.md                  # Setup guide (Supabase, AdSense, Vercel)
└── README.md                 # (To create)
```

---

## Performance Notes

- **Client-side only:** No server costs, stays in Vercel free tier
- **Lightweight CSS:** Tailwind purged to ~10KB gzipped
- **No external JS libraries:** Web Audio API is native
- **Optimized images:** AVIF/WebP formats (when added)
- **Target metrics:**
  - Lighthouse: >90
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1

---

## Git Workflow

### Branch Naming
- `feature/[name]` - New features (e.g., `feature/waveform`)
- `fix/[issue]` - Bug fixes (e.g., `fix/ios-audio`)
- `chore/[task]` - Maintenance (e.g., `chore/adsense`)

### PR Checklist
- [ ] Code runs locally (`npm run dev`)
- [ ] No TypeScript errors (`npm run build`)
- [ ] Tailwind classes are used efficiently
- [ ] Mobile tested (Chrome DevTools device mode)
- [ ] Lighthouse score >80

---

## Next Steps

1. **Test on iOS Safari** - Verify Web Audio API compatibility
2. **Apply for AdSense** - Submit pitchchanger.io for approval
3. **Push to GitHub** - Create remote repo
4. **Deploy to Vercel** - Connect GitHub, add env vars, deploy
5. **Configure DNS** - Point pitchchanger.io to Vercel
6. **Set up analytics** - Vercel Analytics or Google Analytics
7. **Monitor performance** - Lighthouse, Core Web Vitals
8. **Gather feedback** - Beta test with 10-20 users
9. **Implement Supabase** - When ready for user features (history, presets)
10. **Add rate limiting** - Start with client-side, upgrade to Upstash if abuse occurs

---

**Last Updated:** 2025-11-22 02:54
