package vmtg

import (
    "net/http"
)

type Route struct {
    Name        string
    Method      string
    Pattern     string
    HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
    Route{"Index","GET","/",Index},
    Route{"TodoIndex", "GET", "/players", PlayerIndex},
    Route{"TodoShow", "GET", "/players/{playerId}", PlayerShow},
}