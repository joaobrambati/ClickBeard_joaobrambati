import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { api, endpoints } from "@/lib/routeApi"
import { ApiResponse } from "@/interfaces/ApiResponse"
import { Especialidade } from "@/interfaces/Especialidade"

export default function Especialidades() {
  const navigate = useNavigate()
  const [especialidades, setUsuarios] = useState<Especialidade[]>([])

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await api.get<ApiResponse<Especialidade[]>>(endpoints.especialidades.listar)
        if (res.data.status && res.data.dados) {
          setUsuarios(res.data.dados)
        } else {
          toast.error(res.data.mensagem)
        }
      } catch (error) {
        toast.error("Erro ao carregar usuários")
      }
    }
    fetchUsuarios()
  }, [])

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Gerenciar Especialidades</h1>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Lista de Especialidades</CardTitle>
                </CardHeader>
                <CardContent>
                  {especialidades.length === 0 ? (
                    <p>Nenhuma especialidade encontrada</p>
                  ) : (
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="text-left border-b border-border">
                          <th className="py-2 px-4">Nome</th>
                          <th className="py-2 px-4">E-mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {especialidades.map((espec) => (
                          <tr key={espec.id} className="border-b border-border">
                            <td className="py-2 px-4">{espec.id}</td>
                            <td className="py-2 px-4">{espec.nome}</td>
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
