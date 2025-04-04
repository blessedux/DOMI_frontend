"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { WavyBackground } from "@/components/ui/wavy-background"

export default function LogoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const cardRef = useRef<HTMLDivElement>(null)

  // Magnetic card effect
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Track if mouse is over the card or nearby
    let isNearby = false
    const maxDistance = 300 // Distance in pixels where card starts to be affected
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      
      // Get the center of the card
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate distance from mouse to center
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      
      // Check if mouse is over or near the card
      isNearby = distance < maxDistance
      
      if (isNearby) {
        // Calculate movement (max 6px in any direction)
        // The closer to the card, the stronger the effect
        const strength = Math.max(0, 1 - distance / maxDistance)
        const moveX = (distanceX / maxDistance) * 6 * strength
        const moveY = (distanceY / maxDistance) * 6 * strength
        
        // Apply transform with smooth transition
        card.style.transform = `translate(${moveX}px, ${moveY}px)`
        card.style.transition = 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
      } else {
        // Return to center with a quick, elastic motion
        card.style.transform = 'translate(0px, 0px)'
        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Elastic return
      }
    }
    
    // Always return to center when mouse leaves document
    const handleMouseLeave = () => {
      card.style.transform = 'translate(0px, 0px)'
      card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Elastic return
    }
    
    // Handle mouse movement anywhere on the document
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    // Simulate logout process
    const logoutUser = async () => {
      // In a real app, you would call your logout API endpoint here
      // For example: await fetch('/api/auth/logout', { method: 'POST' })

      // Clear any stored tokens or session data
      localStorage.removeItem("domi-user")
      sessionStorage.removeItem("domi-session")

      // Show success message
      toast({
        title: "Sesión cerrada",
        description: "Ha cerrado sesión correctamente",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    }

    logoutUser()
  }, [router, toast])

  return (
    <WavyBackground 
      containerClassName="min-h-screen" 
      colors={["#ec4899", "#db2777", "#be185d", "#9d174d"]} 
      waveWidth={100}
      backgroundFill="#FDF2F8"
      blur={5}
      speed="slow"
      waveOpacity={0.7}
    >
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="absolute left-4 top-4 z-10 md:left-8 md:top-8">
          <div className="flex items-center gap-2">
            <Image 
              src="/icons/logo/domilogo1.svg"
              alt="DOMI Logo"
              width={32}
              height={32}
              className="h-10 w-10"
            />
          </div>
        </div>
        
        <div 
          ref={cardRef} 
          className="w-full max-w-md will-change-transform"
        >
          <Card className="w-full border border-pink-100/30 shadow-xl bg-white/70 backdrop-blur-md z-10 dark:bg-gray-950/50 dark:border-pink-900/30 dark:backdrop-blur-md">
            <div className="absolute inset-0 rounded-md bg-gradient-to-b from-pink-50/50 to-white/50 dark:from-pink-950/30 dark:to-gray-950/30 opacity-80"></div>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-10 relative">
              <div className="h-16 w-16 rounded-full bg-pink-100/80 flex items-center justify-center">
                <Image 
                  src="/icons/logo/domilogo1.svg"
                  alt="DOMI Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 animate-pulse"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Cerrando sesión...</h1>
              <p className="text-muted-foreground">Gracias por utilizar el sistema DOMI</p>
              <div className="mt-4 w-full max-w-sm mx-auto">
                <div className="h-1 w-full bg-gray-200 rounded overflow-hidden">
                  <div className="h-full bg-pink-500 animate-[logout_1.5s_ease-in-out_forwards]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes logout {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </WavyBackground>
  )
}

