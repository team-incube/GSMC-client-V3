'use client';

import Section1 from '@/widget/about/ui/Section1';
import Section2 from '@/widget/about/ui/Section2';
import Section3 from '@/widget/about/ui/Section3';
import Section4 from '@/widget/about/ui/Section4';
import Section5 from '@/widget/about/ui/Section5';
import Section6 from '@/widget/about/ui/Section6';

export default function AboutView() {
  return (
    <div className="flex flex-col">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  );
}
