import { LightningElement ,track} from 'lwc';
import addCar from '@salesforce/apex/CarControler.addCar';
import getAllCars from '@salesforce/apex/CarControler.getAllCars';
export default class CreateCarForm extends LightningElement {
@track chasis;
@track carName;
@track carPrice; 
@track status;
@track arrivalDate;
    inputChasis(event){
        this.chasis = event.target.value;
     }
     inputCarName(event){
        this.carName = event.target.value;
     }
     inputPrice (event){
        this.carPrice = event.target.value;
     }
     inputStatus(event){
        this.status = event.target.value;
     }
     inputarrivalDate(event){
      this.arrivalDate =  event.target.value;
     }

    empthyfield(){
        this.carName ="";
        this.chasis ="";
        this.status = "";
        this.carPrice ="";
        this.arrivalDate ="";
    }

    addNewCar(){
        const newCar = {
            name:this.carName,
            chasis:this.chasis, 
            state:this.status, 
            price:this.carPrice ,
            arrivalDate: this.arrivalDate
        }
        addCar({payload:JSON.stringify(newCar)})
        // getAllCars()
        .then(response =>{
            console.log("succefully inserted ", response);
            this.empthyfield();
            
        })
        .catch(error =>{
            console.log('something went wrong ' + error);
        })
        console.log(this.chasis,this.carName,this.carPrice,this.status, this.arrivalDate);
    }

}