"use client"

import { useIncomingRides } from "@/hooks/use-db"
import { confirmRide, rejectRide } from "@/lib/local-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BookingEngine() {
  const incoming = useIncomingRides()
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="font-heading">Booking Engine</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {incoming.length === 0 && <div className="text-sm text-muted-foreground">No incoming requests.</div>}
        {incoming.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-border rounded-lg p-3"
          >
            <div className="text-sm">
              <div className="font-medium">
                {r.pickup} → {r.drop}
              </div>
              <div className="text-muted-foreground">
                {r.dateISO} at {r.time} • {r.vehicle}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary">Incoming</Badge>
              <Button size="sm" onClick={() => confirmRide(r.id)} className="bg-primary text-primary-foreground">
                Confirm
              </Button>
              <Button size="sm" variant="ghost" onClick={() => rejectRide(r.id)}>
                Reject
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
