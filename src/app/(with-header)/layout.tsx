import Header from '@/shared/ui/header/ui/Header';

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <main className="flex w-full">{children}</main>
      </div>
    </>
  );
}
