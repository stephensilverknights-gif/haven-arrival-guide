import { motion } from 'framer-motion'
import { BackBar } from './BackBar'
import { CrossLinkCard } from './CrossLinkCard'
import { Footer } from './Footer'

interface VideoViewProps {
  name: string
  youtubeId: string
  isShort: boolean
  onBack: () => void
  onOpenGuide: () => void
}

export function VideoView({
  name,
  youtubeId,
  isShort,
  onBack,
  onOpenGuide,
}: VideoViewProps) {
  return (
    <>
      <BackBar onBack={onBack} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-4 pt-8 text-center"
      >
        <div
          className="uppercase"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            marginBottom: 6,
          }}
        >
          Visual walkthrough
        </div>
        <div
          className="font-serif"
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: 'var(--color-charcoal)',
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-mid)',
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          Parking, the front door, and how to get in — start to finish.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mx-4 mt-6"
      >
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            background: 'var(--color-charcoal)',
            borderColor: 'var(--color-divider)',
          }}
        >
          <div
            className="relative mx-auto h-0 w-full"
            style={{
              paddingBottom: isShort ? '177.78%' : '56.25%',
              maxWidth: isShort ? 360 : undefined,
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
      </motion.div>

      <CrossLinkCard variant="to-guide" onClick={onOpenGuide} />
      <Footer />
    </>
  )
}
