import mongodb from "mongodb"
const { MongoClient, ServerApiVersion } = mongodb;

const URL = "mongodb+srv://Alexander2k:x0nZnjmGhGDqipfH@certus1.myehptl.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URL,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
)



async function run() {
  try {
    await client.connect();
    return client
  }catch(error){
    console.log(error)
  }
}

run()
  .then(async res => {
    console.log("Connected");
    return res
  })
  .then(async res => await res.close())