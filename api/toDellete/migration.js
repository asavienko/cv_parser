const MongoClient = require("mongodb").MongoClient;

(async () => {
  const client = new MongoClient(
    "mongodb+srv://Asavienko:z3x41987@cvparser-ycar8.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  const db = await client.connect();
  const collectionResume = db.db("rabotaua").collection("resumes");
  const collectionIds = db.db("rabotaua").collection("resumeIds");
  const result = await collectionResume
    .aggregate([{ $match: {} }, { $group: { _id: "$ResumeId" } }])
    .forEach(function(doc) {
      collectionIds.insertOne(doc);
    });



  /*


    const result = await collection.updateMany(
      { Browsed: { $exists: true } },
      {
        $unset: {
          Age: "",
          Score: "",
          Keywords: "",
          Starred: "",
          Comments: "",
          Url: "",
          FoundIn: "",
          Browsed: "",
          InBlackList: "",
          CurrencyId: ""
        }
      }
    );

  */

  /*

  const result = await collection
    .aggregate([
      {
        $group: {
          _id: { ResumeId: "$ResumeId" },
          dups: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ])
    .forEach(function(doc) {
      doc.dups.shift();
      collection.deleteMany({
        _id: { $in: doc.dups }
      });
    });
  
  */

  console.log(result);
})();
