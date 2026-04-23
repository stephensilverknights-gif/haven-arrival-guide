import { useState } from 'react'

interface CodeBlockProps {
  label?: string
  code: string
}

export function CodeBlock({ label = 'Door Code', code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    void navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className="mt-2.5 flex items-center justify-between rounded-[10px]"
      style={{
        background: 'var(--color-charcoal)',
        padding: '14px 18px',
      }}
    >
      <div>
        <div
          className="uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.14em',
            color: 'var(--color-stone)',
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          className="font-serif"
          style={{
            fontSize: 30,
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '0.08em',
          }}
        >
          {code}
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg transition-colors active:bg-white/15"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.7)',
          padding: '8px 14px',
          fontSize: 11,
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
