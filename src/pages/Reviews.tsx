import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClipboardCheck,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  ArrowRight,
  BarChart3,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const cycles = [
  {
    id: 1,
    name: "Avaliação de Desempenho - H2 2024",
    periodStart: "01/07/2024",
    periodEnd: "31/12/2024",
    status: "active",
    steps: [
      { name: "Autoavaliação", status: "completed", deadline: "15/01/2025", progress: 100 },
      { name: "Avaliação Gestor", status: "in_progress", deadline: "25/01/2025", progress: 45 },
      { name: "Avaliação Pares", status: "pending", deadline: "30/01/2025", progress: 0 },
      { name: "Calibração", status: "pending", deadline: "10/02/2025", progress: 0 },
      { name: "Devolutiva", status: "pending", deadline: "20/02/2025", progress: 0 },
    ],
    totalParticipants: 120,
    completedParticipants: 95,
  },
  {
    id: 2,
    name: "Avaliação de Competências Q4 2024",
    periodStart: "01/10/2024",
    periodEnd: "31/12/2024",
    status: "completed",
    steps: [
      { name: "Autoavaliação", status: "completed", deadline: "10/01/2025", progress: 100 },
      { name: "Avaliação Gestor", status: "completed", deadline: "15/01/2025", progress: 100 },
      { name: "Devolutiva", status: "completed", deadline: "25/01/2025", progress: 100 },
    ],
    totalParticipants: 120,
    completedParticipants: 120,
  },
];

const pendingReviews = [
  {
    id: 1,
    reviewee: { name: "Lucas Mendes", role: "Dev Frontend", avatar: "" },
    type: "Avaliação Gestor",
    cycle: "Avaliação de Desempenho - H2 2024",
    deadline: "25/01/2025",
    status: "pending",
  },
  {
    id: 2,
    reviewee: { name: "Juliana Costa", role: "Product Designer", avatar: "" },
    type: "Avaliação Gestor",
    cycle: "Avaliação de Desempenho - H2 2024",
    deadline: "25/01/2025",
    status: "pending",
  },
  {
    id: 3,
    reviewee: { name: "Carlos Oliveira", role: "Tech Lead", avatar: "" },
    type: "Avaliação de Par",
    cycle: "Avaliação de Desempenho - H2 2024",
    deadline: "30/01/2025",
    status: "pending",
  },
];

const competencies = [
  { name: "Foco no Cliente", description: "Prioriza as necessidades dos clientes" },
  { name: "Seja Inquieto", description: "Busca constantemente por inovação e melhoria" },
  { name: "Colaboração", description: "Trabalha efetivamente em equipe" },
  { name: "Entrega de Resultados", description: "Cumpre metas e objetivos estabelecidos" },
  { name: "Liderança", description: "Inspira e guia outros para o sucesso" },
];

export default function Reviews() {
  const [selectedCycle, setSelectedCycle] = useState("1");
  const activeCycle = cycles.find((c) => c.id.toString() === selectedCycle);

  return (
    <MainLayout
      title="Avaliações de Desempenho"
      subtitle="Gerencie ciclos de avaliação e acompanhe resultados"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Ciclo
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Ciclos Ativos"
          value="1"
          icon={ClipboardCheck}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Avaliações Pendentes"
          value="3"
          change="Prazo próximo"
          changeType="negative"
          icon={Clock}
          iconColor="bg-warning/10 text-warning"
        />
        <StatCard
          title="Taxa de Conclusão"
          value="79%"
          change="+12% esta semana"
          changeType="positive"
          icon={CheckCircle}
          iconColor="bg-success/10 text-success"
        />
        <StatCard
          title="Participantes"
          value="120"
          icon={Users}
          iconColor="bg-accent/10 text-accent"
        />
      </div>

      <Tabs defaultValue="ciclos">
        <TabsList className="mb-6">
          <TabsTrigger value="ciclos">Ciclos</TabsTrigger>
          <TabsTrigger value="minhas">Minhas Avaliações</TabsTrigger>
          <TabsTrigger value="competencias">Competências</TabsTrigger>
        </TabsList>

        <TabsContent value="ciclos" className="space-y-6">
          {/* Cycle Selector */}
          <div className="flex items-center gap-4">
            <Select value={selectedCycle} onValueChange={setSelectedCycle}>
              <SelectTrigger className="w-[350px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cycles.map((cycle) => (
                  <SelectItem key={cycle.id} value={cycle.id.toString()}>
                    {cycle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge
              className={cn(
                activeCycle?.status === "active"
                  ? "bg-success-light text-success"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {activeCycle?.status === "active" ? "Ativo" : "Concluído"}
            </Badge>
          </div>

          {/* Cycle Progress */}
          {activeCycle && (
            <Card className="card-interactive">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{activeCycle.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Período: {activeCycle.periodStart} - {activeCycle.periodEnd}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">
                      {Math.round(
                        (activeCycle.completedParticipants / activeCycle.totalParticipants) * 100
                      )}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activeCycle.completedParticipants}/{activeCycle.totalParticipants} concluídos
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Etapas do Ciclo</h4>
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-4">
                      {activeCycle.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4 relative">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center z-10",
                              step.status === "completed" && "bg-success text-success-foreground",
                              step.status === "in_progress" && "bg-primary text-primary-foreground",
                              step.status === "pending" && "bg-secondary text-muted-foreground"
                            )}
                          >
                            {step.status === "completed" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : step.status === "in_progress" ? (
                              <Clock className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-medium">{idx + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 pb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{step.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Prazo: {step.deadline}
                                </p>
                              </div>
                              <Badge
                                className={cn(
                                  step.status === "completed" && "bg-success-light text-success",
                                  step.status === "in_progress" && "bg-info-light text-info",
                                  step.status === "pending" && "bg-secondary text-muted-foreground"
                                )}
                              >
                                {step.status === "completed"
                                  ? "Concluído"
                                  : step.status === "in_progress"
                                  ? "Em andamento"
                                  : "Pendente"}
                              </Badge>
                            </div>
                            {step.status !== "pending" && (
                              <div className="mt-2 flex items-center gap-3">
                                <Progress
                                  value={step.progress}
                                  className={cn(
                                    "flex-1 h-2",
                                    step.status === "completed" && "[&>div]:bg-success",
                                    step.status === "in_progress" && "[&>div]:bg-primary"
                                  )}
                                />
                                <span className="text-sm font-medium w-12">{step.progress}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pending Reviews */}
          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Avaliações Pendentes</CardTitle>
              <Button variant="ghost" size="sm">
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={review.reviewee.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {review.reviewee.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{review.reviewee.name}</p>
                      <p className="text-sm text-muted-foreground">{review.reviewee.role}</p>
                    </div>
                    <Badge variant="outline">{review.type}</Badge>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {review.deadline}
                      </p>
                    </div>
                    <Button size="sm">Avaliar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="minhas">
          <Card className="card-interactive">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Sua autoavaliação foi concluída</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Aguarde a etapa de devolutiva para ver seus resultados
              </p>
              <Button variant="outline">Ver Resultados Anteriores</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competencias">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competencies.map((competency, idx) => (
              <Card key={idx} className="card-interactive">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{competency.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{competency.description}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">Limitado</Badge>
                        <Badge variant="outline">Entrega</Badge>
                        <Badge variant="outline">Referência</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
