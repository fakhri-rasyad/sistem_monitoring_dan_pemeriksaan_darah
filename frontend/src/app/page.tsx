import AppSidebar from "@/components/layouts/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <h1>Content</h1>
      </main>
    </SidebarProvider>
  );
}
