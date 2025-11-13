import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Calendar, Clock, User, Scissors, Trash2 } from "lucide-react"
import { format, differenceInHours, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { api, endpoints } from "@/lib/routeApi"
import { ApiResponse } from "@/interfaces/ApiResponse"
import { Agendamento } from "@/interfaces/Agendamento"

export default function MeusAgendamentosAdmin() {
  const navigate = useNavigate()
  const [agendamentosHoje, setAgendamentosHoje] = useState<Agendamento[]>([])
  const [agendamentosFuturo, setAgendamentosFuturo] = useState<Agendamento[]>([])

  useEffect(() => {
    const user = localStorage.getItem("clickbeard-user");
    if (!user) {
      navigate("/login");
    } else {
      const userId = JSON.parse(user).id;
      const fetchAgendamentosHoje = async () => {
        try {
          const res = await api.get<ApiResponse<Agendamento[]>>(
            endpoints.agendamentos.listarHoje
          );
          if (res.data.status && res.data.dados) {
            setAgendamentosHoje(res.data.dados);
          } else {
            setAgendamentosHoje([]);
            toast.error(res.data.mensagem);
          }
        } catch (error) {
          toast.error("Erro ao carregar agendamentos");
        }
      };
      fetchAgendamentosHoje();
    }
  }, [navigate])

  useEffect(() => {
    const user = localStorage.getItem("clickbeard-user");
    if (!user) {
      navigate("/login");
    } else {
      const userId = JSON.parse(user).id;
      const fetchAgendamentosFuturo = async () => {
        try {
          const res = await api.get<ApiResponse<Agendamento[]>>(
            endpoints.agendamentos.listarFuturo
          );
          if (res.data.status && res.data.dados) {
            setAgendamentosFuturo(res.data.dados);
          } else {
            setAgendamentosFuturo([]);
            toast.error(res.data.mensagem);
          }
        } catch (error) {
          toast.error("Erro ao carregar agendamentos");
        }
      };
      fetchAgendamentosFuturo();
    }
  }, [navigate])

  const handleCancelar = async (id?: number, data?: string) => {
    if (!id || !data) return;

    const agendamentoDate = parseISO(data);
    const hoursUntil = differenceInHours(agendamentoDate, new Date());

    if (hoursUntil < 2) {
      toast.error("Não é possível cancelar com menos de 2 horas de antecedência");
      return;
    }

    try {
      const res = await api.put<ApiResponse<any>>(endpoints.agendamentos.cancelar(id));

      if (res.data.status) {
        setAgendamentosHoje(prev => prev.filter(ag => ag.id !== id));
        toast.success("Agendamento cancelado com sucesso");
      } else {
        toast.error(res.data.mensagem || "Não foi possível cancelar o agendamento");
      }
    } catch (error) {
      toast.error("Erro ao cancelar o agendamento");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Meus Agendamentos</h1>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1>Hoje</h1>
              {agendamentosHoje.length === 0 ? (
                <Card className="border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum agendamento encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Você ainda não tem agendamentos marcados
                    </p>
                    <Button onClick={() => navigate("/novo-agendamento")}>
                      Fazer novo agendamento
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {agendamentosHoje.map((agendamento) => (
                    <Card key={agendamento.id} className="border-border">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Scissors className="h-5 w-5 text-primary" />
                              {agendamento.especialidade?.nome || "Serviço"}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              Agendado em {format(parseISO(agendamento.criadoEm), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {agendamento.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{format(parseISO(agendamento.data), "dd/MM/yyyy", { locale: ptBR })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{agendamento.data ? format(parseISO(agendamento.data), "HH:mm") : "-"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{agendamento.barbeiro?.nome}</span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelar(agendamento.id, agendamento.data)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Cancelar agendamento
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                <h1>Futuros</h1>
              {agendamentosFuturo.length === 0 ? (
                <Card className="border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum agendamento encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Você ainda não tem agendamentos marcados
                    </p>
                    <Button onClick={() => navigate("/novo-agendamento")}>
                      Fazer novo agendamento
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {agendamentosFuturo.map((agendamento) => (
                    <Card key={agendamento.id} className="border-border">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Scissors className="h-5 w-5 text-primary" />
                              {agendamento.especialidade?.nome || "Serviço"}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              Agendado em {format(parseISO(agendamento.criadoEm), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {agendamento.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{format(parseISO(agendamento.data), "dd/MM/yyyy", { locale: ptBR })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{agendamento.data ? format(parseISO(agendamento.data), "HH:mm") : "-"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{agendamento.barbeiro?.nome}</span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelar(agendamento.id, agendamento.data)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Cancelar agendamento
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
