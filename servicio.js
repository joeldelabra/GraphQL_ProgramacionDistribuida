const server = require("fastify")();
const graphql = require('fastify-gql');
const fs = require("fs");
const schema = fs.readFileSync(__dirname + '/schema.gql').toString();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "4000";

const resolvers = {
    Query: {
        pid: () => process.pid,
        receta: async(_obj, {id}) => {
            if(id !=42){
                throw new Error(`Receta ${id} no encontrado`)
            }
            return{
                id, 
                nombre: "Taco de pollo",
                pasos: "Agarrar una tortilla y ponle pollo"
            }
        }
    },
    Receta: {
        ingredientes: async(obj) => {
            return (obj.id !=42) ? [] : [{ id:1, nombre: "Tortilla", cantidad: "4 unidades"},
        {id:2, nombre: "pollo", cantidad: "150 grs"}]
        }
    }
};

server
.register(graphql,{schema,resolvers,graphiql:true})
.listen(PORT,HOST, ()=>{
    console.log(`Servicio iniciado en http://${HOST}:${PORT}/graphql`)
});
