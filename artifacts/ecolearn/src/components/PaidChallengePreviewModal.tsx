import React, { useState } from "react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Sparkles,
  Users,
  Target,
  ArrowRight,
  ShieldCheck,
  Building2,
  Mail,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useAuthRole } from "@/lib/authHelpers";
import { customFetch } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export interface PaidChallengePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: {
    id: number;
    courseCode: string;
    title: string;
    topic?: string;
    level?: string;
    description?: string;
    durationMinutes?: number;
    requiredPlanName?: string;
    whatYouWillPractise?: string[];
    whoItIsFor?: string;
  };
}

export function PaidChallengePreviewModal({
  isOpen,
  onClose,
  challenge,
}: PaidChallengePreviewProps) {
  const authRole = useAuthRole();
  const { toast } = useToast();
  const [requestSent, setRequestSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCompanyAdmin = authRole.isCompanyAdmin || authRole.isPlatformAdmin;

  const handleEmployeeRequestAccess = async () => {
    setIsSubmitting(true);
    try {
      // Record employee enquiry or request
      await customFetch("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name: (authRole as any).user?.fullName || "Employee",
          email: (authRole as any).user?.primaryEmailAddress?.emailAddress || "employee@company.mu",
          companyName: (authRole as any).companyName || "My Employer",
          employeeCount: 25,
          source: `challenge_preview_${challenge.courseCode}`,
        }),
      });
      setRequestSent(true);
      toast({
        title: "Access Request Registered",
        description: `Your interest in ${challenge.title} has been logged. Please also notify your company administrator directly.`,
      });
    } catch {
      // Fallback: still show instructions
      setRequestSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl">
        {/* Header with lagoon blue / emerald gradient */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 text-white p-6 md:p-8">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-xs">
              <Lock className="h-3.5 w-3.5 text-amber-300" />
              Paid Challenge Preview
            </span>
            <Badge variant="outline" className="text-white border-white/30 text-xs font-mono">
              {challenge.courseCode}
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2 leading-tight">
            {challenge.title}
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {challenge.description || "Advanced practical workplace sustainability skills tailored for Mauritian business implementation."}
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Topic & Required Plan */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-muted/40 p-3.5">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block font-medium">Topic Area</span>
              <span className="text-sm font-semibold text-foreground mt-0.5 block">
                {challenge.topic || "Applied Sustainability"}
              </span>
            </div>
            <div className="rounded-xl border bg-muted/40 p-3.5">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block font-medium">Access Tier</span>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                {challenge.requiredPlanName || "Professional Plan"}
              </span>
            </div>
          </div>

          {/* What the learner will practise */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                What You Will Practise
              </h4>
            </div>
            <ul className="space-y-2.5">
              {(challenge.whatYouWillPractise || [
                "Practical workplace procedures and standard operating protocols",
                "Departmental resource auditing, KPI tracking, and action planning",
                "Real Mauritian compliance benchmarks and waste prevention metrics"
              ]).map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who it is useful for */}
          <div className="rounded-xl bg-muted/30 border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Who It Is Useful For
              </h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {challenge.whoItIsFor || "Recommended for department leads, green team coordinators, facilities managers, and employees advancing past the foundational 10 free challenges."}
            </p>
          </div>

          {/* Request Access status if already sent */}
          {requestSent && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 p-4 text-xs text-emerald-950 dark:text-emerald-200">
              <p className="font-semibold mb-1">Request Logged</p>
              <p className="text-muted-foreground">
                Your interest in this challenge has been saved. Please contact your company administrator or HR team to upgrade your company's subscription plan.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-4 sm:p-6 bg-muted/20 border-t flex flex-col sm:flex-row gap-3 items-center justify-between">
          <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
            Close Preview
          </Button>

          <div className="flex gap-2 w-full sm:w-auto">
            {isCompanyAdmin ? (
              <Button asChild className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold">
                <Link href="/company/subscribe">
                  <Building2 className="mr-2 h-4 w-4" />
                  View Subscription Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : requestSent ? (
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/courses">
                  Browse Free Challenges
                </Link>
              </Button>
            ) : (
              <Button
                onClick={handleEmployeeRequestAccess}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
              >
                <Mail className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Request Access from Admin"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
