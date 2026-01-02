import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/desenvolvimento/trilhas": {
    title: "Trilhas de Desenvolvimento",
    subtitle: "Crie e gerencie trilhas de aprendizado para sua equipe",
  },
  "/desenvolvimento/planos": {
    title: "Planos de Desenvolvimento",
    subtitle: "Acompanhe PDIs e planos de carreira",
  },
  "/gamificacao": {
    title: "Gamificação",
    subtitle: "Sistema de pontos, badges e rankings",
  },
  "/pesquisas": {
    title: "Pesquisas",
    subtitle: "Crie e analise pesquisas de clima e engajamento",
  },
  "/gestao/configuracoes": {
    title: "Configurações",
    subtitle: "Configure preferências e integrações do sistema",
  },
  "/desempenho/autoavaliacoes": {
    title: "Autoavaliações",
    subtitle: "Responda suas avaliações pendentes",
  },
  "/desempenho/gerenciar": {
    title: "Gerenciar Avaliações",
    subtitle: "Administre ciclos e avaliações da sua equipe",
  },
  "/desempenho/calibracao": {
    title: "Comitês de Calibração",
    subtitle: "Participe de sessões de calibração",
  },
  "/desempenho/resultados": {
    title: "Resultados",
    subtitle: "Visualize resultados e relatórios de desempenho",
  },
};

export default function Placeholder() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || {
    title: "Página em Construção",
    subtitle: "Esta funcionalidade está sendo desenvolvida",
  };

  return (
    <MainLayout title={pageInfo.title} subtitle={pageInfo.subtitle}>
      <Card className="card-interactive">
        <CardContent className="py-16 text-center">
          <Construction className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-xl font-semibold mb-2">Em Desenvolvimento</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Estamos trabalhando nesta funcionalidade. Em breve ela estará disponível para uso.
          </p>
          <Button variant="outline">Receber Notificação</Button>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
