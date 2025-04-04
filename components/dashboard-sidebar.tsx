"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
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
        href: "/dashboard",
        icon: Home,
      },
      {
        title: "Todas las solicitudes",
        href: "/dashboard/all-applications",
        icon: FileText,
      },
      {
        title: "Aprobaciones pendientes",
        href: "/dashboard/pending-approvals",
        icon: FileCheck,
      },
      {
        title: "Gestión de usuarios",
        href: "/dashboard/users",
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
    <Sidebar className="bg-white border-r border-pink-100">
      <SidebarHeader className="border-b border-pink-100">
        <div className="flex items-center gap-2 px-2 py-3">
          <Image 
            src="/icons/logo/domilogo.svg" 
            alt="DOMI Logo" 
            width={24} 
            height={24} 
            className="h-6 w-6"
          />
          <span className="font-bold text-lg text-black">DOMI</span>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href} 
                tooltip={item.title}
                className={`hover:bg-pink-50 ${pathname === item.href ? 'bg-pink-100 text-pink-600' : ''}`}
              >
                <Link href={item.href}>
                  <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-pink-500' : ''}`} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator className="bg-pink-100" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={pathname === "/dashboard/profile"} 
              tooltip="Perfil"
              className={`hover:bg-pink-50 ${pathname === "/dashboard/profile" ? 'bg-pink-100 text-pink-600' : ''}`}
            >
              <Link href="/dashboard/profile">
                <User className={`h-5 w-5 ${pathname === "/dashboard/profile" ? 'text-pink-500' : ''}`} />
                <span>Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={pathname === "/dashboard/settings"} 
              tooltip="Configuración"
              className={`hover:bg-pink-50 ${pathname === "/dashboard/settings" ? 'bg-pink-100 text-pink-600' : ''}`}
            >
              <Link href="/dashboard/settings">
                <Settings className={`h-5 w-5 ${pathname === "/dashboard/settings" ? 'text-pink-500' : ''}`} />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-pink-100 p-2">
        <Button variant="outline" className="w-full justify-start gap-2 border-pink-200 hover:bg-pink-50 hover:text-pink-600" asChild>
          <Link href="/logout">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

