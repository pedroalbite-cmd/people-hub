import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Celebrations from "./pages/Celebrations";
import Objectives from "./pages/Objectives";
import Employees from "./pages/Employees";
import Reviews from "./pages/Reviews";
import OrgChart from "./pages/OrgChart";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/celebracoes" element={<Celebrations />} />
          <Route path="/objetivos" element={<Objectives />} />
          <Route path="/gestao/colaboradores" element={<Employees />} />
          <Route path="/gestao/organograma" element={<OrgChart />} />
          <Route path="/desempenho/autoavaliacoes" element={<Reviews />} />
          <Route path="/desempenho/gerenciar" element={<Reviews />} />
          <Route path="/desempenho/calibracao" element={<Placeholder />} />
          <Route path="/desempenho/resultados" element={<Placeholder />} />
          <Route path="/desenvolvimento/trilhas" element={<Placeholder />} />
          <Route path="/desenvolvimento/planos" element={<Placeholder />} />
          <Route path="/gamificacao" element={<Placeholder />} />
          <Route path="/pesquisas" element={<Placeholder />} />
          <Route path="/gestao/configuracoes" element={<Placeholder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
