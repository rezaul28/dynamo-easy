# wrap-dynamo
A package to wrap dynamoDB operations. For this package DynamoDB.DocumentClient() is being used.

## Upsert Items
```javascript
const AWS = require("aws-sdk");
const ddbClient = new AWS.DynamoDB.DocumentClient();
const dynamoDB = require("wrap-dynamodb");

function interactWithTable() {
    // Specify the name of your table
    const tableName = YOUR_TABLE_NAME;

    // Define the partition key
    const keys = {
        partitionKey: 123,
        sortKey: "xyz", // Optional sort key
    };

    //Define your non-key columns
    const data = {
        col1 : "123",
        col2 : 123,
        col3 : {abc : 123},
        xyz:1,
        pqr : "abc"
    };

    //ignore keys (optional)
    const keysToIgnore = ["xyz","pqr"]
    
    //upsert the item to your table
    const result = await dynamoDB.upsert(ddbClient, tableName, keys, data, keysToIgnore)

    console.log(result);
}
