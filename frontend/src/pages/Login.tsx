import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { toast } from "sonner"
import { ApiResponse } from "@/interfaces/ApiResponse"
import { Usuario } from "@/interfaces/Usuario"
import { api, endpoints } from "@/lib/routeApi";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [senha, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !senha) {
      toast.error("Preencha todos os campos")
      setLoading(false)
      return
    }

    try{
      const response = await api.post<ApiResponse<{ token: string; usuario: Usuario }>>(
        endpoints.auth.login, { email, senha }
      )

      const { dados, mensagem, status } = response.data

      if (!status) {
        toast.error(mensagem || "Erro ao fazer login")
        setLoading(false)
        return
      }

      // Armazena token e usuário no localStorage
      localStorage.setItem("clickbeard-token", dados.token)
      localStorage.setItem("clickbeard-user", JSON.stringify(dados.usuario))

      toast.success("Login realizado com sucesso!")
      navigate("/home")
    } catch (error: any) {
      toast.error(error.response?.data?.mensagem || "Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-center text-2xl">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar o sistema
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Ainda não tem conta?{" "}
              <Link to="/cadastro" className="text-primary hover:underline font-medium">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
