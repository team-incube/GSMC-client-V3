'use client';

import { useState } from 'react';
import FAQElement from '@/widget/faq/ui/FAQElement';
import { faqData } from '@/view/faq/mock/faqData';
import SearchBar from '@/shared/ui/SearchBar';

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col w-full">
      <p className="font-400 mb-[24px] text-center text-3xl">자주 묻는 질문</p>
      <SearchBar placeholder='질문을 검색해주세요.' />
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
  );
}
