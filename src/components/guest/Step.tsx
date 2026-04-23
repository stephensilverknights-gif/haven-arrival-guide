import type { ArrivalStep } from '@/lib/types'
import { CodeBlock } from './CodeBlock'

interface StepProps {
  step: ArrivalStep
  index: number
  isLast: boolean
}

export function Step({ step, index, isLast }: StepProps) {
  return (
    <div
      className="relative flex gap-4"
      style={{
        padding: '16px 0',
        borderBottom: isLast ? 'none' : '1px solid var(--color-divider)',
      }}
    >
      {/* Dot + connector line */}
      <div
        className="flex flex-shrink-0 flex-col items-center"
        style={{ width: 32 }}
      >
        <div
          className="flex-shrink-0 rounded-full"
          style={{
            width: 10,
            height: 10,
            background: 'var(--color-sage)',
            marginTop: 4,
          }}
        />
        {!isLast && (
          <div
            className="w-px flex-1"
            style={{
              background: 'var(--color-divider)',
              marginTop: 6,
              minHeight: 20,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-1">
        <div
          className="uppercase"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: 'var(--color-sage)',
            marginBottom: 4,
          }}
        >
          {`Step ${index + 1}`}
        </div>
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            color: 'var(--color-mid)',
          }}
          // Step body supports inline <strong>. Admin-authored, RLS-protected.
          dangerouslySetInnerHTML={{ __html: step.body }}
        />

        {step.photo_url && (
          <div
            className="mt-2.5 flex items-center justify-center overflow-hidden rounded-[10px]"
            style={{
              background: 'var(--color-stone)',
              aspectRatio: '3 / 4',
              maxWidth: 320,
            }}
          >
            <img
              src={step.photo_url}
              alt=""
              className="block h-full w-full object-cover"
            />
          </div>
        )}

        {step.door_code && <CodeBlock code={step.door_code} />}
      </div>
    </div>
  )
}
