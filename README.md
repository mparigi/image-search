# Image Search
### Free Code Camp Image Search Abstraction Layer

> User stories:

> 1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

> 2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.

> 3. I can get a list of the most recently submitted search strings.

#### Example Search Usage
```
https://image-search-mparigi.herokuapp.com/api/imagesearch/memes?offset=6
```

#### Example Search Output
```
[
  {
  "url": "http://www.vitamin-ha.com/wp-content/uploads/2015/08/Funny-Memes15.jpg",
  "snippet": "Awesome Memes",
  "thumbnail": "https://tse1.mm.bing.net/th?id=OIP.Ma92c1e0dc978f4771e38262b585a10d8o1&pid=Api",
  "context": "www.vitamin-ha.com/awesome-memes"
  },
  ...
]
```

---

#### Example Log Usage
```
https://image-search-mparigi.herokuapp.com/api/latest/imagesearch
```

#### Example Log Output
```
[
  {
  "term": "memes",
  "when": "Sat, 30 Jul 2016 16:48:08 GMT"
  },
  ...
]
```
