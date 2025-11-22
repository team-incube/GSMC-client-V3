import Image from "next/image";
import airplane from "@/shared/asset/img/airplane.png"

export default function Section2() {
    return (
        <section id="section2" className="flex flex-col items-center gap-[1.5625rem] pt-[11.375rem]">
            <p className="text-[2.75rem] font-bold text-center">프로그램 소개</p>
            <div className="flex flex-col w-[70rem] h-[32.5625rem] border border-[#CDCDCF] rounded-[1.25rem] px-[3.75rem] py-[3.75rem] gap-[2.5rem]">
                <div className="flex flex-row gap-[1.25rem]">
                    <Image alt="종이비행기 아이콘" src={airplane} width={50} height={50} className="mb-[3rem]"/>
                    <div>
                        <p className="font-semibold text-[2rem]">역량인증 기준 설정</p>
                        <p className="font-light text-xl">GSM 인증제는 영마이스터로서 졸업할 때까지 <span className="font-semibold text-[#385B97]">적정 수준에 도달</span>할 수 있도록<br/>학교 실정에 맞게 역량인증의 기준을 설정하여 운영됩니다.</p>
                    </div>
                </div>
                <hr className="w-[1000px] border-[#CDCDCF]"/>
                <div className="flex flex-row gap-[1.25rem]">
                    <Image alt="종이비행기 아이콘" src={airplane} width={50} height={50} className="mb-[3rem]"/>
                    <div>
                        <p className="font-semibold text-[2rem]">동기 부여 및 책무성 제고</p>
                        <p className="font-light text-xl">일정 수준에 도달한 학생에게 인증서를 수여함으로써 학생들의 <span className="font-semibold text-[#385B97]">교육 참여 동기를 부여</span>하고<br/>학교 교육의 <span className="font-semibold text-[#385B97]">책무성을 제고</span>하고자 하는 프로그램입니다.</p>
                    </div>
                </div>
                <hr className="w-[1000px] border-[#CDCDCF]"/>
                <div className="flex justify-center flex-row gap-[2.5rem]">
                    <p className="flex items-center justify-center w-[7.9375rem] h-[2.75rem] bg-[#BFD5FE] text-[#385B97] text-xl rounded-[1.125rem]"># 역량인증</p>
                    <p className="flex items-center justify-center w-[7.9375rem] h-[2.75rem] bg-[#BFD5FE] text-[#385B97] text-xl rounded-[1.125rem]"># 전인적 평가</p>
                    <p className="flex items-center justify-center w-[7.9375rem] h-[2.75rem] bg-[#BFD5FE] text-[#385B97] text-xl rounded-[1.125rem]"># 동기부여</p>
                    <p className="flex items-center justify-center w-[7.9375rem] h-[2.75rem] bg-[#BFD5FE] text-[#385B97] text-xl rounded-[1.125rem]"># 책무성 제고</p>
                </div>
            </div>
        </section>
    )
}