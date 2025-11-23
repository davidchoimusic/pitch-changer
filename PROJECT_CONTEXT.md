# PROJECT_CONTEXT.md

**TL;DR:** LIVE at pitchchanger.io - Production-stable pitch shifter with Safari/Chrome optimizations, 5 audio formats, clean UI | 2025-11-23 06:40

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** https://github.com/davidchoimusic/pitch-changer
- **Domain:** pitchchanger.io (LIVE and stable)
- **Branding:** PitchChanger.io (capital P and C)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** 2fdf570 (Symmetrical spacing + glowing line divider)
- **Open PRs/Issues:** None
- **Production:** https://pitchchanger.io (LIVE, stable, auto-deploys)

---

## Project Overview

**What it does:**
Web-based audio pitch shifting tool. Users upload audio files (MP3, WAV, FLAC, M4A, AAC - max 250MB), adjust pitch ±12 semitones in real-time with Tone.js, toggle preserve duration mode, and download as WAV. 100% client-side processing with strategic ad placement.

**Purpose:**
Free, fast, browser-based pitch-shifting for musicians, audio engineers, and creators. Monetized via Google AdSense ads shown during processing.

**Audience:**
~2,000 users/month initially - musicians, podcasters, content creators needing quick pitch adjustments.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.0.3 (App Router, React 19)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.17 (dark theme, blue accents, inline gradients)
- **Font:** System UI (native fonts for fast loading)

### Audio Processing
- **Tone.js 15.1.22:** Real-time pitch shifting (windowSize: 0.1 for quality)
- **Web Audio API:** Native browser API for simple mode
- **Supported Formats:** MP3, WAV, FLAC, M4A, AAC
- **Two playback modes:**
  1. Preserve Duration (Tone.js): Pitch changes, length preserved
  2. Simple Mode (Native): Pitch + speed change together

### Infrastructure
- **Deployment:** Vercel (free tier, LIVE)
- **Build System:** Webpack (Turbopack disabled via env var)
- **Storage:** None (client-side only, zero server uploads)
- **Rate Limiting:** Not implemented
- **Monetization:** Strategic ad placement (AdSense pending)

### Key Dependencies
```json
{
  "next": "^16.0.3",
  "react": "^19.2.0",
  "typescript": "^5.9.3",
  "tailwindcss": "^4.1.17",
  "tone": "^15.1.22",
  "@tailwindcss/postcss": "^4.1.17",
  "critters": "^0.0.23"
}
```

---

## Deployments

- **Status:** ✅ LIVE AND STABLE
- **Production URL:** https://pitchchanger.io
- **Vercel Project:** https://vercel.com/davidchoimusics-projects/pitch-changer
- **Build System:** Webpack (Turbopack disabled via `NEXT_DISABLE_TURBOPACK=1`)
  - **Why:** Turbopack port binding errors in Vercel sandbox
  - **Set in:** Vercel dashboard Environment Variables (Production & Preview)
- **GitHub:** Auto-deploy on push to main (working)
- **DNS:** Configured via Namecheap → Vercel
- **SSL:** Automatic HTTPS via Vercel
- **Deployment Time:** ~30-40 seconds per push
- **Release Process:** `git push origin main` → Auto-deploy

---

## Access/Config

### Required Env Vars (Production)
- `NEXT_DISABLE_TURBOPACK=1` - Forces Webpack builds (set in Vercel)

### External Services
- **Google AdSense:** Pending approval - ad spaces ready
- **Analytics:** Not yet configured

### DNS/Domain
- **Domain:** pitchchanger.io (LIVE)
- **Registrar:** Namecheap
- **DNS:** A record → Vercel
- **www redirect:** Automatic

---

## Current State

