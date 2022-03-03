import React ,{useState,useEffect} from "react";
import "./index.css";
import CreateTaskPopup from '../components/modals/createTasks'
import Card from "../components/card/card";

const Ui = () => {
    const [modal,setModal]=useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toogle =()=>{
        setModal(!modal);
    }
    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

  return (
      <>
    <div className="header text-center">
      <h3> Todo List </h3>
      <button className="btn btn-primary " onClick={()=> setModal(true)}>Create Task</button>
    </div>
    <div className="task-container">
    {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
    </div> 
    <CreateTaskPopup toggle={toogle} modal={modal} save={saveTask} />

      </>
  );
};
  
export default Ui;
