var express = require("express");
var request = require("request");
var key = require("./key.js");
var mongo = require("mongodb").MongoClient;

var app = express();



app.get("/api/imagesearch/:query?", function (req, res) {
    var query = req.params.query;
    var offset = req.query.offset || 0;
    
    if (!query) res.end("please enter a search term");
    
    mongo.connect("mongodb://mparigi:" + key.mlab + "@ds031835.mlab.com:31835/image-search-mparigi", function (error, db) {
        if (error) throw error;
        
        var searches = db.collection("searches");
        searches.insertOne({
            "term": query,
            "when": new Date().toUTCString()
        }, function (er, data) {
            if (er) throw er;
            request({
                url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?count=10&q=' + query + '&offset=' + offset,
                headers: {
                    'Ocp-Apim-Subscription-Key': key.bing
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
    });
});


app.get("/api/latest/imagesearch", function (req, res) {
    
    mongo.connect("mongodb://mparigi:" + key.mlab + "@ds031835.mlab.com:31835/image-search-mparigi", function (err, db) {
        if (err) throw err;
        
        var searches = db.collection("searches");
        searches.find({}, {_id: 0}).toArray(function (error, docs){
            db.close();
            res.end(JSON.stringify(docs));
        });
    });
    
});



app.listen(process.env.PORT || 8080);
