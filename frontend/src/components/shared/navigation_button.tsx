"use clietn";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface NavigationButtonProps {
  navigationLink: string;
}

export default function NavigationButton({
  navigationLink,
}: NavigationButtonProps) {
  const router = useRouter();
  return <Button onClick={() => router.push(navigationLink)}>Detail</Button>;
}
