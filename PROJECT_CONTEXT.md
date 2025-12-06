# PROJECT_CONTEXT.md

**TL;DR (2025-12-05):** Production UPGRADED to SoundTouch; eliminated 99+ phantom frequencies from Tone.js compensation approach; TRUE time-stretching via WSOLA algorithm; Safari export confirmed working; clean audio at all pitch/speed settings | 2025-12-05 PST

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** https://github.com/davidchoimusic/pitch-changer
- **Domain:** pitchchanger.io (production live)
- **Branding:** PitchChanger.io (capital P and C)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** 71ede25 (REPLACE PRODUCTION: Switch main site to SoundTouch engine)
- **Open PRs/Issues:** None critical
- **Production:** https://pitchchanger.io (SoundTouch engine; AudioPlayerSoundTouch)
- **Test Route:** https://pitchchanger.io/soundtouch (validation route; can be removed after testing period)
- **Legacy:** components/AudioPlayerBeta.tsx (Tone.js version with compensation artifacts, can be archived)
- **Archived:** components/AudioPlayerLegacy.tsx (old pitch-only version)

---

## Project Overview

**What it does:**
Web-based audio pitch shifting and time-stretching tool. Users upload audio files (MP3, WAV, FLAC, M4A, AAC - max 250MB), adjust pitch ±12 semitones and speed 0.5x-1.5x independently in real-time with SoundTouch (WSOLA algorithm), and download as WAV. 100% client-side processing with strategic ad placement.

**Purpose:**
Free, fast, browser-based pitch-shifting and time-stretching for musicians, audio engineers, and creators. Monetized via Google AdSense ads shown during processing.

**Audience:**
~2,000 users/month initially - musicians, podcasters, content creators needing quick pitch/tempo adjustments.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.0.7 (App Router, React 19)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.17 (dark theme, blue accents, inline gradients)
- **Font:** System UI (native fonts for fast loading)

### Audio Processing
- **SoundTouchJS 0.1.23:** WSOLA time-stretching and pitch shifting (independent controls) - PRODUCTION
- **Tone.js 15.1.22:** Deprecated (kept as dependency during validation period; will be removed)
- **Supported Formats:** MP3, WAV, FLAC, M4A, AAC
- **Playback modes:** Single SoundTouch path with true time-stretching (no pitch compensation)

### Infrastructure
- **Deployment:** Vercel (free tier; production live)
- **Build System:** Webpack (Turbopack disabled via env var)
- **Storage:** None (client-side only, zero server uploads)
- **Rate Limiting:** Not implemented
- **Monetization:** Strategic ad placement (AdSense pending)

### Key Dependencies
```json
{
  "next": "^16.0.7",
  "react": "^19.2.1",
  "typescript": "^5.9.3",
  "tailwindcss": "^4.1.17",
  "soundtouchjs": "^0.1.23",
  "tone": "^15.1.22",
  "@tailwindcss/postcss": "^4.1.17",
  "critters": "^0.0.23"
}
```

---

## Deployments

- **Status:** Production live with SoundTouch
- **Production URL:** https://pitchchanger.io
- **Latest Deploy URL:** https://pitch-changer-xp763fqgx-davidchoimusics-projects.vercel.app
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
- **Google AdSense:** Pending approval ("Getting ready"); auto-ads/auto-optimize enabled; script in layout; ads.txt published (`google.com, pub-2950955479321117, DIRECT, f08c47fec0942fa0`); ads.txt status: Authorized
- **Google Analytics 4:** Configured (G-RB68Q82Z1B); tracking page views, file uploads, processing, downloads, pitch/speed adjustments; Privacy Policy updated

### DNS/Domain
- **Domain:** pitchchanger.io (LIVE)
- **Registrar:** Namecheap
- **DNS:** A record → Vercel
- **www redirect:** Automatic

---

## Current State

### Working Features (Production - AudioPlayerSoundTouch)
✅ File upload: MP3, WAV, FLAC, M4A, AAC (max 250MB)
✅ File validation with memory guard (<4GB devices; mobile soft cap 120MB)
✅ **Waveform visualization** - clickable scrubber with orange playhead
✅ **Independent pitch slider** (-12 to +12 semitones) with real-time preview
✅ **Independent speed slider** (0.5x to 1.5x, 1.0x centered)
✅ **SoundTouch WSOLA engine** - TRUE time-stretching (NO pitch compensation artifacts!)
✅ CSS overlay playhead (GPU accelerated, smooth 60fps, no lag)
✅ Waveform seeking (click-to-seek with buffer recreation)
✅ Spacebar keyboard shortcut (handlePlayPauseRef pattern)
✅ Inline gradient sliders (visible all browsers, Safari/Chrome/mobile)
✅ WAV export using SoundTouch (pitch + speed both exported, clean output)
✅ Client-side only (zero uploads, zero server costs)
✅ Legal pages live: /privacy, /contact, /terms, /about
✅ AdSense assets ready (script + ads.txt Authorized); ad spaces in processing flow
✅ GA4 tracking: file uploads, processing, downloads, pitch+speed adjustments (soundtouch engine events)
✅ OG/Twitter cards: landscape 1200x600 image for social sharing
✅ Private mode detection with warnings
✅ Upload Different File buttons (top + bottom of page)
✅ **8 SEO Content Pages** (tool pages + guides for organic traffic)
✅ Complete Schema.org markup (WebApp, Org, FAQ, HowTo)
✅ Logo in header navigation
✅ Safari export working (OfflineAudioContext approach successful)

