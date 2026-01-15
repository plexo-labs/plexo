"use client"

import { Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { LiveGame } from "@/lib/mock-data"

interface GameCardProps {
  game: LiveGame
  onPlaceBet: (game: LiveGame, player: "A" | "B") => void
  onWatch: () => void
}

export function GameCard({ game, onPlaceBet, onWatch }: GameCardProps) {
  const progress = (game.currentMove / game.totalMoves) * 100

  return (
    <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Live Badge */}
      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-live" />
        <span className="text-xs font-medium text-primary">LIVE</span>
      </div>

      <div className="p-4">
        {/* Game Type */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
            {game.type === "Tic-Tac-Toe" ? (
              <span className="text-xs font-bold text-foreground">#</span>
            ) : (
              <span className="text-xs font-bold text-foreground">4</span>
            )}
          </div>
          <span className="text-sm font-medium text-foreground">{game.type}</span>
        </div>

        {/* Players */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground truncate">{game.playerA}</div>
            <div className="text-xs text-muted-foreground">{game.oddsA.toFixed(1)}x</div>
          </div>
          <div className="px-3 text-sm font-bold text-muted-foreground">VS</div>
          <div className="flex-1 text-right">
            <div className="text-sm font-semibold text-foreground truncate">{game.playerB}</div>
            <div className="text-xs text-muted-foreground">{game.oddsB.toFixed(1)}x</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Move {game.currentMove}/{game.totalMoves}
            </span>
            <span className="text-primary animate-pulse-slow">In Progress</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pool */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
          <span className="text-xs text-muted-foreground">Current Pool</span>
          <span className="font-mono text-sm font-semibold text-foreground">{game.pool.toFixed(3)} ETH</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5 bg-transparent" onClick={onWatch}>
            <Eye className="h-3.5 w-3.5" />
            Watch
          </Button>
          <Button size="sm" className="flex-1 gap-1.5" onClick={() => onPlaceBet(game, "A")}>
            <Zap className="h-3.5 w-3.5" />
            Bet
          </Button>
        </div>
      </div>
    </Card>
  )
}
