'use client'

import Section1 from "@/widget/about/ui/Section1"
import Section2 from "@/widget/about/ui/Section2"
import Section3 from "@/widget/about/ui/Section3"
import Section4 from "@/widget/about/ui/Section4"
import Section5 from "@/widget/about/ui/Section5"
import Section6 from "@/widget/about/ui/Section6"

export default function AboutView() {
    return(
        <div className="flex flex-col">
            <Section1 />
            <div className="flex flex-col justify-center items-center gap-[160px]">
                <Section2 />
                <hr className="w-[800px] border border-[#CDCDCF]"/>
                <Section3 />
                <hr className="w-[800px] border border-[#CDCDCF]"/>
                <Section4 />
                <hr className="w-[800px] border border-[#CDCDCF]"/>
                <Section5 />
                <hr className="w-[800px] border border-[#CDCDCF]"/>
                <Section6 />
            </div>
        </div>
    )
}