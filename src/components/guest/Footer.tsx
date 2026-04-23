import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      className="text-center"
      style={{
        marginTop: 40,
        padding: '24px 16px 36px',
        borderTop: '1px solid var(--color-divider)',
      }}
    >
      <div
        className="font-serif uppercase"
        style={{
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: 'var(--color-stone)',
          marginBottom: 6,
        }}
      >
        Haven by Design Stays
      </div>
      <p
        style={{
          fontSize: 11,
          color: 'var(--color-stone)',
          lineHeight: 1.6,
        }}
      >
        This guide is for your stay only.
        <br />© {new Date().getFullYear()} RC Stays LLC · All rights reserved.
      </p>
    </motion.footer>
  )
}
