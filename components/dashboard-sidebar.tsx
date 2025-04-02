"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Upload,
  User,
  FileCheck,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface DashboardSidebarProps {
  userRole?: "applicant" | "reviewer" | "official"
}

export function DashboardSidebar({ userRole = "applicant" }: DashboardSidebarProps) {
  const pathname = usePathname()

  // Define menu items based on user role
  const getMenuItems = () => {
    const applicantItems = [
      {
        title: "Inicio",
        href: "/dashboard",
        icon: Home,
      },
      {
        title: "Mis solicitudes",
        href: "/dashboard/applications",
        icon: FileText,
      },
      {
        title: "Nueva solicitud",
        href: "/dashboard/new-application",
        icon: Upload,
      },
      {
        title: "Observaciones",
        href: "/dashboard/observations",
        icon: MessageSquare,
      },
    ]

    const reviewerItems = [
      {
        title: "Inicio",
        href: "/reviewer-dashboard",
        icon: Home,
      },
      {
        title: "Solicitudes pendientes",
        href: "/reviewer-dashboard/pending",
        icon: FileText,
      },
      {
        title: "Revisiones completadas",
        href: "/reviewer-dashboard/completed",
        icon: FileCheck,
      },
      {
        title: "Infracciones detectadas",
        href: "/reviewer-dashboard/infractions",
        icon: AlertTriangle,
      },
    ]

    const officialItems = [
      {
        title: "Inicio",
        href: "/admin-dashboard",
        icon: Home,
      },
      {
        title: "Todas las solicitudes",
        href: "/admin-dashboard/all-applications",
        icon: FileText,
      },
      {
        title: "Aprobaciones pendientes",
        href: "/admin-dashboard/pending-approvals",
        icon: FileCheck,
      },
      {
        title: "Gestión de usuarios",
        href: "/admin-dashboard/users",
        icon: User,
      },
    ]

    switch (userRole) {
      case "reviewer":
        return reviewerItems
      case "official":
        return officialItems
      default:
        return applicantItems
    }
  }

  const menuItems = getMenuItems()

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <Building2 className="h-6 w-6" />
          <span className="font-bold text-lg">DOMI</span>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"} tooltip="Perfil">
              <Link href="/dashboard/profile">
                <User className="h-5 w-5" />
                <span>Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"} tooltip="Configuración">
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <Button variant="outline" className="w-full justify-start gap-2" asChild>
          <Link href="/logout">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

