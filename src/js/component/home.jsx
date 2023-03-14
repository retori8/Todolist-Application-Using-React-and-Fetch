import React, { useEffect, useState } from "react";
import ElementsList from "./ElementsList.jsx";
import ListCounter from "./ListCounter.jsx";
import ListDefault from "./ListDefault.jsx";
import List from "./List.jsx";
import Card from "./Card.jsx";
import Input from "./Imput.jsx";
import ButtonClearAll from "./ButtonClearAll.jsx";

const Home = () => {
  const [task, setTask] = useState({ label: text, done: false });
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    task.label = text;
    let newlist = [...list, task];
    setList(newlist);
    addTaskList(newlist);
    setText("");
  }

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
      console.log("tarea guardada");
      console.log(data);
      if (data.id) {
        getList();
      }
    } catch (error) {
      console.log(error);
    }
  };

    function handleDelete(i) {
    const deleteTask = [...list];
    deleteTask.splice(i, 1);
    setList(deleteTask);
    updateTaskList(list);
  }

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
      console.log("update");
      console.log(data);
      if (data.id) {
        setList((prevState) => prevState.filter((list) => list.id !== id));
        getList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/carorb", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 404) throw Error("Not Found");
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        if (data.msg) {
          createList();
        } else {
          setList(data);
        }
        console.log(data, "ESTA ES LA DATA");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
        getList([]);
        setError(null);
      } else {
        setError("Error al eliminar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const createList = async (task) => {
  //     const options = {
  //         method: 'POST',
  //         body: JSON.stringify(task),
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     }
  //     try {
  //         const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/carorb")
  //         const data = await response.json();
  //         console.log("Note Saved");
  //         console.log(data, "esta es la data");
  //         if(data.id){
  //           getList()
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  console.log(list);

  return (
    <Card>
      <Input handleSubmit={handleSubmit} text={text} setText={setText} />
      <ButtonClearAll deleteAll={deleteAll} list={list}/>
      <List>
        {list.length > 0 ? (
          list.map((task, i) => {
            return (
              <ElementsList
                handleDelete={handleDelete}
                task={task}
                i={i.task}
                key={i}
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
