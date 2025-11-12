import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"

const especialidades = [
  "Corte na Tesoura",
  "Degradê",
  "Barba",
  "Sobrancelha",
  "Bigode",
  "Platinado",
]

const barbeiros = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Pedro Santos" },
  { id: "3", name: "Carlos Oliveira" },
]

const horarios = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
]

export default function NovoAgendamento() {
  const navigate = useNavigate()
  const [especialidade, setEspecialidade] = useState("")
  const [barbeiro, setBarbeiro] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [horario, setHorario] = useState("")

  useEffect(() => {
    const user = localStorage.getItem("clickbeard-user")
    if (!user) {
      navigate("/login")
    }
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!especialidade || !barbeiro || !date || !horario) {
      toast.error("Preencha todos os campos")
      return
    }

    const agendamentos = JSON.parse(localStorage.getItem("clickbeard-agendamentos") || "[]")
    const novoAgendamento = {
      id: Date.now().toString(),
      especialidade,
      barbeiro,
      data: date.toISOString(),
      horario,
      createdAt: new Date().toISOString(),
    }

    agendamentos.push(novoAgendamento)
    localStorage.setItem("clickbeard-agendamentos", JSON.stringify(agendamentos))

    toast.success("Agendamento realizado com sucesso!")
    navigate("/meus-agendamentos")
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Novo Agendamento</h1>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-3xl mx-auto">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Agendar novo atendimento</CardTitle>
                  <CardDescription>
                    Escolha o serviço, barbeiro e horário desejado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="especialidade">Especialidade</Label>
                      <Select value={especialidade} onValueChange={setEspecialidade}>
                        <SelectTrigger id="especialidade">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {especialidades.map((esp) => (
                            <SelectItem key={esp} value={esp}>
                              {esp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barbeiro">Barbeiro</Label>
                      <Select value={barbeiro} onValueChange={setBarbeiro}>
                        <SelectTrigger id="barbeiro">
                          <SelectValue placeholder="Selecione um barbeiro" />
                        </SelectTrigger>
                        <SelectContent>
                          {barbeiros.map((barb) => (
                            <SelectItem key={barb.id} value={barb.name}>
                              {barb.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ptBR}
                        className="rounded-md border border-border w-fit"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="horario">Horário</Label>
                      <Select value={horario} onValueChange={setHorario}>
                        <SelectTrigger id="horario">
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {horarios.map((hora) => (
                            <SelectItem key={hora} value={hora}>
                              {hora}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1">
                        Confirmar Agendamento
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate("/dashboard")}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
