import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Settings,
  LogOut,
  MoreVertical,
  Layout,
  Zap,
  Bell,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
  };
  onLogout?: () => void;
}

export function DashboardHeader({
  currentUser,
  onLogout,
}: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout?.();
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-montserrat">
                  Landing Page Builder
                </h1>
                <p className="text-sm text-gray-500">
                  Professional Social Recruiting Platform
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-md">
              <Zap className="w-3 h-3 mr-1" />
              Social Recruiting
            </Badge>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Help */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>

            {/* User info */}
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-700">
                Willkommen zurück,{" "}
                <span className="text-blue-600">
                  {currentUser?.name || "Administrator"}
                </span>
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("de-DE", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {currentUser?.role && (
                  <Badge variant="outline" className="text-xs">
                    {currentUser.role}
                  </Badge>
                )}
              </div>
            </div>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">
                      {currentUser?.name?.charAt(0) || "A"}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 border-b">
                  <p className="text-sm font-medium">
                    {currentUser?.name || "Administrator"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentUser?.email || "admin@example.com"}
                  </p>
                </div>
                <DropdownMenuItem onClick={() => navigate("/user-management")}>
                  <Users className="h-4 w-4 mr-2" />
                  Benutzerverwaltung
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Einstellungen
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Hilfe & Support
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
