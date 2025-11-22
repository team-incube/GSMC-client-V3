import Header from '@/shared/ui/header/ui/Header';
import ScrollDown from '@/shared/asset/svg/ScrollDown';

export default function Section1() {
  const HEADER_HEIGHT = '4.375rem';
  return (
    <div className="w-full">
      <Header />
      <div
        className="relative bg-[url(@/shared/asset/img/aboutImg.png)] bg-cover bg-center"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[3.5rem] font-extrabold text-white">GSM 인증제란?</p>
          <ScrollDown
            className="cursor-pointar absolute bottom-[63px]"
            onClick={() => {
              document.getElementById('section2')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
  );
}
