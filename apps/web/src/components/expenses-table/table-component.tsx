import { ColumnDef } from '@tanstack/react-table'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Bill } from '@/lib/types'
import { useUser } from '@/contexts/user-context'

export function Transactions() {
  const { user } = useUser()

  return (
    <div className="container">
      {user.bills && (
        <DataTable columns={columns as unknown as ColumnDef<Bill, unknown>[]} data={user.bills} />
      )}
    </div>
  )
}
