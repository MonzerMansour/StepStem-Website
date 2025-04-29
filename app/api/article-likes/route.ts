import { type NextRequest, NextResponse } from "next/server"
import { getLikeCounts } from "@/app/actions/article-likes"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const ids = url.searchParams.get("ids")

  if (!ids) {
    return NextResponse.json({ error: "No article IDs provided" }, { status: 400 })
  }

  const articleIds = ids.split(",")
  const likeCounts = await getLikeCounts(articleIds)

  return NextResponse.json(likeCounts)
}
