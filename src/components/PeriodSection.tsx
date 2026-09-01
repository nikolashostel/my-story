import type { MemoryCardData } from '../types'
import { AddMemoryCard } from './AddMemoryCard'
import { MemoryCard } from './MemoryCard'

interface PeriodSectionProps {
  title: string
  cards: MemoryCardData[]
  onCardOpen?: (card: MemoryCardData) => void
  onAddCard?: () => void
  onAddPhoto?: (cardId: string, file: File) => void
  onOpenPeriod?: () => void
}

export function PeriodSection({
  title,
  cards,
  onCardOpen,
  onAddCard,
  onAddPhoto,
  onOpenPeriod,
}: PeriodSectionProps) {
  const hasCards = cards.length > 0

  return (
    <section className="period-section">
      <div className="period-section__head">
        {onOpenPeriod ? (
          <button type="button" className="period-section__title-link" onClick={onOpenPeriod}>
            <span className="period-section__title">{title}</span>
            <span className="period-section__arrow" aria-hidden="true">
              →
            </span>
          </button>
        ) : (
          <h2 className="period-section__title">{title}</h2>
        )}
      </div>

      {hasCards && (
        <div className="period-section__grid">
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              card={card}
              onOpen={() => onCardOpen?.(card)}
              onAddPhoto={onAddPhoto ? (file) => onAddPhoto(card.id, file) : undefined}
            />
          ))}
          {onAddCard && <AddMemoryCard onCreate={onAddCard} />}
        </div>
      )}
    </section>
  )
}