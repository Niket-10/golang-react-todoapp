import React, {Component} from "react";
import axios from "axios";
import {Card, Header, Form, Input, Icon} from "semantic-ui-react";

let endpoint = "http://localhost:9000";

class ToDoList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            task:"",
            items:[],
        };
    }
    
    componentDidMount() {
        this.getTask();
    }


    onChange = (event) => { 
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const { task } = this.state;
        if (!task) {
          console.error("Task cannot be empty.");
          return;
        }
        axios
          .post(endpoint + "/api/tasks", {task})
          .then((response) => {
            console.log("Task created successfully.", response);
            this.getTask();
            this.setState({ task: "" });
          })
          .catch((error) => {
            console.error("Failed to create task.", error);
          });
      };

    getTask = () => {
        axios.get(endpoint + "/api/task").then((res)=>{
            if (res.data){
                this.setState({
                    items: res.data.map((item)=>{
                        let color = "yellow";
                        let style = {
                            wordWrap:"break-word",
                        };
                        if(item.status){
                            color="green";
                            style["textDecorationLine"] = "Line-through";
                        }
                        return(
                            <Card key={item._id} 
                            color={color} 
                            fluid 
                            className="rough">
                                <Card.Content>
                                    <Card.Header texAlign="left">
                                        <div style={style}>
                                            {item.task}
                                        </div>
                                    </Card.Header>

                                    <Card.Meta textAlign="right">

                                        <Icon name="check circle"
                                        color="blue"
                                        onClick={()=>this.doneTask(item._id)}
                                        />
                                        <span style={{paddingRight:10}}>Done
                                        </span>

                                        <Icon name="undo"
                                        color="yellow"
                                        onClick={()=>this.undoTask(item._id)}
                                        />
                                        <span style={{paddingRight:10}}>Undo
                                        </span>

                                        <Icon name="delete"
                                        color="red"
                                        onClick={()=>this.deleteTask(item._id)}
                                        />
                                        <span style={{paddingRight:10}}>Delete
                                        </span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    })
                });
            }
            else{
                this.setState({
                    items:[],
                });
            }
        });

    };


    doneTask = (taskId, newTask) => {
        axios
          .put(endpoint + "/api/tasks/" + taskId, { task: newTask })
          .then((response) => {
            console.log("Task updated successfully.", response);
            this.getTask();
          })
          .catch((error) => {
            console.error("Failed to update task.", error);
          });
      };


      undoTask = (taskId) => {
        axios
          .put(endpoint + "/api/undoTask/" + taskId )
          .then((response) => {
            console.log("Task undone successfully.", response);
            this.getTask();
          })
          .catch((error) => {
            console.error("Failed to undo task.", error);
          });
      };


    deleteTask = (taskId) => {
        axios
            .delete(endpoint + "/api/deleteTask/" + taskId)
            .then((response) => {
            console.log("Task deleted successfully.", response);
            this.getTask();
            })
            .catch((error) => {
            console.error("Failed to delete task.", error);
            });
        };

    render() {
        return(
            <div className="row">
                <div className="div1">
                    <Header className="mainHeader" as="h2" color="yellow">
                        Your To-Do List
                    </Header>
                </div>
                <div className="div2">
                    <Form onSubmit={this.onSubmit}>
                        <Input 
                        className="input"
                        type="text"
                        name="task"
                        onChange={this.onChange}
                        value={this.state.task}
                        fluid
                        placeholder="Create Task"
                        />
                        {/* <Button className="button">
                            Create Task
                        </Button> */}
                    </Form>
                </div>
                <div className="row">
                    <Card.Group>
                        {this.state.items}
                    </Card.Group>
                </div>
            </div>
        )
    }
}
export default ToDoList;



 // onSubmit = (e) => {
    //     e.preventDefault();
    //     let {task} = this.state
    //     if(task) {
    //         axios.post(endpoint + "/api/task" , {task,},
    //         {
    //             headers:{
    //                 "Content-Type":"application/x-www-form-urlencoded",
    //         },
    //     }).then((res) => {
    //             this.getTask();
    //             this.setState({ task:"",});
    //         });
    //     }
    // };
        // updateTask = (id) => {

    //     axios.put(endpoint + "/api/taskComplete" + id, {
    //         headers:{
    //             "Content-Type":"application/x-www-form-urlencoded",
    //         },
    //     }).then((res)=>{
    //         console.log(res);
    //         this.getTask();
    //     });

    // }

    // undoTask = (id) => {

    //     axios.put(endpoint + "api/undoTask" + id, {
    //         headers:{
    //             "Content-Type":"application/x-www-form-urlencoded",
    //         },
    //     }).then((res)=>{
    //         console.log(res);
    //         this.getTask();
    //     });

    // }

    // deleteTask = (id) => {

    //     axios.delete(endpoint +"api/deleteTask" + id , {
    //         headers:{
    //             "Content-Type":"application/x-www-form-urlencoded",
    //         },
    //     }).then((res)=>{
    //         console.log(res);
    //         this.getTask();
    //     });
    // };