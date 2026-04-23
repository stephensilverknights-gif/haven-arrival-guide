import { motion } from 'framer-motion'

interface WelcomeCardProps {
  message: string | null
}

export function WelcomeCard({ message }: WelcomeCardProps) {
  if (!message) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65 }}
      className="relative z-10 mx-4 -mt-5 rounded-2xl"
      style={{
        background: 'var(--color-warm-white)',
        padding: '22px 22px 20px',
        boxShadow: '0 4px 24px rgba(44,44,42,0.1)',
      }}
    >
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: 'var(--color-mid)',
        }}
        // Welcome copy supports inline <strong> — admin-authored content,
        // read-only via RLS; safe to render.
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </motion.section>
  )
}
