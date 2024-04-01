## Stage backend

### Instructions to setup

1. Run ```npm i``` to install node modules
2. Run ```sequelize db:migrate``` to create tables and populate them with demo test data
3. Run a local instance of pgsql or update the envs to use a hosted service 
4. Run the application using ```npm run dev``` or ```node index.js```
5. Use the curls below with respective data to run respective APIs
or
5. Use ```npm run test``` to run the test suites


### Feature design guide
To implement user list feature we have create a bridge table user_list which contains user_id and movie/tv_series id and content type to identify the type of content and fetch accordingly.
Since users and content (movies/tv series) have a many to many relationship we use a bridge table which is indexed on the basis of user_id to make search on user_id faster making fetch on user_id more performant for large datasets


### Add content to list for user
```
curl --location --request POST 'localhost:3010/api/list/add' \
--header 'Authorization: {"id":"fd6b8311-91d4-4ffa-9f17-7e480b31b9c9"}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content_id":"6947941f-239b-4e73-a5b7-146108b6df5e",
    "content_type":"MOVIE"
}'
```

### Delete content to list for user
```
curl --location --request DELETE 'localhost:3010/api/list/delete' \
--header 'Authorization: {"id":"fd6b8311-91d4-4ffa-9f17-7e480b31b9c9"}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content_id":"6947941f-239b-4e73-a5b7-146108b6df5e",
    "content_type":"MOVIE"
}'
```

### Fetch paginated content list for user

```
curl --location --request GET 'localhost:3010/api/list/fetch?content_type=MOVIE&limit=50&page=1' \
--header 'Authorization: {"id":"fd6b8311-91d4-4ffa-9f17-7e480b31b9c9"}' \
--header 'Content-Type: application/json'
```


Hosted DB: https://api.elephantsql.com
Hosted Backend: https://misty-vest-lamb.cyclic.app/api/status (Service used Cyclic Sh)
