exports = async function(arg) {
  let collection = context.services.get("Cluster0").db("next_twitter").collection("tweets");
  return collection.find({});
  
};
