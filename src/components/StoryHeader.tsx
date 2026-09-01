import './StoryHeader.css'

interface StoryHeaderProps {
  title: string
  backAction?: () => void
  action?: React.ReactNode
}

export function StoryHeader({ title, backAction, action }: StoryHeaderProps) {
  return (
    <header className="story-header">
      <div className="story-header__row">
        {backAction && (
          <button type="button" className="story-header__back" onClick={backAction} aria-label="Вернуться назад">
            <span aria-hidden="true">←</span>
          </button>
        )}
        <h1 className="story-header__title">{title}</h1>
        {action && <div className="story-header__action">{action}</div>}
      </div>
    </header>
  )
}
