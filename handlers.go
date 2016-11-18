package vmtg

import (
	"encoding/json"
	"net/http"
	"appengine"
	"appengine/datastore"
	"html/template"
	"net/url"
	"time"
	"strconv"
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

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(player); err != nil {
		panic(err)
	}
}

func CreateAndPutMatchHistoryRecord(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	playerOne := r.FormValue("playerOne")
	playerTwo := r.FormValue("playerTwo")
	RightNow := time.Now()
	matchResultInt, err := strconv.ParseInt(r.FormValue("Result"), 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	matchResult := MatchResult(matchResultInt)

	matchHistoryRecord := MatchHistoryRecord{
		PlayerOneEmail:playerOne,
		PlayerTwoEmail:playerTwo,
		Result:matchResult,
		Time:RightNow,
	}

	key := datastore.NewKey(c, "MatchHistoryRecord", "", 0, nil)

	_, err = datastore.Put(c, key, &matchHistoryRecord)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func CreateAndPutPlayer(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	first := r.FormValue("firstName")
	last := r.FormValue("lastName")
	email := r.FormValue("email")

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
