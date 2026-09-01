import { useEffect, useState } from 'react'
import type { MemoryCardData } from '../types'
import { PhotoPicker } from './PhotoPicker'
import './MemorySheet.css'

const TITLE_MAX = 30
const YEAR_MAX = 4
const MEMORY_MAX = 150

interface MemorySheetProps {
  card: MemoryCardData
  open: boolean
  onClose: () => void
  onChange: (patch: Partial<MemoryCardData>) => void
  onDeletePhoto: () => void
  onDeleteCard: () => void
  onSelectPhoto: (file: File) => void
}

export function MemorySheet({ card, open, onClose, onChange, onDeletePhoto, onDeleteCard, onSelectPhoto }: MemorySheetProps) {
  const [title, setTitle] = useState(card.title)
  const [year, setYear] = useState(card.year ? String(card.year) : '')
  const [memory, setMemory] = useState(card.memory ?? '')
  const [confirmPhoto, setConfirmPhoto] = useState(false)

  useEffect(() => {
    setTitle(card.title)
    setYear(card.year ? String(card.year) : '')
    setMemory(card.memory ?? '')
    setConfirmPhoto(false)
  }, [card, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleTitle = (value: string) => {
    const v = value.slice(0, TITLE_MAX)
    setTitle(v)
    onChange({ title: v })
  }

  const handleYear = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, YEAR_MAX)
    setYear(digits)
    onChange({ year: digits ? Number(digits) : undefined })
  }

  const handleMemory = (value: string) => {
    const v = value.slice(0, MEMORY_MAX)
    setMemory(v)
    onChange({ memory: v || undefined })
  }

  const handleDeletePhoto = () => {
    if (confirmPhoto) {
      onDeletePhoto()
      setConfirmPhoto(false)
    } else {
      setConfirmPhoto(true)
    }
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <section
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`Редактирование карточки «${card.title || 'Новая карточка'}»`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet__handle" aria-hidden="true" />

        <div className="sheet__header">
          <h2 className="sheet__title">Редактировать карточку</h2>
          <button type="button" className="sheet__close" onClick={onClose} aria-label="Закрыть">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="sheet__body">
          <div className="sheet-field">
            <label className="sheet-field__label" htmlFor="sheet-title">
              Название
            </label>
            <input
              id="sheet-title"
              className="sheet-field__input"
              type="text"
              value={title}
              maxLength={TITLE_MAX}
              onChange={(e) => handleTitle(e.target.value)}
              placeholder="О чём это воспоминание?"
            />
            <span className="sheet-field__count">
              {title.length}/{TITLE_MAX}
            </span>
          </div>

          <div className="sheet-field">
            <label className="sheet-field__label" htmlFor="sheet-year">
              Год
            </label>
            <input
              id="sheet-year"
              className="sheet-field__input sheet-field__input--year"
              type="text"
              inputMode="numeric"
              value={year}
              maxLength={YEAR_MAX}
              onChange={(e) => handleYear(e.target.value)}
              placeholder="Например, 1990"
            />
          </div>

          <div className="sheet-field">
            <label className="sheet-field__label" htmlFor="sheet-memory">
              Воспоминание
            </label>
            <textarea
              id="sheet-memory"
              className="sheet-field__textarea"
              rows={3}
              value={memory}
              maxLength={MEMORY_MAX}
              onChange={(e) => handleMemory(e.target.value)}
              placeholder="Хочешь добавить пару слов?"
            />
            <span className="sheet-field__count">
              {memory.length}/{MEMORY_MAX}
            </span>
          </div>

          <div className="sheet__actions">
            {card.photo && (
              <PhotoPicker onSelect={onSelectPhoto}>
                {(open) => (
                  <button type="button" className="sheet-btn sheet-btn--secondary" onClick={open}>
                    Заменить фотографию
                  </button>
                )}
              </PhotoPicker>
            )}
            {card.photo && (
              <button type="button" className="sheet-btn sheet-btn--danger" onClick={handleDeletePhoto}>
                {confirmPhoto ? 'Точно удалить фотографию?' : 'Удалить фотографию'}
              </button>
            )}
            <button type="button" className="sheet-btn sheet-btn--danger-ghost" onClick={onDeleteCard}>
              Удалить карточку
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