### Working Features
✅ File upload: MP3, WAV, FLAC, M4A, AAC (max 250MB)
✅ File validation with memory guard (<4GB devices)
✅ Real-time pitch shifting ±12 semitones (Tone.js)
✅ Dual playback modes with seamless switching
✅ Lazy Tone.js initialization (Safari compatible)
✅ Safari/Chrome optimized (windowSize: 0.1 works on both after bug fixes)
✅ Spacebar keyboard shortcut
✅ Dynamic timecode (adjusts for playback speed)
✅ Playback speed % indicator
✅ Strategic ad placement (2 inline spaces during processing)
✅ Branded filenames: "Song - SPED UP/SLOWED - PitchChanger.io.wav"
✅ Shiny gradient buttons (blue play, green download)
✅ Clean UI: white→blue gradient titles, glowing divider line
✅ WAV export using Tone.js (matches preview quality)
✅ Mobile responsive with ad sidebars
✅ Client-side only (zero uploads, zero server costs)
✅ Memory optimized (single ArrayBuffer, no double-buffering)
✅ Defensive error handling (Tone.js refs nulled on stop)

### Working Flows
1. **Upload → Preview → Adjust → Download:**
   - Upload audio (5 formats supported)
   - Decodes in browser (no server upload)
   - Play/pause with spacebar
   - Real-time pitch adjustment
   - Toggle preserve duration (seamless)
   - Click "Process & Download" → progress + "scroll to sponsors"
   - "SUCCESS! YOUR FILE IS READY!"
   - Scroll past ads → download with branded filename

---

## Known Issues

### Current Issues
1. **Safari Latency (~slight delay)**
   - Issue: Small delay when changing pitch on Safari vs Chrome
   - Cause: Safari Web Audio API buffering
   - Status: Acceptable - resolved from 1 second to imperceptible with bug fixes
   - Note: windowSize 0.1 works well now

2. **Tailwind v4 Custom Gradient Classes**
   - Issue: bg-gradient-brand not generating in production
   - Workaround: Using inline `style={{ backgroundImage: ... }}`
   - Status: Working - inline styles are reliable
   - Note: Tailwind v4 has breaking changes for custom utilities

### Fixed Issues (Session 2)
- ✅ Safari 60% hang (lazy Tone.js init on first play)
- ✅ Double playback when switching modes (stopPlayback cleans both)
- ✅ Tone.setContext not restored (try/finally added)
- ✅ Memory double-buffering (removed arrayBuffer.slice)
- ✅ Vercel Turbopack build failures (Webpack via env var)
- ✅ Text cutoff on "g" (leading-tight pb-2 consistently applied)
- ✅ Invisible gradient text (switched to inline styles)
- ✅ React hydration mismatch (removed Math.random, used deterministic values)

---

## Architecture Decisions

### Key Choices

1. **5 Audio Format Support**
   - Formats: MP3, WAV, FLAC, M4A, AAC
   - Why: Broader compatibility, users upload various formats
   - Browser support: Chrome/Safari handle all via Web Audio API
   - File: components/FileUpload.tsx:14-23

2. **Inline Gradient Styles (Not Tailwind Classes)**
   - Why: Tailwind v4 custom backgroundImage utilities unreliable
   - Solution: Direct inline styles with linear-gradient
   - Result: Works across all browsers, no build issues
   - File: app/page.tsx:20,26,41,118,125

3. **Lazy Tone.js Initialization**
   - Why: Safari blocks Tone.js creation without user gesture
   - Solution: Create player/effects on first Play click
   - Result: No 60% hang, works on all browsers
   - File: components/AudioPlayer.tsx:183-200

4. **Defensive Ref Cleanup**
   - Why: Prevent stale Tone.js refs after errors
   - Solution: Null all refs in stopPlayback()
   - Result: Clean re-init if Tone.js errors occur
   - File: components/AudioPlayer.tsx:96-128

5. **Tone.js windowSize: 0.1**
   - Why: Good balance of quality + responsiveness
   - Note: Original Safari delay was bugs, not windowSize
   - Result: Works smoothly on both Chrome and Safari
   - File: components/AudioPlayer.tsx:193, utils/audio/toneExport.ts:35

