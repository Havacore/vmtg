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
    Route{"Index", "GET","/", Index},
    Route{"PlayerIndex", "GET", "/players", PlayerIndex},
    Route{"GetPlayer", "GET", "/api/v1/players/", GetPlayer},
    Route{"CreateAndPutPlayer", "PUT", "/api/v1/players/", CreateAndPutPlayer},
}