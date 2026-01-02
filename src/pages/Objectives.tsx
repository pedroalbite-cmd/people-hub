import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Target,
  Plus,
  Filter,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  MoreHorizontal,
  Calendar,
  Users,
  Building2,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const cycles = [
  { id: "q4-2024", name: "Q4 2024", status: "active" },
  { id: "q1-2025", name: "Q1 2025", status: "draft" },
];

const objectives = [
  {
    id: 1,
    title: "Aumentar satisfação do cliente",
    description: "Melhorar o NPS e reduzir churn rate",
    owner: { name: "Maria Santos", avatar: "", role: "Head de Produto" },
    department: "Produto",
    progress: 75,
    health: "on-track",
    keyResults: [
      { id: 1, title: "Aumentar NPS de 45 para 60", progress: 80, status: "on-track" },
      { id: 2, title: "Reduzir churn rate para menos de 5%", progress: 70, status: "on-track" },
      { id: 3, title: "Implementar 10 melhorias solicitadas", progress: 60, status: "at-risk" },
    ],
    tags: ["Clientes", "NPS"],
  },
  {
    id: 2,
    title: "Expandir presença no mercado",
    description: "Aumentar market share e receita recorrente",
    owner: { name: "Carlos Oliveira", avatar: "", role: "Diretor Comercial" },
    department: "Comercial",
    progress: 45,
    health: "at-risk",
    keyResults: [
      { id: 1, title: "Fechar 50 novos contratos enterprise", progress: 40, status: "at-risk" },
      { id: 2, title: "Aumentar MRR em 30%", progress: 55, status: "on-track" },
      { id: 3, title: "Entrar em 3 novos segmentos", progress: 33, status: "at-risk" },
    ],
    tags: ["Vendas", "Crescimento"],
  },
  {
    id: 3,
    title: "Melhorar eficiência operacional",
    description: "Otimizar processos e reduzir custos",
    owner: { name: "Ana Paula", avatar: "", role: "COO" },
    department: "Operações",
    progress: 85,
    health: "on-track",
    keyResults: [
      { id: 1, title: "Automatizar 80% dos processos manuais", progress: 90, status: "on-track" },
      { id: 2, title: "Reduzir tempo de onboarding em 40%", progress: 75, status: "on-track" },
      { id: 3, title: "Diminuir custos operacionais em 15%", progress: 85, status: "on-track" },
    ],
    tags: ["Eficiência", "Automação"],
  },
  {
    id: 4,
    title: "Desenvolver cultura de inovação",
    description: "Fomentar inovação e desenvolvimento de novos produtos",
    owner: { name: "Pedro Henrique", avatar: "", role: "CTO" },
    department: "Engenharia",
    progress: 30,
    health: "critical",
    keyResults: [
      { id: 1, title: "Lançar 2 novos produtos", progress: 25, status: "critical" },
      { id: 2, title: "Realizar 12 hackathons", progress: 40, status: "at-risk" },
      { id: 3, title: "Patentear 3 inovações", progress: 33, status: "critical" },
    ],
    tags: ["Inovação", "P&D"],
  },
];

const healthConfig = {
  "on-track": { label: "Encaminhado", icon: CheckCircle, class: "text-success bg-success-light" },
  "at-risk": { label: "Em Atenção", icon: AlertCircle, class: "text-warning bg-warning-light" },
  critical: { label: "Crítico", icon: Clock, class: "text-destructive bg-destructive-light" },
};

