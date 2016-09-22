/*http://plnkr.co/edit/3AfFfo?p=preview*/

/*var myapp in angular is a - namespace*/
/*Adding ngRoute dependency*/
/*Including appController controller inside the module*/
/*Creating a controller to handle registration*/
var myApp = angular.module('myApp', ['firebase','ngAnimate']);

myApp.controller('formController', ['$scope',function($scope){
}]);/*end controller: formController*/

/*Controller to read Firebase data*/
myApp.controller('firebaseController',['$scope','$firebase',function($scope, $firebase){
    /*Setup Angular JS model*/
    angular.extend($scope,{
        items: [],
        name:'',
        date:'',
        comment:'',
        id:0
    });/*model*/


    //var ref = new Firebase('https://prathikshawedding.firebaseio.com/chatbox');
    var ref = new Firebase('https://sumitwedding.firebaseio.com/chatbox');
    var chats = $firebase(ref);
    var syncObject = chats.$asObject();
    console.log(syncObject);

    //create a descending order of of list
    function sortDescending(list){
        return list.sort().reverse();
    }

    // synchronize the object with a three-way data binding
    syncObject.$bindTo($scope, "chats");

    $scope.addComment = function(){
        // console.log($scope.myname);
        chats.setWithPriority({
            name: $scope.myname,
            date: Firebase.ServerValue.TIMESTAMP,
            comment: $scope.comment,
            like:0
        },Firebase.ServerValue.TIMESTAMP).then(function(){
            $scope.thankYou = "Thank You for posting !!";
            $scope.myname = ' ';
            $scope.comment = ' ';
            $scope.myForm.$invalid = true;
        });
    }/*end function:addMeeting*/

    $scope.updateLike = function(key){
        /*Retrieve the record*/
        var likevalue = syncObject[key].like;
        /*console.log(likevalue);*/
        /*Update the record*/
        chats.$update(key,{
            like: likevalue+1
        });
    }/*end function:updateLike*/

    $scope.displayDate = function(value){
        var myDate = new Date(value);
        var formatedTime=myDate.toDateString();
        return formatedTime;
    }

    //console.log($scope.chats);
}]);/*End controller: firebaseController*/