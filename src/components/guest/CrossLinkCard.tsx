import { motion } from 'framer-motion'
import { ListChecks, PlayCircle } from 'lucide-react'

interface CrossLinkCardProps {
  variant: 'to-video' | 'to-guide'
  onClick: () => void
}

const COPY: Record<CrossLinkCardProps['variant'], {
  eyebrow: string
  title: string
  subtitle: string
  icon: React.ReactNode
}> = {
  'to-video': {
    eyebrow: 'Also available',
    title: 'Watch the video',
    subtitle: 'Familiarize yourself before you arrive.',
    icon: <PlayCircle size={22} strokeWidth={1.5} />,
  },
  'to-guide': {
    eyebrow: 'When you get here',
    title: 'Open the arrival guide',
    subtitle: 'Use these steps when you pull up.',
    icon: <ListChecks size={22} strokeWidth={1.5} />,
  },
}

export function CrossLinkCard({ variant, onClick }: CrossLinkCardProps) {
  const copy = COPY[variant]

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mx-4 mt-8"
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-3.5 rounded-2xl border text-left transition-colors"
        style={{
          background: 'var(--color-warm-white)',
          borderColor: 'var(--color-divider)',
          padding: '16px 18px',
        }}
      >
        <div
          className="flex flex-shrink-0 items-center justify-center rounded-full"
          style={{
            width: 42,
            height: 42,
            background: 'var(--color-cream)',
            color: 'var(--color-accent)',
          }}
        >
          {copy.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="uppercase"
            style={{
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: 'var(--color-accent)',
              marginBottom: 2,
            }}
          >
            {copy.eyebrow}
          </div>
          <div
            className="font-serif"
            style={{
              fontSize: 17,
              fontWeight: 400,
              color: 'var(--color-charcoal)',
              lineHeight: 1.2,
              marginBottom: 2,
            }}
          >
            {copy.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--color-mid)',
              lineHeight: 1.5,
            }}
          >
            {copy.subtitle}
          </div>
        </div>

        <div
          aria-hidden
          className="flex-shrink-0 font-serif"
          style={{
            fontSize: 20,
            color: 'var(--color-stone)',
          }}
        >
          →
        </div>
      </button>
    </motion.section>
  )
}
