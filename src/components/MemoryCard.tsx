import type { MemoryCardData } from '../types'
import './MemoryCard.css'

interface MemoryCardProps {
  card: MemoryCardData
  isEmpty?: boolean
  onOpen?: () => void
  onAddPhoto?: () => void
}

export function MemoryCard({ card, isEmpty, onOpen, onAddPhoto }: MemoryCardProps) {
  const empty = isEmpty ?? !card.photo

  const title = card.title || 'Новая карточка'

  const handleOpen = () => onOpen?.()

  const handleAddPhoto = () => {
    if (onAddPhoto) {
      onAddPhoto()
    } else {
      handleOpen()
    }
  }

  return (
    <article className={`memory-card ${empty ? 'memory-card--empty' : 'memory-card--filled'}`}>
      <div className="memory-card__media">
        {card.photo ? (
          <img
            className="memory-card__img"
            src={card.photo}
            alt={card.memory ? card.memory : title}
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="memory-card__add"
            aria-label={`Редактировать: ${title}`}
            onClick={handleAddPhoto}
          >
            <span className="memory-card__plus" aria-hidden="true">
              +
            </span>
          </button>
        )}
      </div>

      <button
        type="button"
        className="memory-card__body"
        aria-label={empty ? `Открыть карточку: ${title}` : `Редактировать: ${title}`}
        onClick={handleOpen}
      >
        <h3 className="memory-card__title">{title}</h3>
        {card.year && <span className="memory-card__year">{card.year}</span>}
        {card.memory && <p className="memory-card__memory">{card.memory}</p>}
      </button>
    </article>
  )
}
