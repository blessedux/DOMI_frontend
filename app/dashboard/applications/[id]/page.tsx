"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, Download, FileText, MessageSquare, Upload, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResubmitDialog, setShowResubmitDialog] = useState(false)
  const { toast } = useToast()

  // In a real app, you would fetch the application data based on the ID
  const application = {
    id: params.id,
    title: "Permiso de edificación - Av. Providencia 1234",
    date: "12/03/2025",
    status: "pending",
    stage: "Revisión Arquitecto",
    description:
      "Construcción de edificio residencial de 5 pisos con 20 departamentos y 2 niveles de estacionamientos subterráneos.",
    documents: [
      { name: "Plano de arquitectura.pdf", size: "2.5 MB", date: "12/03/2025" },
      { name: "Memoria de cálculo.pdf", size: "1.8 MB", date: "12/03/2025" },
      { name: "Certificado de informaciones previas.pdf", size: "0.5 MB", date: "12/03/2025" },
      { name: "Especificaciones técnicas.pdf", size: "1.2 MB", date: "12/03/2025" },
    ],
    timeline: [
      { date: "12/03/2025", event: "Solicitud enviada", status: "completed" },
      { date: "13/03/2025", event: "Revisión por Arquitecto", status: "current" },
      { date: "Pendiente", event: "Revisión por Jefe de Unidad", status: "pending" },
      { date: "Pendiente", event: "Aprobación por Director DOM", status: "pending" },
    ],
    observations: [
      {
        id: "obs-1",
        date: "14/03/2025",
        author: "Arq. María González",
        content:
          "El plano de arquitectura no indica claramente las vías de evacuación según normativa vigente. Por favor, actualizar el plano con esta información.",
        status: "pending",
      },
    ],
  }

  const handleResubmit = () => {
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowResubmitDialog(false)

      toast({
        title: "Documentos enviados",
        description: "Sus documentos corregidos han sido enviados correctamente.",
      })
    }, 2000)
  }

  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Respuesta enviada",
      description: "Su respuesta ha sido enviada al revisor.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/applications">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Solicitud {params.id}</h2>
        </div>
        <Badge variant={getStatusVariant(application.status)}>
          <span className="flex items-center gap-1">
            {getStatusIcon(application.status)}
            {getStatusText(application.status)}
          </span>
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{application.title}</CardTitle>
              <CardDescription>
                Enviado el {application.date} • Etapa actual: {application.stage}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{application.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="documents">
            <TabsList>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="observations">Observaciones</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>Documentos enviados con esta solicitud</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.size} • Subido el {doc.date}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Descargar
                        </Button>
                      </div>
                    ))}

                    <Dialog open={showResubmitDialog} onOpenChange={setShowResubmitDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full gap-1 mt-4">
                          <Upload className="h-4 w-4" />
                          Reenviar documentos corregidos
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reenviar documentos corregidos</DialogTitle>
                          <DialogDescription>
                            Suba las versiones corregidas de los documentos con observaciones
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="file-upload">Seleccione los archivos</Label>
                            <Input id="file-upload" type="file" multiple />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="comments">Comentarios</Label>
                            <Textarea id="comments" placeholder="Describa las correcciones realizadas" rows={4} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowResubmitDialog(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleResubmit} disabled={isSubmitting}>
                            {isSubmitting ? "Enviando..." : "Enviar documentos"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="observations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Observaciones</CardTitle>
                  <CardDescription>Observaciones realizadas por los revisores</CardDescription>
                </CardHeader>
                <CardContent>
                  {application.observations.length > 0 ? (
                    <div className="space-y-4">
                      {application.observations.map((observation) => (
                        <div key={observation.id} className="rounded-lg border p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{observation.author}</p>
                              <p className="text-xs text-muted-foreground">{observation.date}</p>
                            </div>
                            <Badge variant="outline">
                              {observation.status === "pending" ? "Pendiente" : "Resuelto"}
                            </Badge>
                          </div>
                          <p className="text-sm">{observation.content}</p>
                          <form onSubmit={handleResponseSubmit} className="space-y-3">
                            <Textarea placeholder="Responder a esta observación..." rows={3} />
                            <div className="flex justify-end">
                              <Button type="submit" size="sm">
                                Enviar respuesta
                              </Button>
                            </div>
                          </form>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No hay observaciones para esta solicitud</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de la solicitud</CardTitle>
                  <CardDescription>Seguimiento del proceso de aprobación</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-muted">
                    {application.timeline.map((item, index) => (
                      <li key={index} className="mb-6 ml-6">
                        <span
                          className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : item.status === "current"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.status === "completed" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : item.status === "current" ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                        </span>
                        <h3 className="font-medium">{item.event}</h3>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado actual</CardTitle>
              <CardDescription>Información sobre el estado de su solicitud</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Etapa actual</span>
                  <span className="text-sm">{application.stage}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Revisor asignado</span>
                  <span className="text-sm">Arq. María González</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Tiempo estimado</span>
                  <span className="text-sm">5-7 días hábiles</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
              <CardDescription>Acciones disponibles para esta solicitud</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full gap-1" variant="outline" asChild>
                  <Link href={`/dashboard/applications/${params.id}/track`}>
                    <Clock className="h-4 w-4" />
                    Seguimiento detallado
                  </Link>
                </Button>
                <Button className="w-full gap-1" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                  Contactar al revisor
                </Button>
                <Button className="w-full gap-1 bg-indigo-500 hover:bg-indigo-600 text-white" asChild>
                  <Link href={`/dashboard/ai-analysis?appId=${params.id}`}>
                    <Sparkles className="h-4 w-4" />
                    Análisis con IA
                  </Link>
                </Button>
                <Button className="w-full gap-1" variant="outline" asChild>
                  <Link href="/dashboard/applications">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a solicitudes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getStatusVariant(status: string) {
  switch (status) {
    case "approved":
      return "default"
    case "pending":
      return "outline"
    case "rejected":
      return "destructive"
    case "observation":
      return "secondary"
    default:
      return "secondary"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="h-3 w-3" />
    case "pending":
      return <Clock className="h-3 w-3" />
    case "rejected":
      return <AlertTriangle className="h-3 w-3" />
    case "observation":
      return <AlertTriangle className="h-3 w-3" />
    default:
      return <FileText className="h-3 w-3" />
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "approved":
      return "Aprobado"
    case "pending":
      return "En revisión"
    case "rejected":
      return "Rechazado"
    case "observation":
      return "Con observaciones"
    default:
      return "Desconocido"
  }
}

