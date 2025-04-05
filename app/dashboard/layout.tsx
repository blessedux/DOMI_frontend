"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set a small delay before showing the content to ensure the transition effect is visible
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <SidebarProvider>
      <div className={`flex min-h-screen transition-all duration-700 ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}>
        <DashboardSidebar userRole="applicant" />
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

