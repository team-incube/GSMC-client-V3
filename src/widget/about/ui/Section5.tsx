import { operateorderData } from "@/view/about/mock/aboutData"

export default function Section5() {
    return (
        <section className="flex flex-col items-center gap-[6rem]">
            <p className="text-[2.75rem] font-bold text-center">운영 방식</p>
            <div className="flex justify-center flex-wrap flex-row gap-[4.25rem] w-full max-w-[100rem]">
                {operateorderData.map((row) => (
                    <div key={row.id} className="flex flex-row items-center w-[47.3125rem] h-[9.75rem] rounded-[5rem] bg-[#131E32] px-[2.25rem] py-[1.75rem] gap-[1.25rem]">
                        <div className="flex items-center justify-center w-[6.25rem] h-[6.25rem] font-semibold text-[2.5rem] text-[#385B97] bg-[#DFEAFE] rounded-full">
                            {row.id}
                        </div>
                        <div className="flex flex-col gap-[0.75rem]">
                            <p className="font-semibold text-2xl text-[#BFD5FE]">{row.title}</p>
                            <p className="text-[1.25rem] text-[#9B9C9F]">{row.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="w-[800px] mt-[4rem] mb-[10rem] border border-[#CDCDCF]"/>
        </section>
    )
}