import Link from 'next/link'

export const metadata = {
  title: 'Contact - PitchChanger.io',
  description: 'Contact PitchChanger.io',
  alternates: {
    canonical: 'https://pitchchanger.io/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-300 text-sm md:text-base mt-2">
            Questions or feedback? Email us at{' '}
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
