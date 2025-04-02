"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, FileUp, Upload, Sparkles, Search, Download, AlertTriangle, Brain, HelpCircle, CheckCircle2, FileText } from "lucide-react"
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

function AIAnalysisContent() {
  const searchParams = useSearchParams()
  const appId = searchParams.get("appId")
  const [analysisState, setAnalysisState] = useState<"initial" | "loading" | "complete">("initial")
  const [analysisType, setAnalysisType] = useState<string>("planos")
  const { toast } = useToast()

  useEffect(() => {
    if (appId) {
      toast({
        title: "Solicitud vinculada",
        description: `Análisis vinculado a la solicitud ${appId}`,
      })
      // Automatically start analysis if an appId is present
      startAnalysis()
    }
  }, [appId, toast])

  const startAnalysis = () => {
    setAnalysisState("loading")
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisState("complete")
      toast({
        title: "Análisis completado",
        description: "Los documentos de la solicitud han sido analizados correctamente.",
      })
    }, 3500)
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
                  Análisis automatizado de los documentos de su solicitud
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

            {analysisState === "initial" && !appId && (
              <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg">
                <div className="rounded-full bg-amber-100 p-3">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    No hay solicitud vinculada
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Por favor, acceda desde una solicitud específica para analizar sus documentos
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/applications">
                    Ver mis solicitudes
                  </Link>
                </Button>
              </div>
            )}

            {analysisState === "loading" && (
              <div className="flex flex-col items-center justify-center gap-4 p-8">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                <div className="text-center">
                  <p className="text-sm font-medium">Analizando documentos de la solicitud {appId}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Aplicando algoritmos de inteligencia artificial...
                  </p>
                </div>
                <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-indigo-500 h-2.5 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            )}

            {analysisState === "complete" && (
              <div className="flex flex-col gap-4">
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-2 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Análisis completado</h4>
                      <p className="text-xs text-muted-foreground">
                        Todos los documentos de la solicitud han sido analizados correctamente.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative h-[200px] w-full rounded-lg overflow-hidden border">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
                    Vista previa del análisis de planos
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="gap-1 bg-indigo-500 hover:bg-indigo-600">
                    <FileText className="h-4 w-4" />
                    Ver informe completo
                  </Button>
                </div>
              </div>
            )}
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
              {analysisState !== "complete" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-6">
                  <div className="rounded-full bg-gray-100 p-3">
                    <AlertTriangle className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    {analysisState === "loading" 
                      ? "Preparando acta de observaciones..." 
                      : "Realice un análisis para generar el acta de observaciones"}
                  </p>
                  <Button variant="outline" disabled={true}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar acta
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Observaciones detectadas:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-amber-100 p-1 mt-0.5 flex-shrink-0">
                          <AlertTriangle className="h-3 w-3 text-amber-500" />
                        </span>
                        <span>Falta indicar la escala numérica en planos de arquitectura.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="rounded-full bg-amber-100 p-1 mt-0.5 flex-shrink-0">
                          <AlertTriangle className="h-3 w-3 text-amber-500" />
                        </span>
                        <span>La distancia de retiro frontal no cumple con la normativa municipal (mínimo 3m).</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar acta de observaciones
                  </Button>
                </div>
              )}
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
          {analysisState === "complete" ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-indigo-100 p-2">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium">Solicitud {appId}</p>
                    <p className="text-sm text-muted-foreground">Analizado hace unos momentos</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Ver detalles</Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Sparkles className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">No hay análisis recientes</h3>
              <p className="text-sm text-muted-foreground">
                Los análisis que realice aparecerán aquí para su referencia.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AIAnalysisPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    }>
      <AIAnalysisContent />
    </Suspense>
  )
} 