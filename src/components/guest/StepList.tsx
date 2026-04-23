import { motion } from 'framer-motion'
import type { ArrivalStep } from '@/lib/types'
import { Step } from './Step'

interface StepListProps {
  steps: ArrivalStep[]
}

export function StepList({ steps }: StepListProps) {
  if (!steps.length) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.85 }}
      className="px-4 pt-8"
    >
      <div className="mb-[18px] flex items-center gap-2.5">
        <div
          className="flex flex-shrink-0 items-center justify-center rounded-full"
          style={{
            width: 28,
            height: 28,
            background: 'var(--color-accent)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          →
        </div>
        <div
          className="font-serif"
          style={{
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: '0.01em',
            color: 'var(--color-charcoal)',
          }}
        >
          Getting There
        </div>
      </div>

      <div className="flex flex-col">
        {steps.map((s, i) => (
          <Step key={s.id} step={s} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>
    </motion.section>
  )
}
