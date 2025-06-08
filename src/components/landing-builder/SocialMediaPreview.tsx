import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Download, Copy } from "lucide-react";
import { LandingPage } from "@/types/landing-page";
import { toast } from "sonner";

interface SocialMediaPreviewProps {
  page: LandingPage;
}

export const SocialMediaPreview = ({ page }: SocialMediaPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pageUrl = `${window.location.origin}/jobs/${page.slug}`;
  const previewImage =
    page.header.image ||
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop";

  const generateSocialText = (platform: string) => {
    switch (platform) {
      case "facebook":
        return `🎯 Neue Stelle verfügbar: ${page.title}

${page.header.text}

Jetzt bewerben und Teil unseres Teams werden! 💼

#Jobs #Karriere #${page.title.replace(/\s+/g, "")}`;

      case "linkedin":
        return `Wir suchen Sie! 🚀

Position: ${page.title}
${page.header.text}

Interessiert? Bewerben Sie sich noch heute über unsere Landing Page.

#Recruiting #Karriere #Jobs #${page.title.replace(/\s+/g, "")}`;

      case "instagram":
        return `✨ Dream Job Alert! ✨

${page.title} gesucht! 

${page.header.text}

Swipe up oder Link in Bio für mehr Infos! 👆

#NewJob #Hiring #DreamTeam #${page.title.replace(/\s+/g, "")} #JobSearch`;

      case "twitter":
        return `🔥 ${page.title} gesucht!

${page.header.text}

Jetzt bewerben 👇

#Jobs #Hiring #${page.title.replace(/\s+/g, "")}`;

      default:
        return `Neue Stelle: ${page.title} - ${page.header.text}`;
    }
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(`${text}\n\n${pageUrl}`);
    toast.success(`${platform} Post kopiert!`);
  };

  const downloadPreviewImage = async () => {
    try {
      const response = await fetch(previewImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${page.slug}-preview.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Preview-Bild heruntergeladen!");
    } catch (error) {
      toast.error("Fehler beim Herunterladen des Bildes.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Social Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Social Media Preview Generator</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="facebook" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
          </TabsList>

          {/* Facebook Preview */}
          <TabsContent value="facebook">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                    Facebook Post
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-semibold">WWS-Strube</div>
                        <div className="text-xs text-gray-500">Gesponsert</div>
                      </div>
                    </div>

                    <p className="text-sm whitespace-pre-line">
                      {generateSocialText("facebook")}
                    </p>

                    <div className="border rounded overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3 bg-gray-50">
                        <div className="text-xs text-gray-500 uppercase">
                          {pageUrl}
                        </div>
                        <div className="font-semibold">{page.title}</div>
                        <div className="text-sm text-gray-600">
                          {page.header.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button
                  onClick={() =>
                    copyToClipboard(generateSocialText("facebook"), "Facebook")
                  }
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Facebook Post kopieren
                </Button>

                <Button
                  onClick={downloadPreviewImage}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Preview-Bild herunterladen
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* LinkedIn Preview */}
          <TabsContent value="linkedin">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-700 rounded"></div>
                    LinkedIn Post
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-semibold">WWS-Strube</div>
                        <div className="text-xs text-gray-500">
                          1.234 Follower
                        </div>
                      </div>
                    </div>

                    <p className="text-sm whitespace-pre-line">
                      {generateSocialText("linkedin")}
                    </p>

                    <div className="border rounded overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <div className="font-semibold">{page.title}</div>
                        <div className="text-sm text-gray-600">
                          {page.header.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {pageUrl}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button
                  onClick={() =>
                    copyToClipboard(generateSocialText("linkedin"), "LinkedIn")
                  }
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  LinkedIn Post kopieren
                </Button>

                <Button
                  onClick={downloadPreviewImage}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Preview-Bild herunterladen
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Instagram Preview */}
          <TabsContent value="instagram">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                    Instagram Post
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg overflow-hidden max-w-sm mx-auto">
                    <div className="flex items-center gap-3 p-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">wws_strube</div>
                      </div>
                    </div>

                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full aspect-square object-cover"
                    />

                    <div className="p-3">
                      <p className="text-sm whitespace-pre-line">
                        {generateSocialText("instagram")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button
                  onClick={() =>
                    copyToClipboard(
                      generateSocialText("instagram"),
                      "Instagram",
                    )
                  }
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Instagram Post kopieren
                </Button>

                <Button
                  onClick={downloadPreviewImage}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Quadratisches Bild herunterladen
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Twitter Preview */}
          <TabsContent value="twitter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-400 rounded"></div>
                    Twitter Post
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-4 space-y-3 max-w-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-semibold">WWS-Strube</div>
                        <div className="text-gray-500">@wws_strube</div>
                      </div>
                    </div>

                    <p className="text-sm whitespace-pre-line">
                      {generateSocialText("twitter")}
                    </p>

                    <div className="border rounded overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3 border-t">
                        <div className="text-sm font-semibold">
                          {page.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {page.header.text}
                        </div>
                        <div className="text-xs text-gray-500">{pageUrl}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button
                  onClick={() =>
                    copyToClipboard(generateSocialText("twitter"), "Twitter")
                  }
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Twitter Post kopieren
                </Button>

                <Button
                  onClick={downloadPreviewImage}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Preview-Bild herunterladen
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
