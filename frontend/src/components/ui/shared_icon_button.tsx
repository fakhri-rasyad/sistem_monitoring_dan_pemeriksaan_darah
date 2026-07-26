import { Button } from "@/components/ui/button"
import { BeanOff } from "lucide-react"
import { JSX } from "react/jsx-runtime"


export function ButtonWithIcon(
  message: string,
) {
  return (
    <div className="flex gap-2">
      <Button variant="outline">
        {message}
      </Button>
    </div>
  )
}
