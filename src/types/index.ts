export interface MemoryCardData {
  id: string
  title: string
  year?: number
  memory?: string
  photo?: string
}

export interface PeriodData {
  id: string
  title: string
  cards: MemoryCardData[]
}

export interface StoryStructure {
  periods: PeriodData[]
}
