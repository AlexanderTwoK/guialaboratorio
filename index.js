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

async function obtenerFrutas(clientDB) {
    console.log("Mostrando datos....");
    try {
      const db = clientDB.db("Proyect1");
      const coll = db.collection("Seccion1");
      const result = await coll.find({}).toArray();
      let frutas = [];
  
      return new Promise((res, rej) => {
        result.forEach((element) => {
          frutas.push(element);
        });
        console.log(frutas)
        res(frutas);
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  async function crearFrutas(clientDB, info) {
    console.log("Guardando info...");
    console.log(info);
  
    try {
      const db = clientDB.db("Proyect1");
      const coll = db.collection("Seccion1");
      await coll.insertOne(info);
  
      console.log("Info Guardada!");
  
      return info._id;
    } catch (err) {
      console.log(err);
    }
  }


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
    const collData = await obtenerFrutas(res)
    const updateId = await crearFrutas(res, {frutas:"Pera"})
    return res
  })
  .then(async res => await res.close())

