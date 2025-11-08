'use client';

import Search from '@/shared/asset/svg/Search';
import { useState } from 'react';
import Header from '@/widget/header/ui/Header';
import FAQElement from '@/widget/faq/ui/FAQElement';
import { faqData } from '@/view/faq/mock/faqData';

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="m-0 mx-auto">
      <div className="m-0 mx-0 mt-0 mb-[40px]">
        <Header />
      </div>
      <p className="font-400 mb-[24px] text-center text-3xl">자주 묻는 질문</p>
      {/* <div className="relative mx-auto mb-8 h-12 w-full max-w-[558px]">
        <input
          type="text"
          placeholder="질문을 검색해 주세요"
          className="w-full rounded-lg border border-[#cdcdcf] px-4 py-3 pr-12 placeholder:text-[rgb(165,166,169)] focus:outline-none"
        />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400">
          <Search />
        </div>
      </div> */}

      <div className="mx-auto flex max-w-[588px] flex-col">
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
