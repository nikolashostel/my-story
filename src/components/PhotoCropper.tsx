import { useCallback, useEffect, useRef, useState } from 'react'
import { createObjectUrl, releaseObjectUrl } from '../utils/photo'
import './PhotoCropper.css'

interface PhotoCropperProps {
  file: File
  onSave: (url: string) => void
  onCancel: () => void
}

const MIN_FRAME_FRAC = 0.25
const ZOOM_STEP = 0.2

type Crop = { x: number; y: number; z: number }

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export function PhotoCropper({ file, onSave, onCancel }: PhotoCropperProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null)
  const [stage, setStage] = useState({ w: 0, h: 0 })
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, z: 1 })
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const url = createObjectUrl(file)
    setSrc(url)
    return () => releaseObjectUrl(url)
  }, [file])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      setStage({ w: rect.width, h: rect.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [src, imgSize])

  const img = imgSize && stage.w > 0

  const maxFrameW = img ? Math.min(imgSize.w, imgSize.h * (4 / 5)) : 0
  const minZ = img ? Math.max(MIN_FRAME_FRAC, 80 / maxFrameW) : 1

  const frameWidth = (z: number) => (img ? maxFrameW * z : 0)
  const frameHeight = (fw: number) => fw * (5 / 4)

  const clampXY = (c: Crop): Crop => {
    if (!img) return c
    const fw = frameWidth(c.z)
    const fh = frameHeight(fw)
    return {
      ...c,
      z: clamp(c.z, minZ, 1),
      x: clamp(c.x, 0, Math.max(0, imgSize.w - fw)),
      y: clamp(c.y, 0, Math.max(0, imgSize.h - fh)),
    }
  }

  const initCrop = () => {
    if (!img) return
    const fw = frameWidth(1)
    const fh = frameHeight(fw)
    setCrop({
      z: 1,
      x: (imgSize.w - fw) / 2,
      y: (imgSize.h - fh) / 2,
    })
  }

  const centered = useRef(false)
  useEffect(() => {
    if (!img || centered.current) return
    centered.current = true
    initCrop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img])

  const zoomIn = () => setCrop((c) => resizeFrame(c, 1 / (1 + ZOOM_STEP)))
  const zoomOut = () => setCrop((c) => resizeFrame(c, 1 + ZOOM_STEP))

  const resizeFrame = (c: Crop, factor: number): Crop => {
    if (!img) return c
    const oldFw = frameWidth(c.z)
    const oldFh = frameHeight(oldFw)
    const cx = c.x + oldFw / 2
    const cy = c.y + oldFh / 2
    const newZ = clamp(c.z * factor, minZ, 1)
    const fw = frameWidth(newZ)
    const fh = frameHeight(fw)
    return clampXY({ z: newZ, x: cx - fw / 2, y: cy - fh / 2 })
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY < 0) setCrop((c) => resizeFrame(c, 1 / (1 + ZOOM_STEP)))
      else setCrop((c) => resizeFrame(c, 1 + ZOOM_STEP))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [img]
  )

  useEffect(() => {
    const el = stageRef.current
    if (!el || !img) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel, img])

  const scale = img ? stage.w / imgSize.w : 1

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!img) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { px: e.clientX, py: e.clientY, x: crop.x, y: crop.y }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!img || !drag.current) return
    const dx = (e.clientX - drag.current.px) / scale
    const dy = (e.clientY - drag.current.py) / scale
    setCrop((c) => clampXY({ ...c, x: drag.current!.x + dx, y: drag.current!.y + dy }))
  }

  const endPointer = () => {
    drag.current = null
  }

  const fw = img ? frameWidth(crop.z) : 0
  const fh = frameHeight(fw)
  const frameSx = img ? crop.x * scale : 0
  const frameSy = img ? crop.y * scale : 0
  const frameSw = fw * scale
  const frameSh = fh * scale

  const handleSave = () => {
    const imgEl = imgRef.current
    if (!img || !imgEl || !imgEl.complete || busy) return
    setBusy(true)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const outW = Math.max(1, Math.round(fw * dpr))
    const outH = Math.max(1, Math.round(fh * dpr))
    const canvas = document.createElement('canvas')
    canvas.width = outW
    canvas.height = outH
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setBusy(false)
      return
    }
    ctx.drawImage(imgEl, crop.x, crop.y, fw, fh, 0, 0, outW, outH)
    onSave(canvas.toDataURL('image/jpeg', 0.92))
  }

  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [src, onCancel])

  return (
    <div className="cropper-backdrop">
      <section className="cropper" role="dialog" aria-modal="true" aria-label="Кадрировать фотографию">
        <div className="cropper__header">
          <h2 className="cropper__title">Выбрать область</h2>
          <button type="button" className="cropper__close" onClick={onCancel} aria-label="Отмена">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="cropper__hint">Перемещай рамку, чтобы выбрать, какая часть фотографии попадёт в карточку.</div>

        <div
          className="cropper__stage"
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
        >
          {src && (
            <img ref={imgRef} src={src} alt="" className="cropper__img" draggable={false} onLoad={(e) => setImgSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })} />
          )}
          {img && (
            <>
              <div className="cropper__mask" style={{ top: 0, left: 0, width: '100%', height: frameSy }} />
              <div className="cropper__mask" style={{ top: frameSy + frameSh, left: 0, width: '100%', height: Math.max(0, stage.h - frameSy - frameSh) }} />
              <div className="cropper__mask" style={{ top: frameSy, left: 0, width: frameSx, height: frameSh }} />
              <div className="cropper__mask" style={{ top: frameSy, left: frameSx + frameSw, width: Math.max(0, stage.w - frameSx - frameSw), height: frameSh }} />
              <div
                className="cropper__frame"
                style={{ left: frameSx, top: frameSy, width: frameSw, height: frameSh }}
              />
            </>
          )}
        </div>

        <div className="cropper__controls">
          <button type="button" className="cropper__zoom" onClick={zoomOut} aria-label="Увеличить область">
            −
          </button>
          <span className="cropper__zoom-label">{img ? Math.round((1 / crop.z) * 100) : 0}%</span>
          <button type="button" className="cropper__zoom" onClick={zoomIn} aria-label="Уменьшить область">
            +
          </button>
        </div>

        <div className="cropper__actions">
          <button type="button" className="cropper__btn cropper__btn--ghost" onClick={onCancel}>
            Отмена
          </button>
          <button type="button" className="cropper__btn cropper__btn--primary" onClick={handleSave} disabled={!img || busy}>
            Готово
          </button>
        </div>
      </section>
    </div>
  )
}
