const msg = document.getElementById('message');
var app = angular.module('webchat', []);

app.controller('myCtrl', function($scope) {
    $scope.data = []; //接收-消息队列
    $scope.name = '';
    $scope.content = '';
    $scope.personnum = 0;
    $scope.personlist = [];
    $scope.flag = false;
    const socket_url = 'http://localhost';
    var pl = angular.element(document.getElementById('person_list'));

    var socket = io(socket_url);
    socket.on('news', (data) => {
        ($scope.data).push(data);
        $scope.$apply();
        msg.scrollTop = msg.scrollHeight;
    });

    socket.on('history', (data) => {
        for(var x in data){
            ($scope.data).push(data[x]);
        }
        ($scope.data).push({data:'----------以上是历史消息-----------'});
        $scope.$apply();
        msg.scrollTop = msg.scrollHeight;
    });

    socket.on('updatePerson', (data) => {
        $scope.personlist = data;
        $scope.$apply();
    });

    $scope.sendMsg = (data = $scope.content)=>{
        var date = new Date();
        if (!$scope.flag){
            $scope.flag = true;
            socket.emit('setUserName', $scope.name);
        }
        if ($scope.content!='')
            socket.emit('sendMsg', data);
        $scope.content='';
    };

    $scope.enter = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.sendMsg();
        }
    };

    $scope.retract = function () {
        pl.removeClass('flipInX');
        pl.addClass('flipOutX');
    }

    $scope.spread = function () {
        pl.removeClass('flipOutX');
        pl.css({display:"block"});
        pl.addClass('flipInX');
    }
});
