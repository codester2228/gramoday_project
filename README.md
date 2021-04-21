# gramoday_project


Steps:-
1. open command prompt and Clone the repo,then navigate inside gramoday_project folder
2. run npm install to download necessary dependencies
3. run "node server.js" to start server
4. An example 'reportDetails' object is created in server.js file to check if API is working. Make a POST request using Postman or through Firefox(by manually changing GET request into a POST request at /reports.)
5. We will recieve the Success response in response body after that which means our database(MongoDB Cloud Atlas) has stored the provided details. Change the 'reportDetails' accordingly to check various cases.
6. Now we can make GET requests at "/reports?reportID=" using the reportID query parameters to recieve all required details about the report with the given id(using POSTMAN or any browser).

Some images for API test - https://drive.google.com/drive/folders/1M2067KPzVmnanxgrLihO2WmbkAFTYyJt?usp=sharing
