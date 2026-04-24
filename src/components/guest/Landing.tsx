import { motion } from 'framer-motion'
import { ListChecks, PlayCircle } from 'lucide-react'
import { Hero } from './Hero'
import { Footer } from './Footer'

interface LandingProps {
  name: string
  address: string
  imageUrl: string | null
  hasVideo: boolean
  onOpenGuide: () => void
  onOpenVideo: () => void
}

interface ChoiceProps {
  icon: React.ReactNode
  eyebrow: string
  title: string
  subtitle: string
  delay: number
  onClick: () => void
}

function Choice({ icon, eyebrow, title, subtitle, delay, onClick }: ChoiceProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.985 }}
      className="flex w-full items-center gap-4 rounded-2xl border text-left transition-colors"
      style={{
        background: 'var(--color-warm-white)',
        borderColor: 'var(--color-divider)',
        padding: '20px 22px',
        boxShadow: '0 2px 16px rgba(44,44,42,0.06)',
      }}
    >
      <div
        className="flex flex-shrink-0 items-center justify-center rounded-full"
        style={{
          width: 52,
          height: 52,
          background: 'var(--color-cream)',
          color: 'var(--color-accent)',
        }}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="uppercase"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.18em',
            color: 'var(--color-accent)',
            marginBottom: 3,
          }}
        >
          {eyebrow}
        </div>
        <div
          className="font-serif"
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: 'var(--color-charcoal)',
            lineHeight: 1.15,
            marginBottom: 3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-mid)',
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        aria-hidden
        className="flex-shrink-0 font-serif"
        style={{
          fontSize: 22,
          color: 'var(--color-stone)',
          marginLeft: 4,
        }}
      >
        →
      </div>
    </motion.button>
  )
}

export function Landing({
  name,
  address,
  imageUrl,
  hasVideo,
  onOpenGuide,
  onOpenVideo,
}: LandingProps) {
  return (
    <>
      <Hero name={name} address={address} imageUrl={imageUrl} />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="relative z-10 mx-4 -mt-5"
      >
        <div
          className="mb-4 text-center"
          style={{
            fontSize: 12,
            letterSpacing: '0.14em',
            color: 'var(--color-mid)',
            textTransform: 'uppercase',
          }}
        >
          Pick one to get started
        </div>

        <div className="flex flex-col gap-3">
          <Choice
            icon={<ListChecks size={24} strokeWidth={1.5} />}
            eyebrow="Step-by-step"
            title="Open the Arrival Guide"
            subtitle="Every step from the car to the couch."
            delay={0.7}
            onClick={onOpenGuide}
          />

          {hasVideo && (
            <Choice
              icon={<PlayCircle size={24} strokeWidth={1.5} />}
              eyebrow="Visual walkthrough"
              title="Watch the Video"
              subtitle="A quick tour of parking, entry, and the unit."
              delay={0.85}
              onClick={onOpenVideo}
            />
          )}
        </div>
      </motion.section>

      <Footer />
    </>
  )
}
