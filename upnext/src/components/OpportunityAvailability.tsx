"use client";
import { AlertTriangle, ExternalLink } from "lucide-react";
import type { Opportunity } from "@/lib/types";
import { useDeadline } from "@/lib/useDeadline";

export default function OpportunityAvailability({ opportunity }: { opportunity: Opportunity }) {
  const status = useDeadline(opportunity);
  const [closed, label] = status === "pending" ? ["pending", "Checking deadline..."] : status.split(":");

  return (
    <>
      {closed === "pending" ? (
        <span className="text-sm text-muted" role="status">Checking deadline...</span>
      ) : (
        <>
          {closed === "closed" && (
            <p className="mt-3 flex w-full gap-2 rounded-lg border border-ink p-3 text-sm font-medium">
              <AlertTriangle size={18} className="shrink-0" aria-hidden="true" />
              This opportunity is {opportunity.status === "Published" ? "past its deadline" : opportunity.status.toLowerCase()}.
            </p>
          )}
          {closed === "closed" ? (
            <span className="btn border border-line text-muted" aria-disabled="true">Applications closed · {label}</span>
          ) : (
            <a href={opportunity.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Apply on official site <ExternalLink size={16} aria-hidden="true" /></a>
          )}
        </>
      )}
    </>
  );
}
