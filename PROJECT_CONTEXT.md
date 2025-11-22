# PROJECT_CONTEXT.md

**TL;DR:** Production-ready pitch-shifting app with Tone.js real-time processing, strategic ad flow, 250MB support | 2025-11-22 21:45

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** https://github.com/davidchoimusic/pitch-changer
- **Domain:** pitchchanger.io (configured and LIVE)
- **Branding:** PitchChanger.io (capital P and C)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** 1496a2d (Updated PROJECT_CONTEXT.md)
- **Open PRs/Issues:** None
- **Local Dev:** http://localhost:3001
- **Production:** https://pitchchanger.io (LIVE)

---

## Project Overview

**What it does:**
Web-based audio pitch shifting tool where users upload MP3/WAV files (max 250MB), adjust pitch ±12 semitones in real-time, toggle preserve duration mode, and download as WAV. Fully client-side processing with strategic ad placement.

**Purpose:**
Provide musicians, audio engineers, and creators with a free, fast, browser-based pitch-shifting tool. Monetized via Google AdSense ads shown during processing.

**Audience:**
~2,000 users/month initially - musicians, podcasters, content creators needing quick pitch adjustments.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.0.3 (App Router, React 19)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.17 (modern dark theme, blue accents)
- **Font:** System UI (native fonts for fast loading)

### Audio Processing
- **Tone.js 15.1.22:** Real-time pitch shifting with duration preservation
- **Web Audio API:** Native browser API for simple mode (pitch + duration change)
- **Two playback modes:**
  1. Preserve Duration (Tone.js): Pitch changes, length stays same - real-time!
  2. Simple Mode (Native): Pitch AND speed change together

### Infrastructure
- **Deployment:** Vercel (free tier, ready to deploy)
- **Storage:** None needed (client-side only, no file uploads to server)
- **Rate Limiting:** Not yet implemented (future: Upstash Redis)
- **Monetization:** Strategic ad placement during processing (AdSense pending)

### Key Dependencies
```json
{
  "next": "^16.0.3",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "typescript": "^5.9.3",
  "tailwindcss": "^4.1.17",
  "tone": "^15.1.22",
  "@tailwindcss/postcss": "^4.1.17",
  "critters": "^0.0.23"
}
```

---

## Deployments

- **Status:** ✅ LIVE IN PRODUCTION
- **Production URL:** https://pitchchanger.io
- **Vercel Project:** https://vercel.com/davidchoimusics-projects/pitch-changer
- **Deployment:** Vercel (free tier)
- **GitHub:** Auto-deploy enabled on push to main
- **DNS:** Configured via Namecheap → Vercel
- **SSL:** Automatic via Vercel (HTTPS enabled)
- **Release Process:** `git push origin main` → Auto-deploy to production

---

## Data

- **Databases:** None (client-side only)
- **Storage:** None (all processing in-memory, no server uploads)
- **Migrations Applied:** N/A
- **Seed State:** N/A

---

## Access/Config

### Required Env Vars
- None currently (all client-side)

### Future Env Vars (Optional Features)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (if adding user features)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL (rate limiting)
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

### External Services
- **Google AdSense:** Pending approval - ad spaces ready in layout
- **Supabase:** Not needed yet (future: user presets/history)
- **Upstash Redis:** Not needed yet (future: rate limiting)

### DNS/Domain
- **Domain:** pitchchanger.io (LIVE)
- **Registrar:** Namecheap
- **DNS:** Configured and pointing to Vercel
- **www redirect:** www.pitchchanger.io → pitchchanger.io (automatic)

---

## Current State

### Working Features
✅ File upload with drag-and-drop (MP3/WAV, max 250MB)
✅ File validation (type, size)
✅ Real-time pitch shifting ±12 semitones with Tone.js
✅ Two playback modes with seamless switching:
  - Preserve Duration (Tone.js): Pitch changes, length preserved
  - Simple Mode (Native): Pitch + speed change together
✅ Live audio preview with play/pause controls
✅ Spacebar keyboard shortcut
✅ Dynamic timecode (adjusts for playback speed in simple mode)
✅ Playback speed percentage indicator
✅ Strategic ad placement during processing (2 ad spaces)
✅ Processing flow: button → progress bar → "scroll to view sponsors" → success message → download
✅ Branded filenames: "Song - SPED UP - PitchChanger.io.wav"
✅ Shiny gradient buttons (blue play, green download)
✅ Large prominent header with glow effect
✅ WAV export/download
✅ Modern dark UI (gray background, blue accents)
✅ Responsive mobile design with ad sidebar spaces
✅ Client-side processing (no server costs)

### Working Flows
1. **Upload → Preview → Adjust → Download:**
   - User uploads MP3/WAV (up to 250MB)
   - Audio loads with progress indicator
   - Play/pause with spacebar
   - Adjust pitch slider in real-time (-12 to +12 semitones)
   - Toggle preserve duration mode while playing
   - See playback speed % in simple mode
   - Click "Process & Download" → progress bar appears
   - Message: "Scroll down to view sponsors"
   - After processing: "SUCCESS! YOUR FILE IS READY!"
   - Scroll past 2 ad spaces to green download button
   - Download with branded filename

