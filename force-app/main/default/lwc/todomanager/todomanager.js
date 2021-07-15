import { LightningElement , track} from 'lwc';
import addTodo from '@salesforce/apex/toDocontroller.addTodo'
export default class Todomanager extends LightningElement {
    

   @track time = '8:12'
   @track greeting  = 'Good morning'
   @track todos = []
    connectedCallback(){
        this.getTime()
        setInterval( ()=>{
           this.getTime()
          
        }, 1000)
    }
    
    getTime(){
        const date = new Date();
        const hr = date.getHours()
        const min = date.getMinutes ()
        
        this.time = `${this.getHr(hr)} :${this.getDoubleDigit(min)} ${this.getMidDay(hr)}`;
        this.getGreeting(hr)
    }


    getHr(hour){
        return hour===0?12:hour>12?(hour-12):hour
    }


    getMidDay(hour){
        return hour>=12 ? "PM":"AM"
    }


    getDoubleDigit(digit){
         return digit<10 ? "0"+digit:digit     
    }


    getGreeting(hour){
        if(hour<12){
            this.greeting =" Good morning"
        }
        else if(hour>=12 && hour<17){
            this.greeting ="Good afternoon"
        }
        else 
        {
            this.greeting='Good Night'
         }
    }

    addTodoHandler(){
        const inputbox = this.template.querySelector('lightning-input')
          
        const todoobject = {
            todoId :Math.random() * 2.5,
            todoName:inputbox.value,
            done:true,
        }
        this.todos.push(todoobject);
        addTodo({payload : JSON.stringify(todoobject)})
        .then(response =>{
            console.log('todo item added');
        })
        .catch(error =>{
            console.log("something went wrong" + error);
        })
        inputbox.value = ""
    }


    get  upcommingTask(){
        return this.todos && this.todos.length ? this.todos.filter(todo=> !todo.done):[]
    }
     get  completedTask(){
        return this.todos && this.todos.length? this.todos.filter(todo=> todo.done):[]
    }


    deletehandler(id){
         
    }


}