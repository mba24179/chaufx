"use client"

import { Nav } from "@/components/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BookingEngine } from "@/components/admin/booking-engine"
import { RidesTable } from "@/components/admin/rides-table"
import { AllocationPanel } from "@/components/admin/allocation-panel"
import { Button } from "@/components/ui/button"
import { resetDB } from "@/lib/local-db"

export default function AdminPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-heading text-2xl">Admin Console</h1>
          <Button variant="ghost" onClick={() => resetDB()}>
            Reset Demo Data
          </Button>
        </div>
        <Tabs defaultValue="engine" className="space-y-4">
          <TabsList>
            <TabsTrigger value="engine">Booking Engine</TabsTrigger>
            <TabsTrigger value="storage">Ride Storage</TabsTrigger>
            <TabsTrigger value="alloc">Allocation</TabsTrigger>
          </TabsList>

          <TabsContent value="engine">
            <BookingEngine />
          </TabsContent>
          <TabsContent value="storage">
            <RidesTable />
          </TabsContent>
          <TabsContent value="alloc">
            <AllocationPanel />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
