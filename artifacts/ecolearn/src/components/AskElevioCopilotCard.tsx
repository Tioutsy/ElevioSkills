import { useState } from "react";
import { customFetch } from "@workspace/api-client-react";
import {
  Sparkles,
  Send,
  Trash2,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CopilotActionCta {
  label: string;
  actionId?: string;
  courseCode?: string;
  link?: string;
}

export interface ManagementCopilotResponse {
  answer: string;
  sources: string[];
  evidencePeriod: string;
  confidence: "grounded" | "insufficient_evidence";
  suggestedActions?: CopilotActionCta[];
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  evidencePeriod?: string;
  confidence?: "grounded" | "insufficient_evidence";
  suggestedActions?: CopilotActionCta[];
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "What should I prioritise this month?",
  "Is our training automation working?",
  "Who is overdue on training and what should I do?",
  "Which department needs the most support?",
  "What management actions should I take next?",
];

export function AskElevioCopilotCard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || loading) return;

    setError(null);
    setInputQuery("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build previous turns history
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await customFetch<ManagementCopilotResponse>("/api/companies/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          history: historyPayload,
        }),
      });

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: res.answer,
        sources: res.sources,
        evidencePeriod: res.evidencePeriod,
        confidence: res.confidence,
        suggestedActions: res.suggestedActions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err?.message || "Failed to reach Ask Elevio AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-muted/40 border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base">Ask Elevio AI</h3>
              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                Management Copilot v1
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Grounded natural-language workforce intelligence assistant
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            className="text-xs text-muted-foreground hover:text-destructive gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear chat
          </Button>
        )}
      </div>

      {/* Main Chat Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground">
                How can I assist your executive decisions today?
              </h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-md">
                Ask questions about workforce readiness, knowledge gaps, department support needs, and prioritized training actions.
              </p>
            </div>

            {/* Suggested Starter Questions */}
            <div className="w-full max-w-lg mt-2 pt-2">
              <p className="text-xs font-medium text-muted-foreground mb-2.5 flex items-center justify-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" /> Suggested starter questions:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="text-xs bg-background border hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 shadow-2xs text-left"
                  >
                    <span>{q}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 text-sm max-w-[88%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-emerald-600 text-white"
                  )}
                >
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div className="space-y-2 min-w-0">
                  <div
                    className={cn(
                      "p-3.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted/60 text-foreground border rounded-tl-none shadow-2xs"
                    )}
                  >
                    {msg.content}
                  </div>

                  {/* Grounding Source & Confidence Badges */}
                  {msg.role === "assistant" && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="h-3 w-3" />
                          Grounded Evidence
                        </span>
                        {msg.sources && msg.sources.length > 0 && (
                          <span className="bg-background border px-2 py-0.5 rounded text-xs">
                            Sources: {msg.sources.map((s) => s.replace("_", " ")).join(", ")}
                          </span>
                        )}
                        {msg.evidencePeriod && (
                          <span className="bg-background border px-2 py-0.5 rounded text-xs">
                            Period: {msg.evidencePeriod}
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground ml-auto">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Actionable CTAs */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {msg.suggestedActions.map((action, i) => (
                            <a
                              key={i}
                              href={action.link || "/company/training-follow-up"}
                              className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-md transition-colors"
                            >
                              <span>{action.label}</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground p-2">
                <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 bg-muted/50 border px-3.5 py-2 rounded-xl text-xs">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                  <span>Evaluating live workforce evidence...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Bottom Input Area */}
      <div className="p-3 border-t bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Elevio AI about workforce gaps, readiness, or action priorities..."
            disabled={loading}
            className="flex-1 text-sm h-10"
          />
          <Button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white h-10 px-4 gap-1.5 shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span>Ask</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
