"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, Download, FileText, MessageSquare, Upload, Sparkles, FileSignature } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { SignaturePad } from "@/components/ui/signature-pad"
import { SuccessAnimation } from "@/components/ui/success-animation"
import { DigitalSignatureUploader } from "@/components/ui/digital-signature-uploader"
import { ConfettiCelebration } from "@/components/ui/confetti-celebration" 
import { Tabs as SignatureTabs, TabsList as SignatureTabsList, TabsTrigger as SignatureTabsTrigger, TabsContent as SignatureTabsContent } from "@/components/ui/tabs"

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResubmitDialog, setShowResubmitDialog] = useState(false)
  const [showSignDialog, setShowSignDialog] = useState(false)
  const [showObservationSignDialog, setShowObservationSignDialog] = useState(false)
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null)
  const [observationSignatureUrl, setObservationSignatureUrl] = useState<string | null>(null)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [successAnimationType, setSuccessAnimationType] = useState<"application" | "observation">("application")
  const [activeObservation, setActiveObservation] = useState<string | null>(null)
  const [signedObservations, setSignedObservations] = useState<Set<string>>(new Set())
  const [applicationSigned, setApplicationSigned] = useState(false)
  const [applicationApproved, setApplicationApproved] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [signatureTabValue, setSignatureTabValue] = useState("draw")
  const [observationSignatureTabValue, setObservationSignatureTabValue] = useState("draw")
  const [showMissingSignaturesDialog, setShowMissingSignaturesDialog] = useState(false)
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

  // Simulate application approval after 3 seconds if all observations are signed and application is signed
  useEffect(() => {
    // Only proceed with approval and confetti if the application is signed
    // and all observations are signed, and we haven't already shown the approval
    if (applicationSigned && signedObservations.size === application.observations.length && !applicationApproved) {
      const timer = setTimeout(() => {
        setApplicationApproved(true)
        setShowConfetti(true)
        
        toast({
          title: "¡Solicitud aprobada!",
          description: "Felicidades, su solicitud ha sido aprobada por la DOM.",
        })
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [applicationSigned, signedObservations.size, application.observations.length, applicationApproved, toast])

  // Check if all observations are signed
  const areAllObservationsSigned = () => {
    return signedObservations.size === application.observations.length;
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

  const handleSignatureComplete = (url: string) => {
    setSignatureUrl(url)
  }

  const handleSignAndSubmit = () => {
    // No need to check for signed observations here anymore
    // since we prevent access to the dialog if observations aren't signed
    
    setIsSubmitting(true)
    
    // Simulate submission processing
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSignDialog(false)
      setSuccessAnimationType("application")
      setShowSuccessAnimation(true)
      setApplicationSigned(true)
    }, 1500)
  }

  const handleSuccessAnimationComplete = () => {
    setShowSuccessAnimation(false)
    
    if (successAnimationType === "application") {
      toast({
        title: "Solicitud firmada y enviada",
        description: "Su solicitud ha sido firmada y enviada correctamente. Recibirá notificaciones sobre el estado del trámite."
      })
    } else {
      toast({
        title: "Acta de Observación firmada",
        description: "El acta de observación ha sido firmada y enviada correctamente. El revisor será notificado."
      })
    }
  }

  const handleObservationSignatureComplete = (url: string) => {
    setObservationSignatureUrl(url)
  }

  const handleSignObservation = (observationId: string) => {
    setActiveObservation(observationId)
    setObservationSignatureUrl(null)
    setShowObservationSignDialog(true)
  }

  const handleObservationSignAndSubmit = () => {
    setIsSubmitting(true)
    
    // Simulate submission processing
    setTimeout(() => {
      setIsSubmitting(false)
      setShowObservationSignDialog(false)
      setSuccessAnimationType("observation")
      setShowSuccessAnimation(true)
      
      // Mark the observation as signed
      if (activeObservation) {
        setSignedObservations(prev => {
          const newSet = new Set(prev)
          newSet.add(activeObservation)
          return newSet
        })
      }
    }, 1500)
  }

  const handleMissingSignaturesConfirm = () => {
    setShowMissingSignaturesDialog(false);
    
    // Highlight the observation that needs signing
    const firstObservationElement = document.getElementById("observation-tab");
    if (firstObservationElement) {
      firstObservationElement.click();
    }
    
    toast({
      title: "Firmas pendientes",
      description: "Complete la firma de todas las observaciones antes de enviar la solicitud.",
      variant: "destructive",
    });
  }

  const handleConfettiComplete = () => {
    setShowConfetti(false)
  }

  // Generate a sample PDF (in real app, this would be server-generated)
  const downloadSamplePdf = () => {
    // Create a simple PDF data URL (empty PDF)
    const pdfDataUrl = "data:application/pdf;base64,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"
    
    // Create a temporary link and trigger download
    const link = document.createElement('a')
    link.href = pdfDataUrl
    link.download = `solicitud_${params.id}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Descarga iniciada",
      description: "Se ha iniciado la descarga del documento de la solicitud.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Show success animation dialog */}
      <Dialog open={showSuccessAnimation} onOpenChange={setShowSuccessAnimation}>
        <DialogContent className="sm:max-w-md">
          <SuccessAnimation
            title={
              successAnimationType === "application"
                ? "¡Solicitud enviada con éxito!"
                : "¡Acta de Observación firmada!"
            }
            description={
              successAnimationType === "application"
                ? "Su solicitud ha sido firmada y enviada correctamente. Recibirá notificaciones sobre el estado del trámite."
                : "El acta de observación ha sido firmada y enviada correctamente. El revisor será notificado."
            }
            onComplete={handleSuccessAnimationComplete}
          />
        </DialogContent>
      </Dialog>

      {/* Confetti celebration when application is approved */}
      {showConfetti && (
        <ConfettiCelebration duration={5000} onComplete={handleConfettiComplete} />
      )}

      {/* Observation Signature Dialog */}
      <Dialog open={showObservationSignDialog} onOpenChange={setShowObservationSignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Firmar Acta de Observación</DialogTitle>
            <DialogDescription>
              Al firmar, confirma que ha leído y atendido las observaciones realizadas por el revisor.
            </DialogDescription>
          </DialogHeader>
          
          <SignatureTabs 
            value={observationSignatureTabValue} 
            onValueChange={setObservationSignatureTabValue}
            className="w-full"
          >
            <SignatureTabsList className="grid w-full grid-cols-2">
              <SignatureTabsTrigger value="draw">Dibujar firma</SignatureTabsTrigger>
              <SignatureTabsTrigger value="upload">Cargar firma digital</SignatureTabsTrigger>
            </SignatureTabsList>
            <SignatureTabsContent value="draw" className="pt-4">
              {!observationSignatureUrl ? (
                <SignaturePad onSave={handleObservationSignatureComplete} width={400} height={200} />
              ) : (
                <div className="py-6 space-y-4">
                  <div className="border rounded p-4 bg-white">
                    <p className="text-sm text-muted-foreground mb-2">Su firma:</p>
                    <div className="flex justify-center">
                      <Image 
                        src={observationSignatureUrl} 
                        alt="Firma digital" 
                        width={400} 
                        height={200} 
                        className="max-h-[150px] object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setObservationSignatureUrl(null)}
                      type="button"
                    >
                      Dibujar de nuevo
                    </Button>
                    <Button 
                      onClick={handleObservationSignAndSubmit}
                      disabled={isSubmitting}
                      type="button"
                    >
                      {isSubmitting ? "Enviando..." : "Confirmar y enviar"}
                    </Button>
                  </div>
                </div>
              )}
            </SignatureTabsContent>
            <SignatureTabsContent value="upload" className="pt-4">
              {!observationSignatureUrl ? (
                <DigitalSignatureUploader onSave={handleObservationSignatureComplete} />
              ) : (
                <div className="py-6 space-y-4">
                  <div className="border rounded p-4 bg-white">
                    <p className="text-sm text-muted-foreground mb-2">Su firma:</p>
                    <div className="flex justify-center">
                      <Image 
                        src={observationSignatureUrl} 
                        alt="Firma digital" 
                        width={400} 
                        height={200} 
                        className="max-h-[150px] object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setObservationSignatureUrl(null)}
                      type="button"
                    >
                      Seleccionar otra
                    </Button>
                    <Button 
                      onClick={handleObservationSignAndSubmit}
                      disabled={isSubmitting}
                      type="button"
                    >
                      {isSubmitting ? "Enviando..." : "Confirmar y enviar"}
                    </Button>
                  </div>
                </div>
              )}
            </SignatureTabsContent>
          </SignatureTabs>
        </DialogContent>
      </Dialog>

      {/* Missing signatures dialog */}
      <Dialog open={showMissingSignaturesDialog} onOpenChange={setShowMissingSignaturesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Firmas pendientes</DialogTitle>
            <DialogDescription>
              Antes de firmar y enviar la solicitud, debe firmar todas las actas de observación pendientes.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Tienes {application.observations.length - signedObservations.size} observaciones pendientes de firmar.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleMissingSignaturesConfirm}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <TabsTrigger id="observation-tab" value="observations">Observaciones</TabsTrigger>
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
                            <Badge variant={signedObservations.has(observation.id) ? "default" : "outline"}>
                              {signedObservations.has(observation.id) ? "Firmada" : 
                                observation.status === "pending" ? "Pendiente" : "Resuelto"}
                            </Badge>
                          </div>
                          <p className="text-sm">{observation.content}</p>
                          
                          {!signedObservations.has(observation.id) ? (
                            <>
                              <form onSubmit={handleResponseSubmit} className="space-y-3">
                                <Textarea placeholder="Responder a esta observación..." rows={3} />
                                <div className="flex justify-end">
                                  <Button type="submit" size="sm">
                                    Enviar respuesta
                                  </Button>
                                </div>
                              </form>
                              <div className="flex justify-end pt-3 border-t mt-3">
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleSignObservation(observation.id)}
                                  type="button"
                                  className="gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                                >
                                  <FileSignature className="h-4 w-4" />
                                  Firmar Acta de Observación
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="pt-3 border-t mt-3 flex items-center gap-2 text-green-600">
                              <CheckCircle2 className="h-5 w-5" />
                              <p className="text-sm font-medium">Acta de observación firmada el {new Date().toLocaleDateString()}</p>
                            </div>
                          )}
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
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Estado de firma</span>
                  <div className="flex items-center gap-2">
                    {applicationSigned ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Firmado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1">
                        <FileSignature className="h-3 w-3" />
                        Pendiente de firma
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Observaciones firmadas</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={signedObservations.size === application.observations.length ? "default" : "outline"} className="gap-1">
                      {signedObservations.size} / {application.observations.length}
                    </Badge>
                  </div>
                </div>
                {applicationApproved && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Estado final</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="bg-green-500 text-white gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Aprobado
                      </Badge>
                    </div>
                  </div>
                )}
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
                {!applicationSigned ? (
                  <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full gap-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={(e) => {
                          // Prevent default to handle our custom logic
                          e.preventDefault();
                          
                          // Check if all observations are signed before showing signature dialog
                          if (!areAllObservationsSigned()) {
                            setShowMissingSignaturesDialog(true);
                          } else {
                            setShowSignDialog(true);
                          }
                        }}
                      >
                        <FileSignature className="h-4 w-4" />
                        Firmar y enviar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Firmar solicitud</DialogTitle>
                        <DialogDescription>
                          Dibuje o suba su firma para completar el envío de la solicitud.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <SignatureTabs 
                        value={signatureTabValue} 
                        onValueChange={setSignatureTabValue}
                        className="w-full"
                      >
                        <SignatureTabsList className="grid w-full grid-cols-2">
                          <SignatureTabsTrigger value="draw">Dibujar firma</SignatureTabsTrigger>
                          <SignatureTabsTrigger value="upload">Cargar firma digital</SignatureTabsTrigger>
                        </SignatureTabsList>
                        <SignatureTabsContent value="draw" className="pt-4">
                          {!signatureUrl ? (
                            <SignaturePad onSave={handleSignatureComplete} width={400} height={200} />
                          ) : (
                            <div className="py-6 space-y-4">
                              <div className="border rounded p-4 bg-white">
                                <p className="text-sm text-muted-foreground mb-2">Su firma:</p>
                                <div className="flex justify-center">
                                  <Image 
                                    src={signatureUrl} 
                                    alt="Firma digital" 
                                    width={400} 
                                    height={200} 
                                    className="max-h-[150px] object-contain"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setSignatureUrl(null)}
                                  type="button"
                                >
                                  Dibujar de nuevo
                                </Button>
                                <Button 
                                  onClick={handleSignAndSubmit}
                                  disabled={isSubmitting}
                                  type="button"
                                >
                                  {isSubmitting ? "Enviando..." : "Confirmar y enviar"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </SignatureTabsContent>
                        <SignatureTabsContent value="upload" className="pt-4">
                          {!signatureUrl ? (
                            <DigitalSignatureUploader onSave={handleSignatureComplete} />
                          ) : (
                            <div className="py-6 space-y-4">
                              <div className="border rounded p-4 bg-white">
                                <p className="text-sm text-muted-foreground mb-2">Su firma:</p>
                                <div className="flex justify-center">
                                  <Image 
                                    src={signatureUrl} 
                                    alt="Firma digital" 
                                    width={400} 
                                    height={200} 
                                    className="max-h-[150px] object-contain"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setSignatureUrl(null)}
                                  type="button"
                                >
                                  Seleccionar otra
                                </Button>
                                <Button 
                                  onClick={handleSignAndSubmit}
                                  disabled={isSubmitting}
                                  type="button"
                                >
                                  {isSubmitting ? "Enviando..." : "Confirmar y enviar"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </SignatureTabsContent>
                      </SignatureTabs>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    className="w-full gap-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Solicitud firmada
                  </Button>
                )}
                
                <Button 
                  className="w-full gap-1" 
                  variant="outline" 
                  onClick={downloadSamplePdf}
                >
                  <Download className="h-4 w-4" />
                  Descargar solicitud (PDF)
                </Button>
                
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

