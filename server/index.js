const express = require("express");
const app = express();
const mysql = require ("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bd_ingreso_salida"

});

app.post("/create",(req,res)=>{
    const PersonalCamion = req.body.PersonalCamion;
    const Patente = req.body.Patente;
    const Observaciones = req.body.Observaciones;
    const Origen = req.body.Origen;
    const Destino = req.body.Destino;
    const GuiaDespacho = req.body.GuiaDespacho;


    db.query('INSERT INTO ingresos (PersonalCamion,Patente,Observaciones,Origen,Destino,GuiaDespacho) VALUES (?,?,?,?,?,?,?)',[PersonalCamion,Patente,Observaciones,Origen,Destino,GuiaDespacho],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});


app.get("/ingresos",(req,res)=>{
    db.query('SELECT * FROM ingresos',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const PersonalCamion = req.body.PersonalCamion;
    const Patente = req.body.Patente;
    const Observaciones = req.body.Observaciones;
    const Origen = req.body.Origen;
    const Destino = req.body.Destino;
    const GuiaDespacho = req.body.GuiaDespacho;


    db.query('UPDATE ingresos SET PersonalCamion=?,Patente=?,Observaciones=?,Origen=?,Destino=?,GuiaDespacho=? WHERE id=?',[PersonalCamion,Patente,Observaciones,Origen,Destino,GuiaDespacho,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});


app.delete("/delete/:id",(req,res)=>{
    const id = req.params .id;



    db.query('DELETE FROM  ingresos WHERE id=?',[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})