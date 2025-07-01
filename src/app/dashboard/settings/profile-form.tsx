'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/database/supabase'

const profileFormSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  username: z.string().min(2, 'Username must be at least 2 characters').optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { address } = useAccount()
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (!address) throw new Error('Wallet not connected')

      const { error } = await supabase
        .from('users')
        .upsert({
          wallet_address: address,
          email: data.email,
          username: data.username,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'wallet_address'
        })

      if (error) throw error

      toast({
        title: 'Profile updated',
        description: 'Your profile information has been saved',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  )
}