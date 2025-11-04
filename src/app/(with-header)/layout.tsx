import Header from "@/widget/header/ui/Header";

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <main className="flex min-w-150">{children}</main>
      </div>
    </>
  )
}
