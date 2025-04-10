"use client"

import Link from "next/link"
import { ArrowLeft, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PendingApprovalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Aprobaciones pendientes</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aprobaciones pendientes</CardTitle>
          <CardDescription>
            Revise y apruebe solicitudes que requieren su autorización
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
              <FileCheck className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Funcionalidad en desarrollo</h3>
            <p className="text-sm text-muted-foreground">
              Esta sección está actualmente en desarrollo. Pronto podrá revisar y aprobar las solicitudes pendientes desde aquí.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 