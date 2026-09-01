import type { ReactNode } from 'react'
import '../styles/AppShell.css'

type Level = 1 | 2 | 3 | 4

interface AppShellProps {
  children: ReactNode
  level?: Level
}

export function AppShell({ children, level }: AppShellProps) {
  const className = level ? `app-shell app-shell--level-${level}` : 'app-shell'
  return <div className={className}>{children}</div>
}