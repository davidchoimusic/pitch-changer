# PROJECT_CONTEXT.md

**TL;DR:** Production is now Tone-only and stable (commit 00d4833). Dual-mode removed; playback/seek/pitch working in production and staging. | 2025-11-23

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** https://github.com/davidchoimusic/pitch-changer
- **Domain:** pitchchanger.io (production live)
- **Branding:** PitchChanger.io (capital P and C)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** 00d4833 (Tone-only player, seek fixes)
- **Open PRs/Issues:** None critical; mobile verification pending
- **Production:** https://pitchchanger.io (Tone-only, working)
- **Staging:** N/A (staging-tone-only merged)

---

## Project Overview

**What it does:**
Web-based audio pitch shifting tool. Users upload audio files (MP3, WAV, FLAC, M4A, AAC - max 250MB), adjust pitch ±12 semitones in real-time with Tone.js (Tone-only path), and download as WAV. 100% client-side processing with strategic ad placement.

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
- **Tone.js 15.1.22:** Real-time pitch shifting (windowSize: 0.1 for quality), Tone-only playback/export
- **Supported Formats:** MP3, WAV, FLAC, M4A, AAC
- **Playback modes:** Single Tone.js path (preserve duration always; native path removed)

### Infrastructure
- **Deployment:** Vercel (free tier; production broken, staging in test)
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

- **Status:** Production live with Tone-only
- **Production URL:** https://pitchchanger.io
- **Latest Deploy URL:** https://pitch-changer-71fr6z6rn-davidchoimusics-projects.vercel.app
- **Vercel Project:** https://vercel.com/davidchoimusics-projects/pitch-changer
- **Build System:** Webpack (Turbopack disabled via `NEXT_DISABLE_TURBOPACK=1`)
  - **Why:** Turbopack port binding errors in Vercel sandbox
  - **Set in:** Vercel dashboard Environment Variables (Production & Preview)
- **GitHub:** Auto-deploy on push to main
- **DNS:** Configured via Namecheap → Vercel
- **SSL:** Automatic HTTPS via Vercel
- **Deployment Time:** ~30-40 seconds per push
- **Release Process:** `git push origin main`

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

### Working Features (Production Tone-only)
✅ File upload: MP3, WAV, FLAC, M4A, AAC (max 250MB)
✅ File validation with memory guard (<4GB devices)
✅ Real-time pitch shifting ±12 semitones (Tone.js only)
✅ Single playback path (preserve duration always; native path removed)
✅ Spacebar keyboard shortcut
✅ Slider advances during playback
✅ Seek jumps audio and slider together
✅ Pitch changes in real time
✅ WAV export using Tone.js (matches preview)
✅ Client-side only (zero uploads, zero server costs)

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

### Known Issues
- Pending mobile verification (iOS Safari, Android Chrome)
- Tailwind v4 custom gradients: using inline gradients as a reliable workaround.

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

### Critical (before merging staging to main)
- [ ] Final verification on staging: slider moves; seek jumps correctly; no jumps on play/pause
- [ ] Cross-browser test: Safari (non-private), Chrome
- [ ] Mobile test: iOS Safari, Android Chrome
- [ ] Merge `staging-tone-only` into `main` once verified

### After Merge
- [ ] Apply for Google AdSense
- [ ] Enable Vercel/GA analytics
- [ ] Test FLAC, M4A, AAC uploads on target browsers
- [ ] Add FAQ/SEO content
- [ ] Run Lighthouse audit

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

### Safari Stale Cache (No Audio in Regular Mode)

Symptoms:
- Regular Safari: plays but silent
- Safari Private Mode: works
- Other browsers/devices: works

Cause:
- Safari occasionally serves stale JS even after hard refresh.

Workaround (nuclear):
1. Safari → Settings → Privacy → Manage Website Data → Remove All
2. Quit Safari completely
3. Reopen and reload pitchchanger.io

Notes:
- Hard refresh / closing tab / reopening Safari is insufficient.
- Happens rarely; likely tied to rapid successive deploys.
- Consider adding cache-busting headers if this recurs in production.

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

### Session 3 (2025-11-22) - Safari Fix & Critical Bug Resolution
- ✅ **FIXED Safari Audio** - Discovered audio worked in private mode (cached state issue)
- ✅ **Safari Unlock Pattern:**
  - Resume suspended AudioContext on first user gesture
  - Create silent buffer to fully unlock Safari
  - Runs once per file load
- ✅ **Memory Leak Fixes:**
  - Dispose Tone.Player before nulling ref
  - Dispose PitchShift before nulling ref
  - Prevents state corruption from accumulated memory
- ✅ **AudioContext Leak Fix:**
  - Close old AudioContext before creating new one
  - Close context in cleanup function
  - Prevents Safari 6-context limit crashes
- ✅ **Keydown Listener Duplication Fix:**
  - Use refs for stable callback (no re-attachment)
  - Empty dependency array = attach once
  - Don't intercept space when focused on INPUT/TEXTAREA
- ✅ **Preserve Toggle Resume Fix:**
  - Re-initialize Tone refs if null when switching modes
  - Playback now resumes correctly after mode switch
- ✅ **Stale Decode Prevention:**
  - AbortController cancels old decodes on new file upload
  - Prevents state corruption from rapid file switching
- ✅ **User-Visible Decode Errors:**
  - Display red error banner for decode failures
  - Friendly message for unsupported formats
- ✅ **Removed unused AudioEngine.ts** (190 lines)
- ✅ **CODEX review** identified and fixed 4 critical issues
- ✅ **Tested on Safari** - All modes working after cache clear

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

1. **Apply for Google AdSense** (site live, Safari working, ready for monetization)
2. **Enable Vercel Analytics** (one click in dashboard)
3. **Test on iOS Safari** (iPhone/iPad - verify mobile UX)
4. **Test on Android Chrome** (verify mobile playback)
5. **Test new formats** (FLAC, M4A, AAC - verify browser support)
6. **Monitor first week traffic** (baseline metrics)
7. **Add FAQ section** (SEO optimization, common questions)
8. **Run Lighthouse audit** (performance optimization)
9. **Gather user feedback** (beta testers, social media)
10. **Consider architecture refactor** (optional - site is stable now)

---

**Last Updated:** 2025-11-22 (Safari FIXED, all critical bugs resolved, production stable)
