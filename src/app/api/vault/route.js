import { supabase } from '@/lib/database/supabase'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = headers()
  const walletAddress = headersList.get('x-wallet-address')

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('vaults')
    .select('*')
    .eq('user_address', walletAddress)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Calculate current value for each vault
  const vaults = data.map((vault) => {
    const startDate = new Date(vault.start_date)
    const endDate = new Date(vault.end_date)
    const now = new Date()
    
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const elapsedDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const progress = Math.min(elapsedDays / totalDays, 1)
    
    const interest = vault.deposit_amount * (vault.apy / 100) * progress
    const currentValue = vault.deposit_amount + interest
    
    return {
      ...vault,
      currentValue,
      progress,
      isMature: now >= endDate,
      daysRemaining: Math.max(0, (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }
  })

  return NextResponse.json(vaults)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { walletAddress, planId, depositAmount, depositCurrency, apy, durationMonths } = body

  if (!walletAddress || !planId || !depositAmount || !depositCurrency || !apy || !durationMonths) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + durationMonths)

  const { data, error } = await supabase
    .from('vaults')
    .insert([
      {
        user_address: walletAddress,
        plan_id: planId,
        deposit_amount: depositAmount,
        deposit_currency: depositCurrency,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        apy: apy,
        status: 'active',
      },
    ])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}