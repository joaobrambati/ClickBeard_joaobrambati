import { Scissors } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary rounded-lg p-2">
        <Scissors className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        ClickBeard
      </span>
    </div>
  )
}
