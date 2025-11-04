import Link from "next/link";
import { HEADER_NAV } from "../../config/navigation";
import Bell from "@/shared/asset/svg/Bell";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full h-[70px] mt-5.5 bg-white border-b border-gray-100 ">
      <div className="flex flex-grow-0 flex-shrink-0 text-center justify-between items-center w-150 px-3">

        <Link href={"/"} className="text-xl text-main-800 font-bold">GSMC</Link>

        <nav className="flex items-center text-sm gap-8">
          {HEADER_NAV.map((item) => (
            <Link key={item.path} className="text-gray-500" href={item.path}>{item.label}</Link>
          ))}
          <button className="text-gray-900 font-semibold">로그아웃</button>
        </nav>

        <Bell />

      </div>

    </header>
  )
}
