# PROJECT_CONTEXT.md

**TL;DR:** LIVE at pitchchanger.io - **CRITICAL: Safari has no audio** - Architecture issues found (743-line component, memory leaks) | 2025-11-22 [Current Time]

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** https://github.com/davidchoimusic/pitch-changer
- **Domain:** pitchchanger.io (LIVE and stable)
- **Branding:** PitchChanger.io (capital P and C)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** 2fdf570 (Symmetrical spacing + glowing line divider)
- **Open PRs/Issues:** Safari no-sound bug (CRITICAL)
- **Production:** https://pitchchanger.io (LIVE but Safari BROKEN)

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

- **Status:** ⚠️ LIVE but Safari broken (no audio)
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

### Working Features (Chrome Only)
✅ File upload: MP3, WAV, FLAC, M4A, AAC (max 250MB)
✅ File validation with memory guard (<4GB devices)
✅ Real-time pitch shifting ±12 semitones (Tone.js)
✅ Dual playback modes with seamless switching
❌ Safari audio completely broken (no sound, both modes)
✅ Chrome working (all features functional)
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

### CRITICAL Issues (Must Fix)
1. **Safari No Audio (REGRESSION)**
   - Issue: Both playback modes completely silent on Safari
   - Cause: Likely AudioContext suspended/not resumed, or Tone.start() not called
   - Diagnosis: Used to work, now broken - no console errors
   - Fix: Add Safari unlock pattern, ensure Tone.start() on every play
   - File: components/AudioPlayer.tsx

2. **Memory Leaks - Tone.js Objects**
   - Issue: Tone.js objects nulled without disposal
   - Impact: Memory accumulates with each play/stop cycle
   - Fix: Call .dispose() before nulling refs
   - File: components/AudioPlayer.tsx:105,110

3. **Architecture Complexity**
   - Issue: 743-line AudioPlayer with 20 state variables (10 useState + 10 useRef)
   - Impact: Race conditions, hard to debug, fixes break other features
   - Problems: Dual playback systems, multiple AudioContext creation
   - File: components/AudioPlayer.tsx

### High Priority Issues
4. **Preserve Toggle Doesn't Resume**
   - Issue: Switching simple→preserve while playing stops, doesn't restart
   - Cause: Tone refs null, not re-initialized
   - Fix: Re-init Tone.Player/PitchShift if null, resume from position
   - File: components/AudioPlayer.tsx:502-543

5. **Multiple AudioContext Creation**
   - Issue: Contexts created in 3 places without coordination
   - Risk: Safari limit of 6 contexts → crashes
   - Files: AudioPlayer.tsx:49, pitchShift.ts:25,63,124, toneExport.ts:12-27

6. **Keydown Listener Issues**
   - Issue: Re-attaches on every state change
   - Fix: Use stable callback with useCallback
   - File: components/AudioPlayer.tsx (spacebar handler)

### Medium Priority Issues
7. **Tailwind v4 Custom Gradient Classes**
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

### Problems Discovered (2025-11-22)

1. **Monolithic AudioPlayer Component**
   - Problem: 743 lines managing dual playback systems
   - Impact: 20 state variables causing race conditions
   - Solution: Need to split into smaller components/hooks
   - File: components/AudioPlayer.tsx

2. **No AudioContext Management**
   - Problem: Contexts created in 3+ places without coordination
   - Impact: Safari 6-context limit, memory leaks
   - Solution: Need centralized AudioEngine singleton
   - Files: Multiple locations creating new AudioContext()

3. **Dual Playback Systems Conflict**
   - Problem: Tone.js and Web Audio API share refs but different lifecycles
   - Impact: Mode switching causes silent failures
   - Solution: Need separate management for each mode
   - File: components/AudioPlayer.tsx

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

### CRITICAL - Safari Fix (1-2 hours)
- [ ] Add debug logging to identify Safari failure point
- [ ] Test simple mode vs preserve mode separately
- [ ] Add Safari unlock pattern (once on first gesture)
- [ ] Ensure Tone.start() called on every play
- [ ] Fix Tone.js memory leaks (.dispose() before null)
- [ ] Fix preserve toggle resume bug
- [ ] Fix keydown listener (stable callback)
- [ ] Add abort flag for stale decodes
- [ ] Add user-visible decode errors
- [ ] Remove unused AudioEngine.ts file (190 lines)
- [ ] Test on Safari after fixes

