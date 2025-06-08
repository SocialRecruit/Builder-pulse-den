import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode, Download, Share2, Copy } from "lucide-react";
import { toast } from "sonner";

interface QRCodeGeneratorProps {
  pageUrl: string;
  pageTitle: string;
}

export const QRCodeGenerator = ({
  pageUrl,
  pageTitle,
}: QRCodeGeneratorProps) => {
  const [size, setSize] = useState("256");
  const [logoEnabled, setLogoEnabled] = useState(false);
  const [customText, setCustomText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateQRCodeUrl = () => {
    const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
    const params = new URLSearchParams({
      size: `${size}x${size}`,
      data: pageUrl,
      format: "png",
      margin: "10",
      color: "000000",
      bgcolor: "ffffff",
    });

    if (customText) {
      params.set("data", `${customText}\n${pageUrl}`);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const downloadQRCode = () => {
    const qrUrl = generateQRCodeUrl();
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `qr-code-${pageTitle.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR-Code heruntergeladen!");
  };

  const copyQRCodeUrl = () => {
    navigator.clipboard.writeText(generateQRCodeUrl());
    toast.success("QR-Code URL kopiert!");
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR-Code für ${pageTitle}`,
          text: `QR-Code für die Landing Page: ${pageTitle}`,
          url: pageUrl,
        });
      } catch (error) {
        console.log("Sharing cancelled");
      }
    } else {
      copyQRCodeUrl();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <QrCode className="h-4 w-4 mr-2" />
          QR-Code
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>QR-Code Generator</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Settings */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Einstellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input value={pageUrl} readOnly className="bg-gray-50" />
                </div>

                <div className="space-y-2">
                  <Label>Größe</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128 x 128 px</SelectItem>
                      <SelectItem value="256">256 x 256 px</SelectItem>
                      <SelectItem value="512">512 x 512 px</SelectItem>
                      <SelectItem value="1024">1024 x 1024 px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Zusätzlicher Text (optional)</Label>
                  <Input
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="z.B. Jetzt bewerben!"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button onClick={downloadQRCode} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                QR-Code herunterladen
              </Button>

              <Button
                onClick={shareQRCode}
                variant="outline"
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                QR-Code teilen
              </Button>

              <Button
                onClick={copyQRCodeUrl}
                variant="outline"
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                URL kopieren
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vorschau</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <img
                  src={generateQRCodeUrl()}
                  alt="QR Code"
                  className="mx-auto border rounded-lg shadow-sm"
                  style={{ width: Math.min(parseInt(size), 300) + "px" }}
                />

                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">{pageTitle}</h3>
                  {customText && (
                    <p className="text-sm text-gray-600">{customText}</p>
                  )}
                  <p className="text-xs text-gray-500 break-all">{pageUrl}</p>
                </div>
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">💡 Verwendungstipps</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p>• Drucken Sie den QR-Code auf Flyern oder Plakaten</p>
                <p>• Verwenden Sie ihn in Social Media Posts</p>
                <p>• Fügen Sie ihn in E-Mail-Signaturen ein</p>
                <p>• Nutzen Sie ihn bei Job-Messen und Events</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