### Working Integrations
- Tone.js for real-time pitch shifting

---

## Known Issues & Workarounds

### Current Issues
1. **iOS Safari Audio Context**
   - Issue: iOS requires user interaction before audio playback
   - Workaround: First click on Play button starts audio context
   - Status: Working via Tone.start() on user interaction

2. **Large Files on Low-End Mobile**
   - Issue: 250MB files may crash on budget phones
   - Workaround: File validation shows clear error, recommend compression
   - Status: Acceptable - most users upload smaller files

3. **Slider Label Alignment**
   - Issue: Labels (-12, -6, 0, +6, +12) don't perfectly align with thumb positions
   - Reason: Browser range input internal spacing varies
   - Workaround: Accepted for visual simplicity
   - Status: Good enough - big semitone number shows exact value

### Fixed Issues (Today)
- ✅ Timecode not updating during playback
- ✅ Play/pause breaking after multiple cycles
- ✅ Preserve duration not working (both modes same)
- ✅ No real-time pitch change audible
- ✅ Tailwind v4 CSS compilation errors

---

## Architecture Decisions

### Key Choices

1. **Tone.js for Real-Time Pitch Shifting**
   - Why: Enables pitch change with duration preservation in real-time
   - Alternative considered: Custom AudioWorklet (too complex)
   - Tradeoff: +200KB bundle size, but essential for UX
   - File: components/AudioPlayer.tsx:6,59-80

2. **Dual-Mode Playback**
   - Why: Gives users choice between quality (Tone.js) and speed (native)
   - Preserve Duration: Uses Tone.js PitchShift effect
   - Simple Mode: Uses native playbackRate (instant, changes speed too)
   - File: components/AudioPlayer.tsx:194-244

3. **Strategic Ad Placement**
   - Why: Maximize ad views while processing audio
   - Flow: Click download → progress bar → "scroll to sponsors" → 2 ads → download button
   - Encourages ad engagement without being pushy
   - File: components/AudioPlayer.tsx:647-717

4. **250MB File Limit** (increased from 25MB)
   - Why: Support longer audio files, podcasts, full songs
   - Tradeoff: May crash on low-end devices, but target audience has decent hardware
   - File: components/FileUpload.tsx:13

5. **Branded Filenames**
   - Why: Free marketing - every download includes "PitchChanger.io"
   - Format: "Song Name - SPED UP/SLOWED - PitchChanger.io.wav"
   - File: components/AudioPlayer.tsx:337-343

6. **No Server Processing**
   - Why: Stays in Vercel free tier, no backend costs
   - All audio processing happens in browser
   - Download uses offline rendering for quality

7. **PitchChanger.io Branding**
   - Why: Professional capitalization (capital P and C)
   - Used in header, filenames, thank you message
   - File: app/layout.tsx:5,12,53,63

### Important Files

#### Core Audio Processing
- `components/AudioPlayer.tsx:1-720` - Main audio player with Tone.js integration
  - Dual-mode playback (Tone.js vs native)
  - Real-time pitch shifting
  - Processing flow with ad strategy
- `utils/audio/pitchShift.ts:1-172` - Pitch shifting algorithms, WAV encoding

#### UI Components
- `components/ui/Button.tsx:1-63` - Button variants: primary, play (blue shine), download (green shine)
- `components/FileUpload.tsx:1-113` - Drag-and-drop with 250MB validation
- `components/ui/Slider.tsx:1-65` - (Not currently used, kept for reference)

#### Pages & Layout
- `app/page.tsx:1-103` - Homepage with hero, upload, features
- `app/layout.tsx:1-78` - Root layout with large shiny header, ad spaces (top, left, right)
- `app/globals.css:1-26` - Tailwind v4 import, CSS variables, glow utilities

#### Configuration
- `tailwind.config.js:1-21` - Custom colors (bg-dark, accent blue)
- `next.config.js:1-14` - Next.js optimization for Vercel
- `postcss.config.js:1-7` - Tailwind v4 PostCSS plugin
- `tsconfig.json:1-41` - TypeScript strict mode, path aliases

---

## TODO

### Must Have (Before Launch)
- [ ] Deploy to Vercel
- [ ] Configure pitchchanger.io DNS
- [ ] Apply for Google AdSense
- [ ] Test on iOS Safari
- [ ] Test on low-end Android device
- [ ] Add real Google AdSense ad units (replace placeholders)

### Should Have
- [ ] Add FAQ section with SEO keywords (see brainstorm notes)
- [ ] Integrate Google Analytics or Vercel Analytics
- [ ] Add keyboard shortcuts (arrow keys for pitch, R for reset)
- [ ] Improve SEO with keyword optimization (post-launch, based on data)
- [ ] Add "Upload Another File" button after download

