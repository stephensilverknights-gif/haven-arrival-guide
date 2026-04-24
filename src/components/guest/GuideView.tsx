import type { UnitWithSteps } from '@/lib/types'
import { Hero } from './Hero'
import { WelcomeCard } from './WelcomeCard'
import { InfoPills } from './InfoPills'
import { StepList } from './StepList'
import { CrossLinkCard } from './CrossLinkCard'
import { BackBar } from './BackBar'
import { Footer } from './Footer'

interface GuideViewProps {
  unit: UnitWithSteps
  onBack: () => void
  onOpenVideo: () => void
}

export function GuideView({ unit, onBack, onOpenVideo }: GuideViewProps) {
  return (
    <>
      <BackBar onBack={onBack} />
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
      {unit.youtube_id && (
        <CrossLinkCard variant="to-video" onClick={onOpenVideo} />
      )}
      <Footer />
    </>
  )
}
