import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PartyPopper,
  Cake,
  Award,
  UserPlus,
  TrendingUp,
  Heart,
  MessageCircle,
  Send,
  Calendar,
  Settings,
  Plus,
  Image,
  Smile,
  AtSign,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const celebrations = [
  {
    id: 1,
    type: "birthday",
    author: null,
    target: { name: "Maria Santos", avatar: "", role: "Product Manager" },
    message: "🎂 Hoje é aniversário da Maria Santos! Desejamos muitas felicidades e um ano cheio de conquistas!",
    createdAt: "Hoje às 09:00",
    reactions: 24,
    comments: 8,
    isAutomatic: true,
  },
  {
    id: 2,
    type: "anniversary",
    author: null,
    target: { name: "Carlos Oliveira", avatar: "", role: "Tech Lead" },
    message: "🎉 Carlos Oliveira completa 5 anos de empresa hoje! Obrigado por toda a dedicação e contribuição para o nosso time!",
    createdAt: "Ontem às 09:00",
    reactions: 42,
    comments: 15,
    isAutomatic: true,
  },
  {
    id: 3,
    type: "manual",
    author: { name: "Ana Paula", avatar: "", role: "Head de RH" },
    target: { name: "Time de Produto", avatar: "" },
    message: "Parabéns ao time de Produto pelo lançamento incrível da nova feature! O trabalho de vocês foi excepcional e os resultados já estão aparecendo. 🚀",
    createdAt: "2 dias atrás",
    reactions: 56,
    comments: 12,
    isAutomatic: false,
  },
  {
    id: 4,
    type: "welcome",
    author: null,
    target: { name: "Lucas Mendes", avatar: "", role: "Dev Frontend" },
    message: "👋 Boas-vindas ao Lucas Mendes que está chegando hoje para o time de Engenharia! Seja bem-vindo à família!",
    createdAt: "3 dias atrás",
    reactions: 38,
    comments: 20,
    isAutomatic: true,
  },
  {
    id: 5,
    type: "promotion",
    author: { name: "Roberto Silva", avatar: "", role: "CEO" },
    target: { name: "Fernanda Lima", avatar: "", role: "Agora: Diretora de Design" },
    message: "🌟 É com grande alegria que anunciamos a promoção da Fernanda Lima para Diretora de Design! Sua trajetória é inspiradora e temos certeza de grandes conquistas pela frente!",
    createdAt: "1 semana atrás",
    reactions: 89,
    comments: 34,
    isAutomatic: false,
  },
];

const celebrationTypes = {
  birthday: { icon: Cake, label: "Aniversário", color: "celebration-birthday" },
  anniversary: { icon: Award, label: "Aniversário de Empresa", color: "celebration-anniversary" },
  welcome: { icon: UserPlus, label: "Boas-vindas", color: "celebration-welcome" },
  promotion: { icon: TrendingUp, label: "Promoção", color: "celebration-promotion" },
  manual: { icon: PartyPopper, label: "Celebração", color: "primary" },
};

export default function Celebrations() {
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <MainLayout
      title="Celebrações"
      subtitle="Comemore conquistas e momentos especiais do time"
      actions={
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Automações
        </Button>
      }
    >
      <div className="max-w-3xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
            <TabsTrigger value="automacoes">Automações</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Composer */}
            <Card className="card-interactive">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="Compartilhe uma celebração, reconhecimento ou mensagem especial..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <AtSign className="w-4 h-4 mr-1" />
                          Mencionar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Image className="w-4 h-4 mr-1" />
                          Mídia
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Agendar
                        </Button>
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-1" />
                          Publicar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="birthday">Aniversários</SelectItem>
                  <SelectItem value="anniversary">Tempo de Empresa</SelectItem>
                  <SelectItem value="welcome">Boas-vindas</SelectItem>
                  <SelectItem value="promotion">Promoções</SelectItem>
                  <SelectItem value="manual">Manuais</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feed */}
            <div className="space-y-4">
              {celebrations.map((celebration) => {
                const typeConfig = celebrationTypes[celebration.type as keyof typeof celebrationTypes];
                const TypeIcon = typeConfig.icon;

                return (
                  <Card
                    key={celebration.id}
                    className={cn(
                      "card-interactive overflow-hidden",
                      celebration.type === "birthday" && "celebration-birthday",
                      celebration.type === "anniversary" && "celebration-anniversary",
                      celebration.type === "welcome" && "celebration-welcome",
                      celebration.type === "promotion" && "celebration-promotion"
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={celebration.target.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {celebration.target.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">{celebration.target.name}</span>
                            {celebration.target.role && (
                              <span className="text-xs text-muted-foreground">
                                • {celebration.target.role}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="secondary"
                              className="text-xs flex items-center gap-1"
                            >
                              <TypeIcon className="w-3 h-3" />
                              {typeConfig.label}
                            </Badge>
                            {celebration.isAutomatic && (
                              <Badge variant="outline" className="text-xs">
                                Automático
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {celebration.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{celebration.message}</p>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Heart className="w-4 h-4 mr-1" />
                          {celebration.reactions}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {celebration.comments}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="agendadas">
            <Card className="card-interactive">
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma celebração agendada</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Agende celebrações para serem publicadas automaticamente
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Agendar Celebração
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automacoes">
            <Card className="card-interactive">
              <CardContent className="py-12 text-center">
                <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Configure suas automações</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Defina regras para celebrações automáticas de aniversários, tempo de empresa e mais
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Automação
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
