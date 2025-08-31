"use client"

import { useMetrics } from "@/hooks/use-db"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts"

export function AnalyticsDashboard() {
  const { ridesToday, utilization, avgPickupWait, satisfaction, byCity } = useMetrics()

  const demandOverTime = Array.from({ length: 8 }).map((_, i) => ({
    hour: `${i * 3}:00`,
    rides: Math.max(0, 3 + Math.round(Math.sin(i / 2) * 4)),
  }))

  const revenueTrend = Array.from({ length: 7 }).map((_, i) => ({
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
    revenue: 8000 + (i % 3) * 2500 + Math.round(Math.random() * 1000),
  }))

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Rides Today" value={ridesToday} />
        <KPI title="Utilization" value={`${utilization}%`} />
        <KPI title="Avg Pickup Wait" value={`${avgPickupWait}m`} />
        <KPI title="Satisfaction" value={`${satisfaction}%`} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-heading">Demand Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandOverTime}>
                <XAxis dataKey="hour" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="rides" stroke="#CBA135" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-heading">Rides by Zone</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCity}>
                <XAxis dataKey="zone" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="rides" fill="#CBA135" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-heading">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueTrend}>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#CBA135" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-heading">Forecast</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          Predicted demand hotspots tomorrow: Connaught Place, Delhi Airport, Gurgaon.
        </CardContent>
      </Card>
    </div>
  )
}

function KPI({ title, value }: { title: string; value: number | string }) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-heading">{value}</CardContent>
    </Card>
  )
}
