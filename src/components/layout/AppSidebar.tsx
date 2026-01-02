import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  PartyPopper,
  Target,
  Users,
  GitBranch,
  Settings,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Gamepad2,
  ClipboardList,
  BarChart3,
  UserCheck,
  Scale,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  children?: { label: string; path: string }[];
}

const navigationItems: NavItem[] = [
  { label: "Início", path: "/", icon: Home },
  { label: "Celebrações", path: "/celebracoes", icon: PartyPopper },
  {
    label: "Desenvolvimento",
    icon: BookOpen,
    children: [
      { label: "Trilhas", path: "/desenvolvimento/trilhas" },
      { label: "Planos de Desenvolvimento", path: "/desenvolvimento/planos" },
    ],
  },
  { label: "Objetivos (OKRs)", path: "/objetivos", icon: Target },
  { label: "Gamificação", path: "/gamificacao", icon: Gamepad2 },
  { label: "Pesquisas", path: "/pesquisas", icon: ClipboardList },
  {
    label: "Gestão",
    icon: Users,
    children: [
      { label: "Colaboradores", path: "/gestao/colaboradores" },
      { label: "Organograma", path: "/gestao/organograma" },
      { label: "Configurações", path: "/gestao/configuracoes" },
    ],
  },
  {
    label: "Desempenho",
    icon: BarChart3,
    children: [
      { label: "Autoavaliações", path: "/desempenho/autoavaliacoes" },
      { label: "Gerenciar Avaliações", path: "/desempenho/gerenciar" },
      { label: "Comitês de Calibração", path: "/desempenho/calibracao" },
      { label: "Resultados", path: "/desempenho/resultados" },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Gestão", "Desempenho"]);
  const [collapsed, setCollapsed] = useState(false);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children?: { path: string }[]) =>
    children?.some((child) => location.pathname === child.path);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">PeopleHub</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <li key={item.label}>
              {item.path ? (
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isParentActive(item.children)
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed &&
                      (expandedItems.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </button>
                  {!collapsed && expandedItems.includes(item.label) && item.children && (
                    <ul className="mt-1 ml-4 space-y-1 border-l border-sidebar-border pl-4">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-lg text-sm transition-colors",
                              isActive(child.path)
                                ? "bg-sidebar-accent text-sidebar-primary font-medium"
                                : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-accent-foreground">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">João Silva</p>
              <p className="text-xs text-sidebar-muted truncate">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
