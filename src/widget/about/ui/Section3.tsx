import { evaluationData } from '@/view/about/mock/aboutData';

export default function Section3() {
  return (
    <section className="flex flex-col items-center gap-[1.5625rem]">
      <p className="text-center text-[2.75rem] font-bold">평가영역</p>
      <p className="text-[1.25rem]">전인적 능력을 평가하기 위한 3가지 핵심 영역</p>
      <div className="flex flex-row gap-[5.4375rem]">
        {evaluationData.map((row) => (
          <div key={row.id} className="flex flex-col items-center gap-[0.75rem]">
            <div className="flex h-[15.625rem] w-[15.625rem] items-center justify-center rounded-full bg-[#DFEAFE]">
              <row.icon />
            </div>
            <p className="text-[1.75rem] font-semibold">{row.title}</p>
            <p>{row.content}</p>
          </div>
        ))}
      </div>
      <hr className="mt-[8.4375rem] mb-[10rem] w-[800px] border border-[#CDCDCF]" />
    </section>
  );
}
