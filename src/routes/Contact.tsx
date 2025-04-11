import Home from '@/components/Home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Home className={'box-1'} />}
