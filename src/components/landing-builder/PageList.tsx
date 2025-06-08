import { useState } from "react";
import { LandingPage } from "@/types/landing-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Calendar,
  User,
  Settings,
} from "lucide-react";
import { formatDate } from "@/lib/storage";
import { useUsers } from "@/hooks/useUsers";

interface PageListProps {
  pages: LandingPage[];
  onEdit: (page: LandingPage) => void;
  onView: (page: LandingPage) => void;
  onDuplicate: (pageId: string) => void;
  onDelete: (pageId: string) => void;
}

export const PageList = ({
  pages,
  onEdit,
  onView,
  onDuplicate,
  onDelete,
}: PageListProps) => {
  const [deletePageId, setDeletePageId] = useState<string | null>(null);
  const { users } = useUsers();

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unbekannt";
  };

  const handleDelete = (pageId: string) => {
    onDelete(pageId);
    setDeletePageId(null);
  };

  const getPreviewUrl = (page: LandingPage) => {
    return `/jobs/${page.slug}`;
  };

  if (pages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Edit className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Keine Landing Pages vorhanden
            </h3>
            <p className="text-gray-500 max-w-sm">
              Erstellen Sie Ihre erste Landing Page für Social Recruiting.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages.map((page) => (
        <Card
          key={page.id}
          className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
        >
          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge
              variant={page.published ? "default" : "secondary"}
              className={`
                ${
                  page.published
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white shadow-lg
              `}
            >
              {page.published ? "Live" : "Entwurf"}
            </Badge>
          </div>

          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900 pr-16 leading-tight">
              {page.title}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(page.updatedAt)}</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Page Preview/Description */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 line-clamp-2">
                {page.header.text || "Keine Beschreibung verfügbar"}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  <span>{getUserName(page.createdBy)}</span>
                </div>
                <span>{page.blocks.length} Blöcke</span>
              </div>
            </div>

            {/* URL Preview */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">URL:</div>
              <code className="text-xs text-blue-600 font-mono break-all">
                /jobs/{page.slug}
              </code>
            </div>

            {/* Action Buttons - Always Visible */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => onEdit(page)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Bearbeiten
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onView(page)}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                Vorschau
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="px-3">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onDuplicate(page.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplizieren
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => window.open(getPreviewUrl(page), "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live ansehen
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Einstellungen
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeletePageId(page.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Löschen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>

          {/* Hover Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
      ))}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletePageId}
        onOpenChange={() => setDeletePageId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Landing Page löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Die Landing
              Page wird permanent gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePageId && handleDelete(deletePageId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
