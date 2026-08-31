import {
  Home as HomeIcon,
  UserCircle,
  BookOpen,
  Trophy,
  Award,
  Target,
  Route as RouteIcon,
  Building2,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Settings,
  Recycle,
  Leaf,
  CreditCard,
  LayoutDashboard,
  FolderOpen,
  Activity,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { hasCapability } from "@/lib/authHelpers";

export interface NavItem {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  exact?: boolean;
  requiredCapability?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

/**
 * Primary Learner Navigation Items (Always visible for authenticated learners)
 */
export const LEARNER_PRIMARY_NAV: NavItem[] = [
  { href: "/home", label: "Home", icon: HomeIcon, exact: true },
  { href: "/dashboard", label: "My Learning", icon: UserCircle, exact: true },
  { href: "/courses", label: "Courses", icon: BookOpen },
];

/**
 * Competition Submenu Items
 */
export const COMPETITION_NAV: NavItem[] = [
  {
    href: "/company-ranking",
    label: "Company Ranking",
    description: "Global organisation leaderboard",
    icon: Trophy,
  },
  {
    href: "/department-ranking",
    label: "Department Ranking",
    description: "Internal team scores & standing",
    icon: Building2,
  },
  {
    href: "/achievements",
    label: "Achievements",
    description: "Badges, milestones & progress",
    icon: Award,
  },
  {
    href: "/challenges",
    label: "Challenges",
    description: "Workplace actions & bonus points",
    icon: Target,
  },
];

/**
 * More Learner Submenu Items
 */
export const MORE_NAV: NavItem[] = [
  {
    href: "/learning-paths",
    label: "Learning Paths",
    description: "Structured role curriculums",
    icon: RouteIcon,
  },
  {
    href: "/certificates",
    label: "My Certificates",
    description: "Earned completion credentials",
    icon: Award,
  },
];

/**
 * Full Company Workspace Navigation Items with Explicit Capability Requirements
 */
export const COMPANY_WORKSPACE_NAV: NavItem[] = [
  {
    href: "/company",
    label: "Company Overview",
    description: "Key metrics & ESG snapshot",
    icon: Building2,
    exact: true,
    requiredCapability: "company.view",
  },
  {
    href: "/company/employees",
    label: "Team & Invitations",
    description: "Manage employees & invite codes",
    icon: Users,
    requiredCapability: "employees.manage",
  },
  {
    href: "/company/challenges-review",
    label: "Challenge Reviews",
    description: "Review employee submissions",
    icon: ShieldCheck,
    requiredCapability: "challenges.review",
  },
  {
    href: "/company/reports",
    label: "Reports & Analytics",
    description: "Training progress & CSV exports",
    icon: FileSpreadsheet,
    requiredCapability: "reports.team",
  },
  {
    href: "/company/compliance",
    label: "Compliance & ESG",
    description: "Audit evidence & certificates",
    icon: CheckCircle2,
    requiredCapability: "company.manage",
  },
  {
    href: "/company/training-follow-up",
    label: "Training Follow-Up",
    description: "Nudge overdue learners",
    icon: Clock,
    requiredCapability: "reports.team",
  },
  {
    href: "/company/engagement-competition",
    label: "Engagement & Competition",
    description: "Gamification metrics & team engagement",
    icon: Trophy,
    requiredCapability: "engagement.view",
  },
  {
    href: "/company/certificates",
    label: "Certificates",
    description: "Download & export company certificates",
    icon: Award,
    requiredCapability: "certificates.download",
  },
  {
    href: "/company/challenges",
    label: "Company Challenges",
    description: "Manage workplace challenge assignments",
    icon: Target,
    requiredCapability: "company.manage",
  },
  {
    href: "/company/leaderboards",
    label: "Leaderboards",
    description: "Internal company rankings",
    icon: Trophy,
    requiredCapability: "leaderboards.view",
  },
  {
    href: "/company/recycling",
    label: "Recycling Records",
    description: "Company waste diversion & collection data",
    icon: Recycle,
    requiredCapability: "company.manage",
  },
  {
    href: "/company/sustainability",
    label: "Sustainability Impact",
    description: "ESG score & sustainability performance",
    icon: Leaf,
    requiredCapability: "company.manage",
  },
  {
    href: "/company/settings/lists",
    label: "Departments & Settings",
    description: "Manage departments & job titles",
    icon: Settings,
    requiredCapability: "company.manage",
  },
  {
    href: "/company/subscribe",
    label: "Plan & Billing",
    description: "Commercial subscription & employee tiers",
    icon: CreditCard,
    requiredCapability: "company.manage",
  },
];

/**
 * Filter company navigation items strictly by user capabilities
 */
export function getPermittedCompanyNav(user: any): NavItem[] {
  return COMPANY_WORKSPACE_NAV.filter((item) => {
    if (!item.requiredCapability) return true;
    return hasCapability(user, item.requiredCapability);
  });
}

/**
 * Full Platform Administration Navigation Items (All 13 platform admin destinations)
 */
export const PLATFORM_ADMIN_NAV: NavItem[] = [
  { href: "/platform-admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/platform-admin/gamification-health", label: "Gamification Health", icon: Activity },
  { href: "/platform-admin/pilot-passes", label: "Pilot Passes", icon: Leaf },
  { href: "/platform-admin/organisations", label: "Organisations", icon: FolderOpen },
  { href: "/platform-admin/accounts", label: "Accounts", icon: Target },
  { href: "/platform-admin/activity", label: "Activity", icon: RouteIcon },
  { href: "/platform-admin/health", label: "Account Health", icon: ShieldAlert },
  { href: "/platform-admin/insights", label: "Rules & Resources", icon: Leaf },
  { href: "/platform-admin/sectors", label: "Sectors", icon: FolderOpen },
  { href: "/platform-admin/learning-paths", label: "Learning Paths", icon: RouteIcon },
  { href: "/platform-admin/courses", label: "Courses", icon: BookOpen },
  { href: "/platform-admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/platform-admin/sdg-mapping", label: "SDG Mapping", icon: Target },
];

/**
 * Public Navigation Items (Signed-out visitors)
 */
export const PUBLIC_NAV: NavItem[] = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/pricing", label: "Pricing", icon: Building2 },
];
