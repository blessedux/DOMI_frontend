"use client"

import { useState, useEffect } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  speedX: number
  speedY: number
  speedRotation: number
}

interface ConfettiCelebrationProps {
  duration?: number
  pieces?: number
  onComplete?: () => void
}

export function ConfettiCelebration({
  duration = 5000,
  pieces = 150,
  onComplete,
}: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [active, setActive] = useState(true)

  useEffect(() => {
    // Generate confetti pieces
    const colors = [
      "#ff718d", // Pink
      "#fdbb2d", // Yellow
      "#22c55e", // Green
      "#3b82f6", // Blue
      "#f97316", // Orange
      "#8b5cf6", // Purple
    ]

    const newConfetti: ConfettiPiece[] = []
    
    for (let i = 0; i < pieces; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100, // % of screen width
        y: -5 - Math.random() * 10, // Start above the screen
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speedX: -1 + Math.random() * 2,
        speedY: 1 + Math.random() * 3,
        speedRotation: -3 + Math.random() * 6,
      })
    }
    
    setConfetti(newConfetti)
    
    // Cleanup after duration
    const timer = setTimeout(() => {
      setActive(false)
      if (onComplete) {
        setTimeout(onComplete, 1000) // Allow time for fade out
      }
    }, duration)
    
    return () => clearTimeout(timer)
  }, [duration, pieces, onComplete])
  
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall ${2 + Math.random() * 3}s linear forwards`,
          }}
        />
      ))}
      
      <style jsx global>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  )
} 