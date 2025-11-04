export default function MainView() {
  return (
    <div className="flex flex-col mt-15.5">

      <section className="flex justify-start w-full">
        <div className="flex flex-col font-semibold w-72 h-[145px] gap-[27px]">
          <div className="flex items-baseline gap-3">
            <p className="text-4xl text-center text-main-700">모태환</p>
            <p className="text-2xl text-left text-black">님의 인증제 점수는</p>
          </div>
          <div className="flex items-baseline gap-4.5">
            <div className="flex justify-center items-center gap-2.5 px-9 py-3 rounded-full bg-[#f3f3f3]">
              <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-main-500">100점</p>
            </div>
            <p className="text-2xl text-black">입니다.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[600px] h-[445px] relative overflow-hidden rounded-[20px] bg-[#dfeafe]">
          <div className="flex flex-col justify-start items-start w-[529px] h-[552px] absolute left-9 top-[100px] overflow-hidden rounded-xl">
            <div className="flex-grow-0 flex-shrink-0 w-[529px] h-[69px]">
              <div className="flex flex-col justify-start items-start w-[529px] absolute left-0 top-0 bg-white">
                <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                  <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                    자격증
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                    100 점
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  TOPCIT
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  100 점
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  공인점수
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  100 점
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  독서활동
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  100 점
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  봉사
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  100 점
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  뉴로우 참여
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  100 점
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  교과성적
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  100 점
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">
              <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-8 py-6 rounded-xl">
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  프로젝트 경험
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#68696c]">
                  100 점
                </p>
              </div>
            </div>
          </div>
          <div className="w-[600px] h-[100px] absolute left-0 top-0 overflow-hidden bg-[#dfeafe]">
            <p className="absolute left-14 top-9 text-2xl font-semibold text-left text-[#385b97]">
              내 점수
            </p>
            <div className="flex justify-center items-center absolute left-[454px] top-6 gap-2.5 px-[22px] py-[13px] rounded-xl bg-[#5e97fc]">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-white">
                점수 수정
              </p>
            </div>
          </div>
          <div className="w-1 h-[124px] absolute left-[587px] top-[104px] rounded-md bg-black/25" />
        </div>
      </section>

    </div>
  )
}
