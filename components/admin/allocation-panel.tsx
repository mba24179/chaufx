"use client"

import { useDrivers, useConfirmedRides } from "@/hooks/use-db"
import { autoAssignBest, assignRide } from "@/lib/local-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export function AllocationPanel() {
  const rides = useConfirmedRides()
  const drivers = useDrivers()
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="font-heading">Allocation Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">
          Matching strategy: prioritize drivers near pickup/drop zones with lower utilization, then round-robin.
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {rides.map((r) => (
            <div key={r.id} className="border border-border rounded-lg p-3 space-y-2">
              <div className="text-sm font-medium">
                {r.pickup} → {r.drop} • {r.dateISO} {r.time}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => autoAssignBest(r.id)} className="bg-primary text-primary-foreground">
                  Auto-assign Best
                </Button>
                <ManualAssign rideId={r.id} />
              </div>
            </div>
          ))}
          {rides.length === 0 && <div className="text-sm text-muted-foreground">No rides awaiting assignment.</div>}
        </div>
      </CardContent>
    </Card>
  )
}

function ManualAssign({ rideId }: { rideId: string }) {
  const drivers = useDrivers()
  return (
    <div className="flex items-center gap-2">
      <Label className="text-xs">Manual:</Label>
      <Select onValueChange={(id) => assignRide(rideId, id)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Pick driver" />
        </SelectTrigger>
        <SelectContent>
          {drivers.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.name} • {Math.round(d.utilization * 100)}%
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