### SEO & Discovery (Session 5)
✅ **Content Pages:** 8 keyword-targeted pages (tool landing + guides)
✅ **Technical SEO:** Canonical tags, OpenGraph, Twitter cards (all 14 pages)
✅ **Schema Markup:** 4 types (WebApplication, Organization, FAQPage, HowTo)
✅ **Discovery Files:** sitemap.xml, robots.txt, llms.txt
✅ **Search Console:** Sitemap submitted, 14 pages discovered, 5 priority pages indexed
✅ **Social Sharing:** All pages have OG + Twitter cards (working previews)

### Archived (Rollback Available)
- components/AudioPlayerLegacy.tsx (old pitch-only version)
- components/AudioPlayerBeta.tsx (Tone.js with compensation - has artifacts; archived after SoundTouch migration)
- Can restore by renaming if SoundTouch issues arise

### Working Flows
1. **Upload → Preview → Adjust → Download:**
   - Upload audio (5 formats supported)
   - Decodes in browser (no server upload)
   - Play/pause with spacebar or button
   - Real-time pitch + speed adjustment (independent controls)
   - Click "Process Audio (WAV)" → progress + "scroll to sponsors"
   - "SUCCESS! YOUR FILE IS READY!"
   - Scroll past ads → download with branded filename

---

## REGRESSION RISKS

**⚠️ CRITICAL: Read this before making changes to prevent repeating past mistakes**

