import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUnit } from '@/hooks/useUnit'
import { Landing } from '@/components/guest/Landing'
import { GuideView } from '@/components/guest/GuideView'
import { VideoView } from '@/components/guest/VideoView'
import NotFound from './NotFound'

type View = 'landing' | 'guide' | 'video'

export default function ArrivalGuide() {
  const { slug } = useParams<{ slug: string }>()
  const { data: unit, isLoading, error } = useUnit(slug)
  const [view, setView] = useState<View>('landing')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [view])

  if (isLoading) {
    return (
      <div
        className="flex min-h-svh items-center justify-center"
        style={{ background: 'var(--color-cream)' }}
      >
        <p style={{ color: 'var(--color-mid)', fontSize: 14 }}>Loading…</p>
      </div>
    )
  }

  if (error || !unit) {
    return <NotFound />
  }

  const goLanding = () => setView('landing')
  const goGuide = () => setView('guide')
  const goVideo = () => setView('video')

  return (
    <main
      className="mx-auto max-w-[560px] pb-0"
      style={{ background: 'var(--color-cream)' }}
    >
      {view === 'landing' && (
        <Landing
          name={unit.name}
          address={unit.address}
          imageUrl={unit.hero_image_url}
          hasVideo={Boolean(unit.youtube_id)}
          onOpenGuide={goGuide}
          onOpenVideo={goVideo}
        />
      )}

      {view === 'guide' && (
        <GuideView
          unit={unit}
          onBack={goLanding}
          onOpenVideo={goVideo}
        />
      )}

      {view === 'video' && unit.youtube_id && (
        <VideoView
          name={unit.name}
          youtubeId={unit.youtube_id}
          isShort={unit.youtube_is_short ?? false}
          onBack={goLanding}
          onOpenGuide={goGuide}
        />
      )}
    </main>
  )
}
