import React, { useEffect, useInsertionEffect, useState } from "react";
import ElementsList from "./ElementsList.jsx";
import ListCounter from "./ListCounter.jsx";
import ListDefault from "./ListDefault.jsx";
import List from "./List.jsx";
import Card from "./Card.jsx";
import Input from "./Imput.jsx";

const Home = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  

  useEffect(() => {
    getList();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setList([...list, task]);
    setTask("");
  }
  console.log(task);
  console.log(list);

  function handleDelete(i) {
    const deleteTask = [...list];
    deleteinputValue.splice(i, 1);
    setList(deleteTask);
  }

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/carolinarb", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp)
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        if (resp.status === 404) throw Error ("Not Found");
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        setList(data)
    
      })
      .catch((error) => {
        //manejo de errores
        console.log(error.message);
      });
  };

  console.log(list)

   return (
     <Card>
       <Input handleSubmit={handleSubmit} task={task} setTask={setTask} />
       <List>
         {list.length > 0 ? (
           list.map((task, i) => {
             return (
               <ElementsList handleDelete={handleDelete} task={task} i={i} key={i} />
             );
           })
         ) : (
           <ListDefault />
         )}
         <ListCounter list={list} />
      </List>
    </Card>
  );
};

export default Home;
