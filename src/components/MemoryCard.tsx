import type { MemoryCardData } from '../types'
import { PhotoPicker } from './PhotoPicker'
import './MemoryCard.css'

interface MemoryCardProps {
  card: MemoryCardData
  isEmpty?: boolean
  onOpen?: () => void
  onAddPhoto?: (file: File) => void
}

export function MemoryCard({ card, isEmpty, onOpen, onAddPhoto }: MemoryCardProps) {
  const empty = isEmpty ?? !card.photo

  const title = card.title || 'Новая карточка'

  const handleOpen = () => onOpen?.()

  const addArea = onAddPhoto ? (
    <PhotoPicker onSelect={onAddPhoto}>
      {(open) => (
        <button
          type="button"
          className="memory-card__add"
          aria-label={`Добавить фото: ${title}`}
          onClick={open}
        >
          <span className="memory-card__plus" aria-hidden="true">
            +
          </span>
        </button>
      )}
    </PhotoPicker>
  ) : (
    <button
      type="button"
      className="memory-card__add"
      aria-label={`Добавить фото: ${title}`}
      onClick={handleOpen}
    >
      <span className="memory-card__plus" aria-hidden="true">
        +
      </span>
    </button>
  )

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
          addArea
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
