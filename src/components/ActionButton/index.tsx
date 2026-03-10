import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type ButtonVariant =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'

interface ActionButtonProps {
  label?: React.ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  gradientBorder?: boolean
}

export const ActionButton = ({
  label,
  onClick,
  variant,
  gradientBorder,
}: ActionButtonProps) => {
  return (
    <Button
      className={cn(
        'cursor-pointer rounded-md backdrop-blur-lg text-white transition-all drop-shadow-md py-4',
        gradientBorder
          ? 'border-[5px] border-transparent [background:linear-gradient(rgba(12,27,59,0.8),rgba(12,27,59,0.8))_padding-box,linear-gradient(to_right,#BA68C8,#EE9645)_border-box]'
          : 'bg-[#0C1B3B]/80 hover:bg-white/10 hover:text-black/80',
      )}
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
export default ActionButton
