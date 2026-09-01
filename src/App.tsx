import { useState } from 'react'
import type { ReactNode } from 'react'
import { AppShell } from './components/AppShell'
import { Landing } from './pages/Landing'
import { StoryScreen } from './pages/StoryScreen'
import { PeriodScreen } from './pages/PeriodScreen'
import { mockStory } from './data/mockStory'

type Screen =
  | { name: 'landing' }
  | { name: 'story' }
  | { name: 'period'; periodId: string }

function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'landing' })

  const openStory = () => setScreen({ name: 'story' })

  const openPeriod = (periodId: string) => setScreen({ name: 'period', periodId })

  const backToStory = () => setScreen({ name: 'story' })

  let content: ReactNode

  if (screen.name === 'landing') {
    content = <Landing onCreate={openStory} />
  } else if (screen.name === 'story') {
    content = <StoryScreen periods={mockStory.periods} onOpenPeriod={openPeriod} onAddPhoto={() => {}} />
  } else {
    const currentPeriod = mockStory.periods.find((p) => p.id === screen.periodId)
    content = currentPeriod ? (
      <PeriodScreen period={currentPeriod} onBack={backToStory} onAddCard={() => {}} onAddPhoto={() => {}} />
    ) : (
      <StoryScreen periods={mockStory.periods} onOpenPeriod={openPeriod} onAddPhoto={() => {}} />
    )
  }

  return <AppShell>{content}</AppShell>
}

export default App