export default function Objectives() {
  const [expandedObjectives, setExpandedObjectives] = useState<number[]>([1]);
  const [selectedCycle, setSelectedCycle] = useState("q4-2024");

  const toggleExpanded = (id: number) => {
    setExpandedObjectives((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const stats = {
    total: objectives.length,
    avgProgress: Math.round(objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length),
    onTrack: objectives.filter((o) => o.health === "on-track").length,
    atRisk: objectives.filter((o) => o.health === "at-risk" || o.health === "critical").length,
  };

  return (
    <MainLayout
      title="Objetivos (OKRs)"
      subtitle="Gerencie os objetivos e resultados-chave da organização"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Objetivo
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total de Objetivos"
          value={stats.total}
          icon={Target}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Progresso Médio"
          value={`${stats.avgProgress}%`}
          icon={Target}
          iconColor="bg-accent/10 text-accent"
        />
        <StatCard
          title="Encaminhados"
          value={stats.onTrack}
          change={`${Math.round((stats.onTrack / stats.total) * 100)}% do total`}
          changeType="positive"
          icon={CheckCircle}
          iconColor="bg-success/10 text-success"
        />
        <StatCard
          title="Em Atenção"
          value={stats.atRisk}
          change="Requer ação"
          changeType="negative"
          icon={AlertCircle}
          iconColor="bg-warning/10 text-warning"
        />
      </div>

      {/* Filters Bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedCycle} onValueChange={setSelectedCycle}>
              <SelectTrigger className="w-[150px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cycles.map((cycle) => (
                  <SelectItem key={cycle.id} value={cycle.id}>
                    {cycle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar objetivos..." className="pl-10" />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros Avançados
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filtros Avançados</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Departamentos</label>
                    <div className="space-y-2">
                      {["Produto", "Comercial", "Engenharia", "Operações", "RH"].map((dept) => (
                        <div key={dept} className="flex items-center gap-2">
                          <Checkbox id={dept} />
                          <label htmlFor={dept} className="text-sm">{dept}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status de Saúde</label>
                    <div className="space-y-2">
                      {Object.entries(healthConfig).map(([key, config]) => (
                        <div key={key} className="flex items-center gap-2">
                          <Checkbox id={key} />
                          <label htmlFor={key} className="text-sm flex items-center gap-2">
                            <config.icon className="w-4 h-4" />
                            {config.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Progresso</label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="Min %" className="w-24" />
                      <span className="self-center text-muted-foreground">-</span>
                      <Input type="number" placeholder="Max %" className="w-24" />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">Limpar</Button>
                    <Button className="flex-1">Aplicar</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon">
              <Star className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Objectives List */}
      <div className="space-y-4">
        {objectives.map((objective) => {
          const isExpanded = expandedObjectives.includes(objective.id);
          const health = healthConfig[objective.health as keyof typeof healthConfig];
          const HealthIcon = health.icon;

          return (
            <Card key={objective.id} className="card-interactive overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleExpanded(objective.id)}
                    className="mt-1 p-1 hover:bg-secondary rounded transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-base">{objective.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {objective.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={objective.owner.avatar} />
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {objective.owner.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{objective.owner.name}</span>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {objective.department}
                      </Badge>
                      <Badge className={cn("flex items-center gap-1", health.class)}>
                        <HealthIcon className="w-3 h-3" />
                        {health.label}
                      </Badge>
                      {objective.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex-1">
                        <Progress
                          value={objective.progress}
                          className={cn(
                            "h-2",
                            objective.health === "on-track" && "[&>div]:bg-success",
                            objective.health === "at-risk" && "[&>div]:bg-warning",
                            objective.health === "critical" && "[&>div]:bg-destructive"
                          )}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {objective.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 pl-14">
                  <div className="border-t pt-4 space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">
                      Resultados-Chave ({objective.keyResults.length})
                    </h4>
                    {objective.keyResults.map((kr) => {
                      const krHealth = healthConfig[kr.status as keyof typeof healthConfig];
                      const KrHealthIcon = krHealth.icon;
                      
                      return (
                        <div
                          key={kr.id}
                          className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                        >
                          <Target className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{kr.title}</p>
                          </div>
                          <Badge className={cn("flex items-center gap-1 text-xs", krHealth.class)}>
                            <KrHealthIcon className="w-3 h-3" />
                            {kr.progress}%
                          </Badge>
                        </div>
                      );
                    })}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar KR
                      </Button>
                      <Button variant="outline" size="sm">
                        Fazer Check-in
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}
