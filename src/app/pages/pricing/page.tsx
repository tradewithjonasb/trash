import { MotionDiv } from '@/components/animations/motion-div'
import { SectionHeading } from '@/components/common/section-heading'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { VAULT_PLANS } from '@/config/vault-plans'
import { formatCurrency } from '@/lib/utils'

export default function PricingPage() {
  return (
    <div className="container py-12 space-y-12">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionHeading
          title="Vault Plans & Pricing"
          description="Choose the right vault for your retirement goals"
        />
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VAULT_PLANS.map((plan, index) => (
          <MotionDiv
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full flex flex-col border-2 ${index === 3 ? 'border-primary' : ''}`}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{plan.name}</span>
                  <Badge variant={plan.badgeVariant}>{plan.duration}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="text-4xl font-bold">
                  {plan.apy}% APY
                </div>
                <div className="text-sm text-muted-foreground">
                  Minimum deposit: {formatCurrency(plan.minDeposit)}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </MotionDiv>
        ))}
      </div>

      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-muted rounded-lg p-6 mt-12"
      >
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Need help choosing?</h3>
          <p className="text-muted-foreground">
            Our retirement specialists can help you select the perfect vault strategy.
          </p>
          <Button variant="outline" className="mt-4">
            Schedule Consultation
          </Button>
        </div>
      </MotionDiv>
    </div>
  )
}