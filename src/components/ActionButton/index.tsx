import { Button } from '@/components/ui/button'

type ButtonVariant =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'

interface ActionButtonProps {
  label?: string
  variant?: ButtonVariant
  onClick?: () => void
}

export const ActionButton = ({
  label,
  onClick,
  variant,
}: ActionButtonProps) => {
  return (
    <Button
      className="cursor-pointer w-full h-full rounded-md bg-[#0C1B3B]/80 backdrop-blur-lg text-white hover:bg-white/10 transition-all hover:text-black/80"
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
export default ActionButton
