import { MoreHorizontal, Trash, HelpCircle, } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useUser } from '@/contexts/user-context'
import { Investment } from '@/lib/types'
import { deleteInvestment } from '@/api/investments'
import { calculateTotalInvestment } from '@/lib/calculate-investment'

export function Actions({ invest }: { invest: Investment }) {
  const { user, update } = useUser()

  async function handleDelete() {
    const response = await deleteInvestment(invest.id)

    const totalAmount = parseFloat(calculateTotalInvestment(
      invest.amount,
      invest.rentability,
      Math.ceil(Math.abs(new Date().getTime() - new Date(invest.date).getTime()) / (1000 * 3600 * 24))
    ))

    update({
      ...user,
      invested: user.invested - totalAmount - invest.monthAmount,
      balance: user.balance - invest.amount,
      expenses: user.expenses - invest.monthAmount,
      investments: response
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
              disabled
              className='focus:text-emerald-500'
            >
              <HelpCircle className="w-4 h-4 mr-2 text-sky-500" />
              Track coming soon...
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