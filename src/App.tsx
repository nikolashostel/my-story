import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { AppShell } from './components/AppShell'
import { Landing } from './pages/Landing'
import { CreationStart } from './pages/CreationStart'
import { StoryScreen } from './pages/StoryScreen'
import { PeriodScreen } from './pages/PeriodScreen'
import { MemorySheet } from './components/MemorySheet'
import { PhotoCropper } from './components/PhotoCropper'
import { createInitialStory } from './data/mockStory'
import { releaseObjectUrl } from './utils/photo'
import type { MemoryCardData, StoryStructure } from './types'

type Screen =
  | { name: 'landing' }
  | { name: 'creation-start' }
  | { name: 'story' }
  | { name: 'period'; periodId: string }

function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'landing' })
  const [story, setStory] = useState<StoryStructure>(() => createInitialStory())
  const [editing, setEditing] = useState<{ periodId: string; cardId: string } | null>(null)
  const [cropTarget, setCropTarget] = useState<{ periodId: string; cardId: string; file: File } | null>(null)

  const openCreation = () => setScreen({ name: 'creation-start' })
  const openStory = () => setScreen({ name: 'story' })
  const backToLanding = () => setScreen({ name: 'landing' })

  const openPeriod = useCallback((periodId: string) => setScreen({ name: 'period', periodId }), [])

  const updateCard = useCallback((periodId: string, cardId: string, patch: Partial<MemoryCardData>) => {
    setStory((prev) => ({
      periods: prev.periods.map((p) =>
        p.id === periodId
          ? { ...p, cards: p.cards.map((c) => (c.id === cardId ? { ...c, ...patch } : c)) }
          : p,
      ),
    }))
  }, [])

  const addCard = useCallback((periodId: string) => {
    const id = `card-${Date.now()}`
    setStory((prev) => ({
      periods: prev.periods.map((p) =>
        p.id === periodId ? { ...p, cards: [...p.cards, { id, title: '', photo: undefined }] } : p,
      ),
    }))
    setEditing({ periodId, cardId: id })
  }, [])

  const deleteCard = useCallback((periodId: string, cardId: string) => {
    setStory((prev) => {
      const card = prev.periods.find((p) => p.id === periodId)?.cards.find((c) => c.id === cardId)
      if (card?.photo) releaseObjectUrl(card.photo)
      return {
        periods: prev.periods.map((p) => (p.id === periodId ? { ...p, cards: p.cards.filter((c) => c.id !== cardId) } : p)),
      }
    })
    setEditing(null)
  }, [])

  const applyPhoto = useCallback((periodId: string, cardId: string, url: string) => {
    setStory((prev) => ({
      periods: prev.periods.map((p) =>
        p.id === periodId
          ? {
              ...p,
              cards: p.cards.map((c) => {
                if (c.id !== cardId) return c
                if (c.photo) releaseObjectUrl(c.photo)
                return { ...c, photo: url }
              }),
            }
          : p,
      ),
    }))
  }, [])

  const openCropper = useCallback((periodId: string, cardId: string, file: File) => {
    setCropTarget({ periodId, cardId, file })
  }, [])

  const deletePhoto = useCallback((periodId: string, cardId: string) => {
    setStory((prev) => {
      const card = prev.periods.find((p) => p.id === periodId)?.cards.find((c) => c.id === cardId)
      if (card?.photo) releaseObjectUrl(card.photo)
      return {
        periods: prev.periods.map((p) =>
          p.id === periodId
            ? { ...p, cards: p.cards.map((c) => (c.id === cardId ? { ...c, photo: undefined } : c)) }
            : p,
        ),
      }
    })
  }, [])

  const currentPeriod = screen.name === 'period' ? story.periods.find((p) => p.id === screen.periodId) : undefined
  const editingCard =
    editing && screen.name !== 'landing'
      ? story.periods.find((p) => p.id === editing.periodId)?.cards.find((c) => c.id === editing.cardId)
      : undefined

  let content: ReactNode

  if (screen.name === 'landing') {
    content = <Landing onCreate={openCreation} />
  } else if (screen.name === 'creation-start') {
    content = <CreationStart periods={story.periods} onStart={openPeriod} onBack={backToLanding} />
  } else if (screen.name === 'story') {
    content = (
      <StoryScreen
        periods={story.periods}
        onOpenPeriod={openPeriod}
        onOpenCard={(periodId, cardId) => setEditing({ periodId, cardId })}
        onAddCard={addCard}
        onAddPhoto={openCropper}
      />
    )
  } else if (currentPeriod) {
    content = (
      <PeriodScreen
        periods={story.periods}
        currentPeriod={currentPeriod}
        onBack={openStory}
        onOpenPeriod={openPeriod}
        onCardOpen={(cardId) => setEditing({ periodId: currentPeriod.id, cardId })}
        onAddCard={() => addCard(currentPeriod.id)}
        onAddPhoto={(cardId, file) => openCropper(currentPeriod.id, cardId, file)}
        onViewStory={openStory}
      />
    )
  } else {
    content = <StoryScreen periods={story.periods} onOpenPeriod={openPeriod} onOpenCard={(a, b) => setEditing({ periodId: a, cardId: b })} onAddCard={addCard} onAddPhoto={openCropper} />
  }

  return (
    <AppShell>
      {content}

      {editing && editingCard && (
        <MemorySheet
          key={editingCard.id}
          card={editingCard}
          open
          onClose={() => setEditing(null)}
          onChange={(patch) => updateCard(editing.periodId, editingCard.id, patch)}
          onDeletePhoto={() => deletePhoto(editing.periodId, editingCard.id)}
          onDeleteCard={() => deleteCard(editing.periodId, editingCard.id)}
          onSelectPhoto={(file) => openCropper(editing.periodId, editingCard.id, file)}
        />
      )}

      {cropTarget && (
        <PhotoCropper
          file={cropTarget.file}
          onSave={(url) => {
            applyPhoto(cropTarget.periodId, cropTarget.cardId, url)
            setCropTarget(null)
          }}
          onCancel={() => setCropTarget(null)}
        />
      )}
    </AppShell>
  )
}

export default App
