const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.URI);

const db = client.db("URL-Shortner");
const col = db.collection("URLs");

let postURL = async (URL) =>{
    try{
        let count = await col.countDocuments({});
    if(count == 0){
        await col.aggregate([{$set:{shortURL:0, originalURL:new String()}}]);
    }
    let UrlExists = await col.findOne({originalURL: URL});
    if(!UrlExists){
        await col.insertOne({originalURL: URL, shortURL:count+1});
        let result = await col.findOne({originalURL:URL});
        return result;
    }else{
        return "URL already used. Please provide some other URL"
    }
    }
    catch(error){
        return "Bad Request";
    }
}

let getURL = async (value) =>{
    try{
        if(typeof(value)=="string"){
            const result = await col.findOne({originalURL: value});
            return result;
        }else{
            const result = await col.findOne({shortURL: value});
            return result;
        }
    }
    catch(err){
        return "Bad Request";
    }
}

module.exports = {postURL, getURL};