import { ArrowLeft } from 'lucide-react'

interface BackBarProps {
  onBack: () => void
  label?: string
}

export function BackBar({ onBack, label = 'Back to start' }: BackBarProps) {
  return (
    <div
      className="sticky top-0 z-20 flex items-center"
      style={{
        background: 'rgba(249,245,239,0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--color-divider)',
        padding: '10px 16px',
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 rounded-full transition-colors"
        style={{
          padding: '6px 12px 6px 8px',
          fontSize: 13,
          color: 'var(--color-charcoal)',
        }}
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        <span>{label}</span>
      </button>
    </div>
  )
}
