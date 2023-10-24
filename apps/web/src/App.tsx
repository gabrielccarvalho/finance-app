import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Moon, Sun, PiggyBank, MoveDown, MoveUp } from 'lucide-react'
import { Transactions } from './components/expenses-table/table-component';
import { formatCurrency } from './lib/format-currency';
import { useUser } from './contexts/user-context';
import { Investments } from './components/investments-table/table-component';

export function App() {
  const { setTheme, theme } = useTheme()
  const { user } = useUser()

  const percentageOfIncome = Math.floor((user.expenses / user.income) * 100)

  const alarmColor = percentageOfIncome > 60 ? 'text-red-500' : percentageOfIncome > 40 ? 'text-yellow-600' : 'text-emerald-500'

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex items-center justify-between px-6 py-3 border-b'>
        <div className='flex flex-row'>
          <PiggyBank className='mr-2 text-yellow-500 w-7 h-7 dark:text-muted-foreground' />
          <h1 className='text-xl font-bold'>Finances</h1>
        </div>

        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>Made with 🤍 by Gabriel Carvalho.</span>
          <Separator orientation='vertical' className='h-6' />
          <Button variant='outline' onClick={() => {
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }}>
            <Sun className="w-5 h-5 mr-2 dark:sr-only" />
            <Moon className="w-5 h-5 sr-only dark:not-sr-only dark:mr-2" />
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </Button>
        </div>
      </div>

      <main className='flex flex-col flex-1 gap-6'>
        <div className='flex flex-col w-full shadow-md bg-muted'>
          <div className='flex flex-col justify-between w-full h-32 p-6 mx-auto max-w-7xl'>
            <h3 className='text-sm text-muted-foreground'>Balance</h3>
            <p className='font-sans text-2xl font-bold'>{formatCurrency(user.income - user.expenses)}</p>
            <span className='text-sm text-emerald-500'>{formatCurrency(user.balance)} with the savings!</span>
          </div>
        </div>

        <div className='flex flex-row w-full gap-6 p-6 mx-auto max-w-7xl'>
          <div className='flex flex-col justify-between w-1/3 h-32 p-4 border shadow-md rounded-xl'>
              <div className='flex flex-row justify-between'>
                <h3 className='text-sm text-muted-foreground'>Income</h3>
                <MoveDown strokeWidth={1.5} className='w-7 h-7 text-emerald-500' />
              </div>
              <p className='font-sans text-2xl font-bold'>{formatCurrency(user.income)}</p>
              <span className='text-sm text-muted-foreground'>+0.5% from last month</span>
          </div>

          <div className='flex flex-col justify-between w-1/3 h-32 p-4 border shadow-md rounded-xl'>
            <div className='flex flex-row justify-between'>
              <h3 className='text-sm text-muted-foreground'>Invested</h3>
              <PiggyBank strokeWidth={1.5} className='text-yellow-500 w-7 h-7' />
            </div>
            <p className='font-sans text-2xl font-bold'>{formatCurrency(user.invested)}</p>
            <span className='text-sm text-muted-foreground'>+4.5% from last month</span>
          </div>

          <div className='flex flex-col justify-between w-1/3 h-32 p-4 border shadow-md rounded-xl'>
            <div className='flex flex-row justify-between'>
              <h3 className='text-sm text-muted-foreground'>Expenses</h3>
              <MoveUp strokeWidth={1.5} className='text-red-500 w-7 h-7' />
            </div>
            <p className='font-sans text-2xl font-bold'>{formatCurrency(user.expenses)}</p>
            <span className={`text-sm ${alarmColor}`}>{percentageOfIncome}% of your current income.</span>
          </div>
        </div>

        <Tabs defaultValue="expenses" className="">
          <TabsList className="grid max-w-6xl grid-cols-3 mx-auto">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses">
            <Transactions />
          </TabsContent>
          <TabsContent value="investments">
            <Investments />
          </TabsContent>
          <TabsContent value="overview">
            <div className='flex flex-col items-center justify-center mx-auto max-w-7xl h-96'>
              <h2 className='font-mono text-2xl font-bold'>Overview tab comming soon...</h2>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
