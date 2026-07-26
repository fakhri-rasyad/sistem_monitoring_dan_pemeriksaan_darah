import AppSidebar from "@/components/layouts/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
} : {children: React.ReactNode}) {
return (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
          <div>
      {children}
    </div>
    </SidebarInset>
  </SidebarProvider>
)
}
