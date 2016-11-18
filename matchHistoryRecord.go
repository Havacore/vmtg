package vmtg

import "time"

type MatchHistoryRecord struct {
	PlayerOneEmail string 	`json:"playerOneEmail"`
	PlayerTwoEmail string 	`json:"playerTwoEmail"`
	Result MatchResult	`json:"matchResult"`
	Time time.Time		`json:"time"`
}

type MatchResult int64

const (
	PLAYER1 MatchResult = 1 + iota
	PLAYER2
	DRAW
)

var matchResults = [...]string {
	"PLAYER1",
	"PLAYER2",
	"DRAW",
}

func (matchResult MatchResult) String() string {
	return matchResults[matchResult - 1]
}