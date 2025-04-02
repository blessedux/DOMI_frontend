import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, FileCheck, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Building2 className="h-6 w-6" />
            <span>DOMI</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium hover:underline">
              Acerca de
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contacto
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Registrarse</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Simplifique su proceso de aprobación municipal
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DOMI utiliza inteligencia artificial para agilizar y optimizar el proceso de gestión de permisos
                    para obras municipales en Chile.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Comenzar ahora
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Saber más
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-[350px] w-full max-w-[500px] rounded-lg bg-muted p-4 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 text-center">
                    <FileCheck className="h-16 w-16 text-primary" />
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Aprobación simplificada</h2>
                      <p className="text-muted-foreground">
                        Reduzca el tiempo de aprobación y mejore la precisión con nuestra plataforma impulsada por IA.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Características principales</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Nuestra plataforma ofrece herramientas avanzadas para simplificar el proceso de aprobación de obras
                municipales.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 mt-8">
              {features.map((feature) => (
                <div key={feature.title} className="relative overflow-hidden rounded-lg border bg-background p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <p className="text-sm leading-loose text-center md:text-left">
              © 2025 DOMI. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm hover:underline">
              Términos
            </Link>
            <Link href="/privacy" className="text-sm hover:underline">
              Privacidad
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Gestión de documentos",
    description: "Cargue, organice y gestione todos sus documentos en un solo lugar.",
    icon: FileCheck,
  },
  {
    title: "Detección de infracciones",
    description: "IA que analiza documentos para detectar posibles infracciones antes de la presentación.",
    icon: Shield,
  },
  {
    title: "Seguimiento de aprobaciones",
    description: "Monitoree el estado de sus solicitudes en tiempo real a través de nuestro panel de control.",
    icon: Building2,
  },
]

