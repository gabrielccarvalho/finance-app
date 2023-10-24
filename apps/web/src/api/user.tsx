import { api } from '@/lib/axios'

export const userId = '972e14eb-b47e-4d47-8fca-8a697f680b18'

export async function getUserInfo(){
  return api.get(`/info/${userId}`).then(response => {
    return response.data
  })
}