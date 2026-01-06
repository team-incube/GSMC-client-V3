"use client"

import { useEffect } from "react";

import { useGetAlerts } from "@/feature/alert/model/useGetAlerts";
import { useReadAlertById } from "@/feature/alert/model/useReadAlertById";
import { cn } from "@/shared/lib/cn";

export default function AlertsModal() {
  const { data: alerts, isLoading } = useGetAlerts();
  const { mutate } = useReadAlertById();

  useEffect(() => {
    if (alerts && alerts.length > 0) mutate({ lastAlertId: alerts[0].id })
  }, [alerts, mutate])

  return (
    <div className="w-96 flex flex-col bg-white border border-gray-200 rounded-xl max-h-96">
      <div className="px-5 py-4 border-b border-gray-200">
        <p className="text-lg font-semibold text-left">알림함</p>
      </div>
      <div className="overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-start px-5 py-3 border-b border-gray-200 last:border-b-0 space-y-2">
                <div className="flex justify-between w-full">
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-100 rounded" />
                </div>
                <div className="h-4 w-full bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : alerts?.length === 0 ? (
          <p className="px-5 py-4 text-sm text-gray-500 text-left">알림이 없습니다.</p>
        ) : (
          alerts?.map((alert) => (
            <article key={alert.id} className="flex flex-col items-start px-5 py-3 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-start w-full">
                <h3 className={cn("font-semibold text-left", alert.alertType === 'REJECTED' ? 'text-error' : "text-main-500")}>{alert.title}</h3>
                <p className="text-sm">{alert.createdAt.split("T")[0]}</p>
              </div>
              <p className="text-sm text-left">{alert.content}</p>
            </article>
          ))
        )}
      </div>
    </div>
  )
}