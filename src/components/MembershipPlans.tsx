import React, { useState } from 'react';
import { MEMBERSHIP_TIERS } from '../data';
import { MembershipTier } from '../types';
import { Check, X, ShieldCheck, Ticket, User, Crown } from 'lucide-react';

interface MembershipPlansProps {
  onPlanSelected: (plan: MembershipTier) => void;
}

export default function MembershipPlans({ onPlanSelected }: MembershipPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('elite');
  const [submittedBrief, setSubmittedBrief] = useState<string | null>(null);

  const handleSelect = (plan: MembershipTier) => {
    setSelectedPlan(plan.id);
    onPlanSelected(plan);
    setSubmittedBrief(`Bespoke invitation initiated. Your exclusive ${plan.name} entry profile is being prepared. Our Lavington concierge will contact you within 60 minutes to finalize private scheduling.`);
    setTimeout(() => {setSubmittedBrief(null);}, 5000);
  };

  return (
    <section id="membership-tiers" className="scroll-mt-16 py-0 pb-4 bg-gray-50 dark:bg-brand-black-card border-t border-gray-100 dark:border-brand-gray-border/20 transition-colors duration-200">
      
      {/* Compact Minimal Marquee divider */}
      <div className="relative h-[80px] sm:h-[100px] bg-brand-black-deep overflow-hidden flex flex-col justify-center py-1.5 select-none w-full mb-4">
        
        {/* Ribbon 1: Gold background, clean sans-serif text, scrolls left, rotated -1 deg */}
        <div className="w-[115%] -ml-[7.5%] -rotate-1 bg-brand-gold text-brand-black-deep py-1 sm:py-1.5 border-y border-brand-gold/20 shadow-md overflow-hidden flex items-center relative z-20">
          <div className="flex w-max items-center animate-marquee whitespace-nowrap text-[10px] sm:text-xs font-display font-medium tracking-[0.25em] uppercase">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="mx-16">
                ASTRA FITNESS
              </span>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Dark black background, elegant italic serif text, scrolls right, rotated 1 deg */}
        <div className="w-[115%] -ml-[7.5%] rotate-1 bg-brand-black-elevated text-white py-1 sm:py-1.5 border-y border-brand-gray-border/30 shadow-md overflow-hidden flex items-center relative mt-1 z-10">
          <div className="flex w-max items-center animate-marquee-reverse whitespace-nowrap text-sm sm:text-lg font-serif italic font-light tracking-[0.1em] lowercase">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="mx-12 sm:mx-16 text-white">strength</span>
                <span className="mx-12 sm:mx-16 text-brand-gold font-light font-sans tracking-normal opacity-55">/</span>
                <span className="mx-12 sm:mx-16 text-brand-gold-light">grace</span>
                <span className="mx-12 sm:mx-16 text-brand-gold font-light font-sans tracking-normal opacity-55">/</span>
                <span className="mx-12 sm:mx-16 text-white">focus</span>
                <span className="mx-12 sm:mx-16 text-brand-gold font-light font-sans tracking-normal opacity-55">/</span>
                <span className="mx-12 sm:mx-16 text-brand-gold-light">flow</span>
                <span className="mx-12 sm:mx-16 text-brand-gold font-light font-sans tracking-normal opacity-55">/</span>
                <span className="mx-12 sm:mx-16 text-brand-gold-light">restore</span>
                <span className="mx-12 sm:mx-16 text-brand-gold font-light font-sans tracking-normal opacity-55">/</span>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-3">
          <h2 className="font-serif font-light text-lg sm:text-2xl text-gray-900 dark:text-white uppercase tracking-tight">
            Membership <span className="font-serif italic font-semibold text-brand-gold">Tiers</span>
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-1" />
        </div>

        {submittedBrief && (
          <div className="max-w-3xl mx-auto mb-4 p-2 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 rounded-none text-xs font-semibold text-center animate-fade-in flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>{submittedBrief}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-0">
          {MEMBERSHIP_TIERS.map((tier) => {
            const isElite = tier.id === 'elite';

            return (
              <div
                key={tier.id}
                className={`flex flex-col rounded-none p-3 sm:p-3.5 transition-all relative ${
                  isElite
                    ? 'bg-brand-gold text-brand-black-deep transform md:-translate-y-1 shadow-2xl scale-[1.01] z-20 border border-brand-gold'
                    : 'bg-white dark:bg-brand-black-elevated text-gray-900 dark:text-brand-gray-light border border-gray-200 dark:border-brand-gray-border/50 hover:border-brand-gold/60'
                }`}
              >
                {/* Most Popular Label on Elite */}
                {isElite && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-black-deep text-brand-gold text-[8px] uppercase font-sans font-black tracking-widest px-3 py-1 rounded-none shadow-md border border-brand-gold/20 animate-pulse">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Title & Pricing */}
                <div className="mb-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {tier.id === 'core' && <User className={`w-3.5 h-3.5 ${isElite ? 'text-brand-black-deep' : 'text-brand-gold'}`} />}
                    {tier.id === 'elite' && <Crown className={`w-3.5 h-3.5 ${isElite ? 'text-brand-black-deep' : 'text-brand-gold'}`} />}
                    {tier.id === 'platinum' && <Crown className={`w-3.5 h-3.5 ${isElite ? 'text-brand-black-deep' : 'text-brand-gold'}`} />}
                    <h3 className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider leading-none">
                      {tier.name}
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[7px] font-sans font-bold tracking-[0.15em] uppercase ${isElite ? 'text-brand-black-deep/70' : 'text-gray-400 dark:text-brand-gray-muted'}`}>Starting from</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[17px] sm:text-[19px] font-serif font-light">KES {tier.price.toLocaleString()}</span>
                      <span className={`text-[9px] font-light ${isElite ? 'text-brand-black-deep/80' : 'text-gray-500 dark:text-brand-gray-muted'}`}>
                        {tier.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Listed Features */}
                <ul className="space-y-0.5 mb-3 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[9px] sm:text-[9.5px] font-semibold leading-tight">
                      <span className={`p-0.5 rounded-none border ${isElite ? 'bg-brand-black-deep/10 text-brand-black-deep border-brand-black-deep/30' : 'bg-brand-gold/10 text-brand-gold border-brand-gold/20'} flex-shrink-0 mt-0.5`}>
                        <Check className="w-1.5 h-1.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Select button - pushed in horizontally */}
                <div className="mt-auto pt-1 flex justify-center w-full">
                  <button
                    onClick={() => handleSelect(tier)}
                    className={`w-[88%] font-sans font-bold text-[8px] tracking-widest uppercase py-1.5 sm:py-2 rounded-none transition-all border ${
                      isElite
                        ? 'bg-brand-black-deep text-white border-transparent hover:bg-brand-black-card hover:scale-[1.01]'
                        : 'border-brand-gold text-brand-gold bg-transparent hover:bg-brand-gold hover:text-white hover:scale-[1.01]'
                    } active:scale-[0.99] cursor-pointer`}
                  >
                    {tier.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
