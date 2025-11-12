import { useState } from "react"
import { Calendar, CalendarPlus, HomeIcon, LogOut, User } from "lucide-react"
import { NavLink } from "@/components/NavLink"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/Logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const menuItems = [
  { title: "Menu", url: "/home", icon: HomeIcon },
  { title: "Meus Agendamentos", url: "/meus-agendamentos", icon: Calendar },
  { title: "Novo Agendamento", url: "/novo-agendamento", icon: CalendarPlus },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("clickbeard-user") || '{"nome":"Usuário"}')

  const handleLogout = () => {
    localStorage.removeItem("clickbeard-user")
    localStorage.removeItem("clickbeard-token")
    toast.success("Logout realizado com sucesso!")
    navigate("/login")
  }

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.nome}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setOpen(true)}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
              <AlertDialogDescription>
                Você precisará fazer login novamente para acessar o sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Sair
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  )
}
