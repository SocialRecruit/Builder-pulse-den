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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Landing Page Builder
              </h1>
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-200"
              >
                Social Recruiting
              </Badge>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                Willkommen, {currentUser?.name}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/analytics")}>
                    <BarChart className="h-4 w-4 mr-2" />
                    Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/templates")}>
                    <Layout className="h-4 w-4 mr-2" />
                    Templates
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/collaboration")}>
                    <Users className="h-4 w-4 mr-2" />
                    Team Collaboration
                  </DropdownMenuItem>
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
                  <DropdownMenuItem onClick={handleLogout}>
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
      <main className="container mx-auto px-4 py-8">
        {/* Feature Shortcuts */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Schnellzugriff
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => navigate("/templates")}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-2"
            >
              <Layout className="h-8 w-8 text-purple-600" />
              <div className="text-center">
                <div className="font-semibold">Template Gallery</div>
                <div className="text-xs text-gray-600">
                  Vorgefertigte Designs
                </div>
              </div>
            </Button>

            <Button
              onClick={() => navigate("/analytics")}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-2"
            >
              <BarChart className="w-8 h-8 text-green-600 mb-3" />
              <Card
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/user-management")}
              >
                <Users className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900">Team</h3>
                <p className="text-sm text-gray-600">
                  Team-Mitglieder verwalten
                </p>
              </Card>

              <Card
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/button-gallery")}
              >
                <div className="w-8 h-8 text-orange-600 mb-3 text-2xl">🎨</div>
                <h3 className="font-semibold text-gray-900">Button Gallery</h3>
                <p className="text-sm text-gray-600">
                  Interaktive Button-Effekte testen
                </p>
              </Card>

              <Card
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/templates")}
              >
                <div className="w-8 h-8 text-cyan-600 mb-3 text-2xl">📋</div>
                <h3 className="font-semibold text-gray-900">Templates</h3>
                <p className="text-sm text-gray-600">
                  Vorgefertigte Vorlagen nutzen
                </p>
              </Card>
            </Button>

            <Button
              onClick={() => navigate("/user-management")}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-2"
            >
              <Users className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <div className="font-semibold">Team</div>
                <div className="text-xs text-gray-600">Benutzerverwaltung</div>
              </div>
            </Button>

            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="h-auto p-6 flex flex-col items-center space-y-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-8 w-8" />
              <div className="text-center">
                <div className="font-semibold">Neue Seite</div>
                <div className="text-xs opacity-90">Schnell erstellen</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gesamte Seiten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pages.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Veröffentlicht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pages.filter((p) => p.published).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entwürfe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pages.filter((p) => !p.published).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Diese Woche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  pages.filter((p) => {
                    const pageDate = new Date(p.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return pageDate > weekAgo;
                  }).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Seiten durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Neue Seite erstellen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neue Landing Page erstellen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seitentitel</label>
                  <Input
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="z.B. Museumsmitarbeiter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreatePage();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Abbrechen
                  </Button>
                  <Button
                    onClick={handleCreatePage}
                    disabled={!newPageTitle.trim()}
                  >
                    Erstellen
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pages List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Meine Landing Pages
            </h2>
            {pages.length > 0 && (
              <p className="text-sm text-gray-600">
                {filteredPages.length} von {pages.length} Seiten
              </p>
            )}
          </div>

          {/* Manual Page Cards if PageList fails */}
          {pages.length > 0 ? (
            <div className="space-y-4">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {page.title}
                      </h3>
                      <Badge variant={page.published ? "default" : "secondary"}>
                        {page.published ? "Veröffentlicht" : "Entwurf"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPage(page)}
                      >
                        Vorschau
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleEditPage(page)}
                      >
                        Bearbeiten
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      URL:{" "}
                      <code className="bg-gray-100 px-1 rounded text-xs">
                        /jobs/{page.slug}
                      </code>
                    </p>
                    <p>
                      Erstellt:{" "}
                      {new Date(page.createdAt).toLocaleDateString("de-DE")}
                    </p>
                    <p>Blöcke: {page.blocks.length}</p>
                    {page.header.text && (
                      <p className="text-gray-700 line-clamp-2 mt-2">
                        "{page.header.text}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Keine Landing Pages vorhanden
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Erstellen Sie Ihre erste Landing Page für Social Recruiting
                  oder probieren Sie ein Template aus.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Neue Seite erstellen
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/templates")}
                  >
                    Template verwenden
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
