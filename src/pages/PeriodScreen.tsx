import { StoryHeader } from '../components/StoryHeader'
import { MemoryCard } from '../components/MemoryCard'
import { AddMemoryCard } from '../components/AddMemoryCard'
import type { PeriodData } from '../types'
import '../styles/pages/PeriodScreen.css'

interface PeriodScreenProps {
  periods: PeriodData[]
  currentPeriod: PeriodData
  onBack: () => void
  onOpenPeriod: (periodId: string) => void
  onCardOpen: (cardId: string) => void
  onAddCard: () => void
  onViewStory: () => void
}

export function PeriodScreen({
  periods,
  currentPeriod,
  onBack,
  onOpenPeriod,
  onCardOpen,
  onAddCard,
  onViewStory,
}: PeriodScreenProps) {
  const filled = currentPeriod.cards.filter((card) => card.photo)
  const empty = currentPeriod.cards.filter((card) => !card.photo)
  const ordered = [...filled, ...empty]

  return (
    <main className="page page--period">
      <StoryHeader title="Моя история" backAction={onBack} />

      <div className="period-screen">
        <div className="period-screen__head">
          <div>
            <h1 className="period-screen__title">{currentPeriod.title}</h1>
            {currentPeriod.hint && <p className="period-screen__hint">{currentPeriod.hint}</p>}
          </div>
          <button type="button" className="period-screen__story-link" onClick={onViewStory}>
            Моя история <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="period-switcher" role="list" aria-label="Переход к периоду">
          {periods.map((period) => (
            <button
              key={period.id}
              type="button"
              role="listitem"
              className={`period-switcher__chip ${
                period.id === currentPeriod.id ? 'period-switcher__chip--active' : ''
              }`}
              onClick={() => onOpenPeriod(period.id)}
            >
              {period.title}
            </button>
          ))}
        </div>

        <div className="period-grid">
          {ordered.map((card) => (
            <MemoryCard key={card.id} card={card} onOpen={() => onCardOpen(card.id)} />
          ))}
          <AddMemoryCard onCreate={onAddCard} />
        </div>
      </div>
    </main>
  )
}
