"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockOpenGames, type OpenGame } from "@/lib/mock-data"
import { Plus, Users, Gamepad2 } from "lucide-react"

export function PlayGames() {
  const [openGames] = useState<OpenGame[]>(mockOpenGames)
  const [selectedGameType, setSelectedGameType] = useState<string | null>(null)

  const gameTypes = [
    { id: "tic-tac-toe", name: "Tic-Tac-Toe", icon: "#", description: "Classic 3x3 grid" },
    { id: "connect-4", name: "Connect-4", icon: "4", description: "4-in-a-row to win" },
  ]

  const handleCreateGame = (gameType: string) => {
    setSelectedGameType(gameType)
    // In a real app, this would create a new game
    console.log("Creating game:", gameType)
  }

  const handleJoinGame = (game: OpenGame) => {
    // In a real app, this would join the game
    console.log("Joining game:", game.id)
  }

  return (
    <div className="space-y-8">
      {/* Create New Game */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Start a New Game</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {gameTypes.map((game) => (
            <Card
              key={game.id}
              className={`cursor-pointer border-border bg-card p-4 transition-all hover:border-primary/50 ${
                selectedGameType === game.id ? "border-primary ring-1 ring-primary" : ""
              }`}
              onClick={() => setSelectedGameType(game.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <span className="text-xl font-bold text-foreground">{game.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedGameType && (
          <div className="mt-4">
            <Button size="lg" className="gap-2" onClick={() => handleCreateGame(selectedGameType)}>
              <Plus className="h-4 w-4" />
              Create {gameTypes.find((g) => g.id === selectedGameType)?.name} Game
            </Button>
          </div>
        )}
      </section>

      {/* Join Open Games */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Join an Open Game</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{openGames.length} waiting for opponent</span>
          </div>
        </div>

        {openGames.length > 0 ? (
          <div className="grid gap-3">
            {openGames.map((game) => (
              <Card
                key={game.id}
                className="flex items-center justify-between border-border bg-card p-4 transition-all hover:border-primary/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Gamepad2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{game.type}</span>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                        {game.stake} ETH stake
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Created by</span>
                      <span className="font-mono text-xs">{game.creator}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleJoinGame(game)}>Join Game</Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center border-dashed border-border bg-card/50 p-12 text-center">
            <Gamepad2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-medium text-foreground">No open games</h3>
            <p className="text-sm text-muted-foreground">Create a new game above to start playing</p>
          </Card>
        )}
      </section>
    </div>
  )
}
