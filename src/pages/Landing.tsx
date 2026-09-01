import { StoryHeader } from '../components/StoryHeader'
import '../styles/pages/Landing.css'

interface LandingProps {
  onCreate: () => void
}

export function Landing({ onCreate }: LandingProps) {
  return (
    <main className="landing">
      <StoryHeader title="Моя история" />

      <section className="landing__hero">
        <h1 className="landing__title">А что, если посмотреть на свою жизнь целиком?</h1>
        <p className="landing__subtitle">Собери фотографии и воспоминания в красивую историю своей жизни.</p>
        <div className="landing__preview">
          <img className="landing__photo" src="/img/hero.svg" alt="Пример тёплой фотографии из семейного альбома" />
        </div>
        <button type="button" className="landing__cta" onClick={onCreate}>
          Создать свою историю
        </button>
      </section>
    </main>
  )
}