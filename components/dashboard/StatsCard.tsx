import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  positive?: boolean
  icon: LucideIcon
  accent?: 'blue' | 'green' | 'amber' | 'red'
}

const accentMap = {
  blue: 'bg-primary/10 text-primary',
  green: 'bg-emerald-500/10 text-emerald-400',
  amber: 'bg-amber-500/10 text-amber-400',
  red: 'bg-red-500/10 text-red-400',
}

export function StatsCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
  accent = 'blue',
}: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </p>
        <div className={cn('p-2 rounded-lg', accentMap[accent])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {change && (
          <p
            className={cn(
              'text-xs mt-1 font-medium',
              positive ? 'text-emerald-400' : 'text-red-400'
            )}
          >
            {positive ? '+' : ''}{change} so voi hom qua
          </p>
        )}
      </div>
    </div>
  )
}
