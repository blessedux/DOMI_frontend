import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function ReviewerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar userRole="reviewer" />
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

