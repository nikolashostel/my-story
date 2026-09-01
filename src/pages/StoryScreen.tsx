import { PeriodSection } from '../components/PeriodSection'
import { StoryHeader } from '../components/StoryHeader'
import type { PeriodData } from '../types'
import '../styles/pages/StoryScreen.css'

interface StoryScreenProps {
  periods: PeriodData[]
  onOpenPeriod: (periodId: string) => void
  onOpenCard: (periodId: string, cardId: string) => void
  onAddCard: (periodId: string) => void
  onAddPhoto: (periodId: string, cardId: string, file: File) => void
}

export function StoryScreen({ periods, onOpenPeriod, onOpenCard, onAddCard, onAddPhoto }: StoryScreenProps) {
  const visiblePeriods = periods.filter((p) => p.cards.length > 0)

  return (
    <main className="page page--story">
      <StoryHeader title="Моя история" />

      {visiblePeriods.length === 0 ? (
        <div className="story-empty">
          <p className="story-empty__text">Твоя история ещё пуста. Пора начать её собирать.</p>
        </div>
      ) : (
        <div className="story-periods">
          {visiblePeriods.map((period) => (
            <PeriodSection
              key={period.id}
              title={period.title}
              cards={period.cards}
              onAddPhoto={(cardId, file) => onAddPhoto(period.id, cardId, file)}
              onCardOpen={(card) => onOpenCard(period.id, card.id)}
              onAddCard={() => onAddCard(period.id)}
              onOpenPeriod={() => onOpenPeriod(period.id)}
            />
          ))}
        </div>
      )}
    </main>
  )
}
