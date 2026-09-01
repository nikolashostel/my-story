import './MemoryCard.css'

interface AddMemoryCardProps {
  onCreate?: () => void
}

export function AddMemoryCard({ onCreate }: AddMemoryCardProps) {
  return (
    <article className="add-card">
      <button type="button" className="add-card__media" onClick={onCreate} aria-label="Добавить свою карточку">
        <span className="add-card__plus" aria-hidden="true">
          ＋
        </span>
      </button>
      <button type="button" className="add-card__body" onClick={onCreate}>
        <span className="add-card__label">Добавить своё</span>
      </button>
    </article>
  )
}