import { evaluationData } from "@/view/about/mock/aboutData"

export default function Section3() {
    return (
        <section className="flex flex-col items-center gap-[1.5625rem]">
            <p className="text-[2.75rem] font-bold text-center">평가영역</p>
            <p className="text-[1.25rem]">전인적 능력을 평가하기 위한 3가지 핵심 영역</p>
            <div className="flex flex-row gap-[5.4375rem]">
                {evaluationData.map((row) => (
                    <div key={row.id} className="flex items-center flex-col gap-[0.75rem]">
                        <div className="flex items-center justify-center w-[15.625rem] h-[15.625rem] bg-[#DFEAFE] rounded-[11.25rem]">
                            <row.icon/>
                        </div>
                        <p className="font-semibold text-[1.75rem]">{row.title}</p>
                        <p>{row.content}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}