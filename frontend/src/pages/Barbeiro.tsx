import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Trash2, Edit2 } from "lucide-react"
import { api, endpoints } from "@/lib/routeApi"
import { ApiResponse } from "@/interfaces/ApiResponse"
import { Barbeiro } from "@/interfaces/Barbeiro"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function Barbeiros() {
  const navigate = useNavigate()
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([])

  useEffect(() => {
    const fetchBarbeiros = async () => {
      try {
        const res = await api.get<ApiResponse<Barbeiro[]>>(endpoints.barbeiros.listar)
        if (res.data.status && res.data.dados) {
          setBarbeiros(res.data.dados)
        } else {
          toast.error(res.data.mensagem)
        }
      } catch (error) {
        toast.error("Erro ao carregar barbeiros")
      }
    }
    fetchBarbeiros()
  }, [])

  const handleExcluir = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este barbeiro?")) return

    try {
      const res = await api.delete<ApiResponse<any>>(endpoints.barbeiros.excluir(id))
      if (res.data.status) {
        setBarbeiros(prev => prev.filter(b => b.id !== id))
        toast.success("Barbeiro excluído com sucesso")
      } else {
        toast.error(res.data.mensagem || "Não foi possível excluir o barbeiro")
      }
    } catch (error) {
      toast.error("Erro ao excluir barbeiro")
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
              <h1 className="text-xl font-semibold">Gerenciar Barbeiros</h1>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Lista de Barbeiros</CardTitle>
                </CardHeader>
                <CardContent>
                  {barbeiros.length === 0 ? (
                    <p>Nenhum barbeiro encontrado</p>
                  ) : (
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="text-left border-b border-border">
                          <th className="py-2 px-4">Nome</th>
                          <th className="py-2 px-4">Idade</th>
                          <th className="py-2 px-4">Data Contratação</th>
                          <th className="py-2 px-4">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {barbeiros.map((barbeiro) => (
                          <tr key={barbeiro.id} className="border-b border-border">
                            <td className="py-2 px-4">{barbeiro.nome}</td>
                            <td className="py-2 px-4">{barbeiro.idade || "-"}</td>
                            <td className="py-2 px-4">
                              {barbeiro.dataContratacao
                                ? format(parseISO(barbeiro.dataContratacao), "dd/MM/yyyy", { locale: ptBR })
                                : "-"}
                            </td>
                            <td className="py-2 px-4 flex gap-2">
                              <Button size="sm" variant="destructive" onClick={() => handleExcluir(barbeiro.id)}>
                                <Trash2 className="h-4 w-4" />
                                Excluir
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
