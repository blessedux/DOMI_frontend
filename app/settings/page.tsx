"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, Lock, Mail, Save, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configuración guardada",
        description: "Sus preferencias han sido actualizadas correctamente",
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
        <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList className="grid w-full grid-cols-3 bg-pink-50 border border-pink-100">
          <TabsTrigger value="notifications" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Notificaciones</TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Apariencia</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Privacidad</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <form onSubmit={handleSaveSettings}>
              <CardHeader>
                <CardTitle>Preferencias de notificaciones</CardTitle>
                <CardDescription>Configure cómo y cuándo desea recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canales de notificación</h3>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-notifications" className="flex-1">
                        Correo electrónico
                      </Label>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-notifications" className="flex-1">
                        SMS
                      </Label>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-notifications" className="flex-1">
                        Notificaciones push
                      </Label>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tipos de notificaciones</h3>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="status-updates" className="flex-1">
                      Actualizaciones de estado de solicitudes
                    </Label>
                    <Switch id="status-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="observation-notifications" className="flex-1">
                      Nuevas observaciones
                    </Label>
                    <Switch id="observation-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="approval-notifications" className="flex-1">
                      Aprobaciones y rechazos
                    </Label>
                    <Switch id="approval-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="system-notifications" className="flex-1">
                      Anuncios del sistema
                    </Label>
                    <Switch id="system-notifications" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frecuencia de resúmenes</h3>
                  <div className="space-y-2">
                    <Label htmlFor="digest-frequency">Frecuencia de resúmenes por correo</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="digest-frequency">
                        <SelectValue placeholder="Seleccione frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">En tiempo real</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto gap-1 bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                  <Save className="h-4 w-4" />
                  {isLoading ? "Guardando..." : "Guardar preferencias"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4 space-y-4">
          <Card>
            <form onSubmit={handleSaveSettings}>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>Personalice la apariencia de la aplicación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tema</h3>
                  <RadioGroup defaultValue="light">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Claro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Oscuro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">Usar configuración del sistema</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Idioma</h3>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma de la aplicación</Label>
                    <Select defaultValue="es">
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Seleccione idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Densidad de información</h3>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="density-comfortable" />
                      <Label htmlFor="density-comfortable">Cómoda</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="density-compact" />
                      <Label htmlFor="density-compact">Compacta</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto gap-1 bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                  <Save className="h-4 w-4" />
                  {isLoading ? "Guardando..." : "Guardar preferencias"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4 space-y-4">
          <Card>
            <form onSubmit={handleSaveSettings}>
              <CardHeader>
                <CardTitle>Privacidad y seguridad</CardTitle>
                <CardDescription>Administre su privacidad y seguridad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Seguridad de la cuenta</h3>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="two-factor" className="flex-1">
                        Autenticación de dos factores
                      </Label>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="session-timeout" className="flex-1">
                      Cerrar sesión automáticamente después de inactividad
                    </Label>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacidad</h3>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="data-collection" className="flex-1">
                      Permitir recopilación de datos de uso anónimos
                    </Label>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="profile-visibility" className="flex-1">
                      Hacer mi perfil visible para otros usuarios
                    </Label>
                    <Switch id="profile-visibility" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sesiones activas</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Santiago, Chile</p>
                        <p className="text-sm text-muted-foreground">Chrome en Windows • Activo ahora</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Este dispositivo
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Cerrar todas las otras sesiones
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto gap-1 bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                  <Save className="h-4 w-4" />
                  {isLoading ? "Guardando..." : "Guardar preferencias"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

