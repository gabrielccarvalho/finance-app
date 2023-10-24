export type User = {
  id: string
  name: string
  balance: number
  income: number
  invested: number
  expenses: number
  bills: Bill[]
  investments: Investment[]
  createdAt: string
  updatedAt: string
}

export type Investment = {
  id: string
  name: string
  amount: number
  monthAmount: number
  security: string
  rentability: number
  date: string
  user: User
  userId: string
  createdAt: string
  updatedAt: string
}

export type Bill = {
  id: string
  name: string
  amount: number
  status: number
  date: string
  user: User
  userId: string
  createdAt: string
  updatedAt: string
}