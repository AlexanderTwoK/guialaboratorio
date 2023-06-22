import mongodb from "mongodb"
import fs from "fs"
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

  async function borrarFrutas(clientDB, id){
    console.log("Borrando info...")
  
    try{
      const db = clientDB.db("Proyect1");
      const coll = db.collection("Seccion1");
  
      const filter = { _id:id };
      const result = await coll.deleteOne(filter)
  
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
  
    }catch(err){
      console.log(err)
    }
  }

  async function updateFrutas(clientDB, id, info) {
    console.log("Actualizando info...");
    console.log(info);
  
    try {
      const db = clientDB.db("Proyect1");
      const coll = db.collection("Seccion1");
  
      const filter = { _id: id };
      const updateDoc = {
        $set: {
          ...info,
        },
      };
  
      const result = await coll.updateOne(filter, updateDoc);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
  
      console.log("Actualizado exitosamente.");
    } catch (err) {
      console.log(err);
    }
  }
  
  async function exportCollection(data){
    try {
      fs.writeFileSync('FRUTAS.json', JSON.stringify(data));
      console.log('Done writing to file.');
    }catch(err) {
      console.log('Error writing to file', err)
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
    await updateFrutas(res,updateId,{name:"Pera,2"})
    await borrarFrutas(res,updateId)
    await exportCollection(collData)
    return res
  })
  .then(async res => await res.close())



