"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Clock, FileText, PaperclipIcon, Save, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ObservationStatus = "pending" | "in_progress" | "resolved"
type Comment = {
  id: string
  user: {
    name: string
    role: string
    avatar?: string
  }
  date: string
  text: string
  attachments?: { name: string; url: string; type: string }[]
}

type DetailedObservation = {
  id: string
  applicationId: string
  title: string
  description: string
  date: string
  status: ObservationStatus
  items: {
    id: string
    title: string
    description: string
    category: string
    documentReference: string
    status: ObservationStatus
  }[]
  comments: Comment[]
}

export default function ObservationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [observation, setObservation] = useState<DetailedObservation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newComment, setNewComment] = useState("")

  // In a real application, you would fetch the observation data from an API
  // using the ID from the params
  useEffect(() => {
    // Simulate API call
    const observationData = mockObservations.find((obs) => obs.id === params.id)
    if (observationData) {
      setObservation(observationData)
    } else {
      // Handle not found case
      router.push("/dashboard/observations")
    }
  }, [params.id, router])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !observation) return

    setIsLoading(true)

    // Simulate API call to add comment
    setTimeout(() => {
      // Update observation with new comment
      const updatedObservation = {
        ...observation,
        status: "in_progress" as ObservationStatus,
        comments: [
          ...observation.comments,
          {
            id: `comment-${Date.now()}`,
            user: {
              name: "Juan Pérez",
              role: "Solicitante",
              avatar: "",
            },
            date: new Date().toLocaleDateString("es-CL"),
            text: newComment,
            attachments: [],
          },
        ],
      }

      setObservation(updatedObservation)
      setNewComment("")
      setIsLoading(false)

      toast({
        title: "Comentario agregado",
        description: "Su comentario ha sido agregado correctamente",
      })
    }, 1000)
  }

  const resolveObservation = () => {
    if (!observation) return

    setIsLoading(true)

    // Simulate API call to resolve observation
    setTimeout(() => {
      // Update all items to resolved and overall status
      const updatedObservation = {
        ...observation,
        status: "resolved" as ObservationStatus,
        items: observation.items.map((item) => ({
          ...item,
          status: "resolved" as ObservationStatus,
        })),
      }

      setObservation(updatedObservation)
      setIsLoading(false)

      toast({
        title: "Observación resuelta",
        description: "Todas las observaciones han sido marcadas como resueltas",
      })

      // Navigate back to observations list after a delay
      setTimeout(() => {
        router.push("/dashboard/observations")
      }, 1500)
    }, 1500)
  }

  if (!observation) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p>Cargando observación...</p>
      </div>
    )
  }

  const statusColors = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    resolved: "bg-green-100 text-green-700 border-green-200",
  }

  const statusText = {
    pending: "Pendiente",
    in_progress: "En progreso",
    resolved: "Resuelta",
  }

  const statusIcons = {
    pending: <Clock className="h-4 w-4" />,
    in_progress: <Clock className="h-4 w-4" />,
    resolved: <Check className="h-4 w-4" />,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/observations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Detalle de observación</h2>
      </div>

      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{observation.title}</CardTitle>
                <CardDescription>
                  Solicitud #{observation.applicationId} • {observation.date}
                </CardDescription>
              </div>
              <Badge className={statusColors[observation.status]}>
                <div className="flex items-center gap-1">
                  {statusIcons[observation.status]}
                  <span>{statusText[observation.status]}</span>
                </div>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">{observation.description}</p>

            <h3 className="text-lg font-medium mb-4">Detalles de las observaciones</h3>
            <div className="space-y-4">
              {observation.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border p-4 hover:border-pink-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge className={statusColors[item.status]}>{statusText[item.status]}</Badge>
                  </div>
                  <p className="text-sm mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-1 rounded">{item.category}</span>
                    <span className="bg-muted px-2 py-1 rounded flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {item.documentReference}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Comentarios y resolución</CardTitle>
                <CardDescription>
                  Comuníquese con los revisores para resolver las observaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
                  {observation.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback className="bg-pink-100 text-pink-500">
                          {comment.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">{comment.user.role}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        {comment.attachments && comment.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {comment.attachments.map((attachment) => (
                              <a
                                key={attachment.name}
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs flex items-center gap-1 bg-muted hover:bg-muted/80 px-2 py-1 rounded"
                              >
                                <PaperclipIcon className="h-3 w-3" />
                                {attachment.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <form onSubmit={handleCommentSubmit}>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Escriba su comentario o respuesta..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => setNewComment("")}
                      >
                        <X className="h-4 w-4" />
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="gap-1 bg-pink-500 hover:bg-pink-600"
                        disabled={!newComment.trim() || isLoading}
                      >
                        <Send className="h-4 w-4" />
                        {isLoading ? "Enviando..." : "Enviar comentario"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full gap-1 bg-green-500 hover:bg-green-600"
                  disabled={isLoading || observation.status === "resolved"}
                  onClick={resolveObservation}
                >
                  <Check className="h-4 w-4" />
                  {isLoading ? "Procesando..." : "Marcar como resuelta"}
                </Button>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href={`/dashboard/applications/${observation.applicationId}`}>
                    <FileText className="h-4 w-4" />
                    Ver solicitud
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock data for a specific observation
const mockObservations: DetailedObservation[] = [
  {
    id: "obs-1",
    applicationId: "APP-2025-001",
    title: "Permiso de edificación - Av. Providencia 1234",
    description: "Se detectaron observaciones en los planos arquitectónicos y en la documentación legal.",
    date: "15/03/2025",
    status: "pending",
    items: [
      {
        id: "item-1",
        title: "Plano de arquitectura incompleto",
        description: "Falta incluir detalles de las instalaciones sanitarias en el plano arquitectónico.",
        category: "Planos",
        documentReference: "plano_arquitectura.pdf",
        status: "pending",
      },
      {
        id: "item-2",
        title: "Certificado de dominio vigente vencido",
        description: "El certificado de dominio vigente ha expirado. Se requiere presentar uno actualizado.",
        category: "Documentación legal",
        documentReference: "certificado_dominio.pdf",
        status: "pending",
      },
      {
        id: "item-3",
        title: "Falta firma de arquitecto responsable",
        description: "El plano de elevaciones no cuenta con la firma del arquitecto responsable del proyecto.",
        category: "Firmas y responsabilidades",
        documentReference: "elevaciones.pdf",
        status: "pending",
      },
    ],
    comments: [
      {
        id: "comment-1",
        user: {
          name: "María González",
          role: "Revisor Arquitecto",
          avatar: "",
        },
        date: "15/03/2025",
        text: "Estimado solicitante, hemos revisado su proyecto y encontramos las observaciones detalladas arriba. Por favor, realice las correcciones necesarias y reenvíe los documentos actualizados.",
        attachments: [],
      },
      {
        id: "comment-2",
        user: {
          name: "Carlos Rodríguez",
          role: "Jefe de Unidad",
          avatar: "",
        },
        date: "16/03/2025",
        text: "Adicionalmente, recomendamos revisar con detalle las especificaciones técnicas del proyecto para asegurar que cumplan con la normativa vigente.",
        attachments: [
          {
            name: "normativa_2025.pdf",
            url: "#",
            type: "pdf",
          },
        ],
      },
    ],
  },
  {
    id: "obs-2",
    applicationId: "APP-2025-003",
    title: "Permiso de demolición - Av. Las Condes 5678",
    description: "Observaciones relacionadas con el manejo de residuos y seguridad del proyecto.",
    date: "18/03/2025",
    status: "in_progress",
    items: [
      {
        id: "item-1",
        title: "Plan de manejo de residuos insuficiente",
        description:
          "El plan de manejo de residuos no cumple con los requisitos mínimos establecidos en la normativa vigente.",
        category: "Medioambiente",
        documentReference: "plan_residuos.pdf",
        status: "in_progress",
      },
      {
        id: "item-2",
        title: "Medidas de seguridad incompletas",
        description:
          "Las medidas de seguridad propuestas no contemplan la protección adecuada para las edificaciones colindantes.",
        category: "Seguridad",
        documentReference: "medidas_seguridad.pdf",
        status: "pending",
      },
    ],
    comments: [
      {
        id: "comment-1",
        user: {
          name: "Pedro Soto",
          role: "Revisor Técnico",
          avatar: "",
        },
        date: "18/03/2025",
        text: "Hemos revisado su solicitud de permiso de demolición y encontramos que el plan de manejo de residuos no cumple con la normativa actual. Por favor, revise la Ordenanza Municipal N°123 y actualice su plan.",
        attachments: [],
      },
      {
        id: "comment-2",
        user: {
          name: "Juan Pérez",
          role: "Solicitante",
          avatar: "",
        },
        date: "19/03/2025",
        text: "Gracias por la observación. Estamos trabajando en la actualización del plan de manejo de residuos según la normativa indicada. Enviaremos la versión actualizada a la brevedad.",
        attachments: [],
      },
    ],
  },
] 