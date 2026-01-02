import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  PartyPopper,
  Target,
  ClipboardCheck,
  Users,
  ArrowRight,
  Calendar,
  AlertCircle,
  Cake,
  Award,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const upcomingCelebrations = [
  { id: 1, name: "Maria Santos", type: "birthday", date: "Hoje", avatar: "" },
  { id: 2, name: "Carlos Oliveira", type: "anniversary", date: "Amanhã", years: 5, avatar: "" },
  { id: 3, name: "Ana Paula", type: "birthday", date: "Em 3 dias", avatar: "" },
];

const pendingCheckIns = [
  { id: 1, objective: "Aumentar NPS em 20%", daysOverdue: 3, owner: "João Silva" },
  { id: 2, objective: "Lançar nova feature", daysOverdue: 1, owner: "Maria Santos" },
];

const pendingReviews = [
  { id: 1, name: "Pedro Henrique", step: "Autoavaliação", deadline: "15/01/2025" },
  { id: 2, name: "Fernanda Lima", step: "Avaliação do Gestor", deadline: "18/01/2025" },
];

const newHires = [
  { id: 1, name: "Lucas Mendes", role: "Dev Frontend", startDate: "02/01/2025", avatar: "" },
  { id: 2, name: "Juliana Costa", role: "Product Designer", startDate: "05/01/2025", avatar: "" },
];

export default function Dashboard() {
  return (
    <MainLayout title="Início" subtitle="Visão geral da sua organização">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Colaboradores Ativos"
          value="247"
          change="+12 este mês"
          changeType="positive"
          icon={Users}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="OKRs em Andamento"
          value="38"
          change="72% encaminhados"
          changeType="positive"
          icon={Target}
          iconColor="bg-accent/10 text-accent"
        />
        <StatCard
          title="Avaliações Pendentes"
          value="12"
          change="Prazo: 20/01"
          changeType="neutral"
          icon={ClipboardCheck}
          iconColor="bg-warning/10 text-warning"
        />
        <StatCard
          title="Celebrações do Mês"
          value="15"
          change="3 aniversários hoje"
          changeType="positive"
          icon={PartyPopper}
          iconColor="bg-celebration-birthday/10 text-celebration-birthday"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Celebrações */}
        <Card className="card-interactive">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PartyPopper className="w-5 h-5 text-celebration-birthday" />
              Próximas Celebrações
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/celebracoes">
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingCelebrations.map((celebration) => (
                <div
                  key={celebration.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={celebration.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {celebration.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{celebration.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {celebration.type === "birthday" ? (
                        <>
                          <Cake className="w-3 h-3" /> Aniversário
                        </>
                      ) : (
                        <>
                          <Award className="w-3 h-3" /> {celebration.years} anos de empresa
                        </>
                      )}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {celebration.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Check-ins Atrasados */}
        <Card className="card-interactive">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Check-ins Atrasados
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/objetivos">
                Ver OKRs <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingCheckIns.map((checkin) => (
                <div
                  key={checkin.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-warning-light border border-warning/20"
                >
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Target className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{checkin.objective}</p>
                    <p className="text-xs text-muted-foreground">{checkin.owner}</p>
                  </div>
                  <Badge variant="outline" className="text-warning border-warning/30 text-xs">
                    {checkin.daysOverdue} dias atrasado
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Avaliações Pendentes */}
        <Card className="card-interactive">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-primary" />
              Avaliações Pendentes
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/desempenho/gerenciar">
                Gerenciar <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {review.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.step}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {review.deadline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Novos Colaboradores */}
        <Card className="card-interactive">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-celebration-welcome" />
              Novos no Time
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/gestao/colaboradores">
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {newHires.map((hire) => (
                <div
                  key={hire.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-success-light border border-success/20"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={hire.avatar} />
                    <AvatarFallback className="bg-success/10 text-success">
                      {hire.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{hire.name}</p>
                    <p className="text-xs text-muted-foreground">{hire.role}</p>
                  </div>
                  <Badge variant="outline" className="text-success border-success/30 text-xs">
                    Desde {hire.startDate}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
