import React from 'react'

export default function Post({ title, category, state }: { title: string; category: string; state: string }) {
  return (
    <article className="flex flex-col w-[188px] h-[276px] rounded-[10px] bg-white overflow-hidden">
      <div className="w-full h-[138px] bg-gray-400" />

      <div className="flex flex-col items-start flex-1 px-3">
        <div className="flex justify-center items-center py-2">
          <p className="text-base font-semibold text-left text-black">
            {title}
          </p>
        </div>

        <div className="w-full h-[1px] bg-gray-100"></div>

        <div className="flex justify-center items-center pt-2 pb-[6px]">
          <p className="text-sm text-left text-gray-400">
            {category}
          </p>
        </div>

        <div className="flex justify-center items-center pt-1">
          <div className="flex justify-center items-center px-3 py-1.5 rounded-xl bg-[#cdcdcf]">
            <p className="text-sm text-left text-black">
              {state}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
