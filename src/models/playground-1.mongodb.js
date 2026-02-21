// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('cms');

// Create a new document in the collection.
db.getCollection('users').insertOne({
  firstname: "Shuvam",
  lastname: "Gautam",

  email: "admin@cms.com",

  password: "$2a$12$fXwW/kTSnAhEogsovZd4n.TA3lf/ROtl2ESo2/LI/QgceKKh2irLC",

});
