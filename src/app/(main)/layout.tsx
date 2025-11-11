import Header from '@/shared/ui/header/ui/Header';

export default function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
