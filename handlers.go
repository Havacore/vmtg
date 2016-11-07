package vmtg

import (
    "encoding/json"
    "fmt"
    "net/http"

    "github.com/gorilla/mux"
)

func Index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome!")
}

func PlayerIndex(w http.ResponseWriter, r *http.Request) {
        players := Players{
                Player{Name: "Jason", PlayerId:1},
                Player{Name: "Branson", PlayerId:2},
        }

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(players); err != nil {
		panic(err)
	}

}

func PlayerShow(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        playerId := vars["playerId"]
        fmt.Fprintln(w, "player show:", playerId)
}