// Google Analytics 4 Type Definitions
interface Window {
  dataLayer: any[]
  gtag: (
    command: 'config' | 'event' | 'js',
    targetId: string | Date,
    config?: Record<string, any>
  ) => void
}
