"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { WavyBackground } from "@/components/ui/wavy-background"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userRole, setUserRole] = useState("applicant")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema DOMI",
      })

      // Redirect based on role
      if (userRole === "applicant") {
        router.push("/dashboard")
      } else if (userRole === "reviewer") {
        router.push("/reviewer-dashboard")
      } else {
        router.push("/dashboard")
      }
    }, 1500)
  }

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
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/icons/logo/domilogo1.svg"
              alt="DOMI Logo"
              width={32}
              height={32}
              className="h-10 w-10"
            />
          </Link>
        </div>
        <Card className="w-full max-w-md border border-pink-100/30 shadow-xl bg-white/70 backdrop-blur-md z-10 dark:bg-gray-950/50 dark:border-pink-900/30 dark:backdrop-blur-md">
          <div className="absolute inset-0 rounded-md bg-gradient-to-b from-pink-50/50 to-white/50 dark:from-pink-950/30 dark:to-gray-950/30 opacity-80"></div>
          <CardHeader className="space-y-1 relative">
            <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
            <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 relative">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="ejemplo@correo.cl" required className="bg-white/70 backdrop-blur-sm border-pink-100/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required className="bg-white/70 backdrop-blur-sm border-pink-100/50" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tipo de usuario</Label>
                <RadioGroup defaultValue="applicant" className="flex flex-col space-y-1" onValueChange={setUserRole}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="applicant" id="applicant" />
                    <Label htmlFor="applicant" className="font-normal">
                      Solicitante
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reviewer" id="reviewer" />
                    <Label htmlFor="reviewer" className="font-normal">
                      Revisor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="official" id="official" />
                    <Label htmlFor="official" className="font-normal">
                      Funcionario DOM
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    aria-label="Recordarme"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Recordarme
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidó su contraseña?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col relative">
              <Button className="w-full bg-pink-500 hover:bg-pink-600 shadow-md hover:shadow-lg transition-all" type="submit" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                ¿No tiene una cuenta?{" "}
                <Link href="/register" className="text-pink-500 hover:text-pink-700 hover:underline">
                  Registrarse
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </WavyBackground>
  )
}

