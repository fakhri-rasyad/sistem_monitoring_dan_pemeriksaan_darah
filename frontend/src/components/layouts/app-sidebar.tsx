"use client";

import Link from "next/link";

import {
    Baby,
    BeanOff,
    BedDouble,
    Briefcase,
    Heart,
    Hospital,
    LayoutDashboard,
    Stethoscope,
    UtensilsCrossed,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";


const items = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Alergi",
        href: "/dashboard/alergi",
        icon: BeanOff,
    },
    {
        title: "Pantangan",
        href: "/dashboard/pantangan",
        icon: UtensilsCrossed,
    },

    {
        title: "Parameter Pemeriksaan Darah",
        href: "/dashboard/ppdh",
        icon: Stethoscope,
    },

    {
        title: "Pekerjaan",
        href: "/dashboard/pekerjaan",
        icon: Briefcase,
    },
];

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-3 px-3 py-2">
                    <Hospital size={36} />

                    <div>
                        <h2 className="font-semibold">
                          Medical Check-Up (MCU) System
                        </h2>

                        <p className="text-xs text-white-400">
                            Sistem Pemantauan dan Pencatatan Kondisi Tubuh
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            <Separator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Menu
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    render={
                                        <Link href={item.href} />
                                    }
                                >
                                    <item.icon className="h-4 w-4" />

                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    );
}
