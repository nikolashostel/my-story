import { PeriodSection } from '../components/PeriodSection'
import { StoryHeader } from '../components/StoryHeader'
import type { PeriodData } from '../types'
import '../styles/pages/StoryScreen.css'

interface StoryScreenProps {
  periods: PeriodData[]
  onOpenPeriod: (periodId: string) => void
  onAddPhoto: () => void
}

export function StoryScreen({ periods, onOpenPeriod, onAddPhoto }: StoryScreenProps) {
  const visiblePeriods = periods.filter((p) => p.cards.length > 0)

  return (
    <main className="page page--story">
      <StoryHeader title="Моя история" />

      <div className="story-periods">
        {visiblePeriods.map((period) => (
          <PeriodSection
            key={period.id}
            title={period.title}
            cards={period.cards}
            onAddPhoto={onAddPhoto}
            onOpenPeriod={() => onOpenPeriod(period.id)}
          />
        ))}
      </div>
    </main>
  )
}