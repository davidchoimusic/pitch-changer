import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - PitchChanger.io',
  description: 'Privacy Policy for PitchChanger.io',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: 2025-11-23</p>
        </div>

        <div className="space-y-4 text-sm md:text-base text-gray-300 leading-relaxed">
          <p>
            PitchChanger.io is a free online pitch changer. We designed it to be private by default: processing is
            100% client-side in your browser, and your audio files never leave your device.
          </p>

          <h2 className="text-xl font-semibold text-white">What we collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No personal data collected.</li>
            <li>No logins, no accounts, no file uploads, no server-side storage.</li>
            <li>No analytics or tracking (yet).</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">How processing works</h2>
          <p>
            All pitch shifting happens in your browser using Web Audio API and Tone.js. Your audio stays on your device
            and is not uploaded to our servers.
          </p>

          <h2 className="text-xl font-semibold text-white">Advertising (Google AdSense)</h2>
          <p>
            We use Google AdSense to show ads. Google may use cookies or similar technologies to serve ads and measure
            performance. These cookies are controlled by Google as a third party.
          </p>
          <p>
            Learn more here:{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Google Privacy & Terms
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-white">What we don’t do</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No selling or sharing of personal data (we don’t collect it).</li>
            <li>No hidden uploads — files remain local to your browser.</li>
            <li>No background analytics scripts at this time.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">Your choices</h2>
          <p>
            If you prefer not to see personalized ads, you can manage ad preferences in your Google account or use your
            browser’s ad/privacy settings. You can also use private browsing, but note that processing may not work in
            private mode on some browsers.
          </p>

          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            Questions about privacy? Email us at{' '}
            <a href="mailto:contact@pitchchanger.io" className="text-accent hover:underline">
              contact@pitchchanger.io
            </a>
            .
          </p>
        </div>

        <Link href="/" className="text-accent hover:underline text-sm">
          ← Back to PitchChanger.io
        </Link>
      </div>
    </div>
  )
}
