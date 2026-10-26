import type { ReactNode } from "react";
import { OrganizationWorkspace } from "@/components/WorkspaceChrome";

export default function Layout({ children }: { children: ReactNode }) {
  return <OrganizationWorkspace>{children}</OrganizationWorkspace>;
}
