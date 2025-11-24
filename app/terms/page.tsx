import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service - PitchChanger.io',
  description: 'Terms of Service for PitchChanger.io',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base text-gray-300 leading-relaxed">
        <div>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: 2025-11-23</p>
        </div>

        <p>
          PitchChanger.io is a free, ad-supported pitch changing tool. By using it, you agree to these terms.
        </p>

        <h2 className="text-xl font-semibold text-white">As-is service</h2>
        <p>
          The tool is provided “as-is” without warranties of any kind. We do not guarantee specific audio quality,
          availability, or results.
        </p>

        <h2 className="text-xl font-semibold text-white">Your responsibility</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You are responsible for complying with copyright and licensing for any audio you process.</li>
          <li>You agree not to use the tool for unlawful purposes.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white">Privacy and storage</h2>
        <p>
          Processing is client-side; we don’t upload or store your files. Ads are served via Google AdSense. See our
          Privacy Policy for details.
        </p>

        <h2 className="text-xl font-semibold text-white">Free and ad-supported</h2>
        <p>
          PitchChanger.io is free to use and supported by ads. We may change or discontinue features at any time.
        </p>

        <h2 className="text-xl font-semibold text-white">Changes to these terms</h2>
        <p>
          We may update these terms. Continued use after changes means you accept the new terms. Check this page
          periodically.
        </p>

        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p>
          Questions about these terms? Email{' '}
          <a href="mailto:contact@pitchchanger.io" className="text-accent hover:underline">
            contact@pitchchanger.io
          </a>
          .
        </p>

        <Link href="/" className="text-accent hover:underline text-sm">
          ← Back to PitchChanger.io
        </Link>
      </div>
    </div>
  )
}
