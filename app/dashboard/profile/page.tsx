"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { toast } = useToast()

  // Mock user data
  const user = {
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.cl",
    role: "Solicitante",
    rut: "12.345.678-9",
    phone: "+56 9 1234 5678",
    address: "Av. Providencia 1234, Providencia, Santiago",
    company: "Constructora Pérez Ltda.",
    registrationDate: "01/01/2025",
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil actualizado",
        description: "Su información ha sido actualizada correctamente",
      })
    }, 1500)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Contraseña actualizada",
        description: "Su contraseña ha sido actualizada correctamente",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Mi perfil</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Información de perfil</CardTitle>
            <CardDescription>Información básica de su cuenta</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-2">
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <Separator className="my-4" />
            <div className="w-full space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-sm font-medium">RUT:</span>
                <span className="text-sm">{user.rut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Teléfono:</span>
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Empresa:</span>
                <span className="text-sm">{user.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Fecha de registro:</span>
                <span className="text-sm">{user.registrationDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-2 bg-pink-50 border border-pink-100">
              <TabsTrigger value="personal" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Información personal</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Seguridad</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-4">
              <Card>
                <form onSubmit={handleUpdateProfile}>
                  <CardHeader>
                    <CardTitle>Información personal</CardTitle>
                    <CardDescription>Actualice su información personal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input id="firstName" defaultValue="Juan" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input id="lastName" defaultValue="Pérez" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" defaultValue={user.address} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" defaultValue={user.company} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto gap-1 bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                      <Save className="h-4 w-4" />
                      {isLoading ? "Guardando..." : "Guardar cambios"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-4">
              <Card>
                <form onSubmit={handleChangePassword}>
                  <CardHeader>
                    <CardTitle>Cambiar contraseña</CardTitle>
                    <CardDescription>Actualice su contraseña de acceso</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña actual</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                        />
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
                      <Label htmlFor="new-password">Nueva contraseña</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto gap-1 bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                      <Save className="h-4 w-4" />
                      {isLoading ? "Actualizando..." : "Actualizar contraseña"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Badge component for profile role
function Badge({
  variant = "default",
  children,
}: {
  variant?: "default" | "outline" | "secondary"
  children: React.ReactNode
}) {
  const variantClasses = {
    default: "bg-pink-500 text-white",
    outline: "border border-pink-200 text-pink-600",
    secondary: "bg-pink-100 text-pink-700",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}

