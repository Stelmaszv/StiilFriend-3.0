var Notification = angular.module("Notification", ["Helpers","url"]);
Notification.service( 'Errors' , ['Array',function(Array) {
    this.Switch = function (array) {
        var ValueReturn= false;
        angular.forEach( array ,function( item , key ){
            if(array[key].value==true){
                ValueReturn= true;
            }
        });
        return ValueReturn;
    };
    this.ResetErors = function(array){
        angular.forEach( array ,function( item , key ){
            if(array[key].value==true){
                array[key].value=false
            }
        });
        return array;
    }
    this.GetError= function(array,Field){
        arraylist=Array.Find(array,Field,'Name');
        return arraylist;
    }
}]);
Notification.service( 'Forms' ,[function($http,Errors,Forms) {
    this.Empty = function (ArrayCheck,ArrayToSet) {
        var ValueReturn= false
        angular.forEach( ArrayCheck ,function( item , key ){
            if(ArrayCheck[key].required){
                if(EmptyCheck(ArrayCheck[key].value)){
                    ValueReturn= true;
                }
            }
        });
        return ArrayToSet[0].value=ValueReturn;
    };
    this.ConvertToSent = function(array){
        newArray=[];
        angular.forEach( array,function( item , key ){
            if(array[key].DBrow){
                newArray.push({value:array[key].value,name:array[key].DBrow})
            }
        });
        return newArray;
    }
    this.PasswordMatch = function(password,passwardMatched){
        if(password==passwardMatched){
            return true;
        }
    }
    this.PasswordStrength = function(pass){
        function scorePassword(pass) {
            var score = 0;
            if (!pass)
                return score;

            // award every unique letter until 5 repetitions
            var letters = new Object();
            for (var i=0; i<pass.length; i++) {
                letters[pass[i]] = (letters[pass[i]] || 0) + 1;
                score += 5.0 / letters[pass[i]];
            }

            // bonus points for mixing it up
            var variations = {
                digits: /\d/.test(pass),
                lower: /[a-z]/.test(pass),
                upper: /[A-Z]/.test(pass),
                nonWords: /\W/.test(pass),
            }

            variationCount = 0;
            for (var check in variations) {
                variationCount += (variations[check] == true) ? 1 : 0;
            }
            score += (variationCount - 1) * 10;

            return parseInt(score);
            
        }
        var score = scorePassword(pass);
        Stan=''
        if(score <= 30){
             Stan= "bad"
        }
        if(score > 30){
            Stan= "week"
        }
        if(score > 60){
            Stan= "good";
        }
        if(score > 80){
            Stan= "strong";
        }   
        return Stan
    }
    this.EmptyCheck = function(value){
        return EmptyCheck(value);
    }
    this.email = function(value){
         var re = /\S+@\S+\.\S+/;
         ReturnValue=re.test(value);
         return ReturnValue;
    }
    this.LoginAvailable= function(login){
        $http.get( '/LoginAvailable/'+login+'/').then( function( loging ){
            console.log(loging)
        });
    }
    this.EmptyFields = function(form){
        var EmptyFieldsArray=[];
        angular.forEach( form ,function( item , key ){
            if(form[key].required){
                if(EmptyCheck(form[key].value)){
                    EmptyFieldsArray.push(form[key].name)
                }
            }
        });
        return EmptyFieldsArray;
    }
    function EmptyCheck(value){
        if(value=='' || value==undefined){
            return true;
        }
    }
}]);  