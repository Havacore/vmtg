package vmtg


type MatchHistoryRecord struct {
	Player1 Player
	Player2 Player
	Result MatchResult
}

type MatchResult int64

const (
	PLAYER1 MatchResult = 1 + iota
	PLAYER2
	DRAW
)