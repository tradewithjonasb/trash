import { MotionDiv } from '@/components/animations/motion-div'
import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'

export default function ContactPage() {
  return (
    <div className="container py-12 space-y-12">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <SectionHeading
          title="Contact Us"
          description="Have questions? Reach out to our support team"
        />
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message" rows={5} />
          </div>
          <Button>Send Message</Button>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Support</h3>
            <p className="text-muted-foreground">
              For technical issues or account assistance, please email support@cryptovault.com
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Business Inquiries</h3>
            <p className="text-muted-foreground">
              For partnership opportunities, contact partnerships@cryptovault.com
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Office</h3>
            <p className="text-muted-foreground">
              123 Crypto Street
              <br />
              Blockchain City, BC 10001
              <br />
              Digital Economy
            </p>
          </div>
        </MotionDiv>
      </div>
    </div>
  )
}