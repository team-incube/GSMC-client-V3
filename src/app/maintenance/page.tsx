export default function MaintenancePage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-5 font-sans text-black">
      <div className="w-full max-w-150 rounded-3xl bg-white p-12 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">서비스 점검 중입니다</h1>
        <p className="mb-8 text-base leading-relaxed text-black/40">
          보다 안정적인 서비스 제공을 위해 <br />
          현재 시스템 점검을 진행하고 있습니다. <br />
          잠시 후 다시 접속해 주세요.
        </p>
        <div className="mb-8 h-px bg-black/40" />
        <p className="text-sm text-black/40">이용에 불편을 드려 죄송합니다.</p>
      </div>
    </div>
  );
}
