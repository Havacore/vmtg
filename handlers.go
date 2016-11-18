package vmtg

import (
	"encoding/json"
	"fmt"
	"net/http"
    	"github.com/gorilla/mux"
	"appengine"
	"appengine/datastore"
	"strconv"
	"html/template"
)

func Index(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/target/index.html")
	t.Execute(w, nil)
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

func playerKey(c appengine.Context) *datastore.Key {
	return datastore.NewKey(c, "Player", "player", 0, nil)
}

func CreateAndPutPlayer(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	vars := mux.Vars(r)
	playerIdString := vars["playerId"]
	playerId, err := strconv.Atoi(playerIdString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	name := vars["name"]

	player := Player{
		PlayerId:playerId,
		Name:name,
	}

	key := datastore.NewIncompleteKey(c, "Player", playerKey(c))
	_, err = datastore.Put(c, key, &player)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
