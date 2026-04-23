import { motion } from 'framer-motion'

interface VideoSectionProps {
  youtubeId: string | null
  isShort?: boolean
}

export function VideoSection({ youtubeId, isShort = false }: VideoSectionProps) {
  if (!youtubeId) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95 }}
      className="mx-4 mt-8"
    >
      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          background: 'var(--color-warm-white)',
          borderColor: 'var(--color-divider)',
        }}
      >
        <div
          style={{
            padding: '18px 20px 14px',
            borderBottom: '1px solid var(--color-divider)',
          }}
        >
          <div
            className="uppercase"
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: 'var(--color-accent)',
              marginBottom: 4,
            }}
          >
            Visual Walkthrough
          </div>
          <div
            className="font-serif"
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: 'var(--color-charcoal)',
            }}
          >
            Watch Before You Arrive
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'var(--color-mid)',
              marginTop: 4,
              lineHeight: 1.5,
            }}
          >
            A quick video showing parking, the front door, and how to get in —
            start to finish.
          </div>
        </div>

        <div
          className="relative mx-auto h-0 w-full"
          style={{
            paddingBottom: isShort ? '177.78%' : '56.25%',
            maxWidth: isShort ? 360 : undefined,
            background: 'var(--color-charcoal)',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="Walkthrough video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </motion.section>
  )
}
