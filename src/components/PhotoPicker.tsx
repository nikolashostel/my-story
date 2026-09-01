import { useRef } from 'react'
import type { ReactNode } from 'react'

interface PhotoPickerProps {
  accept?: string
  onSelect: (file: File) => void
  children: (open: () => void) => ReactNode
}

export function PhotoPicker({ accept = 'image/*', onSelect, children }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const open = () => inputRef.current?.click()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onSelect(file)
    }
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="photo-picker__input"
        onChange={handleChange}
        tabIndex={-1}
        aria-hidden="true"
        hidden
      />
      {children(open)}
    </>
  )
}
