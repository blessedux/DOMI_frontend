"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, FileUp, Upload, Sparkles, Search, Download, AlertTriangle, Brain, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"

export default function AIAnalysisPage() {
  const searchParams = useSearchParams()
  const appId = searchParams.get("appId")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisType, setAnalysisType] = useState<string>("planos")
  const { toast } = useToast()

  useEffect(() => {
    if (appId) {
      toast({
        title: "Solicitud vinculada",
        description: `Análisis vinculado a la solicitud ${appId}`,
      })
    }
  }, [appId, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleAnalyze = () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Por favor seleccione un archivo para analizar.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simular análisis
    setTimeout(() => {
      setIsAnalyzing(false)
      toast({
        title: "Análisis completado",
        description: `El archivo ${selectedFile.name} ha sido analizado correctamente.`,
      })
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={appId ? `/dashboard/applications/${appId}` : "/dashboard"}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Análisis con IA</h2>
        {appId && <Badge variant="outline" className="ml-2">Solicitud {appId}</Badge>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Análisis de documentos</CardTitle>
                <CardDescription>
                  Cargue documentos para análisis automatizado con inteligencia artificial
                </CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Información de tecnología IA</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="start" className="max-w-[300px] p-0">
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-4 space-y-4">
                        <div className="relative h-[120px] w-full rounded-lg overflow-hidden mb-2">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs">
                            Vista previa de segmentación de planos
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-blue-100 p-1.5 mt-0.5 flex-shrink-0">
                            <Brain className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Segmentación U-Net</h4>
                            <p className="text-xs text-muted-foreground">
                              Arquitectura de red neuronal para segmentación precisa de elementos en planos arquitectónicos.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-1.5 mt-0.5 flex-shrink-0">
                            <Search className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Detección de infracciones</h4>
                            <p className="text-xs text-muted-foreground">
                              Análisis automático para detectar posibles infracciones normativas antes de la presentación.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="planos" onValueChange={setAnalysisType}>
              <TabsList className="grid w-full grid-cols-3 bg-pink-50 border border-pink-100">
                <TabsTrigger value="planos" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Planos
                </TabsTrigger>
                <TabsTrigger value="documentos" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="normativa" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Normativa
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg">
              <div className="rounded-full bg-indigo-100 p-3">
                <FileUp className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  {selectedFile ? selectedFile.name : "Arrastre archivos aquí o haga clic para cargar"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Formatos soportados: PDF, JPG, PNG (máx. 25MB)
                </p>
              </div>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer bg-muted hover:bg-muted/80 px-4 py-2 rounded text-sm font-medium"
              >
                Seleccionar archivo
              </Label>
            </div>

            <div className="flex justify-center">
              <Button
                className="gap-1 bg-indigo-500 hover:bg-indigo-600"
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Analizar con IA
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acta de observaciones</CardTitle>
              <CardDescription>
                Genere automáticamente el acta de observaciones basado en el análisis de IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <div className="rounded-full bg-gray-100 p-3">
                  <AlertTriangle className="h-6 w-6 text-gray-500" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Realice un análisis con IA para generar el acta de observaciones
                </p>
                <Button variant="outline" disabled={true}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar acta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análisis recientes</CardTitle>
          <CardDescription>Historial de análisis realizados con IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Sparkles className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No hay análisis recientes</h3>
            <p className="text-sm text-muted-foreground">
              Los análisis que realice aparecerán aquí para su referencia.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 