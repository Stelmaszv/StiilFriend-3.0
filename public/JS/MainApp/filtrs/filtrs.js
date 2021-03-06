var filtrs = angular.module('filtrs', ['Helpers']);
filtrs.filter('tektlengh', function (Sesion) {
    return function (tektlengh, limit) {
        return showtekst(tektlengh, limit);
    };

    function showtekst(tektlengh, limit) {
        if (tektlengh.length > limit) {
            var newtekst = tektlengh.substr(0, limit);
            var more = '...'
            return newtekst += more;
        } else {
            return tektlengh;
        }
    }
});
filtrs.filter('CheckIfReeded', function () {
    return function (array,user,mess) {
       var userID=user.UserID
       var count=0;
       all=array.AllMessages
       for (i = 0; i < all.length; i++) { 
           if(all[i].sendID==userID && all[i].UserId!=userID && all[i].reeded==0){
               count++;
           }
       }
       if(!count){
            return 'done'
       }else{
            return 'reply' 
       }
    }
});
filtrs.filter('timestampToDate', function () {
    return function (timestamp, type = false) {
        if (!type) {
            if (checkTime(timestamp)) {
                return normalData(timestamp)
            } else {
                return countdown(timestamp)
            }
        } else {
            switch (type) {
                case 'relation':
                    return relationData(timestamp);
                    break;
                case 'short':
                    if (checkTime(timestamp)) {
                        return normalData(timestamp, true)
                    } else {
                        return countdown(timestamp, true)
                    }
                    break;
                case 'chat':
                    return countdown(timestamp,'chat')
                break;
            }
        }

    };
    function relationData(time, short = false) {
        var data = new Date(time);
        year = data.getFullYear();
        mount = getmount(data.getMonth());
        return mount + ' ' + year;
    }
    function getmount(munts, short = false) {
        var mies = '';
        switch (munts) {
            case 0:
                if (!short) {
                    mies = 'Styczńa';
                } else {
                    mies = 'Sty';
                }
                break;
            case 1:
                if (!short) {
                    mies = 'lutego';
                } else {
                    mies = 'lut';
                }
                break;
            case 2:
                if (!short) {
                    mies = 'marca';
                } else {
                    mies = 'mar';
                }
                break;
            case 3:
                if (!short) {
                    mies = 'kwietnia';
                } else {
                    mies = 'kwi';
                }
                break;
            case 4:
                if (!short) {
                    mies = 'maja';
                } else {
                    mies = 'maj';
                }
                break;
            case 5:
                if (!short) {
                    mies = 'czerwca';
                } else {
                    mies = 'cze'
                }
                break;
            case 6:
                if (!short) {
                    mies = 'lipieca';
                } else {
                    mies = 'lip';
                }
                break;
            case 7:
                if (!short) {
                    mies = 'serpienia';
                } else {
                    mies = 'ser';
                }
                break;
            case 8:
                if (!short) {
                    mies = 'września';
                } else {
                    mies = 'wrz'
                }
                break;
            case 9:
                if (!short) {
                    mies = 'pazdernika';
                } else {
                    mies = 'paz'
                }
                break;
            case 10:
                if (!short) {
                    mies = 'listopada';
                } else {
                    mies = 'lis';
                }
                break;
            case 11:
                if (!short) {
                    mies = 'grudnia';
                } else {
                    mies = 'gru';
                }
                break;
        }
        return mies;
    }
    function countdown(time, short = false) {
        var today = new Date()
        var difference = Math.round(Date.parse(today) - Date.parse(time))
        minuts = Math.round(difference / (60000));
        hours = Math.round(minuts / 60);
        days = Math.round(hours / 24);
        if (minuts == 0) {
            if(short!='chat'){
                if (!short) {
                    return 'W tej chwili';
                } else {
                    return 'terez'
                }
            }else{
                return '1 min';
            }
        } else if (minuts > 0 && hours == 0) {
                if (!short) {
                    if (minuts == 1) {
                        return 'minutę temu';
                    } else {
                        return minuts + ' minut temu';
                    }
                } else {
                    return minuts + ' min'
                }
            
        } else if (hours > 0 && days == 0) {
            if (!short) {
                if (hours == 1) {
                    return 'godzinę temu';
                } else {
                    return hours + ' godzin temu';
                }
            } else {
                return hours + ' godz';
            }
        } else if (days > 0) {
            if (days == 1) {
                if(short!='chat'){
                    return 'wczoraj';
                }
            } else {
                if (days < 7) {
                    if(short!='chat'){
                        var d = new Date(time);
                        if (!short) {
                            return 'W ' + ReturnDay(d.getDay())
                        } else {
                            return ReturnDay(d.getDay(), true)
                        }
                    }else{
                        return days+' dni'
                    }
                } else {
                    if (!short) {
                        return days + ' dni temu';
                    } else {
                        return days + ' dni';
                    }
                }
            }

        }

    }
    function ReturnDay(day, short = false) {
        switch (day) {
            case 0:
                if (!short) {
                    DeyOffWeek = 'niedzielę'
                } else {
                    DeyOffWeek = 'niedz';
                }
                break;
            case 1:
                if (!short) {
                    DeyOffWeek = 'poniedziałek'
                } else {
                    DeyOffWeek = 'pon'
                }
                break;
            case 2:
                if (!short) {
                    DeyOffWeek = 'wtorek'
                } else {
                    DeyOffWeek = 'wtor'
                }
                break;
            case 3:
                if (!short) {
                    DeyOffWeek = 'środę'
                } else {
                    DeyOffWeek = 'śro'
                }
                break;
            case 4:
                if (!short) {
                    DeyOffWeek = 'czwartek'
                } else {
                    DeyOffWeek = 'czwa'
                }
                break;
            case 5:
                if (!short) {
                    DeyOffWeek = 'piątek'
                } else {
                    DeyOffWeek = 'pią'
                }
                break;
            case 6:
                if (!short) {
                    DeyOffWeek = 'sobotę'
                } else {
                    DeyOffWeek = 'sob'
                }
                break;
        }
        return DeyOffWeek
    }
    function checkTime(time) {
        var today = new Date()
        var difference = (Math.round((Date.parse(today) - Date.parse(time)) / (24 * 60 * 60 * 1000)) * 1)
        if (difference > 6) {
            return true;
        }

    }
    function normalData(time, short = false) {
        var date = new Date(time);
        date.getFullYear();
        date.getMonth();
        day = date.getDate();
        if (!short) {
            year = date.getFullYear()
            mount = getmount(date.getMonth());
            time = 'dnia ' + day + ' ' + mount + ' ' + year + ' roku';
        } else {
            year = '17'
            mount = getmount(date.getMonth(), true);
            time = day + ' ' + mount + ' ' + year;
        }
        return time;
    }
});
filtrs.filter('ToMuch',function(){
    return function (number,type){
        switch(type){
            case 'small':
                return small(number);
            break;
            case 'normal':
                return normal(number);
            break;
        }
    }           
    function normal(number){
            if(number>100){
                if(number>1000){
                    if(number>1000000){
                        if(number>1000000000){
                           count=Math.round(number/1000000000)
                            return count+'ML'
                        }else{   
                            count=Math.round(number/1000000)
                            return count+'m'
                        }
                    }else{
                        count=Math.round(number/1000);
                        return count+'k'
                    }
                }else{
                    return '99+';
                }
            }else{
                return number;
            }
    
    }
    function small(number){
        if(number>9){
            return '9+'
        }else{
            return number;
        }
    }
})
filtrs.filter('urlIcons', function () {
    return function (qg, Icon) {
        return IconArray(Icon);
    };
    function IconArray(Icon) {
        IconArrayList = {
            'Arrow'                   :'/icon/arrow.png', 
            'SelectSentPlace'         :'/icon/community.png', 
            'DashboardSend'           :'/icon/sendDashbord.png', 
            'ImageAdd'                :'/icon/imageAdd.png', 
            'DashboardPreview'        :'/icon/Dasbordpreview.png', 
            'DashboardMenu'           :'/icon/menu.png', 
            'Coment'                  :'/icon/coments.png',  
            'Conversation'            :'/icon/conversation.png',  
            'MultiChat'               :'/icon/GroupChat.png',
            'Loading'                 :'/icon/LoadingIcon.gif',
            'Add'                     :'/icon/add.png',
            'OnlineIcon'              :'/icon/OnlieIcon.png',
            'ArrowRight'              :'/icon/ArrowRight.png',
            'MessagesSend'            :'/icon/messagesend.png',
            'Close'                   :'/icon/closew.png',
            'Back'                    :'/icon/Back.png',
            'logout'                  :'/icon/logout.png',
            'Messages'                :'/icon/message.png',
            'MessagesNotReeded'       :'/icon/notreded.png',
            'Notification'            :'/icon/bell.png',
            'NotificationNotReeded'   :'/icon/notreedd.png',
            'Grup'                    :'/icon/grup.png',
            'Evant'                   :'/icon/evant.png',
            'Profil'                  :'/icon/user.png',
            'Chat'                    :'/icon/friendship.png',
            'SainAsReed'              : '/icon/mail.png',
            'Delete'                  : '/icon/trash.png',
            'Like'                    : '/icon/like.png',
            'Dislike'                 : '/icon/dislike.png',
            'notification'            : '/icon/notification.png'
        }
        return IconArrayList[Icon]
    }
});
filtrs.filter('Nodata', function () {
    return function (word,mes) {
        if (!word) {
            return mes;
        } else {
            return word;
        }
    };
});
filtrs.filter('filtrPhoto', function () {
    return function (URL, type, sex = false) {
        if (!URL) {
            if (type == 'user') {
                return ReturnURL(URL, type, sex)
            } else {
                return ReturnURL(URL, type)
            }
        } else {
            return URL
        }
    };

    function ReturnURL(URL, type, sex = false) {
        var NewURL = '';
        switch (type) {
            case 'Labery':
                NewURL = 'http://localhost/Stillfriend/public/icons/no_image.png';
            break;
            case 'grup':
                NewURL = 'http://localhost/Stillfriend/public/icons/Nogrup2.png';
            break;
            case 'evant':
                NewURL = 'http://localhost/Stillfriend/public/icons/evant.png';
            break;
            case 'user':
                if(sex=='F'){
                    NewURL = '/icon/nophoto-female.jpg';
                }else{
                    NewURL = '/icon/no_userMen.jpg';
                }
            break;
            default:
                NewURL='http://localhost/Stillfriend/public/icons/no_image.png'
        }
        return NewURL;
    }
});
filtrs.filter('sex', function () {
    return function (sex, word,expet=false) {
        return returnWord(word, sex,expet);
    };

    function returnWord(word, sex,expet) {
        if(!expet){
            if (sex == 'M') {
                word += 'ł';
            }else{
                word +='ła';
            }
        }else{
            switch(expet){
                case 'wziąc':
                    if (sex == 'M') {
                        return 'wziął';
                    }else{
                        return 'wzięła';
                    }
                break;
            }
        }
        return word;
    }
});
filtrs.filter('UsersToString', function (Sesion) {
    return function (array) {
        array=SesionOut(array)
        return ArrayToString(array)
    };
    function ArrayToString(ConvertArray){
        
        ToReturn='';
        angular.forEach(ConvertArray, function (array, key) {
                ToReturn+=array.login
                if(key==0){
                    if(ConvertArray.length==2){
                        ToReturn+=' i '
                    }else{
                        ToReturn+=' , '
                    }
                }else if(ConvertArray.length>2){
                    if(key!=ConvertArray.length){
                        ToReturn+=' , '
                    }
                }
        })
        
        return ToReturn;
    }
    function SesionOut(Sessionout){
        var newArray=[];
        Userid=Sesion.Tokken.UserID
        angular.forEach(Sessionout, function (array, key) {
            if(array.UserID!=Userid){
                newArray.push(array)
            }
        })
        return newArray;
    }


});
