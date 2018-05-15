var MainServis = angular.module("MainServis", ["Notification","url","Helpers"]);
MainServis.service( 'Messages' , [ 'Sesion','$filter',function(Sesion,$filter) {
    this.IdUser=Sesion.Tokken.UserID
    this.countNotReeded= function(array){
        var count=0
            for (i = 0; i < array.length; i++) { 
                for (i2 = 0; i2 < array[i].MessageStan.length; i2++) {
                    if(array[i].MessageStan[i2].UserID==this.IdUser && array[i].MessageStan[i2].reeded==false){
                        count++;
                    }
                }
            }
        return count;
        
    }
    this.MarkAsReeded =function(array,type){
        if(type){
            for (i = 0; i < array.length; i++) { 
                for (i2 = 0; i2 < array[i].MessageStan.length; i2++) {
                    if(array[i].MessageStan[i2].UserID==this.IdUser){
                      if(!array[i].MessageStan[i2].reeded){
                        array[i].MessageStan[i2].reeded=true;
                      }
                    }
                }
            }
        }else{
            for (i = 0; i < array.length; i++) { 
                if(!array[i].reeded){
                    array[i].reeded=true;
                }
            }
        }
        return array
    }
    this.SetMessages=function(array){
        for (i = 0; i < array.length; i++) { 
           if(typeof(array[i].MessageStan)=='string'){
               MessageStan = JSON.parse(array[i].MessageStan)
               array[i].MessageStan=MessageStan;
           }
           for (i2 = 0; i2 < array[i].MessageStan.length; i2++) {
               if(array[i].MessageStan[i2].UserID==this.IdUser){
                   if(!array[i].MessageStan[i2].reeded){
                       array[i].reeded=false; 
                   }else{
                       array[i].reeded=true; 
                   }
               }
               if(array[i].sendID==this.IdUser){
                   var item=RoundAvatar(array[i].MessageStan)
    
                   array[i].loginShow=item.login;
                   array[i].avatarShow=item.avatar;
               }else{
                   photo=$filter('filtrPhoto')(array[i].avatar,'user',array[i].sex);
                   array[i].loginShow=array[i].login;
                   array[i].avatarShow=photo;
               }
           }
        }
        return array;
    }
    function RoundAvatar(array){
       return array[1]
    }
}]);