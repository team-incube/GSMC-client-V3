import { evaluationData } from '@/view/about/mock/aboutData';

export default function Section3() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 md:gap-[1.5625rem]">
      <p className="text-center text-3xl font-bold md:text-4xl lg:text-[2.75rem]">평가영역</p>
      <p className="text-center text-base md:text-lg lg:text-[1.25rem]">
        전인적 능력을 평가하기 위한 3가지 핵심 영역
      </p>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-[5.4375rem]">
        {evaluationData.map((row) => (
          <div key={row.id} className="flex flex-col items-center gap-3 md:gap-[0.75rem]">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#DFEAFE] md:h-48 md:w-48 lg:h-[15.625rem] lg:w-[15.625rem]">
              <row.icon />
            </div>
            <p className="text-xl font-semibold md:text-2xl lg:text-[1.75rem]">{row.title}</p>
            <p className="text-center text-sm md:text-base">{row.content}</p>
          </div>
        ))}
      </div>
      <hr className="mb-16 mt-12 w-full max-w-[800px] border border-[#CDCDCF] md:mb-24 md:mt-16 lg:mb-[10rem] lg:mt-[8.4375rem]" />
    </section>
  );
}
