import { ColumnDef } from '@tanstack/react-table'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Investment } from '@/lib/types'
import { useUser } from '@/contexts/user-context'

export function Investments() {
  const { user } = useUser()

  return (
    <div className="container">
      {user.investments && (
        <DataTable columns={columns as unknown as ColumnDef<Investment, unknown>[]} data={user.investments} />
      )}
    </div>
  )
}
