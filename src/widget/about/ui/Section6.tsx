import Image from 'next/image';

import cumulativeTable from '@/shared/asset/img/cumulativeTable.png';
import scoreTable from '@/shared/asset/img/scoreTable.png';
import yearTable from '@/shared/asset/img/yearTable.png';

export default function Section6() {
  return (
    <section className="mb-[11.5625rem] flex flex-col items-center gap-[4rem]">
      <p className="text-center text-[2.75rem] font-bold">
        GSM 역량 인증제 영역별 취득 점수 기준표
      </p>
      <div className="flex w-[86.375rem] flex-col gap-[0.5rem]">
        <p className="text-2xl">영역별 점수 분포</p>
        <Image src={scoreTable} alt="영역별 점수 분포 표" />
      </div>
      <div className="flex w-[86.375rem] flex-col gap-[0.5rem]">
        <p className="text-2xl">영역별 점수 분포 - 누적</p>
        <Image src={cumulativeTable} alt="누적 점수 분포 표" />
        <div className="text-[1.25rem] text-[#828387]">
          <p>※ 고등학교 재학 시 취득한 정규시험 점수만 인정함.</p>
          <p>※ 여러 번 제출 가능하며, 상위 점수 취득 시 상위점수를 인정함.</p>
          <p>※ 1학년의 경우는 학교에서 응시한 모의토익 점수를 공인인증시험점수로 인정한다.</p>
          <p>※ 토익사관학교 참여시 출석률 70% 이상시 가산점 가능(당해연도에 한함)</p>
          <p>
            ※ 동일분야 자격증 관련 점수 중복 인정( ex)정보처리기능사, 정보처리산업기사 각각 인정 )
          </p>
        </div>
      </div>
      <div className="flex w-[86.375rem] flex-col gap-[0.5rem]">
        <p className="text-2xl">항목별 점수 분포 - 당해년도</p>
        <Image src={yearTable} alt="당해년도 점수 분포 표" />
        <div className="text-[1.25rem] text-[#828387]">
          <p>※ 1학년은 5등급제이므로 산출이 다름</p>
          <p>※ 2025학년도 1학년의 경우 1등급 9점, 2등급 8점, 3등급 7점, 4등급 6점, 5등급 5점으로</p>
          <p>※ 2026학년도 부터는 1,2학년 모두 5등급제로 적용</p>
        </div>
      </div>
    </section>
  );
}
