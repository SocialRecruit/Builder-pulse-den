import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  Users,
} from "lucide-react";
import { useLandingPages } from "@/hooks/useLandingPages";
import { useUsers } from "@/hooks/useUsers";
import { formatDate } from "@/lib/storage";

interface Comment {
  id: string;
  pageId: string;
  userId: string;
  content: string;
  timestamp: string;
  resolved: boolean;
}

interface Activity {
  id: string;
  type: "created" | "edited" | "published" | "commented";
  pageId: string;
  userId: string;
  timestamp: string;
  description: string;
}

export default function Collaboration() {
  const navigate = useNavigate();
  const { pages } = useLandingPages();
  const { users, currentUser } = useUsers();

  const [activeTab, setActiveTab] = useState("activity");
  const [newComment, setNewComment] = useState("");
  const [selectedPageId, setSelectedPageId] = useState("");

  // Mock data for demonstration
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      pageId: pages[0]?.id || "",
      userId: users[0]?.id || "",
      content:
        'Der Header könnte emotionaler formuliert werden. Was denkst du über "Werde Teil unserer Erfolgsgeschichte"?',
      timestamp: new Date().toISOString(),
      resolved: false,
    },
    {
      id: "2",
      pageId: pages[0]?.id || "",
      userId: currentUser?.id || "",
      content: "Gute Idee! Ich teste das mal im A/B Test.",
      timestamp: new Date().toISOString(),
      resolved: true,
    },
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: "1",
      type: "created",
      pageId: pages[0]?.id || "",
      userId: currentUser?.id || "",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      description: "Hat eine neue Landing Page erstellt",
    },
    {
      id: "2",
      type: "edited",
      pageId: pages[0]?.id || "",
      userId: users[0]?.id || "",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      description: "Hat den Header-Text bearbeitet",
    },
    {
      id: "3",
      type: "commented",
      pageId: pages[0]?.id || "",
      userId: users[0]?.id || "",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      description: "Hat einen Kommentar hinzugefügt",
    },
  ]);

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unbekannt";
  };

  const getPageTitle = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    return page ? page.title : "Unbekannte Seite";
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "created":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "edited":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "published":
        return <AlertCircle className="h-4 w-4 text-purple-600" />;
      case "commented":
        return <MessageSquare className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPageId) return;
    // In a real app, this would add to the comments state/database
    setNewComment("");
    alert("Kommentar hinzugefügt! (Demo)");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Team Collaboration
              </h1>
              <Badge
                variant="outline"
                className="text-green-600 border-green-200"
              >
                Live Updates
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity & Comments */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="activity">Team Aktivität</TabsTrigger>
                <TabsTrigger value="comments">Kommentare</TabsTrigger>
              </TabsList>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Neueste Aktivitäten
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-shrink-0 mt-1">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">
                                {getUserName(activity.userId)}
                              </span>{" "}
                              {activity.description}{" "}
                              <span className="text-blue-600 font-medium">
                                "{getPageTitle(activity.pageId)}"
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(activity.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Team Kommentare
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3 p-4 border rounded-lg"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {getUserName(comment.userId).charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-sm">
                                {getUserName(comment.userId)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.timestamp)}
                              </span>
                              {comment.resolved && (
                                <Badge variant="secondary" className="text-xs">
                                  Gelöst
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">
                              {comment.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Zu: {getPageTitle(comment.pageId)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment Form */}
                    <div className="border-t pt-4">
                      <div className="space-y-3">
                        <select
                          value={selectedPageId}
                          onChange={(e) => setSelectedPageId(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Seite auswählen...</option>
                          {pages.map((page) => (
                            <option key={page.id} value={page.id}>
                              {page.title}
                            </option>
                          ))}
                        </select>

                        <Textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Kommentar hinzufügen..."
                          rows={3}
                        />

                        <Button
                          onClick={handleAddComment}
                          disabled={!newComment.trim() || !selectedPageId}
                          size="sm"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Kommentar senden
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Team Overview & Quick Actions */}
          <div className="space-y-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Mitglieder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.role === "admin" ? "Administrator" : "Editor"}
                        </p>
                      </div>
                      <div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        title="Online"
                      ></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Heute</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Neue Kommentare</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bearbeitete Seiten</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Aktive Nutzer</span>
                  <span className="font-semibold">{users.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Schnellaktionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate("/user-management")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Team verwalten
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => navigate("/analytics")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Collaboration Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Collaboration Tipps</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Verwenden Sie @-Mentions um Kollegen zu benachrichtigen</p>
                <p>• Markieren Sie Kommentare als gelöst nach Bearbeitung</p>
                <p>• Nutzen Sie A/B Tests für datenbasierte Entscheidungen</p>
                <p>• Teilen Sie Social Media Previews vor Veröffentlichung</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
