# PROJECT_CONTEXT.md

**TL;DR (2025-11-25):** Production stable (main: b759b13); Beta live at /beta with pitch+speed controls, waveform scrubber; AdSense submitted (Getting ready), GA4 tracking active; all browsers/devices working | 2025-11-25 11:30 AM

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** https://github.com/davidchoimusic/pitch-changer
- **Domain:** pitchchanger.io (production live)
- **Branding:** PitchChanger.io (capital P and C)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** b759b13 (Beta live at /beta, GA4 tracking, AdSense submitted, slider visibility fixes)
- **Open PRs/Issues:** None critical
- **Production:** https://pitchchanger.io (Tone-only, stable)
- **Beta:** https://pitchchanger.io/beta (experimental pitch+speed controls)
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
- **Deployment:** Vercel (free tier; production live)
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

### Working Features (Production Tone-only)
✅ File upload: MP3, WAV, FLAC, M4A, AAC (max 250MB)  
✅ File validation with memory guard (<4GB devices; mobile soft cap 120MB)  
✅ Real-time pitch shifting ±12 semitones (Tone.js only)  
✅ Single playback path (preserve duration always; native path removed)  
✅ Spacebar keyboard shortcut (stale closure fixed)  
✅ Slider advances during playback (RAF with Tone.now())  
✅ Seek jumps audio and slider together (playStartOffsetRef/playStartTimeRef)  
✅ Pitch changes in real time  
✅ WAV export using Tone.js (matches preview)  
✅ Client-side only (zero uploads, zero server costs)  
✅ Legal pages live: /privacy, /contact, /terms, /about
✅ AdSense assets in place (script + ads.txt); footer links added
✅ GA4 tracking: file uploads, processing, downloads, pitch adjustments
✅ OG/Twitter cards: landscape image for social sharing

### Beta Features (/beta - Experimental)
✅ Independent pitch slider (-12 to +12 semitones)
✅ Independent speed slider (0.5x to 1.5x, 1.0x centered)
✅ Waveform visualization (clickable scrubber)
✅ CSS overlay playhead (smooth 60fps, no lag)
✅ Single Tone.js architecture (no dual-mode complexity)
✅ Inline gradient sliders (visible all browsers)
✅ Spacebar support, seek, export
⚠️ Experimental - may have bugs, use at own risk

### Working Flows
1. **Upload → Preview → Adjust → Download:**
   - Upload audio (5 formats supported)
   - Decodes in browser (no server upload)
   - Play/pause with spacebar or button
   - Real-time pitch adjustment
   - Click "Process Audio (WAV)" → progress + "scroll to sponsors"
   - "SUCCESS! YOUR FILE IS READY!"
   - Scroll past ads → download with branded filename

---

## REGRESSION RISKS

**⚠️ CRITICAL: Read this before making changes to prevent repeating past mistakes**

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

### Tone.Player.immediate() vs Tone.now()
- **Discovery:** Using `player.immediate()` for timing caused slider position mismatches
- **Why:** `immediate()` behavior unclear, especially after seek/restart
- **Better approach:** Calculate time as `Tone.now() - playStartTime + playStartOffset`
- **Result:** Reliable, predictable timing for slider position
- **Files:** Both production and beta use Tone.now() approach now

---

## Known Issues

### Known Issues
- Safari aggressive caching during rapid development only: may need Cmd+Q to fetch fresh HTML; end users not impacted. Headers set to `no-store, no-cache, must-revalidate` + `Pragma` + `Expires: 0`.
- Safari private browsing: processing disabled (button disabled + warning); use regular mode. Chrome private still works.
- Tailwind v4 custom gradients: using inline gradients as a reliable workaround.
- Vercel rate-limit reminder: if GitHub checks show "rate limited", wait and redeploy later; failed builds may not appear in Vercel logs.

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
   - File: components/AudioPlayer.tsx:193, utils/audio/toneExport.ts:35 (export now uses 0.2 for higher quality)

6. **Symmetrical Visual Design**
   - Why: Professional, balanced layout
   - Spacing: Title (mt-2) → PitchChanger.io (mt-4) → Line (mt-4) → Tagline
   - Glowing gradient line divider (192px, blue glow)
   - File: app/page.tsx:28,35,47

7. **Beta: Single Tone.js for Dual Controls** (2025-11-25)
   - Decision: Use ONLY Tone.js for both pitch and speed (no native Web Audio)
   - Why: Previous dual-mode (Tone.js + native) caused 8+ hours of cascading bugs
   - Implementation: One Tone.Player connected to PitchShift effect; pitch via effect.pitch, speed via player.playbackRate
   - Result: Clean, simple, no race conditions, ~300 lines vs 450 in production
   - Lesson learned: Tone.js could do both all along - we over-engineered with dual systems
   - File: components/AudioPlayerBeta.tsx

