"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DomiLogo from '/public/icons/logo/domilogo1.svg';

export default function LogoutPage() {
  const router = useRouter()
  const { toast } = useToast()

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-pink-50">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <DomiLogo className="h-12 w-12 text-pink-500 animate-pulse" />
        <h1 className="text-2xl font-bold text-black">Cerrando sesión...</h1>
        <p className="text-muted-foreground">Gracias por utilizar el sistema DOMI</p>
      </div>
    </div>
  )
}

