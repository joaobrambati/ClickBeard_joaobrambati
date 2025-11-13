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
import { api, endpoints } from "@/lib/routeApi"
import { ApiResponse } from "@/interfaces/ApiResponse"
import { Especialidade } from "@/interfaces/Especialidade"
import { Barbeiro } from "@/interfaces/Barbeiro"

export default function NovoAgendamento() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [especialidade, setEspecialidade] = useState("")
  const [barbeiro, setBarbeiro] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [horario, setHorario] = useState("")

  const [especialidades, setEspecialidades] = useState<{ id: number; nome: string }[]>([])
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const resEsp = await api.get<ApiResponse<Especialidade[]>>(endpoints.especialidades.listar)
      if (resEsp.data.status && resEsp.data.dados) setEspecialidades(resEsp.data.dados)

      if (especialidade) {
        const resBarb = await api.get<ApiResponse<{ especialidade: string; barbeiros: Barbeiro[] }>>(
          endpoints.barbeirosEspecialidade.especialidadeEspecifica(Number(especialidade))
        )
        if (resBarb.data.status && resBarb.data.dados) {
          setBarbeiros(resBarb.data.dados.barbeiros)
        } else {
          setBarbeiros([])
        }
      } else {
        setBarbeiros([])
      }
    } catch (error) {
      toast.error("Erro ao carregar dados do servidor")
    }
  }
  fetchData()
}, [especialidade])


  useEffect(() => {
  const fetchHorarios = async () => {
    if (!barbeiro || !date) {
      setHorariosDisponiveis([])
      setHorario("")
      return
    }

    setHorario("")

    try {
      const dataStr = date.toISOString().split("T")[0] // yyyy-mm-dd
      const res = await api.get<string[]>(
        endpoints.agendamentos.horariosDisponiveis(Number(barbeiro), dataStr)
      )
      setHorariosDisponiveis(res.data)
    } catch (error) {
      toast.error("Erro ao carregar horários disponíveis")
      setHorariosDisponiveis([])
    }
  }

  fetchHorarios()
}, [barbeiro, date])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!especialidade || !barbeiro || !date || !horario) {
      toast.error("Preencha todos os campos")
      setLoading(false)
      return
    }

    try {
      const body = {
        usuarioId: Number(JSON.parse(localStorage.getItem("clickbeard-user") || "{}").id),
        barbeiroId: Number(barbeiro),
        especialidadeId: Number(especialidade),
        data: new Date(`${date.toISOString().split("T")[0]}T${horario}:00`).toISOString()
      }

      const res = await api.post<ApiResponse<any>>(endpoints.agendamentos.criar, body)

      if (res.data.status) {
        toast.success("Agendamento realizado com sucesso!")
        navigate("/meus-agendamentos")
      } else {
        toast.error(res.data.mensagem)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.mensagem || "Erro ao criar agendamento")
    } finally {
      setLoading(false)
    }
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
                      <Select
                        value={especialidade}
                        onValueChange={setEspecialidade}
                      >
                        <SelectTrigger id="especialidade">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {especialidades.map((esp) => (
                            <SelectItem key={esp.id} value={esp.id.toString()}>
                              {esp.nome}
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
                          {barbeiros.map((b) => (
                            <SelectItem key={b.id} value={b.id.toString()}>
                              {b.nome}
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
                        disabled={(d) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const dateToCheck = new Date(d);
                          dateToCheck.setHours(0, 0, 0, 0);
                          return dateToCheck < today;
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="horario">Horário</Label>
                      <Select
                        value={horario}
                        onValueChange={setHorario}
                        disabled={horariosDisponiveis.length === 0} // desativa se não tiver horários
                      >
                        <SelectTrigger id="horario">
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {horariosDisponiveis.map((h) => (
                            <SelectItem key={h} value={h}>
                              {h}
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
                        onClick={() => navigate("/home")}
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
  );
}
