import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Building2,
  BookOpen,
  BarChart3,
  Mail,
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@clerk/react";
import { useState, useEffect } from "react";
import { customFetch } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import {
  CANONICAL_EMPLOYEE_BANDS,
  INDICATIVE_CALCULATION_NOTE,
  BillingInterval,
  EmployeeBandConfig,
} from "@/config/pricing";
import { useLanguage } from "@/context/LanguageContext";
import { trackCommercialEvent, captureAndPersistAttribution } from "@/lib/commercialAnalytics";

interface PublicPriceRecord {
  id: number;
  bandCode: string;
  monthlyAmountMUR: number | null;
  yearlyAmountMUR: number | null;
  yearlySavingsMUR?: number;
  yearlyEquivalentMonthlyMUR?: number | null;
  requiresTailoredQuote: boolean;
}

export default function Pricing() {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("MONTHLY");
  const [selectedBandCode, setSelectedBandCode] = useState<string>("UP_TO_25");
  const [serverBands, setServerBands] = useState<EmployeeBandConfig[]>(CANONICAL_EMPLOYEE_BANDS);

  useEffect(() => {
    let isMounted = true;
    captureAndPersistAttribution();
    const searchParams = new URLSearchParams(window.location.search);
    const internalSource = searchParams.get("source") || "direct";

    trackCommercialEvent("pricing_viewed", {
      source: internalSource,
      authenticatedState: isSignedIn ? "authenticated" : "anonymous",
    });

    customFetch<{ employeeBands: any[]; prices: PublicPriceRecord[] }>("/api/subscriptions/public-plans")
      .then((res) => {
        if (isMounted && res && res.employeeBands && res.employeeBands.length > 0) {
          const mapped: EmployeeBandConfig[] = res.employeeBands.map((b) => {
            const price = res.prices?.find((p) => p.bandCode === b.code);
            const monthlyAmount = price?.monthlyAmountMUR !== undefined ? price.monthlyAmountMUR : null;
            const yearlyAmount = price?.yearlyAmountMUR !== undefined ? price.yearlyAmountMUR : (monthlyAmount ? Math.round(monthlyAmount * 12 * 0.9) : null);
            const fallbackConfig = CANONICAL_EMPLOYEE_BANDS.find((cb) => cb.code === b.code);

            return {
              code: b.code,
              label: b.label,
              minEmployees: b.minimumEmployees,
              maxEmployees: b.maximumEmployees,
              monthlyPriceMUR: monthlyAmount,
              yearlyPriceMUR: yearlyAmount,
              requiresTailoredQuote: b.requiresTailoredQuote || b.code === "OVER_120",
              indicativePerEmployeeCopy: fallbackConfig?.indicativePerEmployeeCopy || "Transparent corporate pricing",
            };
          });
          setServerBands(mapped);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [isSignedIn]);

  const handleSelectBand = (bandCode: string) => {
    setSelectedBandCode(bandCode);
    trackCommercialEvent("subscription_band_selected", {
      companySizeBand: bandCode,
      billingCycle: billingInterval,
      source: new URLSearchParams(window.location.search).get("source") || "direct",
      authenticatedState: isSignedIn ? "authenticated" : "anonymous",
    });
  };

  const handleIntervalChange = (newInterval: BillingInterval) => {
    setBillingInterval(newInterval);
    trackCommercialEvent("subscription_band_selected", {
      companySizeBand: selectedBandCode,
      billingCycle: newInterval,
      source: new URLSearchParams(window.location.search).get("source") || "direct",
      authenticatedState: isSignedIn ? "authenticated" : "anonymous",
    });
  };

  const getCheckoutUrl = (bandCode: string) => {
    const targetUrl = `/company/subscribe?bandCode=${bandCode}&billingInterval=${billingInterval}`;
    return isSignedIn ? targetUrl : `/sign-up?redirect_url=${encodeURIComponent(targetUrl)}`;
  };

  const standardBands = serverBands.filter((b) => !b.requiresTailoredQuote);
  const customBand = serverBands.find((b) => b.requiresTailoredQuote) || CANONICAL_EMPLOYEE_BANDS[4];

  return (
    <Layout>
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-emerald-900/10 via-background to-background pt-16 md:pt-24 pb-12 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Authoritative Commercial Plans
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-foreground tracking-tight">
            {t("pricing.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Simple, transparent corporate subscriptions based on your team size. Every plan includes full access to our complete 136-course sustainability curriculum.
          </p>
          <p className="text-xs text-muted-foreground mt-3 font-medium">
            All prices are in Mauritian Rupees (MUR). Fixed monthly or discounted annual billing for organisations in Mauritius.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Billing Interval Toggle */}
        <div className="max-w-xl mx-auto space-y-3 text-center">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
            Select Billing Frequency
          </label>
          <div className="inline-flex items-center bg-muted p-1.5 rounded-2xl border gap-1 shadow-sm">
            <button
              type="button"
              onClick={() => handleIntervalChange("MONTHLY")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                billingInterval === "MONTHLY"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => handleIntervalChange("YEARLY")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5",
                billingInterval === "YEARLY"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>Yearly Billing</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-500/30">
                Save 10%
              </span>
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {billingInterval === "YEARLY"
              ? "One annual invoice covering 12 full months with an automatic 10% discount applied."
              : "Flexible monthly billing with no long-term lock-in."}
          </p>
        </div>

        {/* 4 Standard Employee Bands Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {standardBands.map((band) => {
            const monthlyPrice = band.monthlyPriceMUR || 3000;
            const yearlyPrice = band.yearlyPriceMUR || Math.round(monthlyPrice * 12 * 0.9);
            const annualSavings = monthlyPrice * 12 - yearlyPrice;
            const equivalentMonthly = Math.round((yearlyPrice / 12) * 100) / 100;
            const isSelected = selectedBandCode === band.code;

            return (
              <div
                key={band.code}
                onClick={() => handleSelectBand(band.code)}
                className={cn(
                  "bg-card border rounded-3xl p-6 flex flex-col justify-between transition-all relative cursor-pointer",
                  isSelected
                    ? "border-2 border-emerald-600 shadow-xl ring-2 ring-emerald-600/10 scale-[1.02]"
                    : "border-border shadow-sm hover:shadow-md hover:border-border/80"
                )}
              >
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Selected Size
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-emerald-600" /> Employee Category
                    </span>
                    <h3 className="text-2xl font-bold font-serif mt-1 text-foreground">
                      {band.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Included capacity for up to {band.maxEmployees} team members.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-b py-4">
                    {billingInterval === "YEARLY" ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl lg:text-3xl font-extrabold font-serif text-emerald-700 dark:text-emerald-400">
                            MUR {yearlyPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">/ year</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mt-1">
                          Save MUR {annualSavings.toLocaleString()} per year
                        </span>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          Equivalent to MUR {equivalentMonthly.toLocaleString()}/month
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl lg:text-3xl font-extrabold font-serif text-foreground">
                            MUR {monthlyPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">/ month</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mt-1">
                          {band.indicativePerEmployeeCopy}
                        </span>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          Fixed transparent fee
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">
                      Everything Included:
                    </span>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>All 136 Sustainability & ESG courses</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Verifiable certificates & badges</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Automated progress & audit records</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Single-use codes & bulk CSV import</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "w-full font-semibold rounded-xl text-white shadow-md text-sm",
                      isSelected
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-emerald-700 hover:bg-emerald-800"
                    )}
                  >
                    <Link href={getCheckoutUrl(band.code)}>
                      Get Started — {band.label}
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5th Card: Over 120 Employees Custom Quote */}
        <div className="max-w-4xl mx-auto bg-card border-2 border-emerald-600/30 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <Building2 className="h-3.5 w-3.5" /> Large Enterprise Organisations
              </div>
              <h3 className="text-2xl font-bold font-serif text-foreground">
                More Than 120 Employees?
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                For corporate groups, conglomerates, and enterprises with over 120 employees, we provide custom seat licensing, dedicated onboarding, and bespoke ESG reporting alignment.
              </p>
            </div>
            <div className="shrink-0">
              <Button asChild size="lg" variant="outline" className="h-12 px-8 font-semibold border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl">
                <Link href={getCheckoutUrl("OVER_120")}>
                  Contact Us for a Tailored Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Calculation Note */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-4 rounded-xl border">
            {INDICATIVE_CALCULATION_NOTE}
          </p>
        </div>

        {/* Complete Proposition Summary */}
        <div className="max-w-5xl mx-auto space-y-8 pt-8 border-t">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              What Every ELEVIO Skills Subscription Includes
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              One standard comprehensive platform for workplace sustainability skills and credible ESG record-keeping.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-2xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg font-serif">136 Canonical Modules</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complete access across Waste Sorting, Energy, Water, Green Office, Compliance, Sector Practices, and Leadership Pathways.
              </p>
            </div>

            <div className="bg-card border rounded-2xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg font-serif">Verifiable Certificates</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Accredited completion certificates with QR code verification and digital badges for every successfully trained employee.
              </p>
            </div>

            <div className="bg-card border rounded-2xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg font-serif">Audit-Ready Reporting</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Exportable compliance evidence logs, department breakdown filters, and real-time manager follow-up tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}