import { PlatformAdminLayout } from "@/components/layout/PlatformAdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User, Search, Trash2, Sparkles, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";

interface AccountItem {
  id: number;
  clerkUserId: string | null;
  name: string;
  email: string;
  role: string;
  companyId: number;
  companyName: string;
  status: string;
  createdAt: string;
  lastActiveAt: string | null;
}

export default function PlatformAdminAccounts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Dialog states
  const [singleDeleteAccount, setSingleDeleteAccount] = useState<AccountItem | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isCleanupOpen, setIsCleanupOpen] = useState(false);

  const { data: accounts, isLoading, refetch } = useQuery<AccountItem[]>({
    queryKey: ["/api/platform-admin/accounts"],
    queryFn: () => customFetch<AccountItem[]>("/api/platform-admin/accounts"),
  });

  const filtered = useMemo(() => {
    return (accounts ?? []).filter(
      (a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [accounts, searchTerm]);

  // Toggle selection
  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((a) => a.id)));
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Delete single account mutation
  const deleteSingleMutation = useMutation({
    mutationFn: async (id: number) => {
      return await customFetch(`/api/platform-admin/accounts/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast({
        title: "Account removed",
        description: `Account has been permanently deleted from Morieva Skills.`,
      });
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (singleDeleteAccount) next.delete(singleDeleteAccount.id);
        return next;
      });
      setSingleDeleteAccount(null);
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/accounts"] });
      refetch();
    },
    onError: (err: any) => {
      toast({
        title: "Deletion failed",
        description: err?.message || "Failed to delete account.",
        variant: "destructive",
      });
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: number[]) => {
      return await customFetch("/api/platform-admin/accounts/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Accounts deleted",
        description: `Successfully deleted ${data.deletedCount ?? selectedIds.size} accounts.`,
      });
      setSelectedIds(new Set());
      setIsBulkDeleteOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/accounts"] });
      refetch();
    },
    onError: (err: any) => {
      toast({
        title: "Bulk deletion failed",
        description: err?.message || "Failed to delete selected accounts.",
        variant: "destructive",
      });
    },
  });

  // Cleanup test accounts mutation
  const cleanupMutation = useMutation({
    mutationFn: async () => {
      return await customFetch("/api/platform-admin/accounts/cleanup-test-accounts", {
        method: "POST",
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Test accounts purged",
        description: `Cleaned up ${data.deletedEmployeesCount ?? 0} test accounts and ${data.deletedCompaniesCount ?? 0} dummy QA tenants.`,
      });
      setSelectedIds(new Set());
      setIsCleanupOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/platform-admin/accounts"] });
      refetch();
    },
    onError: (err: any) => {
      toast({
        title: "Cleanup failed",
        description: err?.message || "Failed to purge test accounts.",
        variant: "destructive",
      });
    },
  });

  return (
    <PlatformAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-serif">Global Accounts Directory</h2>
            <p className="text-muted-foreground">Search, inspect, and manage user accounts across Morieva Skills.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCleanupOpen(true)}
              className="text-amber-700 dark:text-amber-400 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 gap-1.5"
            >
              <Sparkles className="h-4 w-4" />
              Clean Up Test Accounts
            </Button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md bg-background text-sm"
            />
          </div>

          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-3 py-1.5 rounded-lg">
              <span className="text-xs font-semibold text-red-800 dark:text-red-300">
                {selectedIds.size} {selectedIds.size === 1 ? "account" : "accounts"} selected
              </span>
              <Button
                variant="destructive"
                size="sm"
                className="h-8 gap-1.5"
                onClick={() => setIsBulkDeleteOpen(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Selected
              </Button>
            </div>
          )}
        </div>

        {isLoading ? (
          <Skeleton className="h-64 rounded-xl" />
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center border rounded-xl bg-card">
            <User className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-lg">No accounts found</h3>
            <p className="text-sm text-muted-foreground">No user accounts matched your search parameters.</p>
          </div>
        ) : (
          <div className="border rounded-xl bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground font-medium border-b">
                  <tr>
                    <th className="p-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={filtered.length > 0 && selectedIds.size === filtered.length}
                        onChange={toggleSelectAll}
                        className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                        title="Select all"
                      />
                    </th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Organisation</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((acc) => {
                    const isSelected = selectedIds.has(acc.id);
                    return (
                      <tr
                        key={acc.id}
                        className={`hover:bg-muted/50 transition-colors ${
                          isSelected ? "bg-red-50/40 dark:bg-red-950/20" : ""
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(acc.id)}
                            className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-semibold">{acc.name}</td>
                        <td className="p-4 text-muted-foreground">{acc.email}</td>
                        <td className="p-4">
                          {acc.role === "PLATFORM_ADMIN" ? (
                            <Badge className="bg-emerald-700 text-white">Platform Admin</Badge>
                          ) : acc.role === "COMPANY_ADMIN" ? (
                            <Badge className="bg-purple-600 text-white">Company Admin</Badge>
                          ) : acc.role === "MANAGER" ? (
                            <Badge className="bg-blue-600 text-white">Manager</Badge>
                          ) : (
                            <Badge variant="outline">Learner</Badge>
                          )}
                        </td>
                        <td className="p-4 font-medium">{acc.companyName}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            {acc.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground text-xs">
                          {acc.createdAt ? new Date(acc.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                            onClick={() => setSingleDeleteAccount(acc)}
                            title={`Delete ${acc.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Confirmation Dialog: Delete Single Account */}
        <Dialog open={!!singleDeleteAccount} onOpenChange={(open) => !open && setSingleDeleteAccount(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <AlertTriangle className="h-5 w-5" />
                <DialogTitle>Delete User Account</DialogTitle>
              </div>
              <DialogDescription>
                Are you sure you want to delete the account for{" "}
                <strong className="text-foreground">{singleDeleteAccount?.name}</strong> (
                {singleDeleteAccount?.email})?
              </DialogDescription>
            </DialogHeader>
            <p className="text-xs text-muted-foreground">
              This action is permanent. All enrollments, progress, and challenge assignments linked to this account
              will be removed.
            </p>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                disabled={deleteSingleMutation.isPending}
                onClick={() => setSingleDeleteAccount(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteSingleMutation.isPending}
                onClick={() => singleDeleteAccount && deleteSingleMutation.mutate(singleDeleteAccount.id)}
                className="gap-1.5"
              >
                {deleteSingleMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog: Bulk Delete Selected Accounts */}
        <Dialog open={isBulkDeleteOpen} onOpenChange={setIsBulkDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <AlertTriangle className="h-5 w-5" />
                <DialogTitle>Delete Selected Accounts</DialogTitle>
              </div>
              <DialogDescription>
                Are you sure you want to delete all{" "}
                <strong className="text-foreground">{selectedIds.size} selected accounts</strong>?
              </DialogDescription>
            </DialogHeader>
            <p className="text-xs text-muted-foreground">
              This will permanently remove these employee accounts and their associated training records.
            </p>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                disabled={bulkDeleteMutation.isPending}
                onClick={() => setIsBulkDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={bulkDeleteMutation.isPending}
                onClick={() => bulkDeleteMutation.mutate(Array.from(selectedIds))}
                className="gap-1.5"
              >
                {bulkDeleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete {selectedIds.size} Accounts
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog: Clean Up All Test Accounts */}
        <Dialog open={isCleanupOpen} onOpenChange={setIsCleanupOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Sparkles className="h-5 w-5" />
                <DialogTitle>Clean Up Test Accounts</DialogTitle>
              </div>
              <DialogDescription>
                This will automatically remove all dummy test accounts (such as{" "}
                <strong className="text-foreground">infracare.mu@gmail.com</strong>,{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">*.test</code> emails) and QA test tenant
                records.
              </DialogDescription>
            </DialogHeader>
            <p className="text-xs text-muted-foreground">
              Real company organisations and real learner accounts will remain completely untouched.
            </p>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                disabled={cleanupMutation.isPending}
                onClick={() => setIsCleanupOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5"
                disabled={cleanupMutation.isPending}
                onClick={() => cleanupMutation.mutate()}
              >
                {cleanupMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Purge All Test Accounts
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PlatformAdminLayout>
  );
}
