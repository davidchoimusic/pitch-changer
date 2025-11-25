# PROJECT_CONTEXT.md

**TL;DR (2025-11-24):** Production is stable on Tone-only (main current e274548). All core flows work on desktop/mobile; legal pages live; AdSense assets in place; OG/Twitter cards configured; Safari dev caching and Safari private-mode limits documented.

---

## Snapshot

- **Repo Path:** `/Users/davidchoi/Documents/0 projects/pitch-changer`
- **Repo URL:** https://github.com/davidchoimusic/pitch-changer
- **Domain:** pitchchanger.io (production live)
- **Branding:** PitchChanger.io (capital P and C)
- **Main Branch:** `main`
- **Current Branch:** `main`
- **Current Commit:** e274548 (Tone-only, SEO/legal pages, AdSense assets, OG/Twitter cards; logo case fix)
- **Open PRs/Issues:** None critical
- **Production:** https://pitchchanger.io (Tone-only, stable)
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
- **Google AdSense:** Pending approval ("Getting ready"); auto-ads/auto-optimize enabled; script in layout; ads.txt published (`google.com, pub-2950955479321117, DIRECT, f08c47fec0942fa0`)
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

---

## TODO

### Next
- [ ] Monitor AdSense approval (status: Getting ready; auto-ads/auto-optimize enabled)
- [ ] Enable Vercel analytics
- [ ] Add FAQ/SEO content and run Lighthouse audit
- [ ] Broaden device testing (iPad, Android tablets)

### Later
- [ ] Monitor first-week traffic and gather feedback

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

1. **Monitor AdSense approval** (application submitted, status: "Getting ready")
2. **Set up CMP** (Consent Management Platform for GDPR - pending from AdSense dashboard)
3. **Enable Vercel Analytics**
4. **Run Lighthouse audit** (SEO/performance optimization)
5. **Broaden device testing** (iPad, Android tablets)
6. **Monitor first-week traffic and gather feedback**
7. **Replace ad placeholders** with real AdSense units once approved

---

**Last Updated:** 2025-11-24 (Production stable; Tone-only; legal pages live; AdSense assets ready)