8. **Independent Pitch/Speed Sliders** (2025-11-25)
   - Decision: Remove "preserve duration" toggle, add two independent sliders instead
   - Why: Simpler UX (users directly control pitch AND speed), matches competitor tools (vocalremover.org)
   - User benefit: No confusing mode toggle, clear intent, more flexible
   - Range: Pitch ±12 semitones, Speed 0.5x-1.5x (1.0x centered for UX)
   - File: components/AudioPlayerBeta.tsx

9. **Waveform as Interactive Scrubber** (2025-11-25)
   - Decision: Make waveform canvas clickable for seeking (no separate slider)
   - Why: Professional UX (like DAWs), space-efficient, visually intuitive
   - Implementation: Static canvas for waveform (drawn once), CSS overlay div for playhead (GPU animated)
   - Performance: Canvas drawn once on load, CSS transform moves playhead at 60fps with zero lag
   - File: components/AudioPlayerBeta.tsx (line ~97-182)

---

## TODO

### Critical
- [ ] Monitor AdSense approval (status: Getting ready; awaiting Google review 1-7 days)
- [ ] Set up CMP (Consent Management Platform) when AdSense approves
- [ ] Decide: Replace production with Beta OR keep both versions

### Next
- [ ] Test Beta with real users (gather feedback on pitch+speed controls)
- [ ] Enable Vercel Analytics (1-click in dashboard)
- [ ] Run Lighthouse audit (SEO/performance check)
- [ ] Test on iPad and Android tablets

### Completed This Session
- ✅ Apply for Google AdSense (submitted, "Getting ready")
- ✅ Install GA4 tracking (G-RB68Q82Z1B with custom events)
- ✅ Add legal pages (/privacy, /contact, /terms, /about)
- ✅ Build Beta version (/beta route live)
- ✅ Fix OG/Twitter cards (landscape 1200x600 image)

### Later
- [ ] Monitor first-week traffic via GA4
- [ ] Gather user feedback on Beta vs Production
- [ ] Consider migrating Beta improvements to Production if successful

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

### Beta Slider Invisible on Desktop (Resolved)
- **Issue:** Pitch/speed sliders invisible on Safari/Chrome desktop (visible on mobile)
- **Cause:** Tailwind arbitrary variants on pseudo-elements don't compile in production
- **Fix:** Use inline `style={{ background: '...' }}` gradients instead of Tailwind classes
- **File:** components/AudioPlayerBeta.tsx

### Beta Waveform Performance Lag (Resolved)
- **Issue:** Waveform playback was choppy/laggy
- **Cause:** useEffect([currentTime]) redrew entire canvas 60 times per second
- **Fix:** Draw canvas once on load, use CSS div overlay for playhead (GPU accelerated)
- **Result:** Smooth 60fps with zero canvas redraws
- **File:** components/AudioPlayerBeta.tsx

### Common Errors
- "Please upload MP3, WAV, FLAC, M4A, or AAC file" → Unsupported format (components/FileUpload.tsx)
- "Large file on low-memory device" → >100MB on <4GB device; try smaller file or desktop (components/FileUpload.tsx)

---

## Recently Completed

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

### Earlier Sessions (2025-11-22)
- Safari unlock pattern, memory leak fixes, AudioContext cleanup, AbortController for decode, error banners, inline gradients, branding/spacing improvements, additional format support (FLAC/M4A/AAC), Webpack build fix via env var.

---

## Performance Notes

- **Client-side only:** Zero server costs
- **Tone.js:** ~200KB (necessary for quality)
- **Tailwind CSS:** ~10KB gzipped
- **Single ArrayBuffer:** Memory efficient
- **Lazy Tone.js:** Fast initial load
- **Inline gradients:** Reliable rendering
- **5 audio formats:** Broad compatibility
- **Mobile soft cap:** 120MB to prevent crashes on devices

---

## Next Steps

1. **Monitor AdSense approval** (application submitted 2025-11-24, status: "Getting ready")
2. **Set up CMP** (Consent Management Platform) when AdSense approves
3. **Test Beta with users** - gather feedback on pitch+speed controls vs production
4. **Decide Beta strategy** - replace production OR keep both versions
5. **Enable Vercel Analytics** (1-click in dashboard)
6. **Run Lighthouse audit** (performance/SEO/accessibility)
7. **Test on tablets** (iPad, Android)
8. **Monitor GA4 data** (starts flowing in 24-48 hours)

---

**Last Updated:** 2025-11-25 11:30 AM (Beta live at /beta; GA4 tracking active; AdSense submitted; production + beta both stable)
