'use client';

import Image from 'next/image';

import cumulativeTable from '@/shared/asset/img/cumulativeTable.png';
import scoreTable from '@/shared/asset/img/scoreTable.png';
import yearTable from '@/shared/asset/img/yearTable.png';
import Download from '@/shared/asset/svg/Download';

export default function Section6() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/2025학년도_GSM_역량_인증제_영역별_취득_점수_기준표.pdf';
    link.download = 'GSM_역량인증제_기준표.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="mb-16 flex flex-col items-center gap-8 px-4 md:mb-24 md:gap-12 lg:mb-[11.5625rem] lg:gap-[4rem]">
      <p className="text-center text-2xl font-bold md:text-3xl lg:text-[2.75rem]">
        GSM 역량 인증제 영역별 취득 점수 기준표
      </p>
      <div className="flex w-full max-w-[86.375rem] flex-col gap-2 md:gap-[0.5rem]">
        <p className="text-lg md:text-xl lg:text-2xl">영역별 점수 분포</p>
        <Image src={scoreTable} alt="영역별 점수 분포 표" className="h-auto w-full" />
      </div>
      <div className="flex w-full max-w-[86.375rem] flex-col gap-2 md:gap-[0.5rem]">
        <p className="text-lg md:text-xl lg:text-2xl">영역별 점수 분포 - 누적</p>
        <Image src={cumulativeTable} alt="누적 점수 분포 표" className="h-auto w-full" />
        <div className="text-sm text-[#828387] md:text-base lg:text-[1.25rem]">
          <p>※ 고등학교 재학 시 취득한 정규시험 점수만 인정함.</p>
          <p>※ 여러 번 제출 가능하며, 상위 점수 취득 시 상위점수를 인정함.</p>
          <p>※ 1학년의 경우는 학교에서 응시한 모의토익 점수를 공인인증시험점수로 인정한다.</p>
          <p>※ 토익사관학교 참여시 출석률 70% 이상시 가산점 가능(당해연도에 한함)</p>
          <p>
            ※ 동일분야 자격증 관련 점수 중복 인정( ex)정보처리기능사, 정보처리산업기사 각각 인정 )
          </p>
        </div>
      </div>
      <div className="flex w-full max-w-[86.375rem] flex-col gap-2 md:gap-[0.5rem]">
        <p className="text-lg md:text-xl lg:text-2xl">항목별 점수 분포 - 당해년도</p>
        <Image src={yearTable} alt="당해년도 점수 분포 표" className="h-auto w-full" />
        <div className="text-sm text-[#828387] md:text-base lg:text-[1.25rem]">
          <p>※ 1학년은 5등급제이므로 산출이 다름</p>
          <p>※ 2025학년도 1학년의 경우 1등급 9점, 2등급 8점, 3등급 7점, 4등급 6점, 5등급 5점으로</p>
          <p>※ 2026학년도 부터는 1,2학년 모두 5등급제로 적용</p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-8 flex items-center gap-3 rounded-full bg-[#385B97] px-8 py-4 text-white transition-all hover:bg-[#2d4a7a] md:gap-4 md:px-10 lg:px-12 lg:py-5"
      >
        <Download className="h-5 w-5 md:h-6 md:w-6" color="white" />
        <span className="text-base font-semibold md:text-lg lg:text-xl">
          GSM 역량 인증제 기준표 다운로드
        </span>
      </button>
    </section>
  );
}
