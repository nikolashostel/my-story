import { StoryHeader } from '../components/StoryHeader'
import type { PeriodData } from '../types'
import '../styles/pages/CreationStart.css'

interface CreationStartProps {
  periods: PeriodData[]
  onStart: (periodId: string) => void
  onBack: () => void
}

export function CreationStart({ periods, onStart, onBack }: CreationStartProps) {
  return (
    <main className="page page--creation-start">
      <StoryHeader title="Моя история" backAction={onBack} />

      <section className="creation-start">
        <p className="creation-start__eyebrow">Начнём с начала</p>
        <h1 className="creation-start__title">С чего ты хочешь начать свою историю?</h1>
        <p className="creation-start__lead">
          Всё состоит из маленьких воспоминаний. Выбери, с какого места их собрать. Ты не обязан заполнять всё — история
          соберётся сама, по мере того как ты вспоминаешь.
        </p>

        <div className="creation-start__periods">
          {periods.map((period, index) => {
            const isStart = period.id === 'detstvo'
            return (
              <button
                key={period.id}
                type="button"
                className={`creation-start__period ${isStart ? 'creation-start__period--primary' : ''}`}
                onClick={() => onStart(period.id)}
              >
                <span className="creation-start__period-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="creation-start__period-text">
                  <span className="creation-start__period-title">{period.title}</span>
                  {period.hint && <span className="creation-start__period-hint">{period.hint}</span>}
                </span>
                {isStart && <span className="creation-start__period-badge">С чего начать</span>}
                <span className="creation-start__period-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            )
          })}
        </div>

        <p className="creation-start__note">
          Ты можешь вернуться в любой момент и продолжить — время никуда не спешит.
        </p>
      </section>
    </main>
  )
}
