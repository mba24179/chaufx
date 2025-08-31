"use client"

import { useConfirmedRides, useDrivers } from "@/hooks/use-db"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function RidesTable() {
  const rides = useConfirmedRides()
  const drivers = useDrivers()
  const driverName = (id?: string) => drivers.find((d) => d.id === id)?.name || "—"
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="font-heading">Ride Data Storage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-6 text-xs text-muted-foreground">
            <div>Trip ID</div>
            <div>Date</div>
            <div>Time</div>
            <div>Pickup</div>
            <div>Drop</div>
            <div>Chauffeur</div>
          </div>
          {rides.map((r) => (
            <div key={r.id} className="grid grid-cols-6 text-sm border border-border rounded-md p-2">
              <div className="truncate">{r.id}</div>
              <div>{r.dateISO}</div>
              <div>{r.time}</div>
              <div className="truncate">{r.pickup}</div>
              <div className="truncate">{r.drop}</div>
              <div className="truncate">{driverName(r.chauffeurId)}</div>
            </div>
          ))}
          {rides.length === 0 && <div className="text-sm text-muted-foreground">No confirmed rides yet.</div>}
        </div>
      </CardContent>
    </Card>
  )
}
