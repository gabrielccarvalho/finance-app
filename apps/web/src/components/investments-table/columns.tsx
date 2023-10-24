import { ColumnDef } from "@tanstack/react-table"
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from './column-header'

import { Investment } from "@/lib/types"
import { Actions } from './actions'
import { calculateTotalInvestment } from '@/lib/calculate-investment'

export const columns: ColumnDef<Investment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "security",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Security" />
    ),
    cell: ({ row }) => {
      const security = row.getValue("security")
      const color = security === 'medium' ? "yellow" : security === 'safe' ? "emerald" : "red"

      return (
        <div className='flex flex-row'>
          {security === 'medium' ? (
            <>
              <MoveRight className={`w-5 h-5 text-${color}-500 mr-2`} />
              <p>Medium</p>
            </>

          ) : security === 'safe' ? (
            <>
              <TrendingUp className={`w-5 h-5 text-${color}-500 mr-2`} />
              <p>Safe</p>
            </>
          ) : (
            <>
              <TrendingDown className={`w-5 h-5 text-${color}-500 mr-2`} />
              <p>Risky</p>
            </>
          )}
        </div>
      )
    }
  },
  {
    accessorKey: "rentability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rentability" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("rentability"))
      return <div className="font-medium">{amount}%</div>
    },
  },
  {
    accessorKey: "monthAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invested this month" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("monthAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Initial Investment" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Accumulated" />
    ),
    cell: ({ row }) => {
      const diffInDays = Math.ceil(Math.abs(new Date().getTime() - new Date(row.getValue("date")).getTime()) / (1000 * 3600 * 24));

      const amount = parseFloat(calculateTotalInvestment(
        parseFloat(row.getValue("amount")),
        parseFloat(row.getValue("rentability")),
        diffInDays
        )) + parseFloat(row.getValue("monthAmount"))

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date)
      return <div className="font-medium">{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invest = row.original

      return (
        <Actions invest={invest} />
      )
    },
  },
]
