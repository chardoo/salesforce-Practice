public with sharing class toDocontroller {
  
    @AuraEnabled  
    public static String addTodo(String payload){
     Todo payloader = (Todo) JSON.deserialize(payload, Todo.class);
    
     ToDo__c newTodo = new Todo__c(
        Name = payloader.todoName,
        Done__c =payloader.done
     );    
     insert newTodo;
     return String.valueOf(newTodo.Id);
    

  }


class Todo{
    @AuraEnabled
   public String todoId;
    @AuraEnabled
   public String todoName;
   @AuraEnabled
   public Date todoDate;
   @AuraEnabled
   public Boolean done;

}


}
