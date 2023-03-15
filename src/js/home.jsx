import React, { useEffect, useState } from "react";
import ElementsList from "./component/ElementsList.jsx";
import ListCounter from "./component/ListCounter.jsx";
import ListDefault from "./component/ListDefault.jsx";
import List from "./component/List.jsx";
import Card from "./component/Card.jsx";
import Input from "./component/Imput.jsx";
import ButtonClearAll from "./component/ButtonClearAll.jsx";

const Home = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    initList();
  }, []);

  async function initList() {
    let get = await getList();
    if (get == false) {
      await createList();
      await getList();
    }
  };

  const getList = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/carorb",
        options
      );

      if (response.status == 200) {
        const respuesta = await response.json();
        setList(respuesta);
        return respuesta;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const createList = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(options);
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/carorb",
        options
      );
      const data = await response.json();
      console.log("Note Saved");
      console.log(data, "esta es la data");
      if (data.id) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    let task = { label: "", done: false };
    task.label = text;
    let newlist = [...list, task];
    setList(newlist);
    addTaskList(newlist);
    setText("");
    console.log(newlist, "este es el newlist");
  };

  const addTaskList = async (task) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/carorb",
        options
      );
      const data = await response.json();
      if (data.id) {
        getList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskList = async (task) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/carorb",
        options
      );
      const data = await response.json();
      if (data.id) {
        getList();
        setList((prevState) => prevState.filter((list) => list.id !== id));
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleDelete(i) {
    const deleteTask = [...list];
    deleteTask.splice(i, 1);
    setList(deleteTask);
    updateTaskList(deleteTask);
  }

  const deleteAll = async () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/carorb",
        options
      );
      if (response.status == 200) {
        console.log("k");
        setList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Input handleSubmit={handleSubmit} text={text} setText={setText} />
      <ButtonClearAll deleteAll={deleteAll} />
      <List>
        {list.length > 0 ? (
          list.map((task, i) => {
            return (
              <ElementsList
                handleDelete={handleDelete}
                task={task}
                i={i}
              />
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
