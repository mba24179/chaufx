"use client"

import { useDrivers, useRides } from "@/hooks/use-db"
import { completeRide, rejectRide } from "@/lib/local-db"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useMemo, useState } from "react"
import { Bell } from "lucide-react"

export function DriverView() {
  const drivers = useDrivers()
  const rides = useRides()
  const [driverId, setDriverId] = useState(drivers[0]?.id ?? "drv-1")

  const my = useMemo(() => {
    const assigned = rides.filter((r) => r.status === "assigned" && r.chauffeurId === driverId)
    return assigned
  }, [rides, driverId])

  const me = drivers.find((d) => d.id === driverId)

  return (
    <div className="space-y-4">
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading">Driver App (Prototype)</CardTitle>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <Select value={driverId} onValueChange={setDriverId}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent>
                {drivers.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name} • {d.zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Push mock: New Booking – Pickup at Delhi Terminal 1, Aug 31, 3 PM.
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-heading">Upcoming Ride Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {my.length === 0 && <div className="text-sm text-muted-foreground">No assigned rides yet.</div>}
          {my.map((r) => (
            <div
              key={r.id}
              className="border border-border rounded-lg p-3 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <div className="font-medium text-sm">
                  {r.pickup} → {r.drop}
                </div>
                <div className="text-xs text-muted-foreground">
                  {r.dateISO} at {r.time} • {r.vehicle} • Client: {r.clientName || "—"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => rejectRide(r.id)}>
                  Reject
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => completeRide(r.id)}>
                  Complete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-heading">Earnings Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div>Name: {me?.name}</div>
          <div>Zone: {me?.zone}</div>
          <div>Earnings: ₹{me?.earnings ?? 0}</div>
        </CardContent>
      </Card>
    </div>
  )
}
