import React, { useState, useEffect } from "react";
import "./index.css";
import CreateTaskPopup from "../components/modals/createTasks";
import Card from "../components/card/card";
import db from "../localBase";

const Ui = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    db.collection("tasks")
      .get()
      .then((task) => setTaskList(task));

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    db.collection("tasks").doc({ id: index }).delete();
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    db.collection("tasks")
      .doc({ id: index })
      .set(
        obj)
      .then((response) => {
        console.log("Update successful, now do something.");
      })
      .catch((error) => {
        console.log("There was an error, do something else.");
      });
    setTaskList(tempList);
    window.location.reload();
  };

  const toogle = () => {
    setModal(!modal);
  };
  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    console.log("object is ", taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    db.collection("tasks").add(taskObj);
    setTaskList(taskList);
    setModal(false);
  };

  return (
    <>
      <div className="header text-center">
        <h3> Todo List </h3>
        <button className="btn btn-primary " onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((obj, index, key) => (
            <Card
              key={key}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
      </div>
      <CreateTaskPopup toggle={toogle} modal={modal} save={saveTask} />
    </>
  );
};

export default Ui;
