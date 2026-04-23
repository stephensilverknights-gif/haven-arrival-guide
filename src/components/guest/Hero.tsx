import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroProps {
  name: string
  address: string
  imageUrl: string | null
}

export function Hero({ name, address, imageUrl }: HeroProps) {
  return (
    <header
      className={cn(
        'relative overflow-hidden',
        !imageUrl && 'hero-gradient-fallback',
      )}
      style={{ height: '52vw', maxHeight: 420, minHeight: 240 }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${name} property`}
          className="absolute inset-0 h-full w-full object-cover opacity-85"
        />
      )}

      <div aria-hidden className="absolute inset-0 hero-overlay" />

      {/* Brand wordmark */}
      <div className="absolute top-[20px] left-1/2 -translate-x-1/2 text-center">
        <div
          className="font-serif uppercase"
          style={{
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          Haven by Design Stays
        </div>
      </div>

      {/* Title block */}
      <div className="absolute right-6 bottom-7 left-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="uppercase"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            marginBottom: 6,
          }}
        >
          Arrival Guide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-serif text-white"
          style={{
            fontSize: 'clamp(32px, 8vw, 52px)',
            fontWeight: 300,
            lineHeight: 1.05,
          }}
        >
          {name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 6,
            letterSpacing: '0.02em',
          }}
        >
          {address}
        </motion.div>
      </div>
    </header>
  )
}
