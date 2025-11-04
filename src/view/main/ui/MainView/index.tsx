export default function MainView() {
  return (
    <div className="flex flex-col mt-15.5 w-full">

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

      <section className="mt-[3.63rem]">
        <div className="w-full h-[445px] px-[2.25rem] relative overflow-hidden rounded-[20px] bg-[#dfeafe]">

          <div className="flex justify-between items-center py-[1.5rem] bg-[#dfeafe]">
            <p className="text-2xl font-semibold text-[#385b97]">내 점수</p>
            <button className="flex justify-center items-center px-[22px] py-[13px] rounded-xl bg-[#5e97fc]">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-white">점수 수정</p>
            </button>
          </div>

          <div className="flex flex-col justify-start items-start overflow-hidden rounded-xl">
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[529px] bg-white">

              <article className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 px-8 py-6 rounded-xl">
                <p className="text-lg font-semibold text-center text-[#68696c]">TOPCIT</p>
                <p className="text-lg font-semibold text-center text-[#68696c]">100 점</p>
              </article>

            </div>
          </div>

          <div className="w-1 h-[124px] absolute left-[587px] top-[104px] rounded-md bg-black/25" />

        </div>
      </section>

    </div>
  )
}
