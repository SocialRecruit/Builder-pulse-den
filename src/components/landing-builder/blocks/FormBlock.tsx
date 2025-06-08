import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Mail, Settings, Palette } from "lucide-react";
import { toast } from "sonner";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "file" | "select";
  required: boolean;
  placeholder: string;
  options?: string; // For select fields, comma-separated
}

export interface EmailConfiguration {
  destinationEmail: string;
  enableAutoReply: boolean;
  autoReplySubject: string;
  autoReplyTemplate: string;
  senderName: string;
  senderEmail: string;
}

export interface EnhancedFormBlock {
  title: string;
  description?: string;
  fields: FormField[];
  submitButtonText: string;
  successMessage: string;
  emailConfig: EmailConfiguration;
  styling: {
    fieldSpacing: "compact" | "normal" | "relaxed";
    buttonStyle: "primary" | "secondary";
    alignment: "left" | "center" | "right";
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}

interface FormBlockEditorProps {
  content: EnhancedFormBlock;
  onUpdate: (content: EnhancedFormBlock) => void;
}

const defaultEmailConfig: EmailConfiguration = {
  destinationEmail: "",
  enableAutoReply: true,
  autoReplySubject: "Vielen Dank für Ihre Bewerbung",
  autoReplyTemplate: `Liebe/r {name},

vielen Dank für Ihre Bewerbung als {position}. Wir haben Ihre Unterlagen erhalten und werden diese sorgfältig prüfen.

Sie können davon ausgehen, dass wir uns innerhalb der nächsten 2 Wochen bei Ihnen melden.

Bei Fragen stehen wir Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen
{company}`,
  senderName: "HR Team",
  senderEmail: "",
};

const defaultFormBlock: EnhancedFormBlock = {
  title: "Bewerbungsformular",
  description: "Bitte füllen Sie alle Felder aus.",
  fields: [
    {
      id: "1",
      label: "Vollständiger Name",
      type: "text",
      required: true,
      placeholder: "Ihr Name",
    },
    {
      id: "2",
      label: "E-Mail-Adresse",
      type: "email",
      required: true,
      placeholder: "ihre.email@beispiel.de",
    },
    {
      id: "3",
      label: "Telefon",
      type: "tel",
      required: false,
      placeholder: "+49 123 456789",
    },
    {
      id: "4",
      label: "Anschreiben",
      type: "textarea",
      required: true,
      placeholder: "Erzählen Sie uns etwas über sich...",
    },
    {
      id: "5",
      label: "Lebenslauf",
      type: "file",
      required: true,
      placeholder: "",
    },
  ],
  submitButtonText: "Bewerbung senden",
  successMessage: "Vielen Dank! Ihre Bewerbung wurde erfolgreich gesendet.",
  emailConfig: defaultEmailConfig,
  styling: {
    fieldSpacing: "normal",
    buttonStyle: "primary",
    alignment: "left",
  },
};

export function FormBlockEditor({ content, onUpdate }: FormBlockEditorProps) {
  const [activeTab, setActiveTab] = useState("fields");

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: "Neues Feld",
      type: "text",
      required: false,
      placeholder: "",
    };
    onUpdate({
      ...content,
      fields: [...content.fields, newField],
    });
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    const updatedFields = content.fields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field,
    );
    onUpdate({ ...content, fields: updatedFields });
  };

  const removeField = (fieldId: string) => {
    const updatedFields = content.fields.filter(
      (field) => field.id !== fieldId,
    );
    onUpdate({ ...content, fields: updatedFields });
  };

  const updateEmailConfig = (updates: Partial<EmailConfiguration>) => {
    onUpdate({
      ...content,
      emailConfig: { ...content.emailConfig, ...updates },
    });
  };

  const updateStyling = (updates: Partial<EnhancedFormBlock["styling"]>) => {
    onUpdate({
      ...content,
      styling: { ...content.styling, ...updates },
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fields" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Felder
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            E-Mail
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Design
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="space-y-4">
          {/* Form Basic Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formular-Einstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Titel</Label>
                <Input
                  value={content.title}
                  onChange={(e) =>
                    onUpdate({ ...content, title: e.target.value })
                  }
                  placeholder="Formular-Titel"
                />
              </div>
              <div className="space-y-2">
                <Label>Beschreibung (optional)</Label>
                <Textarea
                  value={content.description || ""}
                  onChange={(e) =>
                    onUpdate({ ...content, description: e.target.value })
                  }
                  placeholder="Kurze Beschreibung des Formulars"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button-Text</Label>
                  <Input
                    value={content.submitButtonText}
                    onChange={(e) =>
                      onUpdate({ ...content, submitButtonText: e.target.value })
                    }
                    placeholder="Senden"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Erfolgsnachricht</Label>
                  <Input
                    value={content.successMessage}
                    onChange={(e) =>
                      onUpdate({ ...content, successMessage: e.target.value })
                    }
                    placeholder="Vielen Dank!"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Fields */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Formular-Felder</CardTitle>
              <Button onClick={addField} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Feld hinzufügen
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Feld #{index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(field.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) =>
                            updateField(field.id, { label: e.target.value })
                          }
                          placeholder="Feldname"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Typ</Label>
                        <Select
                          value={field.type}
                          onValueChange={(value: FormField["type"]) =>
                            updateField(field.id, { type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="email">E-Mail</SelectItem>
                            <SelectItem value="tel">Telefon</SelectItem>
                            <SelectItem value="textarea">
                              Textbereich
                            </SelectItem>
                            <SelectItem value="file">Datei-Upload</SelectItem>
                            <SelectItem value="select">Auswahl</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Platzhalter</Label>
                      <Input
                        value={field.placeholder}
                        onChange={(e) =>
                          updateField(field.id, { placeholder: e.target.value })
                        }
                        placeholder="Platzhalter-Text"
                      />
                    </div>

                    {field.type === "select" && (
                      <div className="space-y-2">
                        <Label>Auswahloptionen (kommagetrennt)</Label>
                        <Input
                          value={field.options || ""}
                          onChange={(e) =>
                            updateField(field.id, { options: e.target.value })
                          }
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.required}
                        onCheckedChange={(checked) =>
                          updateField(field.id, { required: checked })
                        }
                      />
                      <Label>Pflichtfeld</Label>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">E-Mail-Konfiguration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Empfänger E-Mail-Adresse</Label>
                <Input
                  type="email"
                  value={content.emailConfig.destinationEmail}
                  onChange={(e) =>
                    updateEmailConfig({ destinationEmail: e.target.value })
                  }
                  placeholder="bewerbung@unternehmen.de"
                />
                <p className="text-xs text-gray-500">
                  An diese Adresse werden die Bewerbungen gesendet.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Absender Name</Label>
                  <Input
                    value={content.emailConfig.senderName}
                    onChange={(e) =>
                      updateEmailConfig({ senderName: e.target.value })
                    }
                    placeholder="HR Team"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Absender E-Mail</Label>
                  <Input
                    type="email"
                    value={content.emailConfig.senderEmail}
                    onChange={(e) =>
                      updateEmailConfig({ senderEmail: e.target.value })
                    }
                    placeholder="noreply@unternehmen.de"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Automatische Antwort</CardTitle>
                <Switch
                  checked={content.emailConfig.enableAutoReply}
                  onCheckedChange={(checked) =>
                    updateEmailConfig({ enableAutoReply: checked })
                  }
                />
              </div>
            </CardHeader>
            {content.emailConfig.enableAutoReply && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Betreff</Label>
                  <Input
                    value={content.emailConfig.autoReplySubject}
                    onChange={(e) =>
                      updateEmailConfig({ autoReplySubject: e.target.value })
                    }
                    placeholder="Vielen Dank für Ihre Bewerbung"
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-Mail Vorlage</Label>
                  <Textarea
                    value={content.emailConfig.autoReplyTemplate}
                    onChange={(e) =>
                      updateEmailConfig({ autoReplyTemplate: e.target.value })
                    }
                    rows={8}
                    placeholder="E-Mail Vorlage..."
                  />
                  <div className="text-xs text-gray-500">
                    <p className="font-medium mb-1">Verfügbare Platzhalter:</p>
                    <p>• {"{name}"} - Name des Bewerbers</p>
                    <p>• {"{position}"} - Stellenbezeichnung</p>
                    <p>• {"{company}"} - Firmenname</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Design-Einstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Feld-Abstand</Label>
                  <Select
                    value={content.styling.fieldSpacing}
                    onValueChange={(value: "compact" | "normal" | "relaxed") =>
                      updateStyling({ fieldSpacing: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Kompakt</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="relaxed">Entspannt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Button-Stil</Label>
                  <Select
                    value={content.styling.buttonStyle}
                    onValueChange={(value: "primary" | "secondary") =>
                      updateStyling({ buttonStyle: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primär</SelectItem>
                      <SelectItem value="secondary">Sekundär</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ausrichtung</Label>
                <Select
                  value={content.styling.alignment}
                  onValueChange={(value: "left" | "center" | "right") =>
                    updateStyling({ alignment: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Links</SelectItem>
                    <SelectItem value="center">Zentriert</SelectItem>
                    <SelectItem value="right">Rechts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Hintergrundfarbe</Label>
                  <Input
                    type="color"
                    value={content.styling.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                      updateStyling({ backgroundColor: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Textfarbe</Label>
                  <Input
                    type="color"
                    value={content.styling.textColor || "#000000"}
                    onChange={(e) =>
                      updateStyling({ textColor: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Randfarbe</Label>
                  <Input
                    type="color"
                    value={content.styling.borderColor || "#e5e7eb"}
                    onChange={(e) =>
                      updateStyling({ borderColor: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Export default form block structure for creating new forms
export { defaultFormBlock };
