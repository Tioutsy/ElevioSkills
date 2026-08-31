import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Layout } from "./Layout";
import { useAuthRole } from "@/lib/authHelpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetMyCompany } from "@workspace/api-client-react";
import { COMPANY_WORKSPACE_NAV, getPermittedCompanyNav } from "@/config/navigation";

interface CompanyWorkspaceLayoutProps {
  children: ReactNode;
}

export function CompanyWorkspaceLayout({ children }: CompanyWorkspaceLayoutProps) {
  const [location] = useLocation();
  const authRole = useAuthRole();
  const { data: company } = useGetMyCompany();
  const permittedLinks = getPermittedCompanyNav(authRole);

  return (
    <Layout>
      {/* Workspace Header Banner */}
      <div className="border-b bg-muted/40 py-6">
        <div className="container mx-auto px-4 max-w-[1720px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Company Workspace
                </span>
                <Badge variant="outline" className="text-xs">
                  {authRole.roleLabel}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-foreground">
                {company?.name || authRole.companyName || "Organisation Management"}
              </h1>
            </div>
            <div>
              <Button variant="outline" size="sm" asChild className="gap-1.5 rounded-lg">
                <Link href="/home">
                  <ArrowLeft className="h-4 w-4" /> Return to Learner Hub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container with Left Sidebar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1720px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Secondary Left Sidebar */}
          <aside
            className="w-full lg:w-64 shrink-0 space-y-1 bg-card border rounded-xl p-2.5 shadow-sm"
            aria-label="Company Workspace Navigation"
          >
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b mb-1">
              Management Menu
            </div>
            <nav className="space-y-1">
              {permittedLinks.map((link) => {
                const active = link.exact
                  ? location === link.href
                  : location === link.href || location.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                      active
                        ? "bg-emerald-600 text-white font-semibold shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full">{children}</main>
        </div>
      </div>
    </Layout>
  );
}
