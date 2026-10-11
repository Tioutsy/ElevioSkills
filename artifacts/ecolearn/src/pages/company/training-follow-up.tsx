import React, { useState } from "react";
import { Link, useSearch } from "wouter";
import {
  useCompanyTrainingActions,
  useOverdueLearners,
  useNotStartedLearners,
  useStrugglingLearners,
  useFollowUpAuditHistory,
  OverdueLearnerRecord,
  NotStartedLearnerRecord,
  StrugglingLearnerRecord,
} from "@/lib/lms-api";
import {
  TrainingActionConfirmationModal,
  ActionModalConfig,
} from "@/components/TrainingActionConfirmationModal";
import { TrainingAutomationCard } from "@/components/TrainingAutomationCard";
import {
  Mail,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Users,
  Search,
  Filter,
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Send,
  History,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function TrainingFollowUpPage() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialTab = searchParams.get("tab") || "overdue";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const [selectedEmpIds, setSelectedEmpIds] = useState<number[]>([]);
  const [modalConfig, setModalConfig] = useState<ActionModalConfig | null>(null);

  // Queries
  const { data: actionsData, isLoading: actionsLoading } = useCompanyTrainingActions();
  const { data: overdueData, isLoading: overdueLoading, refetch: refetchOverdue } = useOverdueLearners();
  const { data: unstartedData, isLoading: unstartedLoading, refetch: refetchUnstarted } = useNotStartedLearners();
  const { data: strugglingData, isLoading: strugglingLoading, refetch: refetchStruggling } = useStrugglingLearners();
  const { data: auditData, isLoading: auditLoading, refetch: refetchAudit } = useFollowUpAuditHistory();

  const overdueLearners = overdueData?.learners || [];
  const unstartedLearners = unstartedData?.learners || [];
  const strugglingLearners = strugglingData?.learners || [];
  const auditHistory = auditData?.history || [];
  const actionsList = actionsData?.actions || [];

  // Filter handlers
  const filterRecord = (rec: { employeeName: string; employeeEmail: string; department: string; courseTitle: string; courseCode: string }) => {
    const matchesSearch =
      !searchTerm ||
      rec.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.employeeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.courseCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      departmentFilter === "all" || rec.department.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesDept;
  };

  const filteredOverdue = overdueLearners.filter(filterRecord);
  const filteredUnstarted = unstartedLearners.filter(filterRecord);
  const filteredStruggling = strugglingLearners.filter(filterRecord);

  const handleSelectAll = (checked: boolean, list: { employeeId: number }[]) => {
    if (checked) {
      setSelectedEmpIds(Array.from(new Set(list.map((item) => item.employeeId))));
    } else {
      setSelectedEmpIds([]);
    }
  };

  const handleToggleEmp = (id: number) => {
    setSelectedEmpIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const triggerOverdueReminders = (empIds?: number[]) => {
    const targets = empIds && empIds.length > 0 ? empIds : overdueLearners.map((o) => o.employeeId);
    setModalConfig({
      type: "reminder",
      category: "overdue",
      employeeIds: targets,
      recipientCount: targets.length,
      title: `Send Reminders to ${targets.length} Overdue Learner(s)`,
      description: "Dispatch automated training reminder emails. Delivery deduplication and safety rules apply.",
    });
  };

  const triggerUnstartedReminders = (empIds?: number[]) => {
    const targets = empIds && empIds.length > 0 ? empIds : unstartedLearners.map((u) => u.employeeId);
    setModalConfig({
      type: "reminder",
      category: "not_started",
      employeeIds: targets,
      recipientCount: targets.length,
      title: `Send Reminders to ${targets.length} Unstarted Learner(s)`,
      description: "Encourage learners to initiate their assigned courses.",
    });
  };

  const triggerRefresherAssignment = (courseId: number, courseCode?: string, courseTitle?: string, empIds?: number[]) => {
    const targets = empIds && empIds.length > 0 ? empIds : strugglingLearners.filter((s) => s.courseId === courseId).map((s) => s.employeeId);
    setModalConfig({
      type: "refresher",
      courseId,
      courseCode,
      courseTitle,
      employeeIds: targets,
      recipientCount: targets.length,
      title: `Assign Refresher: ${courseCode || `Course #${courseId}`}`,
      description: `Reassign ${courseTitle || "course"} to ${targets.length} learner(s). Past completion evidence is preserved.`,
    });
  };

  const refreshAllData = () => {
    refetchOverdue();
    refetchUnstarted();
    refetchStruggling();
    refetchAudit();
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      {/* Top Header Navigation */}
      <div className="border-b bg-background sticky top-0 z-10 shadow-2xs">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="h-8 text-xs text-muted-foreground">
              <Link href="/company">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Dashboard
              </Link>
            </Button>
            <div className="h-4 w-px bg-border" />
            <div>
              <h1 className="text-base font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Training Follow-up Action Centre
              </h1>
              <p className="text-xs text-muted-foreground">
                Convert evidence-backed training insights into controlled, traceable management actions.
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={refreshAllData} className="text-xs h-8 gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh Evidence
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Autonomous Training Governance Card */}
        <TrainingAutomationCard />

        {/* Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border rounded-xl shadow-2xs bg-card">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Overdue Learners</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{overdueLearners.length}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border rounded-xl shadow-2xs bg-card">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Unstarted Assignments</p>
                <p className="text-2xl font-bold text-foreground mt-1">{unstartedLearners.length}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border rounded-xl shadow-2xs bg-card">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Learners Needing Support</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{strugglingLearners.length}</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Allowlisted AI Action Recommendations Section */}
        {actionsList.length > 0 && (
          <Card className="border rounded-xl shadow-2xs bg-card">
            <CardHeader className="bg-muted/30 p-4 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <CardTitle className="text-sm font-bold">Recommended Management Actions</CardTitle>
                <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                  Allowlisted
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {actionsList.map((act, idx) => (
                  <div key={idx} className="p-3.5 border rounded-xl bg-background flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-xs text-foreground">{act.label}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{act.description}</p>
                    </div>

                    {act.actionType === "SEND_REMINDER" ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          if (act.targetType === "overdue_assignments") triggerOverdueReminders();
                          else triggerUnstartedReminders();
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 gap-1.5"
                      >
                        <Send className="h-3.5 w-3.5" /> Send Reminders
                      </Button>
                    ) : act.actionType === "RECOMMEND_REFRESHER" && act.courseId ? (
                      <Button
                        size="sm"
                        onClick={() => triggerRefresherAssignment(act.courseId!, act.courseCode, act.courseTitle)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 gap-1.5"
                      >
                        <BookOpen className="h-3.5 w-3.5" /> Assign Refresher
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (act.targetUrl.includes("overdue")) setActiveTab("overdue");
                          else if (act.targetUrl.includes("not-started")) setActiveTab("not-started");
                          else if (act.targetUrl.includes("struggling")) setActiveTab("struggling");
                        }}
                        className="w-full text-xs h-8 gap-1"
                      >
                        View Details <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Tabbed Follow-up Interface */}
        <Card className="border rounded-xl shadow-2xs bg-card">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader className="p-4 border-b bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <TabsList className="bg-muted p-1">
                  <TabsTrigger value="overdue" className="text-xs gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Overdue ({overdueLearners.length})
                  </TabsTrigger>
                  <TabsTrigger value="not-started" className="text-xs gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> Unstarted ({unstartedLearners.length})
                  </TabsTrigger>
                  <TabsTrigger value="struggling" className="text-xs gap-1.5">
                    <Users className="h-3.5 w-3.5 text-indigo-600" /> Struggling ({strugglingLearners.length})
                  </TabsTrigger>
                  <TabsTrigger value="audit" className="text-xs gap-1.5">
                    <History className="h-3.5 w-3.5" /> Follow-up Audit Log
                  </TabsTrigger>
                </TabsList>

                {/* Filter / Search Bar */}
                {activeTab !== "audit" && (
                  <div className="flex items-center gap-2">
                    <div className="relative w-48 sm:w-60">
                      <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                      <Input
                        placeholder="Search employee, course..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 text-xs h-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>

            {/* TAB 1: OVERDUE LEARNERS */}
            <TabsContent value="overdue" className="p-4 space-y-4 m-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredOverdue.length} overdue training assignment(s)
                </p>
                {filteredOverdue.length > 0 && (
                  <Button
                    size="sm"
                    onClick={() => triggerOverdueReminders(selectedEmpIds.length > 0 ? selectedEmpIds : undefined)}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 gap-1.5"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {selectedEmpIds.length > 0
                      ? `Remind Selected (${selectedEmpIds.length})`
                      : `Remind All ${filteredOverdue.length} Overdue Learner(s)`}
                  </Button>
                )}
              </div>

              {filteredOverdue.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <p className="font-semibold text-sm text-foreground">No Overdue Training Assignments</p>
                  <p className="text-xs">All assigned employees are currently up to date on their sustainability training.</p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/50 border-b font-medium text-muted-foreground">
                      <tr>
                        <th className="p-3 w-8">
                          <Checkbox
                            checked={selectedEmpIds.length === filteredOverdue.length && filteredOverdue.length > 0}
                            onCheckedChange={(chk) => handleSelectAll(!!chk, filteredOverdue)}
                          />
                        </th>
                        <th className="p-3">Employee</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Assigned Course</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3">Days Overdue</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredOverdue.map((row) => (
                        <tr key={`${row.employeeId}_${row.courseId}`} className="hover:bg-muted/30">
                          <td className="p-3">
                            <Checkbox
                              checked={selectedEmpIds.includes(row.employeeId)}
                              onCheckedChange={() => handleToggleEmp(row.employeeId)}
                            />
                          </td>
                          <td className="p-3">
                            <p className="font-semibold text-foreground">{row.employeeName}</p>
                            <p className="text-[11px] text-muted-foreground">{row.employeeEmail}</p>
                          </td>
                          <td className="p-3 font-medium">{row.department}</td>
                          <td className="p-3">
                            <span className="font-mono text-emerald-700 font-bold mr-1.5">{row.courseCode}</span>
                            {row.courseTitle}
                          </td>
                          <td className="p-3 font-medium text-amber-700">
                            {row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="p-3">
                            <Badge variant="destructive" className="text-[10px]">
                              {row.daysOverdue} Day(s)
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => triggerOverdueReminders([row.employeeId])}
                              className="text-[11px] h-7 border-amber-300 text-amber-800 hover:bg-amber-50"
                            >
                              <Mail className="h-3 w-3 mr-1" /> Remind
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* TAB 2: UNSTARTED LEARNERS */}
            <TabsContent value="not-started" className="p-4 space-y-4 m-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredUnstarted.length} unstarted training assignment(s)
                </p>
                {filteredUnstarted.length > 0 && (
                  <Button
                    size="sm"
                    onClick={() => triggerUnstartedReminders(selectedEmpIds.length > 0 ? selectedEmpIds : undefined)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 gap-1.5"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {selectedEmpIds.length > 0
                      ? `Remind Selected (${selectedEmpIds.length})`
                      : `Remind All ${filteredUnstarted.length} Unstarted Learner(s)`}
                  </Button>
                )}
              </div>

              {filteredUnstarted.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <p className="font-semibold text-sm text-foreground">No Unstarted Training Assignments</p>
                  <p className="text-xs">All assigned employees have initiated study on their assigned courses.</p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/50 border-b font-medium text-muted-foreground">
                      <tr>
                        <th className="p-3 w-8">
                          <Checkbox
                            checked={selectedEmpIds.length === filteredUnstarted.length && filteredUnstarted.length > 0}
                            onCheckedChange={(chk) => handleSelectAll(!!chk, filteredUnstarted)}
                          />
                        </th>
                        <th className="p-3">Employee</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Assigned Course</th>
                        <th className="p-3">Assigned Date</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredUnstarted.map((row) => (
                        <tr key={`${row.employeeId}_${row.courseId}`} className="hover:bg-muted/30">
                          <td className="p-3">
                            <Checkbox
                              checked={selectedEmpIds.includes(row.employeeId)}
                              onCheckedChange={() => handleToggleEmp(row.employeeId)}
                            />
                          </td>
                          <td className="p-3">
                            <p className="font-semibold text-foreground">{row.employeeName}</p>
                            <p className="text-[11px] text-muted-foreground">{row.employeeEmail}</p>
                          </td>
                          <td className="p-3 font-medium">{row.department}</td>
                          <td className="p-3">
                            <span className="font-mono text-emerald-700 font-bold mr-1.5">{row.courseCode}</span>
                            {row.courseTitle}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {row.assignmentDate ? new Date(row.assignmentDate).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="p-3 font-medium">
                            {row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "None Set"}
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => triggerUnstartedReminders([row.employeeId])}
                              className="text-[11px] h-7"
                            >
                              <Mail className="h-3 w-3 mr-1" /> Remind
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* TAB 3: STRUGGLING LEARNERS */}
            <TabsContent value="struggling" className="p-4 space-y-4 m-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredStruggling.length} learner(s) with repeated quiz retries or low scores
                </p>
              </div>

              {filteredStruggling.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <p className="font-semibold text-sm text-foreground">No Struggling Learners Identified</p>
                  <p className="text-xs">Assessment evidence indicates strong understanding across active modules.</p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/50 border-b font-medium text-muted-foreground">
                      <tr>
                        <th className="p-3">Employee</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Course</th>
                        <th className="p-3">Quiz Attempts</th>
                        <th className="p-3">Highest Score</th>
                        <th className="p-3">Support Note</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredStruggling.map((row) => (
                        <tr key={`${row.employeeId}_${row.courseId}`} className="hover:bg-muted/30">
                          <td className="p-3">
                            <p className="font-semibold text-foreground">{row.employeeName}</p>
                            <p className="text-[11px] text-muted-foreground">{row.employeeEmail}</p>
                          </td>
                          <td className="p-3 font-medium">{row.department}</td>
                          <td className="p-3">
                            <span className="font-mono text-emerald-700 font-bold mr-1.5">{row.courseCode}</span>
                            {row.courseTitle}
                          </td>
                          <td className="p-3 font-semibold text-amber-700">{row.totalAttempts} Retries</td>
                          <td className="p-3 font-semibold">{row.maxQuizScore}%</td>
                          <td className="p-3 text-muted-foreground italic text-[11px]">{row.supportRecommendation}</td>
                          <td className="p-3 text-right">
                            <Button
                              size="sm"
                              onClick={() => triggerRefresherAssignment(row.courseId, row.courseCode, row.courseTitle, [row.employeeId])}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] h-7 gap-1"
                            >
                              <BookOpen className="h-3 w-3" /> Assign Refresher
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* TAB 4: AUDIT TRAIL */}
            <TabsContent value="audit" className="p-4 space-y-4 m-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Traceable audit history of recent management follow-up activity
                </p>
              </div>

              {auditHistory.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground space-y-2">
                  <History className="h-8 w-8 text-muted-foreground/50 mx-auto" />
                  <p className="font-semibold text-sm text-foreground">No Follow-up Activity Recorded Yet</p>
                  <p className="text-xs">Follow-up reminders and refresher assignments will be recorded here.</p>
                </div>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/50 border-b font-medium text-muted-foreground">
                      <tr>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Action Type</th>
                        <th className="p-3">Actor Role</th>
                        <th className="p-3">Target Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-mono text-[11px]">
                      {auditHistory.map((log) => (
                        <tr key={log.id} className="hover:bg-muted/30">
                          <td className="p-3 font-sans text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="p-3 font-sans font-semibold text-emerald-800">{log.action}</td>
                          <td className="p-3 font-sans uppercase text-[10px]">{log.actorRole}</td>
                          <td className="p-3 font-sans text-muted-foreground">
                            {log.metadata ? JSON.stringify(log.metadata) : `Target ID: ${log.targetId}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <TrainingActionConfirmationModal
        isOpen={!!modalConfig}
        onClose={() => setModalConfig(null)}
        config={modalConfig}
        onSuccess={refreshAllData}
      />
    </div>
  );
}
