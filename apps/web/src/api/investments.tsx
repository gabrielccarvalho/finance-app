import { api } from '@/lib/axios'
import { userId } from './user'

export async function deleteInvestment(id: string) {
  return api.delete(`/investments/${id}`).then(response => {
    return response.data
  })
}

export async function addInvestment({
  name,
  amount,
  monthAmount,
  date,
  security,
  rentability,
}: {
  name: string,
  amount: number,
  monthAmount: number,
  date: string,
  security: string,
  rentability: number
}) {
  return api.post(`/investments/${userId}`, {
    name,
    amount,
    monthAmount,
    date,
    security,
    rentability
  }).then(response => {
    return response.data
  })
}