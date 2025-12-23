import { operateorderData } from '@/view/about/mock/aboutData';

export default function Section5() {
  return (
    <section className="flex flex-col items-center gap-12 px-4 md:gap-16 lg:gap-[6rem]">
      <p className="text-center text-3xl font-bold md:text-4xl lg:text-[2.75rem]">운영 방식</p>
      <div className="flex w-full max-w-[100rem] flex-col flex-wrap justify-center gap-6 md:gap-8 lg:flex-row lg:gap-[4.25rem]">
        {operateorderData.map((row) => (
          <div
            key={row.id}
            className="flex w-full flex-row items-center gap-4 rounded-[3rem] bg-[#131E32] p-5 md:gap-5 md:rounded-[4rem] md:p-6 lg:w-[47.3125rem] lg:gap-[1.25rem] lg:rounded-[5rem] lg:px-[2.25rem] lg:py-[1.75rem]"
          >
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#DFEAFE] text-3xl font-semibold text-[#385B97] md:h-20 md:w-20 md:text-4xl lg:h-[6.25rem] lg:w-[6.25rem] lg:text-[2.5rem]">
              {row.id}
            </div>
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-[0.75rem]">
              <p className="text-lg font-semibold text-[#BFD5FE] md:text-xl lg:text-2xl">
                {row.title}
              </p>
              <p className="text-sm text-[#9B9C9F] md:text-base lg:text-[1.25rem]">{row.content}</p>
            </div>
          </div>
        ))}
      </div>
      <hr className="mb-16 mt-8 w-full max-w-[800px] border border-[#CDCDCF] md:mb-24 md:mt-12 lg:mb-[10rem] lg:mt-[4rem]" />
    </section>
  );
}
