import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Building2,
  Cake,
  Calendar,
  MapPin,
  Linkedin,
  LayoutGrid,
  List,
  Filter,
  UserPlus,
  Briefcase,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const employees = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    phone: "+55 11 99999-9999",
    role: "Product Manager",
    department: "Produto",
    location: "São Paulo, SP",
    birthday: "15/03",
    hireDate: "10/01/2020",
    yearsAtCompany: 5,
    avatar: "",
    status: "active",
    skills: ["Product Strategy", "Agile", "UX Research"],
    squads: [
      { name: "Squad Core", role: "Product Owner" },
      { name: "Projeto Alpha", role: "Sponsor" },
    ],
    manager: "Carlos Oliveira",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    email: "carlos.oliveira@empresa.com",
    phone: "+55 11 98888-8888",
    role: "Tech Lead",
    department: "Engenharia",
    location: "São Paulo, SP",
    birthday: "22/07",
    hireDate: "05/03/2019",
    yearsAtCompany: 6,
    avatar: "",
    status: "active",
    skills: ["React", "Node.js", "AWS", "Leadership"],
    squads: [
      { name: "Squad Plataforma", role: "Tech Lead" },
    ],
    manager: "Pedro Henrique",
  },
  {
    id: 3,
    name: "Ana Paula",
    email: "ana.paula@empresa.com",
    phone: "+55 11 97777-7777",
    role: "Head de RH",
    department: "Recursos Humanos",
    location: "Rio de Janeiro, RJ",
    birthday: "08/11",
    hireDate: "15/06/2018",
    yearsAtCompany: 7,
    avatar: "",
    status: "active",
    skills: ["People Management", "Talent Acquisition", "Culture"],
    squads: [],
    manager: "Roberto Silva",
  },
  {
    id: 4,
    name: "Pedro Henrique",
    email: "pedro.henrique@empresa.com",
    phone: "+55 11 96666-6666",
    role: "CTO",
    department: "Engenharia",
    location: "São Paulo, SP",
    birthday: "30/01",
    hireDate: "01/01/2017",
    yearsAtCompany: 8,
    avatar: "",
    status: "active",
    skills: ["Architecture", "Strategy", "Engineering Management"],
    squads: [],
    manager: null,
  },
  {
    id: 5,
    name: "Fernanda Lima",
    email: "fernanda.lima@empresa.com",
    phone: "+55 11 95555-5555",
    role: "Diretora de Design",
    department: "Design",
    location: "São Paulo, SP",
    birthday: "12/09",
    hireDate: "20/08/2019",
    yearsAtCompany: 5,
    avatar: "",
    status: "active",
    skills: ["Design System", "Leadership", "Brand Strategy"],
    squads: [
      { name: "Design Core", role: "Design Lead" },
    ],
    manager: "Roberto Silva",
  },
  {
    id: 6,
    name: "Lucas Mendes",
    email: "lucas.mendes@empresa.com",
    phone: "+55 11 94444-4444",
    role: "Dev Frontend",
    department: "Engenharia",
    location: "Belo Horizonte, MG",
    birthday: "05/05",
    hireDate: "02/01/2025",
    yearsAtCompany: 0,
    avatar: "",
    status: "active",
    skills: ["React", "TypeScript", "CSS"],
    squads: [
      { name: "Squad Plataforma", role: "Frontend Dev" },
    ],
    manager: "Carlos Oliveira",
  },
];

const departments = ["Todos", "Engenharia", "Produto", "Design", "Recursos Humanos", "Comercial"];

export default function Employees() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Todos");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "Todos" || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <MainLayout
      title="Colaboradores"
      subtitle={`${employees.length} pessoas na organização`}
      actions={
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar Colaborador
        </Button>
      }
    >
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, cargo ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <Building2 className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>

            <div className="flex items-center border rounded-lg p-1 ml-auto">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Grid/List */}
      <div
        className={cn(
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "space-y-3"
        )}
      >
        {filteredEmployees.map((employee) => (
          <Dialog key={employee.id}>
            <DialogTrigger asChild>
              <Card
                className="card-interactive cursor-pointer"
                onClick={() => setSelectedEmployee(employee)}
              >
                <CardContent className={cn("p-5", view === "list" && "flex items-center gap-4")}>
                  {view === "grid" ? (
                    <>
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-3">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="text-lg bg-primary/10 text-primary">
                            {employee.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                        <Badge variant="secondary" className="mt-2">
                          {employee.department}
                        </Badge>
                      </div>
                      <div className="mt-4 pt-4 border-t space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{employee.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Cake className="w-4 h-4" />
                          <span>{employee.birthday}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {employee.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {employee.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{employee.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {employee.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                      <Badge variant="secondary">{employee.department}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{employee.location}</span>
                      </div>
                      <div className="flex gap-1">
                        {employee.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Perfil do Colaborador</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                      {employee.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{employee.name}</h2>
                    <p className="text-muted-foreground">{employee.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge>{employee.department}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {employee.yearsAtCompany} anos
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Cake className="w-4 h-4 text-muted-foreground" />
                    <span>Aniversário: {employee.birthday}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Desde: {employee.hireDate}</span>
                  </div>
                  {employee.manager && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Gestor: {employee.manager}</span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Squads & Projects */}
                <Tabs defaultValue="squads">
                  <TabsList>
                    <TabsTrigger value="squads">Squads & Projetos</TabsTrigger>
                    <TabsTrigger value="okrs">OKRs</TabsTrigger>
                    <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                  </TabsList>
                  <TabsContent value="squads" className="mt-4">
                    {employee.squads.length > 0 ? (
                      <div className="space-y-2">
                        {employee.squads.map((squad, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                          >
                            <Briefcase className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{squad.name}</p>
                              <p className="text-xs text-muted-foreground">{squad.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Nenhum squad ou projeto associado
                      </p>
                    )}
                  </TabsContent>
                  <TabsContent value="okrs" className="mt-4">
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhum OKR ativo
                    </p>
                  </TabsContent>
                  <TabsContent value="avaliacoes" className="mt-4">
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhuma avaliação recente
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </MainLayout>
  );
}
