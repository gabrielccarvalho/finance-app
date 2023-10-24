import { MoreHorizontal, Trash, CheckCheck, AlertTriangle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { deleteBill, updateStatus } from '@/api/bills'
import { useUser } from '@/contexts/user-context'
import { Bill } from '@/lib/types'

export function Actions({ payment }: { payment: Bill }) {
  const { user, update } = useUser()

  async function handleDelete() {
    const response = await deleteBill(payment.id)

    update({
      ...user,
      expenses: user.expenses - payment.amount,
      balance: user.balance + payment.amount,
      bills: response
    })
  }

  async function handleUpdateStatus(status: string) {
    const response = await updateStatus(payment.id, status)

    update({
      ...user,
      bills: response
    })
  }

  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-end w-full h-8 p-2">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleUpdateStatus('paid')}
              className='focus:text-emerald-500'
            >
              <CheckCheck className="w-4 h-4 mr-2 text-emerald-500" />
              Paid
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus('pending')}
              className='focus:text-yellow-500'
            >
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus('late')}
              className='focus:text-red-500'
            >
              <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
              Late
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Danger Area</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className='focus:text-red-500'
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}