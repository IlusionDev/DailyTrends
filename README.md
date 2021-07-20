
# Daily trends!

Dailytrends is a project where the objective is to store the news from the newspapers (ElPais and ElMundo) in a database to later be served through an api crud.
All this using techniques such as webscraping.


# Architecture

![Architecture](https://github.com/IlusionDev/DailyTrends/blob/master/arch.png)
### Explanation
The architecture is divided as follows:

 - Controller: the controller is the first element in the chain that receives the request and handles it towards its associated services
 - Cron / Jobs: they are in charge of executing the update of the database with new feeds
 - Domain: this layer is in charge of managing everything related to the models and their use or transformation
 - Service model: this type of service is in charge of talking to the model and carrying out the tasks of modifying the database
 - Models: They are the models themselves, representing entities and being able to make modifications directly in the database

The most important part of this application is the cron / jobs layer that is in charge of every X period to run the services and update the news with new news.
**Is important** to understand that for this example case it has been given a time of 30 minutes not to renew the database constantly, making the objects last longer in the database and being able to test the crud is more easy.

# API
Example request to the api
### EndPoints

 - Create new Feed:
```
curl --location --request POST 'localhost:3000/api/feed' \
--header 'Content-Type: application/json' \
--data-raw '{
"url": "https://www.elmundo.es/economia/2021/07/18/60f458a721efa0a9028b462b.ht...",
"title":
"Plan de Recuperación. Holanda pide supeditar los fondos a que España c...",
"site": "elPais",
"images": {
   "default": "test"
 }
}'
```
 -  Find Feed: 
 Allowed properties:
	 - Site: must be cammel Case
	 - Title
	 - _Id

````
curl --location --request GET 'localhost:3000/api/feed?site=elPais'
````

 - Update Feed: 
````
curl --location --request PUT 'localhost:3000/api/feed/dfuruiof883' \
--header 'Content-Type: application/json' \
--data-raw '{
"url": "https://www.elmundo.es/economia/2021/07/18/60f458a721efa0a9028b462b.ht...",
"title":"",
"site": "elPais",
"images": {
   "default": "test"
 }
}'
````
- Delete Feed:
````
curl --location --request DELETE 'localhost:3000/api/feed/6f7tfyyhjh'
````

## Notes
All env files are uploaded as just example env files. Modify it for custom values.