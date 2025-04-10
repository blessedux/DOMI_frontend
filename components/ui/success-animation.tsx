"use client"

import { CheckIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SuccessAnimationProps {
  title?: string
  description?: string
  onComplete?: () => void
  className?: string
}

export function SuccessAnimation({
  title = "¡Enviado con éxito!",
  description = "Su solicitud ha sido enviada correctamente",
  onComplete,
  className,
}: SuccessAnimationProps) {
  const [animationStage, setAnimationStage] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 100) // Circle appears
    const timer2 = setTimeout(() => setAnimationStage(2), 600) // Check appears
    const timer3 = setTimeout(() => setAnimationStage(3), 1200) // Text appears
    const timer4 = setTimeout(() => {
      setAnimationStage(4)
      if (onComplete) onComplete()
    }, 3000) // Animation complete

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <div className="relative h-24 w-24 mb-6">
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-500 transform scale-0",
            animationStage >= 1 && "bg-green-100 scale-100"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 transform scale-0 opacity-0",
            animationStage >= 2 && "scale-100 opacity-100"
          )}
        >
          <CheckIcon className="h-12 w-12 text-green-600" />
        </div>
      </div>
      <div
        className={cn(
          "space-y-2 transition-opacity duration-500 opacity-0",
          animationStage >= 3 && "opacity-100"
        )}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
} 