import { MotionDiv } from '@/components/animations/motion-div'
import { SectionHeading } from '@/components/common/section-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is a Crypto IRA Vault?',
    answer: 'A Crypto IRA Vault is a retirement investment product that allows you to grow your cryptocurrency holdings with compound interest over time. Unlike traditional IRAs, these vaults leverage blockchain technology for transparency and security while offering competitive yields.'
  },
  {
    question: 'How are the yields generated?',
    answer: 'Yields are generated through a combination of staking rewards, decentralized finance (DeFi) protocols, and institutional-grade lending strategies. Our team carefully selects the highest-yielding yet secure opportunities across the crypto ecosystem.'
  },
  {
    question: 'Is my cryptocurrency safe in a vault?',
    answer: 'Yes, all deposited assets are held in secure, audited smart contracts with multi-signature protection. We use institutional-grade custody solutions and maintain insurance coverage for digital assets.'
  },
  {
    question: 'What cryptocurrencies can I deposit?',
    answer: 'We currently accept USDC, ETH, BTC, and several other major cryptocurrencies. Our platform regularly adds support for new assets based on market demand and security assessments.'
  },
  {
    question: 'Can I withdraw my funds early?',
    answer: 'Early withdrawal availability depends on your vault plan. Flex Vaults allow withdrawals anytime, while longer-term vaults may impose penalties or restrict early withdrawals to protect your long-term growth potential.'
  },
  {
    question: 'How are taxes handled?',
    answer: 'Crypto IRA Vaults are designed to be tax-efficient, but tax treatment varies by jurisdiction. We provide annual tax documentation but recommend consulting a tax professional about your specific situation.'
  },
  {
    question: 'What happens when my vault matures?',
    answer: 'When your vault reaches maturity, you can withdraw your funds penalty-free or roll them into a new vault. You\'ll receive notifications as your maturity date approaches.'
  },
  {
    question: 'Is there a minimum deposit amount?',
    answer: 'Minimum deposits vary by vault plan, ranging from $100 for Flex Vaults to $10,000 for Generational Vaults. These minimums help ensure proper diversification and risk management.'
  }
]

export default function FAQPage() {
  return (
    <div className="container py-12 space-y-12">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionHeading
          title="Frequently Asked Questions"
          description="Find answers to common questions about Crypto IRA Vaults"
        />
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MotionDiv>
    </div>
  )
}