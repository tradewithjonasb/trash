import { MotionDiv } from '@/components/animations/motion-div'
import { SectionHeading } from '@/components/common/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-12">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionHeading
          title="About Crypto IRA Vaults"
          description="Building the future of retirement investing"
        />
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We're revolutionizing retirement savings by combining blockchain technology's
                transparency and efficiency with traditional retirement principles. Our mission is
                to provide accessible, secure, and high-yield retirement solutions for the digital
                age.
              </p>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  1
                </div>
                <p className="text-muted-foreground">
                  Connect your wallet and select a vault plan matching your retirement timeline
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  2
                </div>
                <p className="text-muted-foreground">
                  Deposit cryptocurrency into your secure vault
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  3
                </div>
                <p className="text-muted-foreground">
                  Earn competitive yields while your assets grow automatically
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-muted rounded-lg p-8 text-center"
      >
        <h3 className="text-xl font-semibold mb-2">Ready to start building your crypto retirement?</h3>
        <p className="text-muted-foreground mb-4">
          Join thousands of investors securing their financial future with Crypto IRA Vaults
        </p>
        <Button size="lg">Get Started Today</Button>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Crypto IRA Vaults was founded by a team of blockchain experts and traditional finance
              veterans with decades of combined experience at leading financial institutions and
              crypto projects. We're bridging the gap between conventional retirement planning and
              the new digital economy.
            </p>
          </CardContent>
        </Card>
      </MotionDiv>
    </div>
  )
}