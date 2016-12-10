package vmtg

import (
        "net/http"
        //"log"
)


func init() {
        router := NewRouter()

        http.Handle("/", &WithCORS{router})

        //log.Fatal(http.ListenAndServe(":8000", router))
}


