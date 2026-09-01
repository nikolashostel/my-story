import { MemoryCard } from '../components/MemoryCard'
import { AddMemoryCard } from '../components/AddMemoryCard'
import { StoryHeader } from '../components/StoryHeader'
import type { PeriodData } from '../types'
import '../styles/pages/PeriodScreen.css'

interface PeriodScreenProps {
  period: PeriodData
  onBack: () => void
  onAddCard: () => void
  onAddPhoto: () => void
}

export function PeriodScreen({ period, onBack, onAddCard, onAddPhoto }: PeriodScreenProps) {
  const filled = period.cards.filter((card) => card.photo)
  const empty = period.cards.filter((card) => !card.photo)

  const ordered = [...filled, ...empty]

  return (
    <main className="page page--period">
      <StoryHeader title={period.title} backAction={onBack} />

      <div className="period-grid">
        {ordered.map((card) => (
          <MemoryCard key={card.id} card={card} onAddPhoto={onAddPhoto} />
        ))}
        <AddMemoryCard onCreate={onAddCard} />
      </div>
    </main>
  )
}