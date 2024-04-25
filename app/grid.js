import TodoList from "./showForm.js";


const Row=()=>{
    return(
        <div className="container">
            <div className="header">
                <h1>Todo List</h1>
            </div>
            <div className="box1">
                <TodoList />

            </div>
        </div>

    );
};
export default Row;