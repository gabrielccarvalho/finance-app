import { api } from '@/lib/axios'
import { userId } from './user'

export async function deleteBill(id: string) {
  return api.delete(`/bills/${id}`).then(response => {
    return response.data
  })
}

export async function updateStatus(id: string, status: string) {
  return api.put(`/bills/${id}/${status}`).then(response => {
    return response.data
  })
}

export async function addBill({
  name,
  amount,
  date,
  status,
}: {
  name: string,
  amount: number,
  date: string,
  status: number,
}) {
  return api.post(`/bills/${userId}`, {
    name,
    amount,
    date,
    status
  }).then(response => {
    return response.data
  })
}