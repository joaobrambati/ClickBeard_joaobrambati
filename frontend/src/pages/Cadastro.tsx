import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { toast } from "sonner"
import { api, endpoints } from "@/lib/routeApi";
import { ApiResponse } from "@/interfaces/ApiResponse"
import { Usuario } from "@/interfaces/Usuario"

export default function Cadastro() {
  const navigate = useNavigate()
  const [nome, setName] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!nome || !email || !senha || !confirmPassword) {
      toast.error("Preencha todos os campos")
      setLoading(false)
      return
    }

    if (senha !== confirmPassword) {
      toast.error("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres")
      setLoading(false)
      return
    }

    setLoading(true)

    try{
      const response = await api.post<ApiResponse<{ token: string, usuario: Usuario }>>(
        endpoints.auth.register, { nome, email, senha }
      )

      if (!response.data.status)
        return toast.error(response.data.mensagem || "Erro ao cadastrar usuário")     

      toast.success("Usuário cadastrado com sucesso!")
      navigate("/login")
    } catch (error: any){
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
          <CardTitle className="text-center text-2xl">Criar conta</CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Voltar para o login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
