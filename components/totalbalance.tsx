import { formatAmount } from '@/lib/utils'
import React from 'react'
import CountupAnimation from './countupanimation'
import { Doughnut } from 'react-chartjs-2'
import DoughnutChart from './doughnutchart'

const TotalBalance = ({accounts = [], totalBanks, totalCurrentBalance}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance">
        <div className="total-balance-chart">
            <DoughnutChart accounts={accounts}/>
        </div>

        <div className='flex flex-col gap-6 flex-center'>
            <h2 className='header-2'>
                Accounts: {totalBanks}
            </h2>

            <div className='flex flex-col gap-2 flex-center'>
                <p className='total-balance-label'>
                    Current Balance
                </p>

                <p className='total-balance-amount flex-center gap-2'>
                    <CountupAnimation 
                        amount= {totalCurrentBalance}
                    />
                </p>
            </div>
        </div>
    </section>
  )
}

export default TotalBalance