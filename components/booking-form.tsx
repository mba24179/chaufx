"use client"

import type React from "react"

import { useState } from "react"
import { addRide, type Vehicle, type PaymentMethod } from "@/lib/local-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export function BookingForm() {
  const [pickup, setPickup] = useState("Connaught Place")
  const [drop, setDrop] = useState("Delhi Airport")
  const [dateISO, setDateISO] = useState(new Date().toISOString().slice(0, 10))
  const [time, setTime] = useState("15:00")
  const [vehicle, setVehicle] = useState<Vehicle>("Sedan")
  const [openPay, setOpenPay] = useState(false)
  const [payMethod, setPayMethod] = useState<PaymentMethod>("Card")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpenPay(true)
  }
  function confirmPayment() {
    addRide({
      pickup,
      drop,
      dateISO,
      time,
      vehicle,
      clientName: "Guest",
      status: "incoming",
      price: vehicle === "Luxury" ? 2500 : vehicle === "SUV" ? 1800 : 1200,
    })
    setOpenPay(false)
    router.push("/admin")
  }

  return (
    <>
      <Card id="book" className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-heading text-balance">Book a Premium Chauffeur</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup</Label>
              <Input
                id="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drop">Drop</Label>
              <Input id="drop" value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="Enter drop" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={dateISO} onChange={(e) => setDateISO(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Vehicle Preference</Label>
              <Select value={vehicle} onValueChange={(v) => setVehicle(v as Vehicle)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payment</Label>
              <Select value={payMethod} onValueChange={(v) => setPayMethod(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Card">Credit/Debit Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Wallet">Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
                Proceed to Pay
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={openPay} onOpenChange={setOpenPay}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-heading">Confirm Payment ({payMethod})</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            This is a prototype payment step. No real charges will occur.
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenPay(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPayment} className="bg-primary text-primary-foreground">
              Pay & Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