### 🔴 CRITICAL: Tone.js Pitch Compensation Created 99+ Phantom Frequencies (2025-12-05)
**What went wrong:** Using `playbackRate` for speed + `PitchShift` for compensation created massive artifacts
**Why:**
- `playbackRate` changes BOTH speed AND pitch together (like a vinyl record)
- We tried to "undo" the pitch change using `PitchShift` with compensation formula
- Formula: `compensatedPitch = userPitch - (12 * Math.log2(speedValue))`
- This misuse of granular synthesis created frequency splitting, subharmonics, overtone series
**Symptoms:** Pure 440Hz tone at 1.05x speed produced 99+ phantom frequencies:
- Frequency splitting: 448.24, 449.71, 451.17 Hz (beating/modulation)
- Subharmonics: 358.89, 266.6, 175.78 Hz
- Overtone series: 540.53, 631.35, 722.17, 905.27, 996.09 Hz, etc.
- Got WORSE at higher speeds (1.5x = 100+ frequencies)
**Root cause:** Granular pitch shifting can't cleanly do negative pitch shifts (required when speed > 1.0x)
**Solution used:** Replaced Tone.js with SoundTouch (WSOLA time-stretching)
**AVOID:**
- NEVER use `playbackRate` + `PitchShift` compensation for independent speed control
- NEVER try to "undo" a pitch change with another pitch shifter
- NEVER use granular synthesis for time-stretching (it's a pitch shifter, not time-stretcher)
**Pattern:** Use proper time-stretching libraries (SoundTouch, Rubber Band) with independent tempo/pitch controls
**Files affected (all compensation logic removed):**
- components/AudioPlayerBeta.tsx (lines 262-263, 282-284, 350-352, 372-374) - DELETED
- utils/audio/toneExport.ts (lines 40-42) - DELETED
**Replacement:** SoundTouch with `shifter.tempo` and `shifter.pitch` (truly independent)
**How to verify:** Process pure 440Hz tone at any speed/pitch → frequency analyzer should show ONLY intended frequency
**Impact:** This was the biggest audio quality issue in the entire project - now resolved

### Slider Visibility (Tailwind v4 Pseudo-Elements)
**What went wrong:** Pitch/speed sliders invisible on desktop Safari/Chrome (happened twice)
**Why:** Tailwind arbitrary variants on pseudo-elements (`[&::-webkit-slider-runnable-track]:bg-gray-700`) don't compile reliably in production builds
**Solution used:** Inline `style={{ background: '...' }}` gradients
**AVOID:** Using Tailwind classes for range input tracks or gradients - ALWAYS use inline styles
**Files:** Production AudioPlayer.tsx pitch slider (line ~400), Beta sliders (line ~501, ~538)
**Same root cause as:** Gradient text invisibility (Session 2) - Tailwind v4 custom utilities unreliable

### RAF Performance (Canvas Redraws)
**What went wrong:** Beta waveform was laggy during playback
**Why:** `useEffect([currentTime])` triggered full canvas redraw 60 times per second
**Solution used:** Draw canvas ONCE on load, use CSS div with `transform` for playhead animation
**AVOID:** Drawing/updating canvas in useEffect that runs every frame
**Pattern:** Static canvas + CSS/HTML overlay for animated elements (GPU accelerated)
**Files:** components/AudioPlayerBeta.tsx (line ~97-135)

### Spacebar Stale Closures
**What went wrong:** Spacebar toggle didn't work (happened in both production and beta)
**Why:** Function used in useEffect deps before being defined (TypeScript hoisting issue); or function captured in closure with stale state
**Solution used:** handlePlayPauseRef pattern - ref updated every render, useEffect with empty deps calls ref
**AVOID:** Putting functions in useEffect dependency array - use ref pattern instead
**Pattern:**
```javascript
const fnRef = useRef(null)
useEffect(() => { fnRef.current = actualFunction })
useEffect(() => { /* call fnRef.current() */ }, []) // empty deps
```
**Files:** Production AudioPlayer.tsx (line ~108-145), Beta AudioPlayerBeta.tsx (line ~262-291)

### Dual-Mode Architecture Failure (NEVER REPEAT)
**What went wrong:** Original dual-mode (Tone.js + native Web Audio) caused 8+ hours of cascading bugs over 2 days
**Why:** Two audio systems (Tone.context + audioContextRef) shared refs, had different lifecycles, 20 interdependent state variables, complex mode switching
**What we learned:** Tone.js CAN do both modes by itself! (`player.playbackRate` for speed, `PitchShift` for pitch)
**Solution:** Beta uses ONLY Tone.js for both pitch and speed controls
**AVOID:** Mixing audio technologies (Tone.js + native Web Audio, or any dual system)
**AVOID:** "Preserve duration" toggle - confusing UX, use independent pitch/speed sliders instead
**Pattern:** One player, one context, direct parameter control
**Files:** components/AudioPlayerBeta.tsx (single Tone.js player for everything)
**Why this matters:** vocalremover.org works because they picked ONE approach - we over-engineered
**UPDATE (2025-12-05):** This same principle applies to SoundTouch - single audio engine, no mixing

### Processing UI Disappearing After Completion
**What went wrong:** After processing, entire UI section (ads + download button) disappeared
**Why:** Sections wrapped in `{isProcessing && (...)}` - when `setIsProcessing(false)` called, entire section hidden
**Solution used:** Change to `{(isProcessing || processedBlob) && (...)}`  - stays visible after completion
**AVOID:** Wrapping persistent UI in temporary state conditionals - use OR conditions for "during AND after" states
**Pattern:** `{(duringState || afterState) && (<content/>)}` for UI that should persist
**Files:** AudioPlayerBeta.tsx (line 687, 737) - happened twice in same component!
**Impact:** User clicks Process → sees progress → sees SUCCESS → everything vanishes → no download button
**Learning:** When merging UI from different sources, check ALL conditional rendering logic

### Export Function Parameter Order (2025-11-26)
**What went wrong:** Adding `speed` parameter to `exportWithTone()` broke `AudioPlayerLegacy.tsx`
**Why:** Legacy file passed callback as 3rd arg, but new signature has `speed` as 3rd arg
**Solution used:** Added explicit `1.0` speed parameter to legacy file's call
**AVOID:** Adding required parameters to shared utility functions without checking ALL call sites
**Pattern:** When adding params to shared functions: (1) use default values, (2) grep for all usages, (3) update legacy/archived files too
**Files:** `utils/audio/toneExport.ts`, `components/AudioPlayerLegacy.tsx`
**TypeScript caught it:** Error TS2345 - callback not assignable to number. Always run `tsc --noEmit` before pushing!

### 🔴 DEPRECATED: Export PitchShift Config Must Match Preview (Tone.js only)
**NOTE:** This issue is now obsolete (SoundTouch doesn't use PitchShift), but kept for historical context
**What went wrong:** Exported WAV had delay/doubled sound - sounded like two layers offset on top of each other
**Why:** Export `PitchShift` config was DIFFERENT from preview config:
- **Export (BROKEN):** `windowSize: 0.2, delayTime: 0, feedback: 0, wet: 1`
- **Preview (CORRECT):** `windowSize: 0.1` (no other params)
**Root cause:** The explicit `delayTime: 0, feedback: 0` params in Tone.js PitchShift cause artifacts. PitchShift uses a granular delay-based algorithm internally - setting these to 0 breaks it.
**Solution used:** Match export config EXACTLY to preview config - only set `pitch` and `windowSize: 0.1`
**Files:** `utils/audio/toneExport.ts` (line 39-43), `components/AudioPlayerBeta.tsx` (line 261-264)

---

## EDGE CASES & GOTCHAS

### Vercel Rate Limiting
- **Discovery:** Deployed 50+ times in one day → hit rate limit (~100 deploys/day on free tier)
- **Symptom:** GitHub shows red X "Deployment rate limited — retry in 9 minutes", but NO deployment entry in Vercel logs
- **Why confusing:** Failed rate-limited builds don't create Vercel entries (nothing to check in dashboard)
- **Fix:** Wait for limit to clear (can take hours or until next day), then redeploy
- **Check GitHub first:** Red X message shows actual error - don't waste time looking in Vercel
- **Prevention:** Use staging branch for testing, only deploy to main when ready

### Safari Aggressive Caching (Development Only)
- **Discovery:** Hard refresh (Cmd+Shift+R) insufficient, Cmd+Q (quit Safari) required to see new code
- **Happens:** During rapid development (10+ deploys in one session)
- **Doesn't happen:** For end users visiting stable production
- **Mitigation:** Added Cache-Control: no-store headers (helps but not 100%)
- **Dev workaround:** Quit Safari between major changes, or test in private mode
- **Why:** Safari caches JavaScript chunks very aggressively during active sessions

### Speed Slider UX Expectations
- **Discovery:** 1.0x wasn't centered on 0.5-2.0 range (mathematical center is 1.25x)
- **User expectation:** 1.0x = "normal" = should be visually centered
- **Math reality:** (0.5+2.0)/2 = 1.25x is actual center
- **Solution:** Changed to 0.5-1.5 range so 1.0x IS centered
- **Lesson:** User perception > mathematical accuracy for UX

### Safari Private Mode Processing
- **Discovery:** Safari private mode doesn't just fail - it FREEZES browser during offline rendering
- **Why:** OfflineAudioContext hits storage quota limits, browser locks up
- **Chrome private:** Works fine (no strict quotas)
- **Can't detect:** Browser hides private mode status (heuristic: check storage quota < 120MB)
- **Fix:** Show warning during processing, block processing in detected private mode
- **User workaround:** Use regular Safari or disable "Reduce Cross-Site Tracking"

### SoundTouch Seeking Implementation (2025-12-05)
- **Discovery:** SoundTouch PitchShifter doesn't support native seeking (no seek() method)
- **Why:** PitchShifter is designed for streaming playback from start to finish
- **Solution:** Recreate PitchShifter with buffer slice from seek position
- **Implementation:**
  1. Stop current player
  2. Create new AudioBuffer starting at seek sample position
  3. Recreate PitchShifter with sliced buffer
  4. Track seek offset for accurate time reporting
  5. Resume if was playing
- **Trade-off:** Small CPU spike when seeking (recreating player), but works reliably
- **Files:** `utils/audio/soundTouchPlayer.ts` seek() method
- **User experience:** Instant visual feedback, minimal audio gap

### SoundTouch Export Browser Compatibility (2025-12-05)
- **Discovery:** OfflineAudioContext + ScriptProcessorNode has known bugs in Safari/Firefox (per research)
- **Reality:** Tested on Safari - WORKS PERFECTLY despite warnings
- **Why it works:** Modern Safari (14+) has improved OfflineAudioContext support
- **Current approach:** Attempt export on all browsers, fail gracefully with helpful message if needed
- **Fallback plan:** If Safari export issues arise, implement pure chunk-based processing (no OfflineAudioContext)
- **Files:** `utils/audio/soundTouchExport.ts`
- **Testing result:** Safari export confirmed working cleanly

---

## Known Issues

**Development/Deployment:**
- Safari aggressive caching during rapid development only: may need Cmd+Q to fetch fresh HTML; end users not impacted. Headers set to `no-store, no-cache, must-revalidate` + `Pragma` + `Expires: 0`.
- Safari private browsing: processing disabled (button disabled + warning); use regular mode. Chrome private still works.
- Tailwind v4 custom gradients: using inline gradients as a reliable workaround.
- Vercel rate-limit reminder: if GitHub checks show "rate limited", wait and redeploy later; failed builds may not appear in Vercel logs.

### Fixed Issues (Session 7 - SoundTouch Migration)
- ✅ **Phantom frequencies eliminated:** 99+ artifacts from Tone.js compensation now resolved
- ✅ **Speed slider independence:** No longer affects pitch (SoundTouch has true independent controls)
- ✅ **Frequency splitting resolved:** Pure 440Hz tone remains 440Hz at any speed
- ✅ **Subharmonics eliminated:** No more low-frequency artifacts
- ✅ **Overtone series eliminated:** No more high-frequency phantom harmonics
- ✅ **Safari export working:** OfflineAudioContext approach successful on Safari despite research warnings

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

3. **Lazy Audio Engine Initialization**
   - Why: Safari blocks audio context creation without user gesture
   - Solution: Create player/effects on first Play click
   - Result: No 60% hang, works on all browsers
   - File: components/AudioPlayerSoundTouch.tsx:212-223

4. **Defensive Ref Cleanup**
   - Why: Prevent stale audio refs after errors
   - Solution: Null all refs in cleanup, dispose properly
   - Result: Clean re-init if audio errors occur
   - File: components/AudioPlayerSoundTouch.tsx:95-103

5. **Symmetrical Visual Design**
   - Why: Professional, balanced layout
   - Spacing: Title (mt-2) → PitchChanger.io (mt-4) → Line (mt-4) → Tagline
   - Glowing gradient line divider (192px, blue glow)
   - File: app/page.tsx:28,35,47

6. **Independent Pitch/Speed Sliders** (2025-11-25)
   - Decision: Remove "preserve duration" toggle, add two independent sliders instead
   - Why: Simpler UX (users directly control pitch AND speed), matches competitor tools (vocalremover.org)
   - User benefit: No confusing mode toggle, clear intent, more flexible
   - Range: Pitch ±12 semitones, Speed 0.5x-1.5x (1.0x centered for UX)
   - File: components/AudioPlayerSoundTouch.tsx

7. **Waveform as Interactive Scrubber** (2025-11-25)
   - Decision: Make waveform canvas clickable for seeking (no separate slider)
   - Why: Professional UX (like DAWs), space-efficient, visually intuitive
   - Implementation: Static canvas for waveform (drawn once), CSS overlay div for playhead (GPU animated)
   - Performance: Canvas drawn once on load, CSS transform moves playhead at 60fps with zero lag
   - File: components/AudioPlayerSoundTouch.tsx (line ~107-165)

8. **Beta → Production Swap Before AdSense Approval** (2025-11-25)
   - Decision: Replace production with beta BEFORE Google reviews site (day 2 of review)
   - Why: Google likely hasn't crawled yet - they'll review the better version from the start
   - Alternative considered: Wait for approval then swap - but risks triggering re-review
   - Timing: Applied Nov 24, swapped Nov 25 (likely before Google's first crawl)
   - Risk mitigation: Archived old production as AudioPlayerLegacy.tsx (can rollback in 2 min)
   - Result: Google will approve waveform+speed version, not pitch-only version
   - File: app/page.tsx now imports AudioPlayerSoundTouch

9. **🔴 CRITICAL: SoundTouch Over Tone.js for Pitch/Tempo Control** (2025-12-05)
   - Decision: Replace Tone.js with SoundTouch WSOLA time-stretching library
   - Why: Tone.js `playbackRate` + `PitchShift` compensation approach created 99+ phantom frequencies
   - Root problem: playbackRate changes BOTH speed and pitch (vinyl record behavior), then PitchShift tries to "undo" it
   - Analysis: Pure 440Hz tone at 1.05x speed produced artifacts at 448.24, 449.71, 358.89, 266.6, 540.53, 631.35 Hz, etc.
   - Alternative considered: Keep Tone.js, add filters to remove artifacts - rejected (can't filter unknown phantom frequencies)
   - SoundTouch benefits:
     - WSOLA algorithm (Waveform Similarity Overlap-Add) for true time-stretching
     - Independent `tempo` and `pitch` controls (no compensation math needed)
     - ~14KB bundle size (vs Tone.js ~200KB)
     - Works on all browsers (Chrome, Safari, Firefox, Edge)
   - Implementation:
     - Preview: PitchShifter in live AudioContext (real-time playback)
     - Export: OfflineAudioContext rendering (works on Safari despite research warnings)
     - Seeking: Recreate PitchShifter with buffer slice (no native seek support)
   - Result: Clean audio, only intended frequencies, no artifacts
   - Trade-offs:
     - Seeking has small CPU spike (recreates player)
     - No native seek support (workaround implemented)
     - +14KB bundle initially (can remove Tone.js later for net -186KB)
   - Files created:
     - `utils/audio/soundTouchExport.ts` - Export with OfflineAudioContext
     - `utils/audio/soundTouchPlayer.ts` - Real-time playback wrapper with seek()
     - `components/AudioPlayerSoundTouch.tsx` - Main player (no compensation logic)
     - `types/soundtouchjs.d.ts` - TypeScript definitions
   - Files replaced:
     - `app/page.tsx` line 8: AudioPlayerBeta → AudioPlayerSoundTouch
   - Validation: Pure 440Hz tone at 1.05x speed shows ONLY 440Hz (frequency analyzer confirmed)
   - Research source: ChatGPT deep-dive on SoundTouch vs Tone.js vs Rubber Band
   - Testing tools created: tone-generator.html, frequency-analyzer-v2.html

10. **Test Route Strategy for Major Changes** (2025-12-05)
   - Decision: Build at `/soundtouch` test route first, validate, then replace production
   - Why: Allows A/B testing, side-by-side comparison, safe validation before affecting users
   - Alternative considered: Replace directly - rejected (too risky for core audio engine change)
   - Process: Test route → Validate with frequency analyzer → Confirm Safari export → Replace production
   - Benefit: Could compare Tone.js artifacts vs SoundTouch clean output objectively
   - Result: Caught no issues, validated quality, smooth production deployment
   - Lesson: For major architecture changes, always test on separate route first
   - File: `app/soundtouch/page.tsx` (can be removed after validation period)

---

## TODO

### Critical (Must Do Next Session)
- [x] ✅ **FIXED EXPORT BUG:** WAV export now includes speed changes (2025-11-26)
- [x] ✅ **ELIMINATED ARTIFACTS:** Replaced Tone.js with SoundTouch (2025-12-05)
- [ ] Monitor AdSense approval (submitted Nov 24, status: Getting ready)
- [ ] Set up CMP (Consent Management Platform) when AdSense approves

### Next
- [ ] Remove Tone.js dependency after 1-2 week validation period (~200KB bundle savings)
- [ ] Remove /soundtouch test route (merge into main or delete)
- [ ] Archive AudioPlayerBeta.tsx as AudioPlayerToneLegacy.tsx (for historical reference)
- [ ] Update all GA4 events to confirm `audio_engine: 'soundtouch'` tracking
- [ ] Monitor Google Search Console (pages should index in 1-3 days)
- [ ] Check GA4 data (should start flowing now)
- [ ] Enable Vercel Analytics (1-click in dashboard)
- [ ] Create social media content (TikTok/IG/YouTube Shorts) for backlinks
- [ ] Run Lighthouse audit (SEO/performance check)
- [ ] Test on iPad and Android tablets

### Completed Session 7 (2025-12-05)
- ✅ **MAJOR MIGRATION: Tone.js → SoundTouch** (eliminated 99+ phantom frequencies)
- ✅ Built frequency analysis tools (tone-generator.html, frequency-analyzer-v2.html)
- ✅ Diagnosed root cause of artifacts (playbackRate + PitchShift compensation)
- ✅ Researched SoundTouch library (ChatGPT deep-dive on WSOLA algorithm)
- ✅ Implemented complete SoundTouch audio engine at /soundtouch test route
- ✅ Created offline export processor (OfflineAudioContext approach)
- ✅ Created real-time playback wrapper with seeking support
- ✅ Validated on Safari (export works perfectly)
- ✅ Replaced production site with SoundTouch
- ✅ Removed all pitch compensation logic (5 locations)
- ✅ Confirmed clean audio output (frequency analyzer validation)

### Completed Session 5 (2025-11-26)
- ✅ 8-page SEO content strategy (ChatGPT-designed)
- ✅ Complete SEO pack (canonical, OG, Twitter, Schema markup)
- ✅ Search Console setup and sitemap submission
- ✅ Logo added to header
- ✅ Metadata optimization (titles, descriptions, site name)

### Completed Session 4 (2025-11-25)
- ✅ Apply for Google AdSense (submitted, "Getting ready")
- ✅ Install GA4 tracking (G-RB68Q82Z1B with custom events)
- ✅ Add legal pages (/privacy, /contact, /terms, /about)
- ✅ Build Beta version with waveform+pitch+speed controls
- ✅ Fix OG/Twitter cards (landscape 1200x600 image)
- ✅ Merge production UI/copy into Beta
- ✅ **SWAP BETA → PRODUCTION** (a60937f) - pitch+speed+waveform now live!
- ✅ Archive old production (AudioPlayerLegacy.tsx)
- ✅ Test new production on all browsers/devices

### Future Enhancements (Data-Driven)
- [ ] Add MP3 export (if users request it; would add 260KB + slower encoding)
- [ ] Add Web Workers (if >10% of users hit Safari private mode issues)
- [x] ~~Export speed changes~~ ✅ DONE (2025-11-26)
- [x] ~~Eliminate pitch/speed artifacts~~ ✅ DONE (2025-12-05)
- [ ] Key detection display (show "Key: F minor" etc.)
- [ ] BPM display
- [ ] Pure chunk-based export fallback (if Safari OfflineAudioContext issues arise in wild)

---

## Troubleshooting

### Safari No Audio (Stale Cache During Development)

Symptoms:
- Plays but silent in regular Safari
- Works in Private mode, other machines, or after Safari restart

Workaround (development only):
1. Safari → Quit (Cmd+Q)
2. Reopen, reload

Notes:
- Hard refresh often insufficient; headers set to `no-store, no-cache, must-revalidate` + `Pragma` + `Expires: 0`.
- End users on production should not hit this; observed during rapid dev.

### Safari Private Browsing (Processing Disabled)
- Processing button disabled; warning shown to use regular window.
- Rationale: private mode storage/memory limits can crash export.

### Vercel Rate Limits
- If GitHub checks show "rate limited", Vercel may not build or show logs; wait for the limit to clear, then redeploy without cache from the latest commit.
- Note: Free tier has ~100 deployments/day; rapid testing can hit this limit

### Spacebar Toggle Not Working (Resolved)
- Cause: stale closure on handlePlayPause (using state instead of ref)
- Fix: handlePlayPauseRef with isReadyRef; broadened spacebar detection (Space/Spacebar/keyCode 32)

### Memory/Processing Guards
- Mobile soft cap: 120MB (blocks larger files on mobile to avoid crashes)
- Device memory guard: warns on <4GB devices for large files

### Common Errors
- "Please upload MP3, WAV, FLAC, M4A, or AAC file" → Unsupported format (components/FileUpload.tsx)
- "Large file on low-memory device" → >100MB on <4GB device; try smaller file or desktop (components/FileUpload.tsx)
- "Export failed on this browser. Chrome or Edge recommended..." → Safari/Firefox OfflineAudioContext error (rare; try Chrome)

---

## Recently Completed

### Session 7 (2025-12-05) - MAJOR UPGRADE: Tone.js → SoundTouch Engine
- 🔴 **CRITICAL MIGRATION:** Replaced Tone.js with SoundTouch to eliminate artifacts
- ✅ **Investigated windowSize quality** - tested 0.25, 0.15, 0.1, 0.05 (Tone.js)
- ✅ **Discovered fundamental flaw:** Tone.js pitch compensation created 99+ phantom frequencies
  - Example: Pure 440Hz tone at 1.05x speed → 99 artifacts detected
  - Frequencies: 448.24, 449.71, 451.17, 358.89, 266.6, 540.53, 631.35 Hz, etc.
  - Root cause: Misusing PitchShift to "undo" playbackRate pitch change
- ✅ **Built diagnostic tools:**
  - `public/tone-generator.html` - Generate pure sine wave test tones
  - `public/frequency-analyzer-v2.html` - FFT analysis with 32768-point resolution
- ✅ **Research phase:** ChatGPT deep-dive on SoundTouch vs Tone.js vs Rubber Band
  - WSOLA algorithm explanation
  - Browser compatibility assessment
  - API documentation review
- ✅ **Implemented SoundTouch engine:**
  - `types/soundtouchjs.d.ts` - TypeScript definitions for soundtouchjs
  - `utils/audio/soundTouchExport.ts` - OfflineAudioContext export (works on Safari!)
  - `utils/audio/soundTouchPlayer.ts` - Real-time playback with seeking support
  - `components/AudioPlayerSoundTouch.tsx` - Complete player (NO compensation logic)
  - `app/soundtouch/page.tsx` - Test route for validation
- ✅ **Removed pitch compensation** - Deleted all 5 locations of `12 * Math.log2(speedValue)` formula
- ✅ **Simplified playback logic:**
  - Before: Tone.start() → Player → playbackRate → PitchShift (compensation) → Destination
  - After: AudioContext.resume() → PitchShifter (tempo + pitch) → Destination
- ✅ **Validated quality:**
  - Tested with frequency analyzer
  - Pure 440Hz tone at 1.05x speed → ONLY 440Hz detected (not 99+ frequencies!)
  - Safari export confirmed working
  - Real music tests: no phantom harmonics at problematic speeds (0.7x, 1.05x)
- ✅ **Replaced production:** Main site now uses SoundTouch (app/page.tsx line 8)
- ✅ **Added soundtouchjs dependency** (~14KB; Tone.js kept for now)
- 📚 **Learned:** playbackRate + PitchShift compensation is fundamentally flawed for independent speed control
- 📚 **Learned:** Granular synthesis (Tone.js PitchShift) creates artifacts when doing negative pitch shifts (required for speed > 1.0x)
- 📚 **Learned:** WSOLA time-stretching is the proper algorithm for independent tempo/pitch
- 📚 **Learned:** SoundTouch seeking requires recreating player with buffer slice (no native seek)
- 📚 **Learned:** OfflineAudioContext + ScriptProcessor works on modern Safari despite research warnings
- 🎯 **Commits:**
  - 2225385 (windowSize 0.25 quality test)
  - 1d52008 (pitch compensation formula added)
  - Multiple windowSize experiments (0.25→0.15→0.1→0.05)
  - 46b2dd0 (SoundTouch implementation at /soundtouch)
  - f9e59c6 (seeking support)
  - 7f01caa (Safari export enabled)
  - 71ede25 (PRODUCTION REPLACED with SoundTouch)

### Session 6 (2025-11-26/27) - Export Speed Bug Fix + Delay Bug Fix
- ✅ **FIXED CRITICAL BUG:** WAV export now includes speed changes (was pitch-only)
- ✅ Added `speed` parameter to `exportWithTone()` with default `1.0`
- ✅ Adjusted OfflineContext duration: `(duration / speed) + (0.2 / speed) + 0.1`
- ✅ Set `player.playbackRate = speed` in offline rendering
- ✅ Updated AudioPlayerLegacy.tsx for backward compatibility
- ✅ **FIXED EXPORT DELAY BUG:** Export had delay/doubled sound effect
  - Root cause: Export PitchShift config differed from preview (`windowSize: 0.2, delayTime: 0, feedback: 0, wet: 1`)
  - Fix: Match export config exactly to preview (`windowSize: 0.1`, no other params)
- ✅ Reduced file upload box height by ~50%
- ✅ Attempted pulsating glow animation (reverted - Tailwind v4 strips @keyframes)
- ✅ Removed ad placeholder rectangles from processing flow (cleaner UI)
- 📚 **Learned:** Always run `tsc --noEmit` before pushing - it caught the legacy file break
- 📚 **Learned:** When adding params to shared functions, grep for ALL usages (including archived files)
- 📚 **Learned:** 🔴 **CRITICAL:** Export PitchShift config MUST match preview EXACTLY - different params cause delay/artifacts
- 📚 **Learned:** Tailwind v4 strips @keyframes from globals.css - use inline styles or <style> tags for animations
- 🎯 **Commits:** f05c8f6 (speed export), d71f9f6 (delay fix), faea097 (remove ad placeholders)

### Session 5 (2025-11-26) - Complete SEO Strategy & Search Console
- ✅ **8-Page Content Strategy** - Built modern SEO strategy (ChatGPT-designed)
  - 4 tool landing pages: /audio-speed-changer, /mp3-pitch-changer, /slow-down-audio, /speed-up-audio
  - 4 resource/guide pages: /how-to-change-the-key-of-a-song, /how-to-slow-down-audio, /how-to-speed-up-audio, /change-pitch-vs-change-speed
  - /resources hub page (links to all 8)
- ✅ **Complete SEO Pack Implementation:**
  - Canonical tags (all 14 pages)
  - OpenGraph tags (8 content pages) - fixes Facebook/LinkedIn sharing
  - Twitter cards (8 content pages) - fixes X/Twitter sharing
  - FAQ Schema (homepage) - enables Google FAQ rich results
  - HowTo Schema (3 tutorial pages) - enables step-by-step rich results
  - Organization Schema (homepage) - tells Google about the organization
  - Improved Schema.org site name ("Pitch Changer" vs "pitchchanger.io")
- ✅ **SEO Files:** sitemap.xml, robots.txt, llms.txt (all deployed)
- ✅ **Metadata Optimization:**
  - Updated title: "Pitch Changer - Change the Pitch of Any Song (Free Tool)"
  - Updated description: mentions both pitch AND speed
  - Unique titles/descriptions for each of 8 content pages
- ✅ **Search Console Setup:**
  - Verified property
  - Submitted updated sitemap (14 pages discovered)
  - Requested indexing for 5 priority pages
  - Google will crawl in 1-3 days
- ✅ **Branding:** Added logo to header (next to PitchChanger.io text)
- 📚 **Learned:** Social media helps SEO indirectly (traffic, backlinks, brand awareness)
- 📚 **Learned:** For tools, short sessions (2-3 min) are GOOD for SEO (task completion matters, not time)
- 📚 **Learned:** Google Search Console needs full URL for sitemap (/sitemap.xml or https://...)
- 📚 **Learned:** vocalremover.org uses Web Workers for client-side processing (not server uploads)
- 🔴 **Discovered:** Export doesn't include speed changes (CRITICAL BUG for next session)

### Session 4 (2025-11-25) - Beta Development & Analytics
- ✅ **Built Beta version** at /beta with clean architecture (app/beta/page.tsx, components/AudioPlayerBeta.tsx)
- ✅ **Independent pitch+speed controls** - removed confusing "preserve duration" toggle
- ✅ **Waveform visualization** with clickable scrubber (canvas + CSS overlay playhead)
- ✅ **Performance optimized** - CSS overlay for 60fps smooth playhead (no canvas redraws)
- ✅ **Fixed slider visibility** - inline gradients (Tailwind pseudo-elements unreliable in production)
- ✅ **Speed slider UX** - Changed range 0.5-1.5x so 1.0x is centered (was 0.5-2.0x with 1.25x center)
- ✅ **Spacebar support** in Beta (handlePlayPauseRef pattern)
- ✅ **GA4 tracking installed** (G-RB68Q82Z1B) with custom events (file_uploaded, processing_started, download_completed, pitch_adjusted, speed_adjusted)
- ✅ **Privacy Policy updated** for GA4 analytics with opt-out link
- ✅ **Twitter/X card fixed** - added landscape 1200x600 image (was square 1024x1024)
- ✅ **AdSense application submitted** - ads.txt Authorized, awaiting approval
- 📚 **Learned:** Tone.js can do both pitch AND speed (player.playbackRate) - dual-mode was unnecessary
- 📚 **Learned:** Independent sliders > mode toggle for UX clarity
- 📚 **Learned:** Always check GitHub status checks first when deployments fail

### Session 4 Continued (2025-11-25 PM) - Beta → Production Swap
- ✅ **Merged production UI into Beta** - combined tested UX with superior audio engine
- ✅ **Copied production's complete processing flow** - ads, warnings, success messaging, scroll prompts
- ✅ **Fixed processing UI bugs** - missing setIsProcessing(false), sections disappearing after completion
- ✅ **Fixed SUCCESS screen persistence** - changed conditionals to show during AND after processing
- ✅ **Removed auto-scroll** - force manual scroll for better ad visibility
- ✅ **Added Upload Different File** at bottom (always visible)
- ✅ **SWAPPED BETA → PRODUCTION** - pitchchanger.io now uses AudioPlayerBeta
- ✅ **Archived old production** as AudioPlayerLegacy.tsx (rollback available)
- ✅ **Removed "Try Beta" button** - beta IS production now
- ✅ **Tested on all browsers/devices** - Chrome, Safari, iPhone all working
- 📚 **Learned:** vocalremover.org uses Web Workers (not server-side) for Safari private mode support
- 📚 **Learned:** MP3 encoding would be slower than WAV (compression vs raw data)
- 🎯 **Decision:** Keep WAV-only, add MP3 later if users request it
- 🎯 **Decision:** Skip Web Workers for now - only 2% of users in Safari private mode

### Session (2025-11-23/24) - Production Stabilized + Legal/Ads
- ✅ Tone.js-only path; dual-mode removed (components/AudioPlayer.tsx)
- ✅ RAF timing with Tone.now(), playStartTimeRef/playStartOffsetRef (seek + slider sync)
- ✅ Seek state refs (isSeekingRef/pendingSeekRef)
- ✅ Safari unlock hardened (close stale contexts, rebuild Tone context, silent buffer)
- ✅ Spacebar toggle fixed (handlePlayPauseRef, broader key detection)
- ✅ Mobile UI: tighter spacing, smaller upload box, larger play button, focus outline removed on sliders; overflow hidden to stop horizontal bleed
- ✅ Mobile processing guard: 120MB limit + friendly errors; processing disabled in Safari private mode with warning
- ✅ Cache headers: `no-store, no-cache, must-revalidate`, `Pragma: no-cache`, `Expires: 0`
- ✅ CTA text: "Process Audio (WAV)"; helper text white; ads copy updated
- ✅ Staging-tone-only merged into main; production live and stable
- ✅ Added legal pages: /privacy, /contact, /terms, /about; footer links added
- ✅ AdSense assets added (head script + ads.txt)
- ✅ Homepage SEO copy redesign and spacing fixes
- ✅ SEO metadata optimized: better title/description with target keywords ("free online pitch changer", "change pitch without changing speed")
- ✅ OG/Twitter cards: Added social media preview metadata for sharing
- ✅ Logo image: Added public/pitchchanger.png for social sharing (1024x1024, 1.1MB)
- ✅ Fixed case sensitivity: Aligned filename and metadata to lowercase (pitchchanger.png)
- ⚠️ Rate-limit incident: commits c48ecea/f7672f7/42b9897 were rate-limited and didn't deploy; later commit cb5c096 succeeded once limit cleared

### Earlier Sessions (2025-11-22)
- Safari unlock pattern, memory leak fixes, AudioContext cleanup, AbortController for decode, error banners, inline gradients, branding/spacing improvements, additional format support (FLAC/M4A/AAC), Webpack build fix via env var.

---

## Performance Notes

- **Client-side only:** Zero server costs
- **SoundTouch:** ~14KB (lightweight WSOLA implementation)
- **Tone.js:** ~200KB (deprecated; will be removed after validation)
- **Tailwind CSS:** ~10KB gzipped
- **Single ArrayBuffer:** Memory efficient
- **Lazy audio init:** Fast initial load
- **Inline gradients:** Reliable rendering
- **5 audio formats:** Broad compatibility
- **Mobile soft cap:** 120MB to prevent crashes on devices

---

## Next Steps

1. **Monitor SoundTouch in production** (1-2 weeks validation period)
2. **Remove Tone.js dependency** (~200KB bundle savings)
3. **Monitor AdSense approval** (application submitted 2025-11-24, status: "Getting ready")
4. **Set up CMP** (Consent Management Platform) when AdSense approves
5. **Enable Vercel Analytics** (1-click in dashboard)
6. **Run Lighthouse audit** (performance/SEO/accessibility)
7. **Test on tablets** (iPad, Android)
8. **Monitor GA4 data** (should be flowing now)
9. **Remove /soundtouch test route** (merge or delete after validation)

---

**Last Updated:** 2025-12-05 (Session 7: 🔴 MAJOR UPGRADE - Replaced Tone.js with SoundTouch; eliminated 99+ phantom frequencies; TRUE time-stretching via WSOLA; Safari export working; commit 71ede25)
