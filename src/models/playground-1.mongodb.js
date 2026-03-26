// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('cms');

// Create a new document in the collection.
db.getCollection('users').insertOne({
  firstname: "Shuvam",
  lastname: "Gautam",
  role: "Admin",
  email: "codeshuv@gmail.com",
  isVerified: true,
  password: "$2a$12$Z6PuYeQ3UNZ3.LH6lX9YrOyxaS.qJXr4kAQTaavJV/O4R/1xpWLSy",
  "status": "approved"
});
