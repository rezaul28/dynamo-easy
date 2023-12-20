module.exports.upsert = async (
    ddbClient,
    tableName,
    partitionAndSortKeys,
    data,
    keysToIgnore = []
) => {
    try {
        const ExpressionAttributeValues = {};
        let UpdateExpression = "SET ";
        for (const key in data) {
            if (Object.keys(partitionAndSortKeys).includes(key) || keysToIgnore.includes(key)) {
                continue;
            }
            ExpressionAttributeValues[`:${key}`] = data[key];
            UpdateExpression += `${key} = :${key}, `;
        }
        const params = {
            ExpressionAttributeValues,
            ReturnValues: "ALL_NEW",
            Key: { ...partitionAndSortKeys },
            TableName: tableName,
            UpdateExpression: UpdateExpression.slice(0, UpdateExpression.length - 2),
        };
        return await ddbClient.update(params).promise();
    } catch (error) {
        console.log("Exception to put item in dynamoDB from Layer: ", error);
        console.log(`Table: ${tableName}`);
        throw error;
    }
};
