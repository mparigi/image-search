var express = require("express");
var request = require("request");
var key = require("./key.js")
var app = express();



app.get("/api/imagesearch/:query?", function (req, res) {
    var query = req.params.query;
    var offset = req.query.offset || 0;
    
    request({
        url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?count=10&q=' + query + '&offset=' + offset,
        headers: {
            'Ocp-Apim-Subscription-Key': key
        }
    }, function (err, response, body) {
        if (err) throw err;
        
        var out = [];
        var data = JSON.parse(body);
        data['value'].forEach(function (el) {
            out.push({
                "url": el['contentUrl'],
                "snippet": el['name'],
                "thumbnail": el['thumbnailUrl'],
                "context": el['hostPageDisplayUrl']
            });
        });
        
        
        res.end(JSON.stringify(out));
    });
    

});

app.listen(process.env.PORT || 8080);
