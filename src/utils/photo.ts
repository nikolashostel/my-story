const objectUrls = new Set<string>()

export function createObjectUrl(file: File): string {
  const url = URL.createObjectURL(file)
  objectUrls.add(url)
  return url
}

export function releaseObjectUrl(url: string | undefined): void {
  if (!url) return
  if (objectUrls.has(url)) {
    objectUrls.delete(url)
    URL.revokeObjectURL(url)
  }
}
