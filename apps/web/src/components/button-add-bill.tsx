import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useUser } from '@/contexts/user-context'
import { addBill } from '@/api/bills'

export function AddBill() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [status, setStatus] = useState('Pending')
  const { user, update } = useUser()

  const parseStatus = (status: string) => {
    switch (status) {
      case 'Pending':
        return 2
      case 'Paid':
        return 3
      case 'Late':
        return 1
      default:
        return 2
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const response = await addBill({
      name,
      amount,
      date: new Date(date).toISOString(),
      status: parseStatus(status)
    })

    update({
      ...user,
      expenses: user.expenses + amount,
      balance: user.balance - amount,
      bills: response
    })
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
        >
          <Plus className='w-5 h-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a new bill</DialogTitle>
            <DialogDescription>
              Add the informations below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder='eg. Internet'
                value={name}
                onChange={e => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="amount" className="text-right">
                amount
              </Label>
              <Input
                id="amount"
                type='number'
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="date" className="text-right">
                date
              </Label>
              <Input
                id="date"
                type='date'
                value={date}
                onChange={e => setDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="status" className="text-right">
                status
              </Label>
              <Select onValueChange={value => setStatus(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue id='status' defaultValue={status} placeholder='Pending' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'Pending'}>Pending</SelectItem>
                  <SelectItem value={'Paid'}>Paid</SelectItem>
                  <SelectItem value={'Late'}>Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
