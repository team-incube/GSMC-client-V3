import Image from 'next/image';

import airplane from '@/shared/asset/img/airplane.png';

export default function Section2() {
  return (
    <section id="section2" className="flex flex-col items-center gap-6 px-4 pt-16 md:gap-[1.5625rem] md:pt-32 lg:pt-[11.375rem]">
      <p className="text-center text-3xl font-bold md:text-4xl lg:text-[2.75rem]">프로그램 소개</p>
      <div className="flex w-full max-w-[70rem] flex-col gap-6 rounded-[1.25rem] border border-[#CDCDCF] p-6 md:gap-8 md:p-10 lg:gap-[2.5rem] lg:px-[3.75rem] lg:py-[3.75rem]">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[1.25rem]">
          <Image
            alt="종이비행기 아이콘"
            src={airplane}
            width={40}
            height={40}
            className="h-10 w-10 md:h-[50px] md:w-[50px]"
          />
          <div>
            <p className="text-xl font-semibold md:text-2xl lg:text-[2rem]">역량인증 기준 설정</p>
            <p className="text-base font-light md:text-lg lg:text-xl">
              GSM 인증제는 영마이스터로서 졸업할 때까지{' '}
              <span className="font-semibold text-[#385B97]">적정 수준에 도달</span>할 수 있도록
              <br className="hidden md:block" />
              학교 실정에 맞게 역량인증의 기준을 설정하여 운영됩니다.
            </p>
          </div>
        </div>
        <hr className="w-full border-[#CDCDCF]" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-[1.25rem]">
          <Image
            alt="종이비행기 아이콘"
            src={airplane}
            width={40}
            height={40}
            className="h-10 w-10 md:h-[50px] md:w-[50px]"
          />
          <div>
            <p className="text-xl font-semibold md:text-2xl lg:text-[2rem]">동기 부여 및 책무성 제고</p>
            <p className="text-base font-light md:text-lg lg:text-xl">
              일정 수준에 도달한 학생에게 인증서를 수여함으로써 학생들의{' '}
              <span className="font-semibold text-[#385B97]">교육 참여 동기를 부여</span>하고
              <br className="hidden md:block" />
              학교 교육의 <span className="font-semibold text-[#385B97]">책무성을 제고</span>하고자
              하는 프로그램입니다.
            </p>
          </div>
        </div>
        <hr className="w-full border-[#CDCDCF]" />
        <div className="flex flex-row flex-wrap justify-center gap-3 md:gap-4 lg:gap-[2.5rem]">
          <p className="flex h-10 items-center justify-center rounded-[1.125rem] bg-[#BFD5FE] px-4 text-sm text-[#385B97] md:h-[2.75rem] md:px-6 md:text-base lg:text-xl">
            # 역량인증
          </p>
          <p className="flex h-10 items-center justify-center rounded-[1.125rem] bg-[#BFD5FE] px-4 text-sm text-[#385B97] md:h-[2.75rem] md:px-6 md:text-base lg:text-xl">
            # 전인적 평가
          </p>
          <p className="flex h-10 items-center justify-center rounded-[1.125rem] bg-[#BFD5FE] px-4 text-sm text-[#385B97] md:h-[2.75rem] md:px-6 md:text-base lg:text-xl">
            # 동기부여
          </p>
          <p className="flex h-10 items-center justify-center rounded-[1.125rem] bg-[#BFD5FE] px-4 text-sm text-[#385B97] md:h-[2.75rem] md:px-6 md:text-base lg:text-xl">
            # 책무성 제고
          </p>
        </div>
      </div>
      <hr className="mb-16 mt-12 w-full max-w-[800px] border border-[#CDCDCF] md:mb-24 md:mt-16 lg:mb-[10rem] lg:mt-[7.5rem]" />
    </section>
  );
}
