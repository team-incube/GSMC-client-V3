import { operateData } from "@/view/about/mock/aboutData"

export default function Section4() {
    return (
        <section className="flex flex-col items-center gap-[4rem]">
            <p className="text-[2.75rem] font-bold text-center">운영 방식</p>
            <div className="flex flex-row gap-[2.875rem]">
                {operateData.map((row) => (
                    <div key={row.id} className="flex flex-col w-[26.25rem] h-[19.6875rem] border border-[#B4B5B7] rounded-[1.25rem] gap-[2.75rem] p-[1.75rem]">
                        <row.icon />
                        <p className="font-semibold text-[2.25rem]">{row.title}</p>
                        <p className="font-light text-[1.25rem] text-[#68696C] whitespace-pre-line">{row.content}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}