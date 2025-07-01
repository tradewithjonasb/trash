import { MotionDiv } from '@/components/animations/motion-div'
import { SectionHeading } from '@/components/common/section-heading'
import { ScrollArea } from '@/app/components/ui/scroll-area'

export default function TermsPage() {
  return (
    <div className="container py-12 space-y-8">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <SectionHeading
          title="Terms of Service"
          description="Last updated: January 1, 2023"
        />
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <ScrollArea className="h-[calc(100vh-200px)] p-6">
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Crypto IRA Vault platform ("Platform"), you agree to be
                bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you
                may not use the Platform.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                The Platform provides cryptocurrency retirement vault services that allow users to
                deposit digital assets and earn yields over specified lock-up periods. The Platform
                is not a bank and does not provide banking services.
              </p>

              <h2>3. Eligibility</h2>
              <p>
                To use the Platform, you must be at least 18 years old and comply with all
                applicable laws in your jurisdiction. Certain vault products may have additional
                eligibility requirements.
              </p>

              <h2>4. Account Registration</h2>
              <p>
                You must connect a supported cryptocurrency wallet to use the Platform. You are
                solely responsible for maintaining the security of your wallet credentials.
              </p>

              <h2>5. Vault Terms</h2>
              <p>
                Each vault product has specific terms regarding lock-up periods, yields, and
                withdrawal conditions. These terms are displayed at the time of vault creation and
                form part of these Terms.
              </p>

              <h2>6. Risk Disclosure</h2>
              <p>
                Cryptocurrency investments involve substantial risk. Past performance is not
                indicative of future results. You could lose all or a substantial amount of your
                investment.
              </p>

              <h2>7. Fees</h2>
              <p>
                The Platform may charge fees for certain services. All applicable fees will be
                disclosed prior to vault creation or service use.
              </p>

              <h2>8. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to the Platform at any
                time, without notice, for any reason.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                Digital Economy, without regard to its conflict of law provisions.
              </p>
            </div>
          </ScrollArea>
        </Card>
      </MotionDiv>
    </div>
  )
}