### Must Have (After Safari Fixed)
- [ ] Apply for Google AdSense
- [ ] Add Google Analytics or Vercel Analytics
- [ ] Test on iOS Safari (iPhone/iPad)
- [ ] Test on Android Chrome
- [ ] Test FLAC, M4A, AAC file uploads
- [ ] Replace ad placeholders with real AdSense (after approval)

### Should Have (Architecture)
- [ ] Consider minimal AudioEngine (30 lines, not 190)
- [ ] Consolidate duplicate pitch-change logic (3 places)
- [ ] Simplify mode switching conditionals
- [ ] Add FAQ section with SEO keywords
- [ ] Run Lighthouse audit

### Nice to Have
- [ ] Full component refactor (split 743 lines)
- [ ] Custom hooks (useAudioPlayback, useAudioProcessing)
- [ ] MP3 export option
- [ ] Waveform visualization
- [ ] Batch processing

---

## Troubleshooting

### Safari No Audio Diagnosis

1. **Test Simple Mode First**
   - Uncheck "Preserve Duration"
   - Try to play
   - If works → Tone.js issue
   - If silent → Core AudioContext issue

2. **Check Console for:**
   - AudioContext state (suspended?)
   - Tone.context state
   - Any promise rejections

3. **Common Safari Fixes:**
   - Add audioContext.resume() after user gesture
   - Ensure Tone.start() on EVERY play
   - Add Safari unlock pattern (silent buffer)

### Memory Leak Detection

1. **Chrome DevTools:**
   - Memory tab → Take heap snapshot
   - Upload/play 5 files
   - Take second snapshot → Compare
   - Look for retained Tone.Player instances

2. **Signs of Leaks:**
   - Performance degrades over time
   - Multiple AudioContext warnings
   - Browser tab crashes after many files

### Common Errors

1. **"Please upload MP3, WAV, FLAC, M4A, or AAC file"**
   - Cause: Unsupported format
   - Fix: Convert to supported format
   - File: components/FileUpload.tsx:33-36

2. **"Large file on low-memory device"**
   - Cause: 100MB+ file on <4GB RAM device
   - Fix: Use smaller file or desktop
   - File: components/FileUpload.tsx:39-42

3. **Safari AudioContext Limit**
   - Cause: >6 contexts created
   - Fix: Reuse single context
   - Prevention: Centralized AudioEngine

---

## Recently Completed

### Session 3 (2025-11-22) - Deep Architecture Analysis
- ✅ **Discovered Safari regression** - No audio in any mode
- ✅ **Identified architecture issues:**
  - 743-line AudioPlayer component with 20 state variables
  - Memory leaks from Tone.js objects not disposed
  - Multiple AudioContext creation (3+ places)
  - Dual playback systems causing conflicts
- ✅ **Developed consensus fix plan** with CODEX + Claude review:
  - Debug-first approach (30 min)
  - Targeted fixes only (1-2 hours total)
  - Skip big refactor for now
- ✅ **Created unused AudioEngine.ts** (190 lines - to be removed)
- ✅ **Documented all issues** in PROJECT_CONTEXT.md

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

1. **FIX SAFARI AUDIO** (CRITICAL - 1-2 hours)
   - Debug to find exact failure point
   - Apply minimal targeted fixes
   - Test on Safari and Chrome
2. **Fix Memory Leaks** (Tone.js disposal)
3. **Fix Preserve Toggle Resume** (confirmed bug)
4. **Remove unused AudioEngine.ts** (190 lines)
5. **Then: Apply for Google AdSense** (after Safari fixed)
6. **Test on iOS/Android** (verify mobile UX)
7. **Monitor for AudioContext limit issues**
8. **Consider minimal refactor if needed**

---

**Last Updated:** 2025-11-22 (Safari broken, architecture issues identified)
