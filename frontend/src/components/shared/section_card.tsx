"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function SectionCard({
  id,
  title,
  description,
  icon: Icon,
  children,
  action,
}: {
  id?: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card id={id} className="scroll-mt-20">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
        <div className="flex-auto">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
