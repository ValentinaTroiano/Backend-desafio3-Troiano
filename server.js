import { promises } from 'fs';
import Contenedor from './Contenedor';



//Creamos archivo de texto
Contenedor.crearArchivoTxt();

// Incializamos el servidor
const app = express();

const PUERTO = 8080;


// Levantamos servidor
app.listen(PUERTO, ()=>{
    console.log(`Servidor Escuchando en el puerto: ${PUERTO}`);
});

//Root Page
app.get('/', (req, res)=>{
    res.json({
        '/productos': 'Visualizar todos los productos disponibles',
        '/productoRandom': 'Devuelve un producto alazae'
    });
});

//Ejercicio 1 
app.get('/productos', async (req, res)=>{
    try{
        const data = await promises.readFile('./productos.txt', 'utf-8');
        const data_obj = JSON.parse(data);
        res.json(data_obj);
    }catch(e){
        res.json({
            'Error': e.message
        })
    }
});

// Ejercicio 2 (Random)
app.get('/productoRandom', async (req, res)=>{
    const data = await promises.readFile('./productos.txt', 'utf-8');
    const data_obj = JSON.parse(data);
    let randomNumber = Math.round(Math.random()*(data_obj.length - 1)) ;
    res.json(data_obj[randomNumber]);
})
module.exports = Server