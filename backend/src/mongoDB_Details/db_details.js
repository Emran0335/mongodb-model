/*
*** MongoDB And Aggregation pipeline ***


1. db.collection.find()
The find() method in MongoDB is one of the most commonly used methods to retrieve documents from a collection. It allows you to query a collection and return documents that match a given criteria(filter). It is powerful and flexible, supporting complex queries and projections.

Key Features of find()
1. Querying: You can specify criteria to filter the documents based on fields and value.
2. Projection: You can control which fields should be included or excluded in the returned documents.
3. Cursor: It returns a cursor, allowing you to iterate over large database efficiently.
4. Options: You can apply options like sorting, limiting and skipping documents

db.collection.find(query, projection)
a. query: The filter criteria for matching documents. It is an object where you specify the conditions.
b. projection: Optional! Specifies which fields to include or exclude in the returned documents.

Example 1: Basic Usage of find(): Suppose you have a users collection with the following documents.
users:
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 2, "name": "Bob", "age": 30, "city": "San Francisco" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": 4, "name": "David", "age": 40, "city": "Chicago" }
]
1. Retrieve All Documents: db.users.find({})
Ans: json->
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 2, "name": "Bob", "age": 30, "city": "San Francisco" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": 4, "name": "David", "age": 40, "city": "Chicago" }
]
Example 2: Using Query Filters
2. Find Document/Documents with a Specific Conditions: db.users.find({city: "Dhaka"})
Ans: json->
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" }
]

Example 3: Projection
1. Retrieve Only Specific Fields: db.users.find({}, {name: 1, city: 1, _id: 0})
// To retrieve only the name and the city fields but not id for all users
Ans: json->
[
  { "name": "Alice", "city": "New York" },
  { "name": "Bob", "city": "San Francisco" },
  { "name": "Charlie", "city": "New York" },
  { "name": "David", "city": "Chicago" }
]
// Here, {_id: 0} excludes the _id field from the output

Example 4: Combining Query and Projection
// Find and Project
1. To find users aged 30 or more and show only their names: db.users.find({age: {$gte: 30}}, {name: 1, _id: 0})
Ans: json->
[
  { "name": "Bob" },
  { "name": "Charlie" },
  { "name": "David" }
]
// query: {age: {$gte: 30}} filters users with age greater than or equal to 30
// projection: {name: 1, _id: 0} returns only the name field

Example 5: Using find() with Sorting, Limiting and Skipping
1. Sorting: db.users.find().sort({age: -1})
// To sort the results by age in descending order
Ans: json->
[
  {_id: 4, name: 'David', age: 40, city: 'Chicago'},
  {_id: 3, name: 'Charlie', age: 35, city: 'New York'},
  {_id: 2, name: 'Bob', age: 30, city: 'San Francisco'},
  {_id: 1, name: 'Alice', age: 25, city: 'New York'}
]
2. Limiting: db.users.find().limit(2)
// To limit the result to first two documents
Ans: json->
[
  {_id: 1, name: 'Alice', age: 25, city: 'New York'}
  {_id: 2, name: 'Bob', age: 30, city: 'San Francisco'},
]
3. Skipping: db.users.find().skip(2)
// To skip the first 2 documents and return the rest
Ans: json->
[
  {_id: 3, name: 'Charlie', age: 35, city: 'New York'},
  {_id: 4, name: 'David', age: 40, city: 'Chicago'},
]

Why Use find()?
1. Retrieving Data: It is primary method for fetching data from MongoDB. Whether you need all documents, specific ones, or documents matching certain criteria, find() is your go-to-method.
2. Filtering Data: The ability to filter documents based on specific conditions is powerful for targeting the exact data you need.
3. Efficient Handling of Large Datasets: Since find() returns a cursor, it allows you to work efficienty with large datasets without loading all documents into memory at once.
4. Versatility: It supports a wide range of operations, including sorting, limiting, skipping, and projection, making it very flexible for different use cases.







2. db.collection.findOne()
The findOne() method in MongoDB is used to retrieve a single document from a collection that matches the specific query criteria. Unlike find(), which returns a cursor to a set of documents, findOne() immediately returns the first document that matches the query(or null if no document matches).

Key Features of findOne():
1. Returns a Single Document: findOne() is  designed to return exactly one document. If multiple documents match the query, only the first matching document(based on the natural order of the collection) is returned.
2. Simpler Syntax: Since it returns a single document, you do not need to work with a cursor. This makes findOne() a simpler and more convenient option when you know that you only need a single document.
3. Efficient For Single Document Retrieval: When you only need one document, findOne() can be more efficient than find() because it stops searching once it finds the first matching document.
4. Projection Support: Like find(), findOne() allows you to specify a projection to control which fields are returned in the document.

db.collection.findOne(query, projection)
Suppose you have a users collection with the following documents:
users: 
[
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },
  { "_id": 2, "name": "Bob", "age": 30, "city": "San Francisco" },
  { "_id": 3, "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": 4, "name": "David", "age": 40, "city": "Chicago" }
]
Example 1: Basic Usage: db.users.findOne({city: "New York"});
// To find the first user who lives in "New York",
Ans: json->
{ "_id": 1, "name": "Alice", "age": 25, "city": "New York" }
Example 2: Using Projections: db.users.findOne({city: "San Francisco"}, {name: 1, age: 1, _id: 0})
// You can also use findOne() with a projection to return only specific fields. For example, to find the first user from "San Francisco" and return only the name and the age fields
Ans: json-> 
{ "name": "Bob", "age": 30 }

Use Cases for findOne()
1. Retrieving a Specific Document by Unique Key: db.users.findOne({_id: 1})
a. If you are querying by a field that is unique(e.g. _id or another unique identifier), you expect only one document to match. In this case, findOne() is ideal beccause you only need a single document.
Ans: json->
  { "_id": 1, "name": "Alice", "age": 25, "city": "New York" },

2. Fetching a Configuration or Metadata Document: db.config.findOne({setting: "siteName"})
a. Often, you might store configuration settings or metadata as a single document in a collection. Using findOne() is a quick way to retrieve this document without worrying about multiple results.
3. When Only One Result Matters: db.orders.findOne({status: "pending"})
a. If you only care about the first matching document, and it does not matter if there are other matches, findOne() is the most straightforward option.
4. Checking for Existence:
a. findOne() can be used to check if a document exists with a certain condition. It it returns null, you know that no matching document exists.
const user = db.users.findOne({ email: "example@example.com" });
if (user) {
  // user exists
} else {
  // user doesn't exist
}

Comparison: findOne() vs find()
1. Return Value:-
a. findOne(): Returns a single document or null
b. find(): Returns a cursor to a set of documents
2. When to Use:-
a. findOne(): Use when you expect or only need a single document from your query
b. find(): Use when you need multiple documents or need to iterate over a larger set of results
3. Efficiency:-
a. findOne(): Stops searching as soon as it finds the first matching document, which can be more efficient in some cases
b. find(): Continues searching through the collection to retrieve all matching documents

* Retrieving a Single Document by Unique Field: db.users.findOne({email: "alice@example.com"})
Ans: This will return the document for the user with that email address. Since emails are unique, you know that there will only be one matching document, making findOne() the ideal mathod.








3. Model.findById()
The findById() method in MongoDB (commonly used through the Mongoose ODM in Node.js) is a specialized method for retrieving a single document by its unique_id field. This method simplifies the process of querying documents by their _id by automatically constructing the query and returning the document that matches the given ID.

When to Use findById()
1. Retrieving Documents by _id: The primary use case for findById() is when you need to fetch a document using its _id field, which is the unique identifier MongoDB assigns to each document.
2. Convenience and Readability: Instead of constructing a query manually with findOne({_id: id}), findById() privides a more convenient and readable way to achieve the same result.
3. Validation of ID Format: Mongoose's findById() automatically checks if the provided ID is valid(i.e. a valid MongoDB ObjectId). If the ID is not valid, it will not attempt to query the database, saving unnecessary operations.

In mongoose(a popular MongoDB ODM for Node.j), the syntax is:
Model.findById(id, [projection], [options])
a. Id: The _id of the document you want to retrieve.
b. Projection: Optional, specifies which fields to include or exclude in the returned document.
c. Options: Optional, additional options for the query.

Example Usage:
1. Suppose you have a users collection with documents like:
users: 
[
  { "_id": ObjectId("64f13cfd4523e9eacbf0d491"), "name": "Alice", "age": 25 },
  { "_id": ObjectId("64f13cfd4523e9eacbf0d492"), "name": "Bob", "age": 30 }
]

Example 1: Basic Usage of findById()
// To retriev the user with a specific _id, you can use:
const userId = "64f13cfd4523e9eacbf0d491"; // The _id of Alice
User.findById(userId, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(user);
  }
});
Ans: json->
{ "_id": ObjectId("64f13cfd4523e9eacbf0d491"), "name": "Alice", "age": 25 }

Example 2: Using findById() with Projections
// If you only want to retrieve certain fields, like name and exclude _id, you can use projections:
User.findById(userId, { name: 1, _id: 0 }, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log(user); // Output: { "name": "Alice" }
  }
});

Differences Between findById() and Other Methods
1. findOne({_id: id}) vs findById(id)
a. Both methods can be used to retrieve a document by its _id, but findById() is a more concise and readable way to do it.
b. findById() automatically handles ObjectId conversion and validation, while with findOne(), you need to manually ensure that the _id is correctly formatted.
2. find() vs findById()
a. find() returns a cursor (or an array of documents) and is used for retrieving multiple documents.
b. findById() returns a single document or null if no document matches the given _id.
3. findOne() vs findById()
a. findOne() is a general method that allows you to search for a document based on any field or condition, including _id.
b. findById() is specialized for retrieving documents by the _id field only, and is generally more concise when used for this purpose.

Error Handling in findById()
// If the provided Id is not a valid ObjectId, Mongoose's findById() method will return null rather than throwing an error or querying the database. This is useful for catching invalid IDs early without incurring the cost of a database query.
const invalidId = "invalidObjectId";
User.findById(invalidId, (err, user) => {
  if (err) {
    console.error(err);
  } else if (!user) {
    console.log("No user found with this ID.");
  }
});

Example Use Cases
1. Fetching User Profile by ID:
a. When a user logs in, you might want to fetch their his profile information using his _id:
User.findById(userId, (err, user) => {
  if (user) {
    // Display user profile
  }
});
2. Retrieving a Post by ID:
a. If you have a blogging platform, you might want to retrieve a specific blog post by its ID:
Post.findById(postId, (err, post) => {
  if (post) {
    // Display the post
  }
});
3. Updating or Deleting a Document by ID:
a. You can use findById() to first retrieve a document before updating or deleting it:
User.findById(userId, (err, user) => {
  if (user) {
    user.name = "New Name";
    user.save();
  }
});








db.users.findOneAndDelete() or Model.findOneAndDelete()
The findOneAndDelete() method in MongoDB (and Mongoose) is useful function for finding and deleting a single document that matches a specific query. This method not only deletes the document but also returns the deleted document to the application, allowing you to access its data before it is removed from the collection.

Why Use findOneAndDelete()
1. Atomic Operations:
a. findOneAndDelete() is atomic, meaning the document is found and deleted in a single operation. This ensures that no other operations can modify the document between finding and deleting it, which can be crucial in a concurrent environment where multiple operations might try to access or modify
the same document.
2. Returning the Deleted Document:
a. Unlike the deleteOne() method, which only deletes the document and returns status, findOneAndDelete() also returns the deleted document. This can be useful when you need to access the data of the document that was just removed, perhaps for logging, further processing, or sending it back as a response to the client.
3. Selective Deletion:
a. If you want to delete a document based on certain criteria and ensure that only document is affected, findOneAndDelete() is ideal. For example, if you want to delete the first document that matches a specific condition, this method ensures that only one document is deleted, and you can verify which document was deleted.
Model.findOneAndDelete(filter, options)
a. Filter: The query to find the document.
b. Options: Optional! Additional options such as projection to specify the fields to return, or sort to determine which document to delete if multiple match the query.

Example Usage of findOneAndDelete()

Example 1: Basic Deletion
User.findOneAndDelete({ name: "Alice" }, (err, deletedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Deleted User:", deletedUser);
  }
});
a. The first document where the name is "Alice" will be deleted.
b. The deleted document is returned and logged, so you can see the details of the user that was removed.

Example 2: Using findOneAndDelete() with sorting
// It you have multiple documents that match the query, you can use sorting to determine which document is deleted. For example, delete the older user (based on age)
User.findOneAndDelete({}, { sort: { age: 1 } }, (err, deletedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Deleted User:", deletedUser);
  }
});
a. The sort option orders the documents by age in ascending order({age: 1}), so the oldest one of user documents is deleted.

Example 3: Using findOneAndDelete() with Projection
// If you want to delete a document but only return specific fields, you can use the projection option.
User.findOneAndDelete({ name: "Bob" }, { projection: { _id: 0, name: 1 } }, (err, deletedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Deleted User:", deletedUser); // Only the name field will be returned
  }
});
a. The document with the name "Bob" is deleted.
b. Only the name field is returned in the response

Key Use Cases for findOneAndDelete()
1. Removing a Specific Document with Feedback:
a. When you need to delete a document and aslo require confirmation of what was deleted, findOneAndDelete() is ideal. For example, when deleting a user account, you might want to return the deleted user's data to confirm the deletion.
2. Optimizing Concurrency:
a. In applications where multiple operations might attempt to delete or modify the same document simultaneously, findOneAndDelete() ensures that the document is safely deleted without risk of race confitions. Since the operation is atomic, there is no chance that another operation will modify the document after it has been found but before it is deleted.
3. Logging or Auditing:
a. If you need to log or audit deletions, using findOneAndDelete() allows you to capture the details of the deleted document. This can be important for tracking changes in the system or maintaining an audit trail.
4. Handling Cleanup Tasks:
a. In scenarios where you need to remove outdated or invalid data (e.g. old session records, expired promotions), findOneAndDelete() can help you remove these records one at a time while keeping track of what has been deleted.

Comparison with Other Mehtods
1. deletionOne() vs findOneAndDelete()
a. deleteOne() deletes a single document that matches the filter criteria but does not return the deleted document.
b. findOneAndDelete() deletes a single document and returns the deleted document, making it more suitable when you need to verify or use the data from the deleted document.
2. findOneAndRemove() vs findOneAndDelete()
a. These methods are functionally equivalent in Mongoose, with findOneAndRemove() being an older alias. It is recommended to use findOneAndDelete() as it is more consistent with other deletion methods like deleteOne() and deleteMany().
3. findOneAndUpdate() vs findOneAndDelete()
a. findOneAndUpdate() is used when you need to update a document and return the updated document, while findOneAndDelete() is used for deletion and returns the deleted document. Both methods can be used with sorting and projection options.

Example: Deleting an Expired Token
// Imagine you have a tokens collection that stores user tokens with expiration dates. You want to delete an expired token and return its details:
Token.findOneAndDelete({ expirationDate: { $lt: new Date() } }, (err, token) => {
  if (err) {
    console.error(err);
  } else if (token) {
    console.log("Deleted expired token:", token);
  } else {
    console.log("No expired tokens found.");
  }
});
a. The query finds the first token that has expired(i.e. expirationDate is less than the current date).
b. The findOneAndDelete() method deletes the token and returns its details.








Model.findOneAndReplace()
The findOneAndReplace() method in MongoDB(commonly used in Mongoose) is a specialized operation that allows you to find a single document that matches a specified query and replace it with a new document. This method is useful when you want to update an entire document while aslo retrieving the original document before the replacement.

Why Use findOneAndReplace()
1. Atomic Replacement:
a. findOneAndReplace performs the find and replace operations atomically. This means that the document is found and replaced in a single operation, ensuring that no other operations can modify the document between finding and replacing it. This atomicity is crucial in concurrent environments where multiple operations might affect the same document.
2. Returning the Original Document:
a. Unlike updateOne() or updateMany(), which modify a document without returning the original data, findOneAndReplace() returns the original document before it was replaced. This can be usefull for logging, auditing or validation purposes.
3. Complete Document Replacement:
a. findOneAndReplace() replaces the entire document with a new one. This is different from findOneAndUpdate(), which allows you to modify only specific fields of the document while leaving the rest unchanged. If you need to replace a document completely, findOneAndReplace() is the method to use.
4. Ensuring Document Integrity:
By using findOneAndReplace(), you can ensure that the replacement document completely adheres to the desired structure, as it entirely overwrites the existing document.

Syntax:
Model.findOneAndReplace(filter, replacement, options)
a. Filter: The query to find the document.
b. replacement: The new document to replace the found document with.
c. options: Optional. Additional options such as projection to specify which fields to return, or returnOriginal to determine whether to return the original or the replaced one.

Example Usage:
1. Example 1: Basic Replacement
// Suppose you have a users collection and you want to replace a user document with a specific _id:
const userId = "64f13cfd4523e9eacbf0d491";
const newUser = {
  _id: userId,
  name: "Alice",
  age: 26,
  email: "alice@example.com"
};

User.findOneAndReplace({ _id: userId }, newUser, (err, originalUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Original User:", originalUser);
    console.log("User after Replacement:", newUser);
  }
});
a. The user with the specific_id is replaced with the newUser document.
b. The originalUser variable contains the document before it was replaced.

Example 2: Using findOneAndReplace() with Options
// To return the replaced document instead of the original document, you can use the returnDocument option(in Mongoose v5.7.1 and newer).
User.findOneAndReplace({ _id: userId }, newUser, { returnDocument: 'after' }, (err, replacedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("User after Replacement:", replacedUser);
  }
});
a. returnDocument: 'after' ensures that the document returned is the one after the replacement.

Example 3: Validation and Structure Enforcement
// If you need to enforce a specific structure or validation on the document, replacing the entire document ensures that the new document adheres to the defined schema or validation rules:
const newUser = {
  _id: userId,
  name: "Alice",
  age: 26,  // Assuming age is mandatory and must be an integer
  email: "alice@example.com"
};

User.findOneAndReplace({ _id: userId }, newUser, { runValidators: true }, (err, originalUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Original User:", originalUser);
    console.log("New User:", newUser);
  }
});
a. runValidators: true, ensures that Mongoose validates the newUser document according to the schema before replacing.

Comparison with Other Methods
1. findOneAndUpdate() vs. findOneAndReplace()
a. findOneAndUpdate(): Updates specific fields of a document while leaving other fields unchanged. It does not replace the entire document.
b. findOneAndReplace(): Replaces the entire document with a new one. Use this method when you need to fully overwrite the existing document.
2. updateOne() vs. findOneAndReplace()
a. updateOne(): Performs partial updates to documents matching a query. It does not return the original document, only an update status.
b. findOneAndReplace(): Replaces a single document and returns either the original or the new document, depending on options.
3. replaceOne() vs. findOneAndReplace()
a. replaceOne(): Replaces a single document matching a query, but does not return the original or new document by default.
b. findOneAndReplace(): Performs the replacement and returns the original document or the replaced document based on options.

Example Use Case: Updating User Profile:
// Imagine a scenario where a user profile needs to be completely updated based on new information received from the user:
const updatedProfile = {
  _id: userId,
  name: "Alice",
  age: 27,
  email: "alice.new@example.com",
  address: "123 New Street, New York, NY"
};

User.findOneAndReplace({ _id: userId }, updatedProfile, { returnDocument: 'after' }, (err, newProfile) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Updated User Profile:", newProfile);
  }
});
a. The updatedProfile completely replaces the exiting user document.
b. The updated profile is returned and can be used for further processing or confirmation.








db.users.findOneAndUpdate() or Model.findOneAndUpdate()
The findOneAndUpdate() method in MongoDB(and Mongoose) is a crucial tool for updating a single document that matches a specific query while returning either the original or the updated document. This method is especially useful when you need to modify a document's field but want to maintain control over the operation and the document state. Below are detailed reasons and scenarios where findOneAndUpdate() is essential.

Why Use findOneAndUpdate()

1. Atomic Updates:
a. findOneAndUpdate() is an atomic operation, meaning the document is found and updated in a single step. This ensures that no other operations can modify the document between the final and update stages, which is critical in concurrent environment where multiple operations might try to access or modify the same document.

2. Returning the Document(Before or After Update):
a. One of the key features of findOneAndUpdate() is that you can return the document either before it was updated(the original document) or after the update. This is useful when you need to compare the changes, log the previous state, or use the updated document immediately after the operation.

3. Partial Updates:
a. Unlike findOneAndReplace(), which completely replaces a document, findOneAndUpdate() allows you to update only specific fields while leaving the rest of the document unchanged. This is particularly useful when you want to modify only a portion of the document without altering other data.

4. Flexible Querying:
a. You can apply a variety of query criteria to find the document that needs to be updated. This flexibility allows you to target specific document based on conditions such as field values, arrays, dates, or any other MongoDB query operators.

5. Upsert Functionality:
a. findOneAndUpdate() supports the "upsert" option, which stands for "update or insert". If no document matches the query, you can create a new document with the specific update fields. This is a powerful feature when you want to ensure that a document exists in the collection, either by updating it or creating a new one if it does not exist.

6. Field Projections:
a. With findOneAndUpdate(), you can control which fields are returned in the document. You can include or exclude specific fields, making it easier to work with only the date you need.

Syntax: In Mongoose(a popular MongoDB ODM for Node.js)
Model.findOneAndUpdate(filter, update, options)
a. filter: the query to find the document.
b. update: the update operations to apply to the document.
c. options: optional settings, such as whether to return the original or updated document, or whether to create a new document if none matched(upsert-update or sert)

Example Usage

Example 1: Basic Update

const userId = "64f13cfd4523e9eacbf0d491";
const update = { $set: { age: 26 } };
User.findOneAndUpdate({ _id: userId }, update, { new: true }, (err, updatedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Updated User:", updatedUser);
  }
});
a. The age field of the user with the sepcific_id is updated to 26.
b. The {new: true} option returns the updated document, so updatedUser contains the document after the update.

Example 2: Using findOneAndUpdate() with upsert 
// If you want to update a user but create a new one if it does not exist, you can use the upsert option.

const update = { $set: { name: "Alice", age: 26 } };
User.findOneAndUpdate({ name: "Alice" }, update, { upsert: true, new: true }, (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Upserted/Updated User:", user);
  }
});
a. If no user with name "Alice" exists, a new document is created with the specific name and age.
b. The new: true, option returns the newly created or updated document.

Example 3: Using findOneAndUpdate() with Projection
// You can use projections to return only specific fields in the updated document:

User.findOneAndUpdate({ _id: userId }, update, { new: true, fields: { name: 1, age: 1 } }, (err, updatedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Updated User:", updatedUser); // Only name and age fields are returned
  }
});
a. Only the name and age fields are returned in the updateUser document.

Key Use Cases for findOneAndUpdate()
1. Updating User Profile:
a. When a user updates their profile information, such as changing their email or updating their address, findOneAndUpdate() allows you to modify only the relevant fields while keeping the rest of the profile intact.
2. Incrementing Counters:
a. If you need to tract metrics, such as the number of views on a post or the number of likes on a comment, findOneAndUpdate() can be used to increment these counters atomically.
Post.findOneAndUpdate({ _id: postId }, { $inc: { views: 1 } }, { new: true }, (err, updatedPost) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Updated Post Views:", updatedPost.views);
  }
});
3. Updating Status or Flags:
a. In scenarios where you need to update a status field or set a flag(e.g. marking an order as shipped, setting a user's account to active), findOneAndUpdate() allows you to do this efficiently while returning the updated document.
Order.findOneAndUpdate({ _id: orderId }, { $set: { status: "shipped" } }, { new: true }, (err, updatedOrder) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Updated Order Status:", updatedOrder.status);
  }
});
4. Performing Conditional Updates:
a. If you need to update a document only if it meets conditions, you can specify those conditions in the query. For example, updating a user's email only if their account is active.
User.findOneAndUpdate({ _id: userId, isActive: true }, { $set: { email: "newemail@example.com" } }, { new: true }, (err, updatedUser) => {
  if (err) {
    console.error(err);
  } else if (!updatedUser) {
    console.log("No active user found.");
  } else {
    console.log("Updated Email:", updatedUser.email);
  }
});

Comparison with Other Methods
1. updateOne() vs findOneAndUpdate()
a. updateOne(): Modifies a document matching a query but does not return the document. It is ideal when you do not need to know the state of the document before or after the update.
b. findOneAndUpdate(): Modifies a document and returns either the original or the updated document, making it more suitable when you need to work with the document after the update.
2. findOneAndReplace() vs findOneAndUpdate()
a. findOneAndReplace(): Replaces the entire document with a new one.
b. findOneAndUpdate(): Partially updates a document without affecting other fields, allowing more targeted modifications.
3. findOneAndDelete() vs findOneAndUpdate()
a. findOneAndDelete(): Finds and deletes a document, returning the deleted docuemnt.
b. findOneAndUpdate(): Finds and updates a document, returning either the original or updated document based on your needs.








The $match stage in aggregation pipelie

The $match stage in aggregation pipeline is crucial because it filters the documents in the collection based on specified conditions before they proceed to the subsequent stages of the pipeline. It functions similarly to the find query, but in the context of aggregation, $match plays a vital role in optimizing performance and ensuring that only relevant documents are processed.

Detailed Explanation of Why $match is Used in the Aggregation Pipeline

1. Filtering Data Early in the pipeline
a. Purpose: $match is typcally used at the begining of the pipeline to reduce the dataset as early as possible. By filtering out irrelevant documents, the subsequent stages in the pipeline process only the necessary data.
b. Benefit: This can significantly improve performance, especially in large datasets, because it minimizes the number of documents that need to be processed in later, more resource-intensive stages such as $group, $sort, or $lookup.

Example: Suppose you have a collection of sales transactions, and you only want to analyze sales from the year 2023. By placing a $match stage at the beginning, you filter out all transactions that do not occur in 2023.
{
  $match: { year: 2023 }
}
This ensures that only transactions from 2023 move to the next stages in the pipeline, reducing the workload.

2. Optimizing Performance with Indexes
a. Purpose: If a collection has indexes on field that are used in the $match stage, MongoDB can efficiently retrieve the relevant documents using indexes, reducing the time and resources required.
b. Benefit: This is particularly important in large collections, where scanning all documents without an index would be slow. Using $match early in the pipeline allows MongoDB to leverage indexes, making the query more efficient.

Example: If your sales collection has an index on the date field, using $match to filter documents by date would be highly efficient.
{
  $match: { date: { $gte: ISODate("2023-01-01"), $lte: ISODate("2023-12-31") } }
}

3. Pre-processing Data for Subsequent Stages
a. Purpose: $match can be used to prepare or clean the data before it is passed to more complex operations like $group, $bucket, or $lookup.
b. Benefit: By ensuring only relevant documents enter these stages, you avoid unnecessary computations and potential errors caused by irrelevant data.

Example: If you are peforming an aggregation to caculate total sales per category but only want to include products that are in stock, you can use $match to filter out documents where the inStock field is false:
{
  $match: { inStock: true }
}

4. Chaining Multiple $match Stages
a. Purpose: In some scenarios, it might be more efficient or necessary to split complex conditions across multiple $match stages. This can be done to logically separate different filtering criteria or to progressively filter the dataset as it flows through the pipeline.
b. Benefit: This can improve code readability and maintainability, and in some cases, can be more performant than applying all conditions at once.

Example: You might first filter by date, then by category:
{ $match: { date: { $gte: ISODate("2023-01-01"), $lte: ISODate("2023-12-31") } } },
{ $match: { category: "Electronics" } }

5. Conditional Filtering
a. Purpose: $match can be used in conjunction with complex conditions using logical operators like $and, $or, $in, $gt, $lt, etc. to filter documents based on multiple criteria.
b. Benefit: This allows for highly customized queries where only documents meeting specific conditions are passed to the next stage.

Example: If you need to filter for sales that occurred either in January or had a total amount greater than $1000, you can use $or inside $match:
{
  $match: {
    $or: [
      { month: "January" },
      { totalAmount: { $gt: 1000 } }
    ]
  }
}

6. Efficient Use of Resources
a. Purpose: By filtering out unwanted data early, $match ensures that the database does not waste CPU and memory resources on unnecessary operations.
b. Benefit: This not only speeds up the query but also reduces the load on the database server, allowing it to handle more requests concurrently.

Example: Imagine a pipeline that aggregates sales data. Without $match, the entire dataset would be processed, even if you are only interested in a specific year or product category. This would use more resources and take longer to execute.

7. Combining with Other Stages
a. Purpose: $match is often combined with other stages like $group, $sort, $lookup, and $project to perform complex aggregations.
b. Benefit: This combination allows you to filter, transform, and analyze data in a streamlined and efficient manner.

Example: To find the top 5 best-selling profucts in the electronics category, you could use $match to filter by category, $group to aggregate sales data, and $sort to order by sales, before limiting the  results:
[
  { $match: { category: "Electronics" } },
  { $group: { _id: "$productId", totalSales: { $sum: "$sales" } } },
  { $sort: { totalSales: -1 } },
  { $limit: 5 }
]

Example Pipeline Using $match
// Here is a full example of an aggregation pipeline using $match in combination with other stages:
db.sales.aggregate([
  { $match: { date: { $gte: ISODate("2023-01-01"), $lte: ISODate("2023-12-31") } } },  // Filter by date range
  { $match: { category: "Electronics" } },  // Further filter by category
  { $group: { _id: "$productId", totalSales: { $sum: "$sales" } } },  // Group by product ID and sum sales
  { $sort: { totalSales: -1 } },  // Sort by total sales in descending order
  { $limit: 5 }  // Limit the results to the top 5 products
])

a. The first $match filters the data by date.
b. The second $match narrows it down to the "Electronics" category.
c. This ensures that only relevant data moves forward to the  grouping, sorting and limiting stages.









The $group stage in Aggregation Pipeline

The $group stage in the MongoDB aggregation pipeline is a powerful tool that allows you to aggregate data based on one or more fields and perform operations like sum, average, count, and more on grouped data. It is often used for tasks like calculating totals, averages, counts, or creating custom groupings in your dataset.

1. Aggregating Data by a key
a. Purpose: $group allows you to aggregate documents based on a specified key(or keys). This is similar to SQL's GROUP BY clause. The key can be a single field, multiple fields, or even a computed expression.
b. Benefit: This enables you to generate summaries or aggregate statistics, such as totals, averages, counts, or unique values.

Example: Suppose you have a collection of sales transactions and want to calculate the total sales per product. You can group the data by productId and sum the sales amounts.
Collection: sales
[
  { "productId": 1, "amount": 100 },
  { "productId": 1, "amount": 200 },
  { "productId": 2, "amount": 150 },
  { "productId": 2, "amount": 300 }
]
db.sales.aggregate([
  {
    $group: {
      _id: "$productId",  // Group by productId
      totalSales: { $sum: "$amount" }  // Sum the amount field
    }
  }
])
Ans: json->
[
  { "_id": 1, "totalSales": 300 },
  { "_id": 2, "totalSales": 450 }
]
a. The  $group stage groups the sales by productId, and the $sum operator calculates the total sales for each product.

Example 1: Counting Orders per Customer
// Use case: Count the number of orders each customer has placed.
Collection: orders
[
  { "orderId": 1, "customerId": "A123", "amount": 50 },
  { "orderId": 2, "customerId": "A123", "amount": 75 },
  { "orderId": 3, "customerId": "B456", "amount": 100 },
  { "orderId": 4, "customerId": "A123", "amount": 25 },
  { "orderId": 5, "customerId": "B456", "amount": 150 }
]
Pipeline:
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",  // Group by customerId
      orderCount: { $sum: 1 }  // Count the number of documents in each group
    }
  }
])
Ans: json->
[
  { "_id": "A123", "orderCount": 3 },
  { "_id": "B456", "orderCount": 2 }
]
a. The $group stage groups the orders by customerId, and $sum: 1, counts the number of orders(documents) for each customer.

Example 2: Average Rating by Product
// Use case: Calculate the average rating for each product
Collection: reviews
[
  { "productId": 1, "rating": 4 },
  { "productId": 1, "rating": 5 },
  { "productId": 2, "rating": 3 },
  { "productId": 2, "rating": 4 },
  { "productId": 2, "rating": 5 }
]
Pipeline:
db.reviews.aggregate([
  {
    $group: {
      _id: "$productId",  // Group by productId
      avgRating: { $avg: "$rating" }  // Calculate the average rating
    }
  }
])
Ans: json->
[
  { "_id": 1, "avgRating": 4.5 },
  { "_id": 2, "avgRating": 4.0 }
]
a. The $group stage groups the reviews by productId, and $avg calculates the average rating for each product.

Example 3: Grouping by multiple fields(Category and Brand)
// Use Case: Calculate total sales for each category-brand combination.
Collection: sales
[
  { "category": "Electronics", "brand": "BrandA", "amount": 100 },
  { "category": "Electronics", "brand": "BrandA", "amount": 200 },
  { "category": "Electronics", "brand": "BrandB", "amount": 150 },
  { "category": "Clothing", "brand": "BrandC", "amount": 300 }
]
Pipeline:
db.sales.aggregate([
  {
    $group: {
      _id: { category: "$category", brand: "$brand" },  // Group by category and brand
      totalSales: { $sum: "$amount" }  // Sum the amount field
    }
  }
])
Ans: json->
[
  { "_id": { "category": "Electronics", "brand": "BrandA" }, "totalSales": 300 },
  { "_id": { "category": "Electronics", "brand": "BrandB" }, "totalSales": 150 },
  { "_id": { "category": "Clothing", "brand": "BrandC" }, "totalSales": 300 }
]
a. The $group stage groups the sales by both category and brand, and calculates the total sales for each combination.

Example 4: Finding Minimum and Maximum Prices by Category
// Use case: Find the minimum and maximum prices of profucts in each category.
Collection: products
[
  { "category": "Electronics", "price": 100 },
  { "category": "Electronics", "price": 200 },
  { "category": "Clothing", "price": 50 },
  { "category": "Clothing", "price": 75 }
]
Pipeline:
db.products.aggregate([
  {
    $group: {
      _id: "$category",  // Group by category
      minPrice: { $min: "$price" },  // Find the minimum price
      maxPrice: { $max: "$price" }  // Find the maximum price
    }
  }
])
Ans: json->
[
  { "_id": "Electronics", "minPrice": 100, "maxPrice": 200 },
  { "_id": "Clothing", "minPrice": 50, "maxPrice": 75 }
]
a. The $group stage groups the products by category, and $min and $max find the minimum and maximum prices within each category.









The $lookup stage in MongoDB's aggregation pipeline

The $lookup stage in MongoDB's aggregation pipeline is used to perform a "join" operation between collections. This allows you to combine data from two different collections based on a related field, similar to how you would perform a join in SQL.

Why Do We Need to Use $lookup?
1. Combining Related Data: $lookup is useful when you need to retrieve related documents from another collection and combine them with the current collection's documents. For example, you might have a collection of orders and a separate collection of customers, and you want to combine the order data with the corresponding customer data.
2. Avoiding Multiple Queries: Instead of querying two collections separately and then manually combining the data, $lookup allows you to do this in a single query, making the operation more efficient and concise.
3. Data Enrichment: You can enrich your documents with additional related data from another collection, making it easier to analyze and present the data in a more meaningful way.

Example 1: Joining Orders with Customers
// Use Case: You have an orders collection and a customers collection. You want to retrieve orders along with the corresponding customer information.

Collection: orders
[
  { "_id": 1, "customerId": "A123", "amount": 100 },
  { "_id": 2, "customerId": "B456", "amount": 200 },
  { "_id": 3, "customerId": "A123", "amount": 150 }
]
Collection: customers
[
  { "_id": "A123", "name": "John Doe", "email": "john@example.com" },
  { "_id": "B456", "name": "Jane Smith", "email": "jane@example.com" }
]
Pipeline: 
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",            // The collection to join with
      localField: "customerId",     // The field from the orders collection
      foreignField: "_id",          // The field from the customers collection
      as: "customerInfo"            // The name of the new array field to add the joined data
    }
  },
  {
    $unwind: "$customerInfo"        // Optional: Unwind the array if you want a flat structure
  }
])
Output: json->
[
  {
    "_id": 1,
    "customerId": "A123",
    "amount": 100,
    "customerInfo": {
      "_id": "A123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  {
    "_id": 2,
    "customerId": "B456",
    "amount": 200,
    "customerInfo": {
      "_id": "B456",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  },
  {
    "_id": 3,
    "customerId": "A123",
    "amount": 150,
    "customerInfo": {
      "_id": "A123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
a. The $lookup stage joins the orders collection with the customers collection based on the customerId field from orders collection and the_id field from customers collection.
b. The resulting documents include an embedded customerInfo field, which contains the matching customer data.
c. The $unwind stage flattens the customerInfo array into a single document per match, which is optional depending on your use case.

Example 2: Joining Products with  Orders
// Use Case: You have an orders collection and a products collection. You want to retrieve orders along with the details of the products in each order.
Collection: orders
[
  { "_id": 1, "productId": 101, "quantity": 2 },
  { "_id": 2, "productId": 102, "quantity": 1 },
  { "_id": 3, "productId": 101, "quantity": 4 }
]
Collection: products
[
  { "_id": 101, "name": "Laptop", "price": 1000 },
  { "_id": 102, "name": "Phone", "price": 500 }
]
Pipeline: 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",           // The collection to join with
      localField: "productId",    // The field from the orders collection
      foreignField: "_id",        // The field from the products collection
      as: "productDetails"        // The name of the new array field to add the joined data
    }
  },
  {
    $unwind: "$productDetails"    // Unwind the array to get a flat structure
  },
  {
    $project: {                   // Optional: Select only specific fields
      _id: 1,
      quantity: 1,
      "productDetails.name": 1,
      "productDetails.price": 1
    }
  }
])
Output: json->
[
  {
    "_id": 1,
    "quantity": 2,
    "productDetails": {
      "name": "Laptop",
      "price": 1000
    }
  },
  {
    "_id": 2,
    "quantity": 1,
    "productDetails": {
      "name": "Phone",
      "price": 500
    }
  },
  {
    "_id": 3,
    "quantity": 4,
    "productDetails": {
      "name": "Laptop",
      "price": 1000
    }
  }
]
a. The $lookup stage joins the orders collection with the products collection based on the productId field from orders and the_id field from products.
b. The productDetails field contains the matching product information, which is unwound to create a flat (object) structure.
c. The $project stage is used to select specific fields, making the output cleaner by showing only the relevant information.

Example 3: Joining Authors with Their Books
// Use Case: You have an authors collection and a books collection. You want to retrieve authors along with the books they have written.
Collection: authors
[
  { "_id": 1, "name": "Author A" },
  { "_id": 2, "name": "Author B" }
]
Collection: books
[
  { "title": "Book 1", "authorId": 1 },
  { "title": "Book 2", "authorId": 1 },
  { "title": "Book 3", "authorId": 2 }
]
Pipeline: 
db.authors.aggregate([
  {
    $lookup: {
      from: "books",               // The collection to join with
      localField: "_id",           // The field from the authors collection
      foreignField: "authorId",    // The field from the books collection
      as: "writtenBooks"           // The name of the new array field to add the joined data
    }
  }
])
Ans: json->
[
  {
    "_id": 1,
    "name": "Author A",
    "writtenBooks": [
      { "title": "Book 1", "authorId": 1 },
      { "title": "Book 2", "authorId": 1 }
    ]
  },
  {
    "_id": 2,
    "name": "Author B",
    "writtenBooks": [
      { "title": "Book 3", "authorId": 2 }
    ]
  }
]
a. The $lookup stage joins the authors collection with the books collection based on the_id field from authors and the authorId field from books.
b. The resulting documents include a writtenbooks field, which is an array of books written by the respective author.

Why Use $lookup with a pipeline?

The $lookup stage in MongoDB can be used with a pipeline to perform more advanced lookups. Instead of simply joining two collections based on matching fields, the pipeline option allows you to define additional stages that manipulate the documents from the joined collection before they are merged with the original collection.

1. Advanced Filtering: You can filter documents from the joined collection using stages like $match, $project, or $limit.
2. Data Transformation: You can reshape or transform the data from the joined collection before combining it with the main collection.
3. Handling Nested Lookups: You can perform additional lookups or operations on the data within the joined collection using the pipeline.

Example 1: Filtering with $match in the pipeline
// Use Case: You have a students collection and a grades collection. You want to retrieve students along with their grades, but only include grades that are above 75.

Collection: students
[
  { "_id": 1, "name": "Alice" },
  { "_id": 2, "name": "Bob" }
]
Collection: grades
[
  { "studentId": 1, "subject": "Math", "grade": 80 },
  { "studentId": 1, "subject": "English", "grade": 70 },
  { "studentId": 2, "subject": "Math", "grade": 85 },
  { "studentId": 2, "subject": "English", "grade": 60 }
]
Pipeline: 
db.students.aggregate([
  {
    $lookup: {
      from: "grades",
      let: { studentId: "$_id" }, // Pass the student's _id as a variable
      pipeline: [
        {
          $match: {
            $expr: { $and: [ { $eq: ["$studentId", "$$studentId"] }, { $gt: ["$grade", 75] } ] }
          }
            // $studentId is from grades collection
            // $$studentId from the students collection and it is in the let as variable
        }
      ],
      as: "highGrades"
    }
  }
])
Ans: json->
[
  {
    "_id": 1,
    "name": "Alice",
    "highGrades": [
      { "studentId": 1, "subject": "Math", "grade": 80 }
    ]
  },
  {
    "_id": 2,
    "name": "Bob",
    "highGrades": [
      { "studentId": 2, "subject": "Math", "grade": 85 }
    ]
  }
]
a. let: This defines a variable(studentId) that will be used in the pipeline. It is equivalent to passing data(_id) from the parent collection(students) into the lookup pipeline.
b. $match: The $expr operator allows you to perform an expression match. It checks if the studentId from grades matches the student's_id from students which is set in the let variable and filters grades that are greated than 75.
c. as: The resulting array is stored in the highGrades field.

Example 2: Joining with an additional Lookup Inside the Pipeline
// Use Case: You have an orders collection, and a suppliers collection. You want to retrieve orders with product details, including the supplier information for each product.

Collection: orders
[
  { "_id": 1, "productId": 101, "quantity": 2 },
  { "_id": 2, "productId": 102, "quantity": 1 }
]
Collection: products
[
  { "_id": 101, "name": "Laptop", "price": 1000, "supplierId": 201 },
  { "_id": 102, "name": "Phone", "price": 500, "supplierId": 202 }
]
Collection: suppliers
[
  { "_id": 201, "name": "Supplier A" },
  { "_id": 202, "name": "Supplier B" }
]
Pipeline: 
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      let: { productId: "$productId" }, // Pass the productId from orders
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$_id", "$$productId"] } // Match products based on _id
          }
        },
        {
          $lookup: {
            from: "suppliers",
            localField: "supplierId",
            foreignField: "_id",
            as: "supplierInfo"
          }
        },
        {
          $unwind: "$supplierInfo" // Flatten the supplierInfo array
        }
      ],
      as: "productDetails"
    }
  },
  {
    $unwind: "$productDetails" // Flatten the productDetails array
  }
])
Ans: json->
[
  {
    "_id": 1,
    "productId": 101,
    "quantity": 2,
    "productDetails": {
      "_id": 101,
      "name": "Laptop",
      "price": 1000,
      "supplierId": 201,
      "supplierInfo": {
        "_id": 201,
        "name": "Supplier A"
      }
    }
  },
  {
    "_id": 2,
    "productId": 102,
    "quantity": 1,
    "productDetails": {
      "_id": 102,
      "name": "Phone",
      "price": 500,
      "supplierId": 202,
      "supplierInfo": {
        "_id": 202,
        "name": "Supplier B"
      }
    }
  }
]
a. The $lookup stage joins the orders collection with the products collection using the productId.
b. Inside the pipeline for the $lookup, another $lookup stage joins the products collection with the suppliers collection based on the supplierId.
c. $unwind is used twice to flatten the arrays for cleaner structure.

Example 3: Aggregating Data After a lookup
// Use Case: Retrieve customers and calculate the total amount spent by each customer based  on their orders, using a lookup with a pipeline.

Collection: customers
[
  { "_id": "C001", "name": "John Doe" },
  { "_id": "C002", "name": "Jane Smith" }
]
Collection: orders
[
  { "customerId": "C001", "amount": 100 },
  { "customerId": "C001", "amount": 200 },
  { "customerId": "C002", "amount": 150 }
]
Pipeline: 
db.customers.aggregate([
  {
    $lookup: {
      from: "orders",
      let: { customerId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$customerId", "$$customerId"] } // Match orders by customerId
          }
        },
        {
          $group: { // Group by customerId and calculate totalAmount
            _id: "$customerId",
            totalAmount: { $sum: "$amount" }
          }
        }
      ],
      as: "orderSummary"
    }
  },
  {
    $unwind: {
      path: "$orderSummary",
      preserveNullAndEmptyArrays: true // If no orders, show customer with null orderSummary
    }
  }
])
Ans: json->
[
  {
    "_id": "C001",
    "name": "John Doe",
    "orderSummary": {
      "_id": "C001",
      "totalAmount": 300
    }
  },
  {
    "_id": "C002",
    "name": "Jane Smith",
    "orderSummary": {
      "_id": "C002",
      "totalAmount": 150
    }
  }
]
a. The $lookup stage joins customers with orders and users a pipeline to calculate the total amount spent by each customer.
b. $group is used inside the pipeline to aggregate the total order amount per customer.
c. $unwind flattens the resulting orderSummary array, and preserveNullAndEmptyArrays: true, ensures that customers without orders are still included in the output.

A few more example: $lookup
The $lookup stage in MongoDB is used to perform a left outer join with another collection. The localField and foreignField options are used to specify the fields that should be matched between the two collections. Here’s how $lookup works with localField and foreignField.

Example: Using $lookup with localField and foreignField

Imagine you have two collections: orders and customers. The orders collection contains information about orders placed by customers, and the customers collection contains customer details. You want to retrieve orders along with the corresponding customer details.

Collection: orders
[
  { "_id": 1, "product": "Laptop", "amount": 1200, "customerId": 101 },
  { "_id": 2, "product": "Phone", "amount": 800, "customerId": 102 },
  { "_id": 3, "product": "Tablet", "amount": 600, "customerId": 103 }
]
Collection: customers
[
  { "_id": 101, "name": "Alice", "email": "alice@example.com" },
  { "_id": 102, "name": "Bob", "email": "bob@example.com" },
  { "_id": 104, "name": "Charlie", "email": "charlie@example.com" }
]
In this example, the orders collection has a customerId field, which corresponds to the _id field in the customers collection.
Aggregation Pipeline with $lookup

To join the orders collection with the customers collection and retrieve customer details for each order, you can use the following aggregation pipeline:
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",         // The collection to join (customers)
      localField: "customerId",  // The field from the orders collection (customerId)
      foreignField: "_id",       // The field from the customers collection (_id)
      as: "customerDetails"      // The name of the array field to store matched documents
    }
  },
  {
    $unwind: "$customerDetails"  // Flatten the array to get individual customer details
  }
])
Explanation

	•	from: Specifies the collection to join (customers in this case).
	•	localField: The field in the orders collection (customerId) that you want to match with the customers collection.
	•	foreignField: The field in the customers collection (_id) that should match with the localField.
	•	as: The name of the field where the joined documents from the customers collection will be stored as an array.
	•	$unwind: This stage is used to flatten the array (customerDetails), so each document contains the individual customer details instead of an array.

Output
After running the aggregation pipeline, the output will look like this:
[
  {
    "_id": 1,
    "product": "Laptop",
    "amount": 1200,
    "customerId": 101,
    "customerDetails": {
      "_id": 101,
      "name": "Alice",
      "email": "alice@example.com"
    }
  },
  {
    "_id": 2,
    "product": "Phone",
    "amount": 800,
    "customerId": 102,
    "customerDetails": {
      "_id": 102,
      "name": "Bob",
      "email": "bob@example.com"
    }
  },
  {
    "_id": 3,
    "product": "Tablet",
    "amount": 600,
    "customerId": 103,
    "customerDetails": null  // No matching customer found
  }
]
Explanation of Output

	1.	Order with ID 1: The customerId is 101, which matches with Alice in the customers collection. Therefore, Alice’s details are included in the customerDetails field.
	2.	Order with ID 2: The customerId is 102, which matches with Bob. Bob’s details are included in the customerDetails field.
	3.	Order with ID 3: The customerId is 103, but there is no matching customer with _id 103 in the customers collection. Therefore, the customerDetails field is null.

Use Cases for $lookup with localField and foreignField

	•	Joining Collections: When you need to join two collections based on a common field (like a foreign key relationship).
	•	Embedding Related Data: When you want to include related data from another collection in your query results without making multiple queries.
	•	Creating Reports: When you need to generate reports that combine data from multiple collections.


Conclusion
The $lookup stage with a pipeline is a powerful tool for performing advanced joins and transformations in MongoDB. By combining multiple stages within the lookup pipeline, you can filter, reshape, and aggregate data from related collections in complex ways.
1. Fitlering: Use $match to limit the joined data.
2. Transforming: Use stages like $project, $unwind, or $addFields to modify the structure of the joined documents.
3. Nested lookups: Perform additional within the pipeline for even more complex joins.









The $project stage in MongoDB's aggregation

The $project stage in MongoDB's pipeline is used to control the shape of the documents that pass through the pipeline. It allows you to include, exclude, or compute new fields in your documents. This is useful when you need to restructure your data, include only specific fields, or create new fields based on existing data.

Why Do We Need to Use $project?
1. Select Specific Fields: Sometimes, you do not need all the fields from a document. $project allows you to include only the necessary fields, reducing the size of the output and making it more readable. 
2. Exclude Fields: You can also exclude certain fields that are not relevant to your query, simplifying the output.
3. Rename Fields: If you need to change the names of fields for readability or consistency, $project can help you do that.
4. Create Computed Fields: $project can be used to create new fields that are computed based on existing fields. For example, you can combine fields, apply mathematical operations, or conditionally create new fields.
5. Transform Data: You can reshape the data to meet specific requirements, such as converting embedded documents into top-level fields or vice versa.

Example 1: Selecting Specific Fields
// Use Case: You have a products collection, and you want to retrieve only the name and price fields from each document.
Collection: products
[
  { "_id": 1, "name": "Laptop", "price": 1000, "category": "Electronics", "stock": 50 },
  { "_id": 2, "name": "Phone", "price": 500, "category": "Electronics", "stock": 100 }
]
Pipeline: 
db.products.aggregate([
  {
    $project: {
      name: 1,  // Include the name field
      price: 1  // Include the price field
    }
  }
])
Ans: json->
[
  { "_id": 1, "name": "Laptop", "price": 1000 },
  { "_id": 2, "name": "Phone", "price": 500 }
]
a. The $project stage is used to include only the name and price fields in the output. All other fields, such as category and stock, are excluded.

Example 2: Excluding Fields
// Use Case: You want to retrieve products but exclude the stock field from the output.
Pipeline:
db.products.aggregate([
  {
    $project: {
      stock: 0  // Exclude the stock field
    }
  }
])
Ans: json->
[
  { "_id": 1, "name": "Laptop", "price": 1000, "category": "Electronics" },
  { "_id": 2, "name": "Phone", "price": 500, "category": "Electronics" }
]
a. The $project stage is used to exclude the  stock field, while all other fields are included by default.

Example 3: Renaming Fields
// Use Case: You want to rename the price field to cost in the output
Pipeline:
db.products.aggregate([
  {
    $project: {
      _id: 1,           // Include the _id field
      name: 1,          // Include the name field
      cost: "$price"    // Rename price to cost
    }
  }
])
a. The $project stage renames the price field to cost by asigning price to the cost field in the output.

Example 4: Creating Computed Fields
// Use Case: You want to calculate the total value of the stock for each product(i.e. price * stock) and include it as a new field called totalValue.
Pipeline:
db.products.aggregate([
  {
    $project: {
      name: 1,                     // Include the name field
      price: 1,                    // Include the price field
      stock: 1,                    // Include the stock field
      totalValue: {                // Create a new field totalValue
        $multiply: ["$price", "$stock"]  // Multiply price by stock
      }
    }
  }
])
a. The $project stage creates a new field called totalValue, which is calculated by multiplying the price and stock fields. This allows you to compute new information directly in the aggregation pipeline.

Example 5: Conditional Fields with $cond
// Use Case: You want to add a new field called stockStatus that indcates whether the product is "In Stock" or "Out of Stock" based on the stock value.
Pipeline:
db.products.aggregate([
  {
    $project: {
      name: 1,   // Include the name field
      stock: 1,  // Include the stock field
      stockStatus: {  // Create a new field stockStatus
        $cond: {
          if: { $gt: ["$stock", 0] },  // If stock is greater than 0
          then: "In Stock",            // Then set stockStatus to "In Stock"
          else: "Out of Stock"         // Otherwise, set stockStatus to "Out of Stock"
        }
      }
    }
  }
])
Ans: json->
[
  { "_id": 1, "name": "Laptop", "stock": 50, "stockStatus": "In Stock" },
  { "_id": 2, "name": "Phone", "stock": 100, "stockStatus": "In Stock" }
]
a. The $project stage uses $cond to create a conditional field stockStatus that checks if the stock value is greater than 0. If true, stockStatus is set to "In Stock"; otherwise, it is set to "Out of Stock",
Conclusion

The $project stage is a versatile tool in MongoDB’s aggregation pipeline that allows you to:

	•	Select only the fields you need.
	•	Exclude unnecessary fields.
	•	Rename fields for better readability or consistency.
	•	Compute new fields based on existing data.
	•	Transform and reshape your data as needed.








$addToSet in the MongoDB

$addToSet is a powerful operator in MongoDB that is typically used in the context of the $group stage of an aggregation pipeline or in an update operation. The main function of $addToSet is to add unique values to an array. It ensures that there are no duplicate entries in the array, making it different from the $push operator, which can add duplicates.

Use Cases for $addToSet
1. Collecting Unique Values: When you want to collect unique values from a field across multiple documents.
2. Avoiding Duplicates: When you want to ensure that an array does not contain duplicate values, either in an aggregation result or when updating documents.
3. Creating Unique Lists: When you need to generate a unique list of items, such as tags, categories, or any other array of distinct values.

Example 1: Using $addToSet in Aggregation
// Suppose you have a sales collection where each document represents a sale, including a customerId and a list of products bought by the customer. You want to create a report that lists all the unique products bought by each customer.

Collection: Sales
[
  { "_id": 1, "customerId": 101, "product": "Laptop" },
  { "_id": 2, "customerId": 101, "product": "Phone" },
  { "_id": 3, "customerId": 102, "product": "Tablet" },
  { "_id": 4, "customerId": 101, "product": "Laptop" },
  { "_id": 5, "customerId": 102, "product": "Laptop" }
]
Aggregation Pipeline with $addToSet
// To group the sales by customerId and collect the unique products bought by each customer, you can use the following aggregation pipeline:
db.sales.aggregate([
  {
    $group: {
      _id: "$customerId",           // Group by customerId
      uniqueProducts: {             // Create a uniqueProducts array
        $addToSet: "$product"        // Add unique products to the array
      }
    }
  }
])
a. $group: This stage groups the documents by the customerId field.
b. $addToSet: This operator is used to add the unique values of the product field to the uniqueProducts array. Any duplicate products will be automatcally filtered out.
Ans: json->
[
  {
    "_id": 101,
    "uniqueProducts": ["Laptop", "Phone"]
  },
  {
    "_id": 102,
    "uniqueProducts": ["Tablet", "Laptop"]
  }
]
a. Customer 101: Bought a "Laptop" and a "Phone". Even though "Laptop" appears twice in the sales records, it is only added once to the uniqueProducts array because of $addToSet.
b. Customer 102: Bought a "Tablet" and a "Laptop". Both products are added to the uniqueProducts array, and since both are unique, the appear once.

Example 2: Using $addToSet in an Update Operation
// Suppose you have a users collection, and you want to add a new tag to a user's tags array, but only if the tag does not already exist in the array.
Collection: users
[
  { "_id": 1, "username": "Alice", "tags": ["mongodb", "database"] },
  { "_id": 2, "username": "Bob", "tags": ["nodejs", "javascript"] }
]
Udate Operation with $addToSet
// To add a tag to Alice's tags array, but only if it does not already exist:
db.users.updateOne(
  { username: "Alice" },
  {
    $addToSet: { tags: "backend" }  // Add the tag "backend" if it's not already in the array
  }
)
a. $addToSet: Ensures that the tag "backend" is added to Alice's tags array only if it is not already present.
Ans: json->
// After running the update, Alice's document will look like this:
{
  "_id": 1,
  "username": "Alice",
  "tags": ["mongodb", "database", "backend"]  // "backend" is added as it's unique
}






*** $bucket in Aggregation Pipeline ***
The $bucket operator in MongoDB's aggregation framework is used for data bucketing, which is essential grouping data into discrete ranges or "buckets" based on the values in a specific field. This is particularly useful for generating histograms or summaries of data by dividing a continuous range of values into intervals. 

For example, if you are dealing with numeric data (like ages, scores, prices, etc), you might want to categorize or group those values into different ranges to analyze trends or generate statistics for each group. This is where $bucket comes into play.

How $bucket Works
1. The $bucket operator groups input documents into buckets, each representing a specific ranges of values.
2. You need to define boundaries that specify the range for each bucket.
3. It outputs a count of the documents in each bucket, and you can also add additional computations like sum, average, etc. for each bucket.
4. Documents with field values outside the specified boundaries can be optionally hanlded with an "overflow" (default: "Other") bucket.

Basic Structure of $bucket
Here is how $bucket is typically structured in a MongoDB aggregation pipeline:
{
  $bucket: {
    groupBy: <expression>,       // Field or expression to group by (e.g., price, age)
    boundaries: [<min>, <max>, ...], // Array of boundary values for the buckets
    default: <default_bucket>,   // Optional: Where documents that don't fit into any bucket go
    output: {                    // Optional: Additional output fields (aggregations within each bucket)
      <field1>: { <accumulator> },
      <field2>: { <accumulator> }
    }
  }
}

Example: Grouping people by age ranges
Let's say you have a collection of people with an age field, and you want to group people into age ranges(e.g. 0-20, 20-40, 40-60, etc.). You can use $bucket to create these groups.
db.people:
[
  { "_id": 1, "name": "Alice", "age": 25 },
  { "_id": 2, "name": "Bob", "age": 30 },
  { "_id": 3, "name": "Charlie", "age": 35 },
  { "_id": 4, "name": "David", "age": 50 },
  { "_id": 5, "name": "Eve", "age": 75 }
]
Aggregation with $bucket
db.people.aggregate([
  {
    $bucket: {
      groupBy: "$age",  // The field to group by
      boundaries: [20, 40, 60, 80],  // Define the bucket boundaries
      default: "Other", // Optional: Bucket for ages outside the defined boundaries
      output: {
        count: { $sum: 1 }  // Output field showing how many documents are in each bucket
      }
    }
  }
]);
Explanation:
a. groupBy: "$age" groups the documents based on the age field.
b. boundaries: [20, 40, 60, 80] defines the boundaries for the buckets. This will create three buckets:-
  1. First bucket: 20 <=age<40
  2. Second bucket: 40<=age<60
  3. Third bucket: 60<=age<80
c. default: "Other" means documents where the age value is outside the specified boundaries will go into a bucket labeled "Other".
d. output: In this example, we use $sum: 1 to count how many people are in each bucket.

Ans: json->
[
  { "_id": 20, "count": 3 },  // Ages between 20 and 40: Alice (25), Bob (30), Charlie (35)
  { "_id": 40, "count": 1 },  // Ages between 40 and 60: David (50)
  { "_id": 60, "count": 1 },  // Ages between 60 and 80: Eve (75)
  { "_id": "Other", "count": 0 }  // No people with age outside the boundaries
]

Examples grouping prices into ranges and summing total sales
Let's say you have a products collection, and you want to group products by price ranges and sum up the total sales for each price group.

db.products:
[
  { "_id": 1, "product": "A", "price": 10, "sales": 100 },
  { "_id": 2, "product": "B", "price": 15, "sales": 200 },
  { "_id": 3, "product": "C", "price": 30, "sales": 300 },
  { "_id": 4, "product": "D", "price": 50, "sales": 400 },
  { "_id": 5, "product": "E", "price": 75, "sales": 500 }
]
Aggregation with $bucket
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",  // Group by the price field
      boundaries: [0, 20, 40, 100],  // Price ranges: 0-20, 20-40, 40-100
      default: "Other",   // Handle any prices outside the boundaries
      output: {
        totalSales: { $sum: "$sales" },  // Sum of sales for each price group
        productCount: { $sum: 1 }        // Count of products in each bucket
      }
    }
  }
]);
Ans: json->
[
  { "_id": 0, "totalSales": 300, "productCount": 2 },  // Products A and B (price: 10, 15)
  { "_id": 20, "totalSales": 300, "productCount": 1 }, // Product C (price: 30)
  { "_id": 40, "totalSales": 900, "productCount": 2 }, // Products D and E (price: 50, 75)
  { "_id": "Other", "totalSales": 0, "productCount": 0 }  // No products with prices outside these ranges
]
Another Example: 
db.artists.insertMany([
  {
    _id: 1,
    last_name: "Bernard",
    first_name: "Emil",
    year_born: 1868,
    year_died: 1941,
    nationality: "France",
  },
  {
    _id: 2,
    last_name: "Rippl-Ronai",
    first_name: "Joszef",
    year_born: 1861,
    year_died: 1927,
    nationality: "Hungary",
  },
  {
    _id: 3,
    last_name: "Ostroumova",
    first_name: "Anna",
    year_born: 1871,
    year_died: 1955,
    nationality: "Russia",
  },
  {
    _id: 4,
    last_name: "Van Gogh",
    first_name: "Vincent",
    year_born: 1853,
    year_died: 1890,
    nationality: "Holland",
  },
  {
    _id: 5,
    last_name: "Maurer",
    first_name: "Alfred",
    year_born: 1868,
    year_died: 1932,
    nationality: "USA",
  },
  {
    _id: 6,
    last_name: "Munch",
    first_name: "Edvard",
    year_born: 1863,
    year_died: 1944,
    nationality: "Norway",
  },
  {
    _id: 7,
    last_name: "Redon",
    first_name: "Odilon",
    year_born: 1840,
    year_died: 1916,
    nationality: "France",
  },
  {
    _id: 8,
    last_name: "Diriks",
    first_name: "Edvard",
    year_born: 1855,
    year_died: 1930,
    nationality: "Norway",
  },
]);

// db.artists.find();
db.artists.aggregate([
  {
    $bucket: {
      groupBy: "$year_born",
      boundaries: [1840, 1850, 1860, 1870, 1880, 1890],
      default: "Other",
      output: {
        count: { $sum: 1 },
        artists: {
          $push: {
            name: { $concat: ["$first_name", " ", "$last_name"] },
            year_born: "$year_born",
          },
        },
      },
    },
  },
]);

Ans: json-> 
[
  {
    "_id": 1840,
    "count": 1,
    "artists": [
      {
        "name": "Odilon Redon",
        "year_born": 1840
      }
    ]
  },
  {
    "_id": 1850,
    "count": 2,
    "artists": [
      {
        "name": "Vincent Van Gogh",
        "year_born": 1853
      },
      {
        "name": "Edvard Diriks",
        "year_born": 1855
      }
    ]
  },
  {
    "_id": 1860,
    "count": 4,
    "artists": [
      {
        "name": "Emil Bernard",
        "year_born": 1868
      },
      {
        "name": "Joszef Rippl-Ronai",
        "year_born": 1861
      },
      {
        "name": "Alfred Maurer",
        "year_born": 1868
      },
      {
        "name": "Edvard Munch",
        "year_born": 1863
      }
    ]
  },
  {
    "_id": 1870,
    "count": 1,
    "artists": [
      {
        "name": "Anna Ostroumova",
        "year_born": 1871
      }
    ]
  }
]

Benefits of Using $bucket:
1. Data Grouping: Group continuous data into discrete(“পৃথক”) intervals, which is useful for creating histograms or summaries.
2. Flexibility: You can define custom ranges based on your dataset.
3. Aggregated Results: The $bucket operator allows not only grouping but also performing additional calculations within each bucket(e.g. summing values or counting occurrences).
4. Handling Outliers: The default option lets you categorize data that falls outside the defined bucket boundaries.

The $bucket operator in MongoDB is an essential tool for organizing and summarizing data based on ranges. Whether you’re analyzing sales by price ranges, organizing users by age groups, or categorizing data into specific intervals, $bucket helps you easily define custom ranges and group data accordingly.






To retrieve the first element of an array: $first: "$array_name"

$first is used in a MongoDB aggregation pipeline, and it works as part of the $addFields, $group or similar stages. It means that we are extracting the first element from an array or selecting the first field from the grouped documents.

videos collecton:
[
  { "_id": 1, "title": "Video 1", "owner": ["Alice", "Bob"] },
  { "_id": 2, "title": "Video 2", "owner": ["Charlie", "David"] }
]
db.videos.aggregate([
  {
    $addFields: {
      firstOwner: { $first: "$owner" }  // Extracting the first owner
    }
  }
]);

Ans: json-> 
[
  { "_id": 1, "title": "Video 1", "owner": ["Alice", "Bob"], "firstOwner": "Alice" },
  { "_id": 2, "title": "Video 2", "owner": ["Charlie", "David"], "firstOwner": "Charlie" }
]
*/

/*

*** How to write README.md *** 
# 🎥  Video Streaming App

### In this project I am making a Youtube-like platform where users can view, upload and share videos. The frontend is built using react and backend is powered by Node.js. It's a complete MERN application.

## 🚧 Project Status

### This project is currently under development. Backend is complete and I am currently working on frontend.

## 🚀 Features

- 📹 **Upload Videos**: Share your videos with the world.
- 🎥 **Watch Videos**: Enjoy videos uploaded by others.
- 👍 **Like**: Express your opinions on videos.
- 💬 **Comment**: Engage in discussions with the community.
- 🔍 **Search**: Find videos by keywords.
- 📊 **Trending**: Discover trending videos.
- 🛠 **Admin Panel**: Manage content and users. 

## 🛠️ Technologies Used

- **Frontend**: 
  - React
  - Redux Toolkit
  - Tailwind CSS
  - React Hook Form

- **Backend**: 
  - Node.js
  - Express
  - MongoDB
  - Cloudinary
  - JWT (JSON Web Tokens)
  - Bcrypt (Hashing password)
*/