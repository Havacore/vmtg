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
	"github.com/gorilla/mux"
)

func Index(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/target/index.html")
	t.Execute(w, nil)
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
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

	if r.Body == nil {
		http.Error(w, "Please send request body", 400)
		return
	}
	contentType := r.Header.Get("Content-Type")
	var player Player

	if contentType == "application/json" {
		err := json.NewDecoder(r.Body).Decode(&player)
		if err != nil {
		    http.Error(w, err.Error(), 400)
		    return
        	}
	} else {
		http.Error(w, "content type not supported", 415)
		return
	}

	key := datastore.NewKey(c, "Player", player.Email, 0, nil)
	_, err := datastore.Put(c, key, &player)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

// Some weird bullshit to get Cross Origin requests going.

type WithCORS struct {
  r *mux.Router
}

// Simple wrapper to Allow CORS.
// See: http://stackoverflow.com/a/24818638/1058612.
func (s *WithCORS) ServeHTTP(res http.ResponseWriter, req *http.Request) {
  if origin := req.Header.Get("Origin"); origin != "" {
    res.Header().Set("Access-Control-Allow-Origin", origin)
    res.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    res.Header().Set("Access-Control-Allow-Headers",
      "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
  }

  // Stop here for a Preflighted OPTIONS request.
  if req.Method == "OPTIONS" {
    return
  }
  // Lets Gorilla work
  s.r.ServeHTTP(res, req)
}