import { MotionDiv } from '@/components/animations/motion-div'
import { SectionHeading } from '@/components/common/section-heading'
import { ProfileForm } from './profile-form'
import { SecurityForm } from './security-form'
import { NotificationsForm } from './notifications-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  return (
    <div className="container py-8 space-y-8">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionHeading
          title="Account Settings"
          description="Manage your account preferences and security settings"
        />
      </MotionDiv>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProfileForm />
          </MotionDiv>
        </TabsContent>

        <TabsContent value="security">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SecurityForm />
          </MotionDiv>
        </TabsContent>

        <TabsContent value="notifications">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NotificationsForm />
          </MotionDiv>
        </TabsContent>
      </Tabs>
    </div>
  )
}