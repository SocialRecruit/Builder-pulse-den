import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Users,
  Settings,
  LogOut,
  MoreVertical,
  BarChart3 as BarChart,
  Layout,
  FlaskConical,
  TrendingUp,
  FileText,
  Calendar,
  Zap,
  Palette,
  Globe,
  Mail,
  Target,
} from "lucide-react";
import { PageList } from "@/components/landing-builder/PageList";
import { useLandingPages } from "@/hooks/useLandingPages";
import { useUsers } from "@/hooks/useUsers";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");

  const { pages, loading, createPage, duplicatePage, deletePage } =
    useLandingPages();
  const { currentUser, logout } = useUsers();

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreatePage = () => {
    if (!newPageTitle.trim()) return;

    const newPage = createPage(newPageTitle.trim());
    setNewPageTitle("");
    setIsCreateDialogOpen(false);
    navigate(`/page-builder/${newPage.id}`);
  };

  const handleEditPage = (page: any) => {
    navigate(`/page-builder/${page.id}`);
  };

  const handleViewPage = (page: any) => {
    navigate(`/jobs/${page.slug}`);
  };

  const handleDuplicatePage = (pageId: string) => {
    const duplicated = duplicatePage(pageId);
    if (duplicated) {
      navigate(`/page-builder/${duplicated.id}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Laden...</p>
          <p className="text-sm text-gray-400">Dashboard wird vorbereitet</p>
        </div>
      </div>
    );
  }

  const publishedPages = pages.filter((page) => page.published);
  const draftPages = pages.filter((page) => !page.published);
  const thisWeekPages = pages.filter((page) => {
    const pageDate = new Date(page.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return pageDate > weekAgo;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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

            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-700">
                  Willkommen zurück,{" "}
                  <span className="text-blue-600">
                    {currentUser?.name || "Administrator"}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("de-DE", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => navigate("/user-management")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Benutzerverwaltung
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Einstellungen
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 font-montserrat">
              Dashboard Übersicht
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verwalten Sie Ihre Landing Pages, analysieren Sie Performance und
              erstellen Sie neue Recruiting-Kampagnen
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Gesamte Seiten
                  </p>
                  <p className="text-3xl font-bold mt-1">{pages.length}</p>
                  <p className="text-blue-100 text-xs mt-1">
                    Landing Pages erstellt
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Veröffentlicht
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {publishedPages.length}
                  </p>
                  <p className="text-green-100 text-xs mt-1">Live und aktiv</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Entwürfe
                  </p>
                  <p className="text-3xl font-bold mt-1">{draftPages.length}</p>
                  <p className="text-orange-100 text-xs mt-1">In Bearbeitung</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Diese Woche
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {thisWeekPages.length}
                  </p>
                  <p className="text-purple-100 text-xs mt-1">Neue Seiten</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 font-montserrat">
            Schnellzugriff
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Create New Page - Hero Card */}
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Neue Seite</h4>
                    <p className="text-white/80 text-sm">Schnell erstellen</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Neue Landing Page erstellen
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Seitentitel
                    </label>
                    <Input
                      placeholder="z.B. Marketing Manager (m/w/d)"
                      value={newPageTitle}
                      onChange={(e) => setNewPageTitle(e.target.value)}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Abbrechen
                    </Button>
                    <Button
                      onClick={handleCreatePage}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Erstellen
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Analytics */}
            <Card
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => navigate("/analytics")}
            >
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <BarChart className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Analytics
                </h4>
                <p className="text-gray-600 text-sm">
                  Performance-Daten einsehen
                </p>
              </CardContent>
            </Card>

            {/* Button Gallery */}
            <Card
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => navigate("/button-gallery")}
            >
              <CardContent className="p-8 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                  <Palette className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Button Gallery
                </h4>
                <p className="text-gray-600 text-sm">
                  Interaktive Button-Effekte testen
                </p>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => navigate("/templates")}
            >
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                  <Layout className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Templates
                </h4>
                <p className="text-gray-600 text-sm">
                  Vorgefertigte Vorlagen nutzen
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Tools */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 font-montserrat">
            Erweiterte Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => navigate("/user-management")}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Team-Management</h4>
                    <p className="text-gray-600 text-sm">
                      Benutzer und Rollen verwalten
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => navigate("/header-demo")}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                    <Layout className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Header Demo</h4>
                    <p className="text-gray-600 text-sm">
                      Neues Header-Design testen
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">A/B Testing</h4>
                    <p className="text-gray-600 text-sm">
                      Performance optimieren
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pages List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 font-montserrat">
              Ihre Landing Pages
            </h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Seiten durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 w-64 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-0">
              <PageList
                pages={filteredPages}
                onEdit={handleEditPage}
                onView={handleViewPage}
                onDuplicate={handleDuplicatePage}
                onDelete={deletePage}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
