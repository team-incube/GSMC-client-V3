import { scoreData, cumulativeData, yearData } from '@/view/about/mock/aboutData';

export default function Section6() {
  return (
    <section className="mb-[11.5625rem] flex flex-col items-center gap-[4rem]">
      <p className="text-center text-[2.75rem] font-bold">
        GSM 역량 인증제 영역별 취득 점수 기준표
      </p>
      <div className="flex w-[86.375rem] flex-col gap-[0.5rem]">
        <p className="text-2xl">영역별 점수 분포</p>
        <table className="h-[5.625rem] w-[86.375rem] border border-gray-400 text-center text-2xl">
          <thead className="h-[2.8125rem]">
            <tr>
              <th className="w-[21.5938rem] border border-black/40 bg-[#BFD5FE] font-normal">
                구분
              </th>
              <th className="w-[21.5938rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                누적
              </th>
              <th className="w-[21.5938rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                당해년도
              </th>
              <th className="w-[21.5938rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                종합
              </th>
            </tr>
          </thead>
          <tbody>
            {scoreData.map((row) => (
              <tr key={row.area}>
                <td className="border border-gray-400 bg-[#BFD5FE]">{row.area}</td>
                <td className="border border-gray-400 bg-[#EFF5FF]">{row.cumulative}</td>
                <td className="border border-gray-400 bg-[#EFF5FF]">{row.year}</td>
                <td className="border border-gray-400 bg-[#EFF5FF]">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-[86.375rem] flex-col gap-[0.5rem]">
        <p className="text-2xl">영역별 점수 분포 - 누적</p>
        <table className="h-[18.5rem] w-[86.375rem] border border-gray-400 text-center text-2xl">
          <thead className="h-[2.8125rem]">
            <tr>
              <th className="w-[9.4688rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                영역
              </th>
              <th className="w-[26.1875rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                내용
              </th>
              <th className="w-[13.6875rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                점수
              </th>
              <th className="w-[9.375rem] border border-gray-400 bg-[#BFD5FE] font-normal">비고</th>
              <th className="w-[27.5625rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                증명 방법
              </th>
            </tr>
          </thead>
          <tbody>
            {cumulativeData.map((row) => (
              <tr key={row.area}>
                <td className="border border-gray-400 bg-[#BFD5FE] whitespace-pre-line">
                  {row.area}
                </td>
                <td className="border border-gray-400 bg-[#EFF5FF] whitespace-pre-line">
                  {row.content}
                </td>
                <td className="border border-gray-400 bg-[#EFF5FF]">{row.score}</td>
                <td className="border border-gray-400 bg-[#EFF5FF]">{row.note}</td>
                <td className="border border-gray-400 bg-[#EFF5FF] whitespace-pre-line">
                  {row.proof}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <table className="h-[5.625rem] w-[86.375rem] border border-gray-400 text-center text-2xl">
          <thead className="h-[2.8125rem]">
            <tr>
              <th className="w-[12.75rem] border border-gray-400 bg-[#BFD5FE] font-normal">영역</th>
              <th className="w-[17rem] border border-gray-400 bg-[#BFD5FE] font-normal">내용</th>
              <th className="w-[29.625rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                점수
              </th>
              <th className="w-[9.875rem] border border-gray-400 bg-[#BFD5FE] font-normal">비고</th>
              <th className="w-[17.0625rem] border border-gray-400 bg-[#BFD5FE] font-normal">
                증명 방법
              </th>
            </tr>
          </thead>
          <tbody>
            {yearData.map((row) => (
              <tr key={row.area}>
                <td className="border border-gray-400 bg-[#BFD5FE] whitespace-pre-line">
                  {row.area}
                </td>
                <td className="border border-gray-400 bg-[#EFF5FF] whitespace-pre-line">
                  {row.content}
                </td>
                <td className="border border-gray-400 bg-[#EFF5FF] whitespace-pre-line">
                  {row.score}
                </td>
                <td className="border border-gray-400 bg-[#EFF5FF] whitespace-pre-line">
                  {row.note}
                </td>
                <td className="border border-gray-400 bg-[#EFF5FF] whitespace-pre-line">
                  {row.proof}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-[1.25rem] text-[#828387]">
          <p>※ 1학년은 5등급제이므로 산출이 다름</p>
          <p>※ 2025학년도 1학년의 경우 1등급 9점, 2등급 8점, 3등급 7점, 4등급 6점, 5등급 5점으로</p>
          <p>※ 2026학년도 부터는 1,2학년 모두 5등급제로 적용</p>
        </div>
      </div>
    </section>
  );
}