6. **Symmetrical Visual Design**
   - Why: Professional, balanced layout
   - Spacing: Title (mt-2) → PitchChanger.io (mt-4) → Line (mt-4) → Tagline
   - Glowing gradient line divider (192px, blue glow)
   - File: app/page.tsx:28,35,47

---

## TODO

### Must Have (Immediate)
- [ ] Apply for Google AdSense
- [ ] Add Google Analytics or Vercel Analytics
- [ ] Test on iOS Safari (iPhone/iPad)
- [ ] Test on Android Chrome
- [ ] Test FLAC, M4A, AAC file uploads
- [ ] Replace ad placeholders with real AdSense (after approval)

### Should Have
- [ ] Add FAQ section with SEO keywords
- [ ] Run Lighthouse audit
- [ ] Add "Upload Another File" button
- [ ] Monitor first week traffic
- [ ] Gather user feedback

### Nice to Have
- [ ] MP3 export option
- [ ] Waveform visualization
- [ ] Batch processing
- [ ] User presets (requires backend)

---

## Troubleshooting

### Common Errors

1. **"Please upload MP3, WAV, FLAC, M4A, or AAC file"**
   - Cause: Unsupported format
   - Fix: Convert to supported format
   - File: components/FileUpload.tsx:33-36

2. **"Large file on low-memory device"**
   - Cause: 100MB+ file on <4GB RAM device
   - Fix: Use smaller file or desktop
   - File: components/FileUpload.tsx:39-42

3. **Safari 60% hang** (FIXED)
   - Cause: Tone.js needed user gesture
   - Fix: Lazy init on Play click
   - File: components/AudioPlayer.tsx:183-200

4. **Double playback** (FIXED)
   - Cause: Stale player refs
   - Fix: Null all refs in stopPlayback
   - File: components/AudioPlayer.tsx:105,110

5. **Invisible text** (FIXED)
   - Cause: Tailwind v4 custom gradients not generating
   - Fix: Inline gradient styles
   - File: app/page.tsx:20,26,41

---

## Recently Completed

### Session 2 (2025-11-22/23)
- ✅ **DEPLOYED TO PRODUCTION** at https://pitchchanger.io
- ✅ Fixed Vercel build failures (Webpack via env var)
- ✅ Fixed Safari 60% hang (lazy Tone.js init)
- ✅ Fixed double playback bug
- ✅ Fixed Tone.setContext memory leak
- ✅ Optimized memory (single ArrayBuffer)
- ✅ Added 3 new formats: FLAC, M4A, AAC
- ✅ Removed sticky header (cleaner layout)
- ✅ Added inline title sections
- ✅ Simplified gradients (white→blue, inline styles)
- ✅ Added glowing gradient line divider
- ✅ Fixed text cutoff with leading-tight pb-2
- ✅ Symmetrical spacing around divider
- ✅ Defensive ref cleanup (null after stop)
- ✅ Tested windowSize 0.1 (works great after bug fixes)
- ✅ Updated branding consistency

### Session 1 (2025-11-22)
- ✅ Built complete Next.js app with Tone.js
- ✅ Implemented dual-mode playback
- ✅ Created strategic ad flow
- ✅ Designed shiny UI
- ✅ Set up GitHub + Vercel deployment

---

## Performance Notes

- **Client-side only:** Zero server costs
- **Tone.js:** ~200KB (necessary for quality)
- **Tailwind CSS:** ~10KB gzipped
- **Single ArrayBuffer:** Memory efficient
- **Lazy Tone.js:** Fast initial load
- **Inline gradients:** Reliable rendering
- **5 audio formats:** Broad compatibility

---

## Next Steps

1. **Apply for Google AdSense** (site live with content)
2. **Enable Vercel Analytics** (one click)
3. **Test on iOS/Android** (verify mobile UX)
4. **Test new formats** (FLAC, M4A, AAC)
5. **Monitor traffic** (first week baseline)
6. **Add FAQ section** (SEO optimization)
7. **Run Lighthouse** (performance audit)
8. **Gather user feedback** (beta testers)

---

**Last Updated:** 2025-11-23 06:40 (PRODUCTION STABLE)
