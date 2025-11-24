import { operateorderData } from '@/view/about/mock/aboutData';

export default function Section5() {
  return (
    <section className="flex flex-col items-center gap-[6rem]">
      <p className="text-center text-[2.75rem] font-bold">운영 방식</p>
      <div className="flex w-full max-w-[100rem] flex-row flex-wrap justify-center gap-[4.25rem]">
        {operateorderData.map((row) => (
          <div
            key={row.id}
            className="flex h-[9.75rem] w-[47.3125rem] flex-row items-center gap-[1.25rem] rounded-[5rem] bg-[#131E32] px-[2.25rem] py-[1.75rem]"
          >
            <div className="flex h-[6.25rem] w-[6.25rem] items-center justify-center rounded-full bg-[#DFEAFE] text-[2.5rem] font-semibold text-[#385B97]">
              {row.id}
            </div>
            <div className="flex flex-col gap-[0.75rem]">
              <p className="text-2xl font-semibold text-[#BFD5FE]">{row.title}</p>
              <p className="text-[1.25rem] text-[#9B9C9F]">{row.content}</p>
            </div>
          </div>
        ))}
      </div>
      <hr className="mt-[4rem] mb-[10rem] w-[800px] border border-[#CDCDCF]" />
    </section>
  );
}
