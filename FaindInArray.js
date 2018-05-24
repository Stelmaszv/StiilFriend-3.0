var FaindInArray = function FaindInArray(id,array){
    var Faind=false;
    for (var i = 0; i < array.length; i++) {
        if(id==array[i].sendID){
                Faind=true;
        }
    }
    return Faind;
}
module.exports=FaindInArray;