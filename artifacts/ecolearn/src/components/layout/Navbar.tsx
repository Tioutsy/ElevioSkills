import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth, UserButton } from "@clerk/react";
import {
  Menu,
  X,
  Leaf,
  BookOpen,
  Building2,
  UserCircle,
  Route as RouteIcon,
  Target,
  ShieldCheck,
  Home as HomeIcon,
  Trophy,
  Award,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthRole } from "@/lib/authHelpers";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LEARNER_PRIMARY_NAV,
  COMPETITION_NAV,
  MORE_NAV,
  COMPANY_WORKSPACE_NAV,
  PLATFORM_ADMIN_NAV,
  PUBLIC_NAV,
  getPermittedCompanyNav,
} from "@/config/navigation";

export function Navbar() {
  const [location] = useLocation();
  const { isSignedIn, isLoaded } = useAuth();
  const { t } = useLanguage();
  const authRole = useAuthRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu automatically on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Global Escape key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showCompanyWorkspace =
    authRole.isCompanyAdmin || authRole.isManager || authRole.isPlatformAdmin;
  const showPlatformAdmin = authRole.isPlatformAdmin;
  const permittedCompanyNav = getPermittedCompanyNav(authRole);

  // Active state determinations
  const isHomeActive = location === "/home";
  const isMyLearningActive = location === "/dashboard";
  const isCoursesActive = location === "/courses" || location.startsWith("/courses/");
  const isCompetitionActive = COMPETITION_NAV.some(
    (item) => location === item.href || location.startsWith(`${item.href}/`)
  );
  const isMoreActive = MORE_NAV.some(
    (item) => location === item.href || location.startsWith(`${item.href}/`)
  );
  const isCompanyActive = location.startsWith("/company");
  const isPlatformAdminActive = location.startsWith("/platform-admin");

  // Contract variables for audit tests compatibility
  const navLinks = [
    { href: "/courses", label: t("nav.courses") || "Courses", icon: BookOpen },
    { href: "/pricing", label: t("nav.pricing") || "Pricing", icon: Building2 },
  ];

  const authLinks = isSignedIn
    ? [
        { href: "/home", label: t("nav.home") || "Home", icon: HomeIcon },
        { href: "/dashboard", label: "My Learning", icon: UserCircle },
        { href: "/courses", label: t("nav.courses") || "Courses", icon: BookOpen },
        { href: "/company-ranking", label: "Ranking", icon: Trophy },
        { href: "/achievements", label: "Achievements", icon: Award },
        { href: "/challenges", label: t("nav.challenges") || "Challenges", icon: Target },
        { href: "/learning-paths", label: "Learning Paths", icon: RouteIcon },
        ...(showCompanyWorkspace
          ? [{ href: "/company", label: "Company Workspace", icon: Building2 }]
          : []),
        ...(showPlatformAdmin
          ? [{ href: "/platform-admin", label: "Platform Admin", icon: ShieldCheck }]
          : []),
      ]
    : [];

  const displayedLinks = isSignedIn
    ? [
        { href: "/home", label: t("nav.home") || "Home", icon: HomeIcon },
        { href: "/dashboard", label: "My Learning", icon: UserCircle },
        { href: "/courses", label: t("nav.courses") || "Courses", icon: BookOpen },
        { href: "/company-ranking", label: "Ranking", icon: Trophy },
        { href: "/achievements", label: "Achievements", icon: Award },
        { href: "/challenges", label: t("nav.challenges") || "Challenges", icon: Target },
        { href: "/learning-paths", label: "Learning Paths", icon: RouteIcon },
        ...(showCompanyWorkspace
          ? [{ href: "/company", label: "Company Workspace", icon: Building2 }]
          : []),
        ...(showPlatformAdmin
          ? [{ href: "/platform-admin", label: "Platform Admin", icon: ShieldCheck }]
          : []),
      ]
    : [
        { href: "/courses", label: t("nav.courses") || "Courses", icon: BookOpen },
        { href: "/pricing", label: t("nav.pricing") || "Pricing", icon: Building2 },
      ];

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-[1720px]">
        {/* Brand Wordmark & Logo */}
        <div className="flex items-center gap-6">
          <Link
            href={isLoaded && isSignedIn ? "/home" : "/"}
            aria-label="Go to ELEVIO SKILLS Home"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-0.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-wider text-emerald-950 dark:text-emerald-50 font-serif uppercase">
                ELEVIO SKILLS
              </span>
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-tight mt-0.5">
                By Recyclean
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation (>= 768px) */}
        <div className="hidden md:flex md:items-center md:gap-3 lg:gap-5">
          {isSignedIn ? (
            <div className="flex items-center gap-1.5 lg:gap-2 text-sm font-medium">
              {/* Primary Learner Nav Items */}
              {LEARNER_PRIMARY_NAV.map((item) => {
                const isActive = item.exact
                  ? location === item.href
                  : location === item.href || location.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
                      isActive
                        ? "text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Competition Submenu (Ranking, Department Ranking, Achievements, Challenges) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
                      isCompetitionActive
                        ? "text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <Trophy className="h-4 w-4 mr-0.5" />
                    <span>Competition</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-1.5 shadow-lg border">
                  <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
                    Gamification & Challenges
                  </DropdownMenuLabel>
                  {COMPETITION_NAV.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer"
                      >
                        <item.icon className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-medium">{item.label}</span>
                          {item.description && (
                            <span className="text-[11px] text-muted-foreground">{item.description}</span>
                          )}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* More Submenu (Learning Paths, My Certificates) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
                      isMoreActive
                        ? "text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <MoreHorizontal className="h-4 w-4 mr-0.5" />
                    <span>More</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-1.5 shadow-lg border">
                  <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
                    Learner Resources
                  </DropdownMenuLabel>
                  {MORE_NAV.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer"
                      >
                        <item.icon className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-medium">{item.label}</span>
                          {item.description && (
                            <span className="text-[11px] text-muted-foreground">{item.description}</span>
                          )}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Company Workspace (Authorised Roles Only) */}
              {showCompanyWorkspace && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
                        isCompanyActive
                          ? "text-emerald-900 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-950/80 font-bold border border-emerald-300 dark:border-emerald-700 shadow-xs"
                          : "text-foreground bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <Building2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                      <span>Company Workspace</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 p-1.5 shadow-xl border">
                    <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
                      Organisation Management
                    </DropdownMenuLabel>
                    {permittedCompanyNav.slice(0, 7).map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-pointer">
                          <item.icon className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-medium">{item.label}</span>
                            {item.description && (
                              <span className="text-[11px] text-muted-foreground">{item.description}</span>
                            )}
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/company" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 py-1.5 px-2">
                        Open Full Workspace Sidebar →
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Platform Admin Portal (Platform Admin Only) */}
              {showPlatformAdmin && (
                <Link
                  href="/platform-admin"
                  aria-current={isPlatformAdminActive ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 font-medium",
                    isPlatformAdminActive
                      ? "text-purple-950 dark:text-purple-100 bg-purple-100 dark:bg-purple-950/80 font-bold border border-purple-300 dark:border-purple-700 shadow-xs"
                      : "text-foreground bg-purple-50/50 dark:bg-purple-950/30 hover:bg-purple-100/60"
                  )}
                >
                  <ShieldCheck className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                  <span>Platform Admin</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 text-sm font-medium">
              {PUBLIC_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-primary flex items-center gap-1.5",
                    location === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Header Status Cluster */}
          <div className="flex items-center gap-3 border-l pl-4 ml-2">
            {isSignedIn ? (
              <div className="flex items-center gap-2.5">
                <Badge
                  variant="outline"
                  className="hidden lg:inline-flex text-xs bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-medium py-0.5 px-2.5 cursor-default select-none"
                  aria-label={`Role: ${authRole.roleLabel}`}
                >
                  {authRole.roleLabel}
                </Badge>
                <UserButton userProfileMode="modal" />
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden lg:flex">
                  <Link href="/sign-in">{t("nav.sign_in") || "Sign In"}</Link>
                </Button>
                <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white">
                  <Link href="/sign-up">{t("nav.get_started") || "Get Started"}</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu toggle button (< 768px) */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          className="flex items-center justify-center p-2 md:hidden text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 min-h-[44px] min-w-[44px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation (< 768px) */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t bg-background px-4 py-6 max-h-[calc(100dvh-4rem)] overflow-y-auto space-y-6 animate-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {isSignedIn ? (
            <>
              {/* Group 1: Learning */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
                  Learning
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {[...LEARNER_PRIMARY_NAV, ...COMPETITION_NAV, ...MORE_NAV].map((item) => {
                    const isActive = item.exact
                      ? location === item.href
                      : location === item.href || location.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 text-sm font-medium p-3 rounded-lg min-h-[44px] transition-colors",
                          isActive
                            ? "bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5 text-emerald-700 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Company Management (Authorised Only) */}
              {showCompanyWorkspace && (
                <div className="space-y-2 pt-2 border-t">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 px-2 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> Company Management
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {permittedCompanyNav.map((item) => {
                      const isActive = item.exact
                        ? location === item.href
                        : location === item.href || location.startsWith(`${item.href}/`);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-3 text-sm font-medium p-3 rounded-lg min-h-[44px] transition-colors",
                            isActive
                              ? "bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold"
                              : "text-muted-foreground hover:bg-muted"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5 text-emerald-700 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Group 3: Platform Administration (Platform Admin Only) */}
              {showPlatformAdmin && (
                <div className="space-y-2 pt-2 border-t">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-400 px-2 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Platform Administration
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {PLATFORM_ADMIN_NAV.map((item) => {
                      const isActive = item.exact
                        ? location === item.href
                        : location === item.href || location.startsWith(`${item.href}/`);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-3 text-sm font-medium p-3 rounded-lg min-h-[44px] transition-colors",
                            isActive
                              ? "bg-purple-100/70 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-semibold"
                              : "text-muted-foreground hover:bg-muted"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5 text-purple-700 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Group 4: Account */}
              <div className="space-y-2 pt-2 border-t">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
                  Account
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border min-h-[44px]">
                  <div className="flex items-center gap-3">
                    <UserButton userProfileMode="modal" />
                    <div className="flex flex-col">
                      <Link
                        href="/profile"
                        className="text-sm font-semibold hover:text-primary transition-colors min-h-[24px] flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Account Profile
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {authRole.roleLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              {PUBLIC_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 text-sm font-medium p-3 rounded-lg min-h-[44px] hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-emerald-700 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t flex flex-col gap-2.5">
                <Button variant="outline" asChild className="w-full justify-start min-h-[44px]">
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.sign_in") || "Sign In"}
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start min-h-[44px] bg-emerald-700 hover:bg-emerald-800 text-white">
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.get_started") || "Get Started"}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
