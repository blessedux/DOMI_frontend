"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react"
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
import { useRouter } from "next/navigation"

export default function ReviewApplicationPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [observation, setObservation] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  // In a real app, you would fetch the application data based on the ID
  const application = {
    id: params.id,
    title: "Permiso de edificación - Av. Providencia 1234",
    date: "12/03/2025",
    applicant: "Juan Pérez",
    email: "juan.perez@ejemplo.cl",
    phone: "+56 9 1234 5678",
    description:
      "Construcción de edificio residencial de 5 pisos con 20 departamentos y 2 niveles de estacionamientos subterráneos.",
    documents: [
      { name: "Plano de arquitectura.pdf", size: "2.5 MB", date: "12/03/2025" },
      { name: "Memoria de cálculo.pdf", size: "1.8 MB", date: "12/03/2025" },
      { name: "Certificado de informaciones previas.pdf", size: "0.5 MB", date: "12/03/2025" },
      { name: "Especificaciones técnicas.pdf", size: "1.2 MB", date: "12/03/2025" },
    ],
    aiAnalysis: {
      status: "warning",
      issues: [
        "Plano de arquitectura: Falta indicar escala en algunos detalles",
        "Memoria de cálculo: Se recomienda revisar las especificaciones de materiales",
      ],
    },
  }

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault()

    if (!observation.trim()) {
      toast({
        title: "Error",
        description: "Debe ingresar una observación",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Observación agregada",
      description: "La observación ha sido agregada correctamente",
    })

    setObservation("")
  }

  const handleApprove = () => {
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowApproveDialog(false)

      toast({
        title: "Solicitud aprobada",
        description: "La solicitud ha sido aprobada y enviada al siguiente nivel de revisión",
      })

      router.push("/reviewer-dashboard")
    }, 2000)
  }

  const handleReject = () => {
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowRejectDialog(false)

      toast({
        title: "Solicitud rechazada",
        description: "La solicitud ha sido rechazada y se ha notificado al solicitante",
      })

      router.push("/reviewer-dashboard")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/reviewer-dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Revisar solicitud {params.id}</h2>
        </div>
        <Badge variant="outline">Pendiente de revisión</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{application.title}</CardTitle>
              <CardDescription>
                Enviado el {application.date} por {application.applicant}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{application.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="documents">
            <TabsList>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="ai-analysis">Análisis IA</TabsTrigger>
              <TabsTrigger value="observations">Observaciones</TabsTrigger>
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ai-analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de IA</CardTitle>
                  <CardDescription>Resultados del análisis automatizado de documentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      className={`rounded-lg p-4 ${
                        application.aiAnalysis.status === "warning"
                          ? "bg-amber-50 border border-amber-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            application.aiAnalysis.status === "warning" ? "text-amber-600" : "text-red-600"
                          }`}
                        />
                        <h3 className="font-medium">
                          {application.aiAnalysis.status === "warning"
                            ? "Advertencias detectadas"
                            : "Problemas detectados"}
                        </h3>
                      </div>
                      <ul className="space-y-1 list-disc pl-5">
                        {application.aiAnalysis.issues.map((issue, index) => (
                          <li key={index} className="text-sm">
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="observations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agregar observaciones</CardTitle>
                  <CardDescription>Agregue observaciones que el solicitante debe corregir</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddObservation} className="space-y-4">
                    <Textarea
                      placeholder="Ingrese su observación aquí..."
                      rows={4}
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                    />
                    <Button type="submit">Agregar observación</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del solicitante</CardTitle>
              <CardDescription>Datos de contacto del solicitante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Nombre</span>
                  <span className="text-sm">{application.applicant}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Correo electrónico</span>
                  <span className="text-sm">{application.email}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Teléfono</span>
                  <span className="text-sm">{application.phone}</span>
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
                <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full gap-1" variant="default">
                      <ThumbsUp className="h-4 w-4" />
                      Aprobar solicitud
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Aprobar solicitud</DialogTitle>
                      <DialogDescription>
                        ¿Está seguro de que desea aprobar esta solicitud? La solicitud pasará al siguiente nivel de
                        revisión.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea placeholder="Comentarios adicionales (opcional)" rows={4} />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleApprove} disabled={isSubmitting} className="gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        {isSubmitting ? "Aprobando..." : "Confirmar aprobación"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full gap-1" variant="destructive">
                      <ThumbsDown className="h-4 w-4" />
                      Rechazar solicitud
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rechazar solicitud</DialogTitle>
                      <DialogDescription>
                        ¿Está seguro de que desea rechazar esta solicitud? Esta acción no se puede deshacer.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Textarea placeholder="Motivo del rechazo (requerido)" rows={4} required />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleReject} disabled={isSubmitting} variant="destructive" className="gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {isSubmitting ? "Rechazando..." : "Confirmar rechazo"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button className="w-full gap-1" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                  Contactar al solicitante
                </Button>

                <Button className="w-full gap-1" variant="outline" asChild>
                  <Link href="/reviewer-dashboard">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al panel
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

