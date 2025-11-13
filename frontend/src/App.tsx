import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import NovoAgendamento from "./pages/NovoAgendamento";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import NotFound from "./pages/NotFound";
import Barbeiros from "./pages/Barbeiro";
import Usuarios from "./pages/Usuario";
import Especialidades from "./pages/Especialidade";
import MeusAgendamentosAdmin from "./pages/MeusAgendamentosAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/novo-agendamento" element={<NovoAgendamento />} />
            <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
            <Route path="/meus-agendamentos-admin" element={<MeusAgendamentosAdmin />} />
            <Route path="/barbeiros" element={<Barbeiros />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/especialidades" element={<Especialidades />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
