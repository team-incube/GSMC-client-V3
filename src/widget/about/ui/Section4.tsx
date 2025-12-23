import { operateData } from '@/view/about/mock/aboutData';

export default function Section4() {
  return (
    <section className="flex flex-col items-center gap-8 px-4 md:gap-12 lg:gap-[4rem]">
      <p className="text-center text-3xl font-bold md:text-4xl lg:text-[2.75rem]">운영 방식</p>
      <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row md:gap-8 lg:gap-[2.875rem]">
        {operateData.map((row) => (
          <div
            key={row.id}
            className="flex flex-1 flex-col gap-6 rounded-[1.25rem] border border-[#B4B5B7] p-6 md:gap-8 md:p-7 lg:gap-[2.75rem] lg:p-[1.75rem]"
          >
            <row.icon />
            <p className="text-2xl font-semibold md:text-3xl lg:text-[2.25rem]">{row.title}</p>
            <p className="whitespace-pre-line text-base font-light text-[#68696C] md:text-lg lg:text-[1.25rem]">
              {row.content}
            </p>
          </div>
        ))}
      </div>
      <hr className="mb-16 mt-8 w-full max-w-[800px] border border-[#CDCDCF] md:mb-24 md:mt-12 lg:mb-[10rem] lg:mt-[6rem]" />
    </section>
  );
}