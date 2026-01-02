import { useState, useCallback, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Search,
  Layers,
  Grid3X3,
  Plus,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock org data
const orgData = {
  id: "ceo",
  name: "Roberto Silva",
  role: "CEO",
  avatar: "",
  children: [
    {
      id: "cto",
      name: "Pedro Henrique",
      role: "CTO",
      avatar: "",
      children: [
        {
          id: "tech-lead-1",
          name: "Carlos Oliveira",
          role: "Tech Lead",
          avatar: "",
          children: [
            { id: "dev-1", name: "Lucas Mendes", role: "Dev Frontend", avatar: "" },
            { id: "dev-2", name: "Rafael Santos", role: "Dev Backend", avatar: "" },
            { id: "dev-3", name: "Amanda Lima", role: "Dev Full Stack", avatar: "" },
          ],
        },
        {
          id: "tech-lead-2",
          name: "Mariana Costa",
          role: "Tech Lead",
          avatar: "",
          children: [
            { id: "dev-4", name: "Bruno Ferreira", role: "Dev Mobile", avatar: "" },
            { id: "dev-5", name: "Camila Souza", role: "QA Engineer", avatar: "" },
          ],
        },
      ],
    },
    {
      id: "cpo",
      name: "Maria Santos",
      role: "CPO",
      avatar: "",
      children: [
        {
          id: "pm-1",
          name: "João Pedro",
          role: "Product Manager",
          avatar: "",
          children: [
            { id: "po-1", name: "Thiago Alves", role: "Product Owner", avatar: "" },
          ],
        },
      ],
    },
    {
      id: "design-dir",
      name: "Fernanda Lima",
      role: "Diretora de Design",
      avatar: "",
      children: [
        { id: "designer-1", name: "Juliana Costa", role: "Product Designer", avatar: "" },
        { id: "designer-2", name: "Gabriel Martins", role: "UX Designer", avatar: "" },
      ],
    },
    {
      id: "hr-head",
      name: "Ana Paula",
      role: "Head de RH",
      avatar: "",
      children: [
        { id: "hr-1", name: "Patricia Ramos", role: "People Partner", avatar: "" },
        { id: "hr-2", name: "Ricardo Nunes", role: "Talent Acquisition", avatar: "" },
      ],
    },
  ],
};

interface OrgNode {
  id: string;
  name: string;
  role: string;
  avatar: string;
  children?: OrgNode[];
}

function OrgNodeCard({ node, level = 0 }: { node: OrgNode; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div
        className={cn(
          "relative bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer min-w-[180px]",
          level === 0 && "border-primary bg-primary/5"
        )}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col items-center text-center">
          <Avatar className={cn("mb-2", level === 0 ? "h-14 w-14" : "h-12 w-12")}>
            <AvatarImage src={node.avatar} />
            <AvatarFallback
              className={cn(
                "text-sm",
                level === 0 ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              )}
            >
              {node.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-sm">{node.name}</p>
          <p className="text-xs text-muted-foreground">{node.role}</p>
        </div>
        {hasChildren && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full flex items-center justify-center text-xs border">
            {isExpanded ? "−" : node.children!.length}
          </div>
        )}
      </div>

      {/* Connection Lines & Children */}
      {hasChildren && isExpanded && (
        <>
          {/* Vertical line down */}
          <div className="w-0.5 h-6 bg-border" />

          {/* Horizontal line */}
          <div className="relative flex items-start">
            {node.children!.length > 1 && (
              <div
                className="absolute top-0 h-0.5 bg-border"
                style={{
                  left: "50%",
                  right: "50%",
                  marginLeft: `-${((node.children!.length - 1) * 100) / 2}px`,
                  marginRight: `-${((node.children!.length - 1) * 100) / 2}px`,
                  width: `${(node.children!.length - 1) * 200}px`,
                  transform: "translateX(-50%)",
                }}
              />
            )}
          </div>

          {/* Children */}
          <div className="flex gap-4 mt-0">
            {node.children!.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-border" />
                <OrgNodeCard node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function OrgChart() {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<"hierarchy" | "free">("hierarchy");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const handleReset = () => setZoom(100);

  return (
    <MainLayout
      title="Organograma"
      subtitle="Visualize a estrutura organizacional"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar Versão
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      }
    >
      {/* Toolbar */}
      <Card className="mb-4">
        <CardContent className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar pessoa..." className="pl-10 w-[250px]" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === "hierarchy" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("hierarchy")}
                >
                  <Layers className="w-4 h-4 mr-1" />
                  Hierárquico
                </Button>
                <Button
                  variant={viewMode === "free" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("free")}
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Livre
                </Button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 border rounded-lg p-1 ml-2">
                <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium px-2 min-w-[50px] text-center">{zoom}%</span>
                <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleReset}>
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas */}
      <Card className="min-h-[600px] overflow-hidden">
        <CardContent
          ref={containerRef}
          className="p-8 overflow-auto min-h-[600px]"
          style={{ cursor: "grab" }}
        >
          <div
            className="flex justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            {viewMode === "hierarchy" ? (
              <OrgNodeCard node={orgData} />
            ) : (
              <div className="text-center py-20">
                <Grid3X3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Modo Livre</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                  Arraste e solte cartões livremente para criar sua estrutura organizacional
                  personalizada
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Pessoa
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
