var StartControlers = angular.module("MainPage", ["Notification","Translate","Url"]);
StartControlers.controller("chat",['$scope','$http','Componets','TimeConvert','Socket',function($scope,$http,Componets,TimeConvert,Socket){
      let HideChat=document.querySelector('.HideChat')
      $scope.HideChat=function(){
          $(".ChatStyle").animate({right:-200},function(){
                     $(".showChatIconHide").animate({right:10});       
          });
          showChatIconHide= document.querySelector('.showChatIconHide')
          showChatIconHide.addEventListener('click',function(){
              $(".showChatIconHide").animate({right:-100},function(){
                    $(".ChatStyle").animate({right:0});          
              });    
          })
      }

      
      $scope.SendMessages=function(){
        sent()
      }
      var sent = function(){
        content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam maiores ad odio, temporibus quo dolore nobis pariatur blanditiis nam eos maxime ratione at. A ratione magnam, voluptate, autem distinctio quia.';
        address=[{"id":$scope.user.UserID},{"id":2}]
        membersMormal=$scope.user.UserID+' 2'
        memberINsttring=JSON.stringify(address);
        DataSent={
            "address":memberINsttring,
            "content":content,
            "sendID":$scope.user.UserID,
            "time":TimeConvert.CreateTime(),
            "MemberInCoversationnormal":membersMormal    
        }
        Socket.emit('InsertMessage',DataSent,$scope.user)
    }
}]);
StartControlers.controller("ProfilRight",['$scope','$http','Componets',function($scope,$http,Componets){
    Componets.loadMainCompnent();
    if(window.innerWidth>1024){
        $scope.filrtLImit='normal'
    }else{
        $scope.filrtLImit='small'
    }
}]);