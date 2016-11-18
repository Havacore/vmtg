package vmtg

import (
	"encoding/json"
	"fmt"
	"net/http"
    	"github.com/gorilla/mux"
	"appengine"
	"appengine/datastore"
	"html/template"
	"net/url"
)

func Index(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/target/index.html")
	t.Execute(w, nil)
}

func PlayerIndex(w http.ResponseWriter, r *http.Request) {
        players := Players{
                Player{FirstName: "Jason"},
                Player{FirstName: "Branson"},
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

func GetPlayer(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	u, err := url.Parse(r.URL.String())
	if err != nil {
		panic(err)
	}
	m, _ := url.ParseQuery(u.RawQuery)
	email := m["email"][0]

	key := datastore.NewKey(c, "Player", email, 0, nil)
	player := new(Player);

	err = datastore.Get(c, key, player)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Print(player.FirstName)

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(player); err != nil {
		panic(err)
	}
}

func CreateAndPutPlayer(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	first := r.FormValue("firstName")
	last := r.FormValue("lastName")
	email := r.FormValue("email")

	fmt.Fprintln(w, "player post: ", first)
	fmt.Fprintln(w, "player post: ", last)

	player := Player{
		FirstName:first,
		LastName:last,
		EloScore:0,
		Email:email,
	}

	key := datastore.NewKey(c, "Player", email, 0, nil)

	_, err := datastore.Put(c, key, &player)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