### Nice to Have
- [ ] MP3 export option
- [ ] Waveform visualization
- [ ] Batch processing (multiple files)
- [ ] User presets (requires Supabase)
- [ ] PWA/offline support
- [ ] Share buttons (social media)

---

## Troubleshooting

### Common Errors

1. **"Please upload an MP3 or WAV file"**
   - Cause: Unsupported file format
   - Fix: Convert to MP3 or WAV using online converter
   - File: components/FileUpload.tsx:24-27

2. **"File size must be less than 250MB"**
   - Cause: File too large
   - Fix: Compress file using Audacity or online tool
   - File: components/FileUpload.tsx:30-34

3. **Play button grayed out**
   - Cause: Tone.js player not loaded yet
   - Fix: Wait for "Ready to Play" status (usually 2-3 seconds)
   - File: components/AudioPlayer.tsx:61-66

4. **No audio on iOS**
   - Cause: iOS requires user interaction before audio
   - Fix: Click Play button first (triggers Tone.start())
   - File: components/AudioPlayer.tsx:197

5. **Timecode not moving in simple mode**
   - Cause: Already fixed - was using wrong duration calculation
   - Fix: Update page if using old cached version
   - File: components/AudioPlayer.tsx:352-358

### Debugging Tips

- **Check browser console** for Tone.js or Web Audio API errors
- **Look for "Tone.js player loaded successfully"** message
- **Monitor memory usage** in Chrome DevTools (250MB files can be heavy)
- **Test with small files first** (< 10MB) to isolate issues
- **Use Chrome/Edge** for best compatibility (Safari works but slower)
- **Disable ad blockers** during development (may block ad space divs)

---

## Recently Completed

### This Session (2025-11-22)
- ✅ Initialized Next.js 16 project with TypeScript + Tailwind
- ✅ Integrated Tone.js for real-time pitch shifting
- ✅ Implemented dual-mode playback (Tone.js vs native Web Audio)
- ✅ Built seamless mode switching while audio playing
- ✅ Added dynamic timecode (adjusts for playback speed)
- ✅ Added playback speed percentage indicator
- ✅ Increased file size limit to 250MB
- ✅ Created strategic ad placement flow during processing
- ✅ Built shiny gradient buttons (blue play, green download)
- ✅ Added spacebar keyboard shortcut
- ✅ Implemented branded filenames (SPED UP/SLOWED - PitchChanger.io)
- ✅ Created large prominent header with glow effect
- ✅ Rebranded to PitchChanger.io (capital P and C)
- ✅ Added ad spaces (top banner, left/right sidebars, inline during processing)
- ✅ Fixed multiple playback bugs (timecode, pause/resume, mode switching)
- ✅ Simplified preserve duration explanation with bullet points
- ✅ Updated UI to modern dark gray theme

---

## File Structure

```
pitch-changer/
├── app/
│   ├── globals.css          # Tailwind v4 imports + dark theme
│   ├── layout.tsx            # Root layout with header, ad spaces, footer
│   └── page.tsx              # Homepage (upload UI + features)
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # 4 variants: primary, play, download, ghost
│   │   └── Slider.tsx        # (Unused - kept for reference)
│   ├── FileUpload.tsx        # Drag-and-drop upload (250MB max)
│   └── AudioPlayer.tsx       # Main audio player with Tone.js + processing flow
├── utils/
│   └── audio/
│       └── pitchShift.ts     # Pitch shifting algorithms + WAV export
├── lib/
│   └── supabase/             # (Future) Supabase integration
├── public/                   # Static assets
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js         # Tailwind v4 PostCSS config
├── tsconfig.json
├── package.json
├── PROJECT_CONTEXT.md        # This file
└── SETUP.md                  # Setup guide (Supabase, AdSense, Vercel)
```

---

## Performance Notes

- **Client-side only:** No server costs, stays in Vercel free tier
- **Tone.js bundle:** ~200KB (acceptable for real-time pitch shifting)
- **Tailwind CSS:** Purged to ~10KB gzipped
- **Target metrics:**
  - Lighthouse: >85 (Tone.js adds weight but necessary)
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1

---

## Git Workflow

### Branch Naming
- `feature/[name]` - New features (e.g., `feature/faq`)
- `fix/[issue]` - Bug fixes (e.g., `fix/ios-audio`)
- `chore/[task]` - Maintenance (e.g., `chore/adsense`)

### Commits Today
- 30+ commits with iterative improvements
- All features working and tested locally

---

## Next Steps

1. **Deploy to Vercel** (NEXT)
2. **Configure pitchchanger.io DNS**
3. **Replace ad placeholders with real Google AdSense units**
4. **Apply for Google AdSense** (needs live site)
5. **Test on iOS Safari and mobile devices**
6. **Add Google Analytics or Vercel Analytics**
7. **Monitor performance and user behavior**
8. **SEO optimization** (after 2-4 weeks of real data)
9. **Add FAQ section** with keyword optimization
10. **Gather user feedback** and iterate

---

**Last Updated:** 2025-11-22 21:50 (DEPLOYED TO PRODUCTION)
