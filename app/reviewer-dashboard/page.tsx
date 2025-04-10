import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, Clock, FileText, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ReviewerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Panel de revisor</h2>
          <p className="text-muted-foreground">Bienvenido al sistema de revisión de permisos municipales.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mb-2">+3 desde ayer</p>
            <Button size="sm" variant="outline" className="w-full text-xs" asChild>
              <Link href="/dashboard/applications">Ver todas</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revisadas hoy</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Infracciones detectadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+4 desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo promedio</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 días</div>
            <p className="text-xs text-muted-foreground">-0.5 días desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Solicitudes pendientes de revisión</CardTitle>
            <CardDescription>Solicitudes asignadas a usted que requieren revisión</CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/applications">Ver todas</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar solicitudes..." className="pl-8" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>

          <div className="space-y-4">
            {pendingApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{application.title}</p>
                      {application.priority === "high" && (
                        <Badge variant="destructive" className="text-xs">
                          Alta prioridad
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>ID: {application.id}</span>
                      <span>•</span>
                      <span>Recibido: {application.date}</span>
                      <span>•</span>
                      <span>Solicitante: {application.applicant}</span>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/reviewer-dashboard/review/${application.id}`}>Revisar</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data
const pendingApplications = [
  {
    id: "APP-001",
    title: "Permiso de edificación - Av. Providencia 1234",
    date: "12/03/2025",
    applicant: "Juan Pérez",
    priority: "high",
  },
  {
    id: "APP-004",
    title: "Modificación - Santiago Centro 2468",
    date: "10/03/2025",
    applicant: "María González",
    priority: "normal",
  },
  {
    id: "APP-008",
    title: "Permiso de edificación - La Reina 3579",
    date: "15/03/2025",
    applicant: "Carlos Rodríguez",
    priority: "normal",
  },
  {
    id: "APP-009",
    title: "Regularización - Providencia 7531",
    date: "16/03/2025",
    applicant: "Ana Martínez",
    priority: "high",
  },
]

