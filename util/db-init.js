const mongoose = require("mongoose");
const BlogPost = require("../models/BlogPost"); // Adjust path as necessary
const MustacheStyle = require("../models/MustacheStyle");

const fs = require("fs");

// Function to read the JSON file and parse it
function loadData(file) {
  const data = fs.readFileSync(file, "utf8");
  return JSON.parse(data);
}

const blogData = loadData("blogData.json");
const mustacheData = loadData("mustacheData.json");

async function populateTable(model, data) {
  try {
    const result = await model.insertMany(data);
    console.log("Data inserted successfully:", result);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

async function runPopulation() {
  await mongoose.connect(
    "mongodb+srv://a02359825:aggies@cluster0.hii5f2d.mongodb.net/mustachio?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  try {
    await populateTable(BlogPost, blogData);
    console.log("\nBLOG POST POPULATED!!");
    await populateTable(MustacheStyle, mustacheData);
    console.log("\nMUSTACHE POPULATED!!");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
}

runPopulation();

