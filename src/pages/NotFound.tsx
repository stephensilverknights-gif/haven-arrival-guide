export default function NotFound() {
  return (
    <main
      className="flex min-h-svh flex-col items-center justify-center px-6 text-center"
      style={{ background: 'var(--color-cream)' }}
    >
      <div
        className="font-serif"
        style={{
          fontSize: 36,
          fontWeight: 300,
          color: 'var(--color-charcoal)',
          marginBottom: 8,
        }}
      >
        Not Found
      </div>
      <p
        style={{
          fontSize: 14,
          color: 'var(--color-mid)',
          lineHeight: 1.6,
          maxWidth: 360,
        }}
      >
        We can't find an arrival guide at this address. Double-check the link
        in your booking confirmation, or reach out to your host.
      </p>
      <div
        className="font-serif uppercase"
        style={{
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: 'var(--color-stone)',
          marginTop: 28,
        }}
      >
        Haven by Design Stays
      </div>
    </main>
  )
}
