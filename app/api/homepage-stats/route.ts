import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

// Default stats
const DEFAULT_STATS = {
  schoolsVisited: 8,
  classesTaught: 20,
  studentsInspired: 500,
}

export async function GET() {
  try {
    // Check if KV is properly configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.log("KV not configured, returning default stats")
      return NextResponse.json(DEFAULT_STATS, {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
    }

    // Try to get stats from KV
    try {
      const stats = await kv.get("homepage_stats")
      console.log("API route returning homepage stats from KV:", stats)

      if (!stats) {
        console.log("No stats found in KV, returning default stats")
        return NextResponse.json(DEFAULT_STATS, {
          headers: {
            "Cache-Control": "no-store, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
      }

      return NextResponse.json(stats, {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
    } catch (kvError) {
      console.error("KV error:", kvError)
      return NextResponse.json(DEFAULT_STATS, {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
    }
  } catch (error) {
    console.error("Error in homepage-stats API route:", error)
    return NextResponse.json(DEFAULT_STATS, { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const stats = await request.json()

    // Validate stats
    if (
      typeof stats.schoolsVisited !== "number" ||
      typeof stats.classesTaught !== "number" ||
      typeof stats.studentsInspired !== "number"
    ) {
      return NextResponse.json({ error: "Invalid stats format" }, { status: 400 })
    }

    // Check if KV is properly configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.log("KV not configured, stats not saved")
      return NextResponse.json({
        success: true,
        warning: "Stats not saved to database due to missing KV configuration",
        stats: stats,
      })
    }

    // Try to save to KV
    try {
      await kv.set("homepage_stats", stats)
      console.log("Stats saved to KV:", stats)
      return NextResponse.json({ success: true, stats: stats })
    } catch (kvError) {
      console.error("KV error when saving:", kvError)
      return NextResponse.json({
        success: true,
        warning: "Stats not saved to database due to KV error",
        stats: stats,
      })
    }
  } catch (error) {
    console.error("Error in POST homepage-stats API route:", error)
    return NextResponse.json({ error: "Failed to update stats" }, { status: 500 })
  }
}
