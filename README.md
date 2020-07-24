# Geo coding - General description

**Note: You can test the app running on https://geocoding.saduqz.com/** 

Geo coding project allows to consume an API using the Geocoding and Reverse Geocoding functionalities.

It is built using Python, Django, Django Rest Framework, and Vue js as Front-end framework and also *Leaflet* as 
an interactive Graphical map to see the API responses.

All the local and production architecture is created and deployed with Docker and Docker compose.

Also there is an API to calculate the distance in kilometers in two coordinates (latitude and longitude).

The API has unit test (Bellow is the description of how to run the unit test).

## API Endpoints

There is 3 API endpoints that you can consume:

I really recommend take a look to postman collection, is the easier way to test.

Postman collection on repo name: `Geocoding Postman Collection.json`

---

Get geocode -> `[GET] /api/geocoding/get-geocode`

    You need to send the params latitude and longitude:
    
    ?latitude=6.1504856&longitude=-75.61687859
    
---

Get reverse geocode -> `[GET] /api/geocoding/get-geocode`

    You need to send the param address (String). e.g. "Colombia".:
    
    ?address=Sabaneta
    
---

Get distance from two coordinates -> `[GET] /api/geocoding/get-distance`

    You need to send the params latitude1 longitude1 latitude2 longitude2
    
    ?latitude1=6.150096&longitude1=-75.637175&latitude2=6.151131&longitude2=-75.643151`
    

## Basic Commands

Steps to run the complete all the environment locally. 

    docker-compose -f local.yml build
    
    docker-compose -f local.yml run --rm django python3 manage.py migrate
    
    docker-compose -f local.yml up
    
> Now the app will be running on port 8000.


## Test coverage

You can run all unit test with the next command:

`docker-compose run --rm django coverage run -m pytest`


