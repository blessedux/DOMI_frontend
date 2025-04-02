import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle2, Clock, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Panel de control</h2>
          <p className="text-muted-foreground">Bienvenido al sistema de gestión de permisos municipales.</p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button className="gap-1 bg-pink-500 hover:bg-pink-600" asChild>
            <Link href="/dashboard/new-application">
              <Plus className="h-4 w-4" />
              Nueva solicitud
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de solicitudes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En revisión</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">-1 desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con observaciones</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requiere su atención</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="bg-pink-50 border border-pink-100">
          <TabsTrigger value="recent" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Solicitudes recientes</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Pendientes</TabsTrigger>
          <TabsTrigger value="observations" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">Con observaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes recientes</CardTitle>
              <CardDescription>Sus solicitudes más recientes en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-2 ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                      </div>
                      <div>
                        <p className="font-medium">{application.title}</p>
                        <p className="text-sm text-muted-foreground">Enviado el {application.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-600" asChild>
                      <Link href={`/dashboard/applications/${application.id}`}>Ver detalles</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes pendientes</CardTitle>
              <CardDescription>Solicitudes que están actualmente en revisión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{application.title}</p>
                        <p className="text-sm text-muted-foreground">Enviado el {application.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-600" asChild>
                      <Link href={`/dashboard/applications/${application.id}`}>Ver detalles</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="observations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes con observaciones</CardTitle>
              <CardDescription>Solicitudes que requieren correcciones o aclaraciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {observationApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-red-100 p-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{application.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {application.observations} observaciones • Actualizado el {application.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-600" asChild>
                      <Link href={`/dashboard/observations/${application.id}`}>Resolver</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-600"
    case "pending":
      return "bg-amber-100 text-amber-600"
    case "rejected":
      return "bg-red-100 text-red-600"
    case "observation":
      return "bg-pink-100 text-pink-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    case "rejected":
      return <AlertTriangle className="h-4 w-4" />
    case "observation":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

// Sample data
const recentApplications = [
  {
    id: "app-1",
    title: "Permiso de edificación - Av. Providencia 1234",
    date: "12/03/2025",
    status: "pending",
  },
  {
    id: "app-2",
    title: "Regularización - Las Condes 5678",
    date: "05/03/2025",
    status: "approved",
  },
  {
    id: "app-3",
    title: "Ampliación - Ñuñoa 910",
    date: "28/02/2025",
    status: "observation",
  },
]

const pendingApplications = [
  {
    id: "app-1",
    title: "Permiso de edificación - Av. Providencia 1234",
    date: "12/03/2025",
  },
  {
    id: "app-4",
    title: "Modificación - Santiago Centro 2468",
    date: "10/03/2025",
  },
]

const observationApplications = [
  {
    id: "app-3",
    title: "Ampliación - Ñuñoa 910",
    date: "01/03/2025",
    observations: 3,
  },
]

