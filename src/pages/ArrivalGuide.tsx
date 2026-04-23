import { useParams } from 'react-router-dom'
import { useUnit } from '@/hooks/useUnit'
import { Hero } from '@/components/guest/Hero'
import { WelcomeCard } from '@/components/guest/WelcomeCard'
import { InfoPills } from '@/components/guest/InfoPills'
import { StepList } from '@/components/guest/StepList'
import { VideoSection } from '@/components/guest/VideoSection'
import { Footer } from '@/components/guest/Footer'
import NotFound from './NotFound'

export default function ArrivalGuide() {
  const { slug } = useParams<{ slug: string }>()
  const { data: unit, isLoading, error } = useUnit(slug)

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

  return (
    <main
      className="mx-auto max-w-[560px] pb-0"
      style={{ background: 'var(--color-cream)' }}
    >
      <Hero
        name={unit.name}
        address={unit.address}
        imageUrl={unit.hero_image_url}
      />
      <WelcomeCard message={unit.welcome_message} />
      <InfoPills
        wifiName={unit.wifi_name}
        wifiPassword={unit.wifi_password}
        quietHours={unit.quiet_hours}
      />
      <StepList steps={unit.arrival_steps} />
      <VideoSection youtubeId={unit.youtube_id} isShort={unit.youtube_is_short} />
      <Footer />
    </main>
  )
}
