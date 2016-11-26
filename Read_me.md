## Usage:

All additional libraries are connected with used cdn so open file index.html and everythink should be working! On click the name of pokemon in the left side of window open detailed information of pokemon. I had  problem with getting some sprites, it looked like this:

XMLHttpRequest cannot load http://pokeapi.co/api/v1/sprite/5. Redirect from 'http://pokeapi.co/api/v1/sprite/5' to 'http://pokeapi.co/api/v1/sprite/5/' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63342' is therefore not allowed access.

So i got all uri_resource of pokemons from pokedex and used last number of uri_resource as id to image of pokemons.