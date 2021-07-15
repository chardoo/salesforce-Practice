public with sharing class CarControler {

        @AuraEnabled(cacheable=true)
        public static List<Car__c> getAllCars(){
            return [SELECT Id, Name, ChasisNumber__c, State__c, Price__c FROM Car__c ORDER BY ArrivalDate__c ];
        }
    
    
        public static List<Car__c> searchCar(String key){
            string searchword = key + '%';
            return [SELECT Id, Name, ChasisNumber__c, State__c, Price__c
                   FROM Car__c
                   WHERE Name LIKE : searchword OR ChasisNumber__c LIKE:searchword
                   ORDER BY ArrivalDate__c DESC NULLS LAST
                   LIMIT 100];
            
        }
        @AuraEnabled
        public static Car__c getCar(String searchId){
            List<Car__c> results = [
                SELECT Id, Name, ChasisNumber__c, State__c, Price__c
                FROM Car__c
                WHERE Id = :searchId
                ORDER BY ArrivalDate__c DESC NULLS LAST ];
            if (results != null && results.size() > 0 ){
                return results[0]; 
            }
                return null;
        }
    
      
        @AuraEnabled
       public static String addCar(String payload){
        Car payloader = (Car) JSON.deserialize(payload, Car.class);
        Car__c newcar =  new Car__c(
            Name =  payloader.name,
            ChasisNumber__c = payloader.chasis,
            State__c = payloader.state,
            Price__c = payloader.price,
            ArrivalDate__c = payloader.arrivalDate
        );
        insert newcar;
        return String.valueOf(newcar.Id);
       }
       
    //    @AuraEnabled
    //    public static void updateCar(String payload){
    //     Car payloader = (Car) JSON.deserialize(payload, Car.class);
    //     List<Car__c> result = [ SELECT Id, Name, State__c, Price__c FROM Car__c  WHERE Id = :payloader.Id];
    //     for(Car__c car: result){
    //         car.State__c = payloader.state;
    //     }
    
    //     update result;
    //    }
    
       class Car{
           @AuraEnabled
           public String chasis; 
           @AuraEnabled
           public String name;
           @AuraEnabled
           public String state;
           @AuraEnabled
           public Integer price;
           @AuraEnabled
           public Date arrivalDate;
       }
    
     
}
