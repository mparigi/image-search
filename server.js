var express = require("express");
var app = express();

app.get("/api/imagesearch/:query?", function (req, res) {
    var query = req.params.query;
    var offset = req.query.offset;
    
    console.log(query + " " + offset);
    
    res.end("end");
});

app.listen(process.env.PORT || 8080);
