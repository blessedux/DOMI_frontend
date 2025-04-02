"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, FileCheck, Shield } from "lucide-react"

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.replace("/login");
  }, [router]);

  // Return null or a loading state while redirecting
  return null;
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

