"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useArticleLike } from "@/hooks/use-article-likes"

interface LikeButtonProps {
  articleId: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "ghost" | "outline"
  showCount?: boolean
  className?: string
}

export default function LikeButton({
  articleId,
  size = "icon",
  variant = "ghost",
  showCount = true,
  className,
}: LikeButtonProps) {
  const { isLiked, likeCount, toggleLike, isLoading } = useArticleLike(articleId)

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={variant}
        size={size}
        onClick={toggleLike}
        disabled={isLoading}
        className={cn(isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500", className)}
        aria-label={isLiked ? "Unlike article" : "Like article"}
      >
        <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
      </Button>
      {showCount && <span className="text-sm">{likeCount}</span>}
    </div>
  )
}
