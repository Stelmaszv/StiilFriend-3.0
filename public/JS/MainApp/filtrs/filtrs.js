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
    return function (array,user) {
        var userID=user.UserID
        var ValueToReturn=false;
        var count=0;
        var MembersOfConversation=array.length-1;
        for (i = 0; i < array.length; i++) { 
            if(array[i].UserID!=userID){
                if(array[i].reeded){
                    count++;
                }
            }
            
        }
        if(MembersOfConversation>1){
            if(count==MembersOfConversation){
                return 'done_all'
            }else if(count>1 && count<MembersOfConversation){
                return 'done' 
            }else if(count==0){
                 return 'reply' 
            }
        }else{
            if(count){
                return 'done'
            }else{
                return 'reply' 
            }
        }
    };
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
            if (!short) {
                return 'W tej chwili';
            } else {
                return 'terez'
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
                return 'wczoraj';
            } else {
                if (days < 7) {
                    var d = new Date(time);
                    if (!short) {
                        return 'W ' + ReturnDay(d.getDay())
                    } else {
                        return ReturnDay(d.getDay(), true)
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
        if(number>10){
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
            'SainAsReed' : '/icon/mail.png',
            'Delete'     : '/icon/trash.png'
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