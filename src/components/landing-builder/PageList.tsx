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
              Keine Landingpages vorhanden
            </h3>
            <p className="text-gray-500 max-w-sm">
              Erstellen Sie Ihre erste Landingpage für Social Recruiting.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <Card key={page.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-lg">{page.title}</CardTitle>
              <Badge variant={page.published ? "default" : "secondary"}>
                {page.published ? "Veröffentlicht" : "Entwurf"}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(page)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Vorschau
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(page)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Bearbeiten
                </DropdownMenuItem>
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
                <DropdownMenuItem
                  onClick={() => setDeletePageId(page.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Löschen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Slug:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    /jobs/{page.slug}
                  </code>
                </span>
                <span>{page.blocks.length} Blöcke</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Erstellt von {getUserName(page.createdBy)}</span>
                <span>Zuletzt bearbeitet: {formatDate(page.updatedAt)}</span>
              </div>

              {page.header.text && (
                <p className="text-sm text-gray-700 line-clamp-2">
                  {page.header.text}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <AlertDialog
        open={!!deletePageId}
        onOpenChange={() => setDeletePageId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Landingpage löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie diese Landingpage löschen möchten? Diese
              Aktion kann nicht rückgängig gemacht werden.
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
