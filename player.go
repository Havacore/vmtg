package vmtg

type Player struct {
	Name string	`json:"name"`
	EloScore int	`json:"eloScore"`
	PlayerId int	`json:"playerId"`
}

type Players []Player
