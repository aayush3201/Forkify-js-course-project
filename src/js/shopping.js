import uniqid from 'uniqid';
export default class Shopping{
    constructor(count,unit,description){
        this.uid = uniqid();
        this.count = count;
        this.unit = unit;
        this.description = description
    }
    
}