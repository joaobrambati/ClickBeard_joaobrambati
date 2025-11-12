import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { CalendarPlus, Calendar } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("clickbeard-user")
    if (!user) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">ClickBeard - Painel do Cliente</h1>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Bem-vindo ao ClickBeard</h2>
                <p className="text-muted-foreground">
                  Gerencie seus agendamentos de forma simples e rápida
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow border-border"
                  onClick={() => navigate("/novo-agendamento")}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <CalendarPlus className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Novo Agendamento</CardTitle>
                      <CardDescription>
                        Agende seu próximo atendimento
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow border-border"
                  onClick={() => navigate("/meus-agendamentos")}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Meus Agendamentos</CardTitle>
                      <CardDescription>
                        Veja seus agendamentos marcados
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Nossos Serviços</CardTitle>
                  <CardDescription>
                    Oferecemos diversos serviços de barbearia premium
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {["Corte na Tesoura", "Degradê", "Barba", "Sobrancelha", "Bigode", "Platinado"].map((service) => (
                    <div key={service} className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="font-medium">{service}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
