"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Eye, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define types
type ObservationStatus = "pending" | "in_progress" | "resolved"

type Observation = {
  id: string
  applicationId: string
  title: string
  description: string
  date: string
  status: ObservationStatus
  count: number
}

export default function ObservationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Filter observations based on search query and status filter
  const filteredObservations = observationsData.filter(
    (obs) =>
      (obs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.applicationId.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || obs.status === statusFilter)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Observaciones</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Observaciones de sus solicitudes</CardTitle>
          <CardDescription>
            Revise y resuelva las observaciones realizadas por los revisores a sus solicitudes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título o número de solicitud"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all" onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="in_progress">En progreso</SelectItem>
                    <SelectItem value="resolved">Resueltas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-pink-50 border border-pink-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Todas
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Pendientes
                </TabsTrigger>
                <TabsTrigger value="resolved" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                  Resueltas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-4">
                {filteredObservations.length > 0 ? (
                  filteredObservations.map((observation) => (
                    <ObservationCard key={observation.id} observation={observation} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No se encontraron observaciones</h3>
                    <p className="text-muted-foreground">
                      No hay observaciones que coincidan con los criterios de búsqueda.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="mt-4 space-y-4">
                {filteredObservations
                  .filter((obs) => obs.status === "pending" || obs.status === "in_progress")
                  .map((observation) => (
                    <ObservationCard key={observation.id} observation={observation} />
                  ))}
              </TabsContent>

              <TabsContent value="resolved" className="mt-4 space-y-4">
                {filteredObservations
                  .filter((obs) => obs.status === "resolved")
                  .map((observation) => (
                    <ObservationCard key={observation.id} observation={observation} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ObservationCard({ observation }: { observation: Observation }) {
  const statusColors: Record<ObservationStatus, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    resolved: "bg-green-100 text-green-700 border-green-200",
  }

  const statusText: Record<ObservationStatus, string> = {
    pending: "Pendiente",
    in_progress: "En progreso",
    resolved: "Resuelta",
  }

  return (
    <div className="rounded-lg border p-4 hover:border-pink-200 transition-colors">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{observation.title}</h3>
            <Badge className={statusColors[observation.status]}>{statusText[observation.status]}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Solicitud #{observation.applicationId} • {observation.date}
          </p>
          <p className="text-sm mt-2">{observation.description}</p>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="text-sm text-muted-foreground mr-2">
            {observation.count} {observation.count === 1 ? "observación" : "observaciones"}
          </div>
          <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-600" asChild>
            <Link href={`/dashboard/observations/${observation.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Ver detalles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Mock data for the observations
const observationsData: Observation[] = [
  {
    id: "obs-1",
    applicationId: "APP-2025-001",
    title: "Permiso de edificación - Av. Providencia 1234",
    description: "Se detectaron observaciones en los planos arquitectónicos y en la documentación legal.",
    date: "15/03/2025",
    status: "pending",
    count: 3,
  },
  {
    id: "obs-2",
    applicationId: "APP-2025-003",
    title: "Permiso de demolición - Av. Las Condes 5678",
    description: "Observaciones relacionadas con el manejo de residuos y seguridad del proyecto.",
    date: "18/03/2025",
    status: "in_progress",
    count: 2,
  },
  {
    id: "obs-3",
    applicationId: "APP-2025-005",
    title: "Modificación de proyecto - Calle Santiago 910",
    description: "Observaciones resueltas sobre aspectos técnicos del proyecto modificado.",
    date: "20/03/2025",
    status: "resolved",
    count: 4,
  },
  {
    id: "obs-4",
    applicationId: "APP-2025-008",
    title: "Permiso de ampliación - Av. Kennedy 2468",
    description: "Se detectaron incongruencias en los cálculos estructurales presentados.",
    date: "22/03/2025",
    status: "pending",
    count: 1,
  },
  {
    id: "obs-5",
    applicationId: "APP-2025-010",
    title: "Recepción final - Paseo Bulnes 1357",
    description: "Observaciones menores sobre la documentación final del proyecto, ya resueltas.",
    date: "25/03/2025",
    status: "resolved",
    count: 2,
  },
] 