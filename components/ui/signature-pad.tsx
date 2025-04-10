"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface SignaturePadProps {
  onSave: (signatureUrl: string) => void
  width?: number
  height?: number
}

export function SignaturePad({ onSave, width = 500, height = 200 }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to be crisp on high DPI screens
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
    
    // Set up the initial canvas state
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#000000"
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)
    
    // Draw the signature line
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(20, height - 40)
    ctx.lineTo(width - 20, height - 40)
    ctx.stroke()
    
    // Add a hint text
    ctx.font = "14px sans-serif"
    ctx.fillStyle = "#94a3b8"
    ctx.textAlign = "center"
    ctx.fillText("Firme aquí", width / 2, height - 20)
  }, [width, height])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    setIsDrawing(true)
    setHasSignature(true)
    
    const rect = canvas.getBoundingClientRect()
    const x = getEventX(e) - rect.left
    const y = getEventY(e) - rect.top
    
    ctx.beginPath()
    ctx.strokeStyle = "#000000"
    ctx.moveTo(x, y)
  }
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = getEventX(e) - rect.left
    const y = getEventY(e) - rect.top
    
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  
  const stopDrawing = () => {
    setIsDrawing(false)
  }
  
  const getEventX = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e) {
      return e.touches[0].clientX
    }
    return e.clientX
  }
  
  const getEventY = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e) {
      return e.touches[0].clientY
    }
    return e.clientY
  }
  
  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const signatureUrl = canvas.toDataURL("image/png")
    onSave(signatureUrl)
  }
  
  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)
    
    // Redraw the signature line
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(20, height - 40)
    ctx.lineTo(width - 20, height - 40)
    ctx.stroke()
    
    // Re-add the hint text
    ctx.font = "14px sans-serif"
    ctx.fillStyle = "#94a3b8"
    ctx.textAlign = "center"
    ctx.fillText("Firme aquí", width / 2, height - 20)
    
    setHasSignature(false)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="border rounded-md overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={handleClear}
          type="button"
        >
          Limpiar
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!hasSignature}
          type="button"
        >
          Confirmar firma
        </Button>
      </div>
    </div>
  )
} 