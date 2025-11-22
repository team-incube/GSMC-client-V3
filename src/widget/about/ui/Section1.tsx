import Header from "@/shared/ui/header/ui/Header";
import ScrollDown from "@/shared/asset/svg/ScrollDown";


export default function Section1() {
    return (
        <div className="w-full">
            <Header />
            <div className="relative bg-[url(@/shared/asset/img/aboutImg.png)] h-[calc(100vh-4.375rem)] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute flex flex-col items-center justify-between inset-0 ">
                        <div></div>
                        <p className="font-extrabold text-[3.5rem] text-white">GSM 인증제란?</p>
                        <ScrollDown className="cursor-pointar mb-[63px]" onClick={() => {
                            document.getElementById('section2')?.scrollIntoView({ behavior: 'smooth' });
                        }}/>
                    </div>
            </div>
        </div>
    )
}