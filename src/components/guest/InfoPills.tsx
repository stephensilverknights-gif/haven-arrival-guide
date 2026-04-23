import { motion } from 'framer-motion'
import { useState } from 'react'

interface PillProps {
  label: string
  value: string
  valueSub?: string | null
  onTap?: () => void
  tappedLabel?: string
}

function Pill({ label, value, valueSub, onTap, tappedLabel }: PillProps) {
  const [tapped, setTapped] = useState(false)

  const handleClick = () => {
    if (!onTap) return
    onTap()
    setTapped(true)
    setTimeout(() => setTapped(false), 1400)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!onTap}
      className="flex-1 rounded-xl border text-center transition-colors disabled:cursor-default"
      style={{
        background: 'var(--color-warm-white)',
        borderColor: 'var(--color-divider)',
        padding: '14px 12px',
        cursor: onTap ? 'pointer' : 'default',
      }}
    >
      <div
        className="uppercase"
        style={{
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: 'var(--color-stone)',
          marginBottom: 4,
        }}
      >
        {tapped && tappedLabel ? tappedLabel : label}
      </div>
      <div
        className="font-serif"
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: 'var(--color-charcoal)',
          lineHeight: 1,
          wordBreak: 'break-word',
        }}
      >
        {value}
      </div>
      {valueSub && (
        <div
          style={{
            fontSize: 10,
            color: 'var(--color-mid)',
            marginTop: 2,
            wordBreak: 'break-word',
          }}
        >
          {valueSub}
        </div>
      )}
    </button>
  )
}

interface InfoPillsProps {
  wifiName: string | null
  wifiPassword: string | null
  quietHours: string | null
}

export function InfoPills({
  wifiName,
  wifiPassword,
  quietHours,
}: InfoPillsProps) {
  const hasWifi = Boolean(wifiName)
  const hasQuiet = Boolean(quietHours)
  if (!hasWifi && !hasQuiet) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      className="mx-4 mt-4 flex gap-2.5"
    >
      {hasWifi && (
        <Pill
          label="WiFi"
          value={wifiName as string}
          valueSub={wifiPassword ? `Pass: ${wifiPassword}` : null}
          onTap={
            wifiPassword
              ? () => {
                  void navigator.clipboard.writeText(wifiPassword)
                }
              : undefined
          }
          tappedLabel="Copied"
        />
      )}
      {hasQuiet && (
        <Pill label="Quiet Hours" value={quietHours as string} />
      )}
    </motion.div>
  )
}
