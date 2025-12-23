'use client';

import { useState } from 'react';

import { faqData } from '@/view/faq/mock/faqData';
import FAQElement from '@/widget/faq/ui/FAQElement';

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col gap-6">
        <p className="font-400 text-center text-3xl">자주 묻는 질문</p>
        <div className="flex flex-col">
          {faqData.map((faq) => (
            <FAQElement
              key={faq.id}
              title={faq.title}
              content={faq.content}
              showContent={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
