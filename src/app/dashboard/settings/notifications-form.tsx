'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/database/supabase'

const notificationsFormSchema = z.object({
  email_notifications: z.boolean().default(false),
  vault_alerts: z.boolean().default(true),
  marketing_emails: z.boolean().default(false),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export function NotificationsForm() {
  const { address } = useAccount()
  const { toast } = useToast()

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      email_notifications: false,
      vault_alerts: true,
      marketing_emails: false,
    },
  })

  const onSubmit = async (data: NotificationsFormValues) => {
    try {
      if (!address) throw new Error('Wallet not connected')

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          wallet_address: address,
          ...data,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'wallet_address'
        })

      if (error) throw error

      toast({
        title: 'Notifications updated',
        description: 'Your notification preferences have been saved',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update notifications',
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email_notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Email Notifications
                </FormLabel>
                <FormDescription>
                  Receive email notifications about your account
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vault_alerts"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Vault Alerts
                </FormLabel>
                <FormDescription>
                  Get notified about your vault activity
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketing_emails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Marketing Emails
                </FormLabel>
                <FormDescription>
                  Receive promotional emails and updates
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Update Notifications</Button>
      </form>
    </Form>
  )
}