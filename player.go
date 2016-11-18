package vmtg

type Player struct {
	FirstName string	`json:"firstName"`
	LastName string		`json:"lastName"`
	EloScore int		`json:"eloScore"`
	Email string		`json:"email"`
}

type Players []Player
