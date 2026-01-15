export interface LiveGame {
  id: string
  type: "Tic-Tac-Toe" | "Connect-4"
  playerA: string
  playerB: string
  currentMove: number
  totalMoves: number
  pool: number
  oddsA: number
  oddsB: number
  status: "in-progress"
}

export interface OpenGame {
  id: string
  type: "Tic-Tac-Toe" | "Connect-4"
  creator: string
  stake: number
  createdAt: Date
}

export const mockLiveGames: LiveGame[] = [
  {
    id: "1",
    type: "Tic-Tac-Toe",
    playerA: "vitalik.eth",
    playerB: "satoshi.eth",
    currentMove: 5,
    totalMoves: 9,
    pool: 2.45,
    oddsA: 1.8,
    oddsB: 2.1,
    status: "in-progress",
  },
  {
    id: "2",
    type: "Connect-4",
    playerA: "defi_chad.eth",
    playerB: "nft_whale.eth",
    currentMove: 12,
    totalMoves: 42,
    pool: 5.2,
    oddsA: 2.5,
    oddsB: 1.5,
    status: "in-progress",
  },
  {
    id: "3",
    type: "Tic-Tac-Toe",
    playerA: "punk_6529.eth",
    playerB: "ape_holder.eth",
    currentMove: 3,
    totalMoves: 9,
    pool: 1.1,
    oddsA: 1.6,
    oddsB: 2.4,
    status: "in-progress",
  },
  {
    id: "4",
    type: "Connect-4",
    playerA: "eth_maxi.eth",
    playerB: "sol_simp.eth",
    currentMove: 28,
    totalMoves: 42,
    pool: 8.75,
    oddsA: 1.2,
    oddsB: 4.0,
    status: "in-progress",
  },
  {
    id: "5",
    type: "Tic-Tac-Toe",
    playerA: "gm_wagmi.eth",
    playerB: "ngmi_sad.eth",
    currentMove: 7,
    totalMoves: 9,
    pool: 3.3,
    oddsA: 1.4,
    oddsB: 2.8,
    status: "in-progress",
  },
  {
    id: "6",
    type: "Connect-4",
    playerA: "degen.eth",
    playerB: "normie.eth",
    currentMove: 6,
    totalMoves: 42,
    pool: 0.85,
    oddsA: 1.9,
    oddsB: 1.9,
    status: "in-progress",
  },
]

export const mockOpenGames: OpenGame[] = [
  {
    id: "open-1",
    type: "Tic-Tac-Toe",
    creator: "0x1234...abcd",
    stake: 0.1,
    createdAt: new Date(),
  },
  {
    id: "open-2",
    type: "Connect-4",
    creator: "0x5678...efgh",
    stake: 0.5,
    createdAt: new Date(),
  },
  {
    id: "open-3",
    type: "Tic-Tac-Toe",
    creator: "0x9abc...ijkl",
    stake: 0.25,
    createdAt: new Date(),
  },
]
