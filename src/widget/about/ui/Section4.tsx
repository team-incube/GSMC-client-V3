import { operateData } from '@/view/about/mock/aboutData';

export default function Section4() {
  return (
    <section className="flex flex-col items-center gap-[4rem]">
      <p className="text-center text-[2.75rem] font-bold">운영 방식</p>
      <div className="flex flex-row gap-[2.875rem]">
        {operateData.map((row) => (
          <div
            key={row.id}
            className="flex h-[19.6875rem] w-[26.25rem] flex-col gap-[2.75rem] rounded-[1.25rem] border border-[#B4B5B7] p-[1.75rem]"
          >
            <row.icon />
            <p className="text-[2.25rem] font-semibold">{row.title}</p>
            <p className="text-[1.25rem] font-light whitespace-pre-line text-[#68696C]">
              {row.content}
            </p>
          </div>
        ))}
      </div>
      <hr className="mt-[6rem] mb-[10rem] w-[800px] border border-[#CDCDCF]" />
    </section>
  );
}