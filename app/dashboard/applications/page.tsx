import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Mis solicitudes</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las solicitudes</CardTitle>
          <CardDescription>Gestione y revise el estado de todas sus solicitudes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar solicitudes..." className="pl-8" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.title}</TableCell>
                    <TableCell>{application.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(application.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(application.status)}
                          {getStatusText(application.status)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>{application.stage}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/applications/${application.id}`}>Ver detalles</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions
function getStatusVariant(status: string) {
  switch (status) {
    case "approved":
      return "success"
    case "pending":
      return "outline"
    case "rejected":
      return "destructive"
    case "observation":
      return "warning"
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

// Sample data
const applications = [
  {
    id: "APP-001",
    title: "Permiso de edificación - Av. Providencia 1234",
    date: "12/03/2025",
    status: "pending",
    stage: "Revisión Arquitecto",
  },
  {
    id: "APP-002",
    title: "Regularización - Las Condes 5678",
    date: "05/03/2025",
    status: "approved",
    stage: "Completado",
  },
  {
    id: "APP-003",
    title: "Ampliación - Ñuñoa 910",
    date: "28/02/2025",
    status: "observation",
    stage: "Revisión Arquitecto",
  },
  {
    id: "APP-004",
    title: "Modificación - Santiago Centro 2468",
    date: "10/03/2025",
    status: "pending",
    stage: "Revisión Jefe Unidad",
  },
  {
    id: "APP-005",
    title: "Permiso de demolición - Vitacura 1357",
    date: "15/02/2025",
    status: "rejected",
    stage: "Completado",
  },
  {
    id: "APP-006",
    title: "Permiso de edificación - La Florida 2468",
    date: "01/02/2025",
    status: "approved",
    stage: "Completado",
  },
  {
    id: "APP-007",
    title: "Regularización - Maipú 3690",
    date: "20/01/2025",
    status: "approved",
    stage: "Completado",
  },
]

