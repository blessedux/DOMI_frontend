"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, FileText, Upload, X, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function NewApplicationPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false)
  const [aiResults, setAiResults] = useState<{
    status: "success" | "warning" | "error"
    issues: string[]
  } | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  
  // Check if user is a reviewer and redirect if they are
  useEffect(() => {
    // In a real app, you would get this from an auth context or API
    // For this demo, we're checking the URL path to determine role
    const isReviewer = window.location.pathname.includes('/reviewer-dashboard')
      || localStorage.getItem('userRole') === 'reviewer'
    
    if (isReviewer) {
      toast({
        title: "Acceso denegado",
        description: "Los revisores no pueden crear solicitudes nuevas",
        variant: "destructive",
      })
      router.push('/reviewer-dashboard')
    }
  }, [router, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          simulateAiAnalysis()
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const simulateAiAnalysis = () => {
    // Simulate AI analysis after upload
    setTimeout(() => {
      setAiAnalysisComplete(true)

      // Randomly choose between success, warning, or error for demo purposes
      const resultTypes = ["success", "warning", "error"]
      const resultType = resultTypes[Math.floor(Math.random() * resultTypes.length)] as "success" | "warning" | "error"

      const issuesByType = {
        success: [],
        warning: [
          "Plano de arquitectura: Falta indicar escala en algunos detalles",
          "Memoria de cálculo: Se recomienda revisar las especificaciones de materiales",
        ],
        error: [
          "Plano de arquitectura: No cumple con la normativa de accesibilidad universal",
          "Certificado de informaciones previas: Documento vencido",
          "Memoria de cálculo: Falta firma del profesional responsable",
        ],
      }

      setAiResults({
        status: resultType,
        issues: issuesByType[resultType],
      })

      toast({
        title: "Análisis completado",
        description: "El sistema ha analizado sus documentos",
      })
    }, 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Debe cargar al menos un documento",
        variant: "destructive",
      })
      return
    }

    simulateUpload()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Nueva solicitud</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información de la solicitud</CardTitle>
              <CardDescription>Ingrese los detalles básicos de su solicitud</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la solicitud</Label>
                <Input id="title" placeholder="Ej: Permiso de edificación - Av. Providencia 1234" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de solicitud</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="building">Permiso de edificación</SelectItem>
                    <SelectItem value="modification">Modificación de proyecto</SelectItem>
                    <SelectItem value="regularization">Regularización</SelectItem>
                    <SelectItem value="demolition">Permiso de demolición</SelectItem>
                    <SelectItem value="extension">Ampliación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Ej: Av. Providencia 1234, Providencia" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describa brevemente su proyecto" rows={4} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentos requeridos</CardTitle>
              <CardDescription>Cargue todos los documentos necesarios para su solicitud</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-2">
                    <div className="rounded-full bg-muted p-3">
                      <Upload className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">Arrastre y suelte sus archivos</h3>
                    <p className="text-sm text-muted-foreground">o haga clic para seleccionar archivos</p>
                    <Input id="file-upload" type="file" className="hidden" multiple onChange={handleFileChange} />
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      type="button"
                    >
                      Seleccionar archivos
                    </Button>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Archivos seleccionados</h4>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFile(index)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Subiendo archivos...</Label>
                      <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {aiAnalysisComplete && aiResults && (
                  <Alert variant={aiResults.status === "success" ? "default" : "destructive"}>
                    <div className="flex items-center gap-2">
                      {aiResults.status === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : aiResults.status === "warning" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>
                        {aiResults.status === "success"
                          ? "Documentos validados correctamente"
                          : aiResults.status === "warning"
                            ? "Advertencias detectadas"
                            : "Problemas detectados"}
                      </AlertTitle>
                    </div>
                    <AlertDescription>
                      {aiResults.status === "success" ? (
                        <p className="mt-2">Todos los documentos cumplen con los requisitos.</p>
                      ) : (
                        <div className="mt-2 space-y-2">
                          <p>Se han detectado los siguientes problemas:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {aiResults.issues.map((issue, index) => (
                              <li key={index} className="text-sm">
                                {issue}
                              </li>
                            ))}
                          </ul>
                          {aiResults.status === "error" && (
                            <p className="font-medium mt-2">Debe corregir estos problemas antes de continuar.</p>
                          )}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Cancelar</Link>
              </Button>
              <Button type="submit" disabled={isUploading || (aiAnalysisComplete && aiResults?.status === "error")}>
                {isUploading
                  ? "Subiendo..."
                  : aiAnalysisComplete && aiResults?.status !== "error"
                    ? "Enviar solicitud"
                    : "Analizar documentos"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

