import Header from "@/widget/header/ui/Header";

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
