var app = angular.module('routeAppControllers');
app.controller('analyticsController', ['$scope','$http','$localStorage','$state','$stateParams', function($scope,$http, $localStorage,$state,$stateParams){

    $scope.techno = $stateParams.techno;
    $scope.frm = $stateParams.frmw;
    var title = $scope.techno+$scope.frm;
    ($localStorage[title])?makeGraphs(null,JSON.parse($localStorage[title])):
    queue()
        .defer(d3.json, '/api/contrs/'+ $scope.techno+"/"+$scope.frm)
        .await(makeGraphs);

    $scope.prev=function(){
        $state.go("home");
    }

    function makeGraphs(error, apiData) {
        $localStorage[title]=JSON.stringify(apiData);
        //Start Transformations
        var dateFormat = d3.time.format("%Y-%m-%d");

        var dataSet=[];
        apiData.forEach(function(d){
            d.weeks.forEach(function(w){
                var aux={};
                aux.author= d.author.login;
                aux.w= dateFormat.parse(dateFormat(new Date(1000 * w.w)));
                aux.c= w.c;
                dataSet.push(aux);
            });
        });

        //Create a Crossfilter instance
        var ndx = crossfilter(dataSet);
        //Define Dimensions
        var author = ndx.dimension(function (d) {
            return d.author;
        });

        var date = ndx.dimension(function (d) {
            return d.w;
        });

        //Calculate metrics
        var totalCommitByAuthor = author.group().reduceSum(function (d) {
            return d.c;
        });

        var commitsByDate=date.group().reduceSum(function(d){
            return d.c;
        });

        var all = ndx.groupAll();

        var minDate = date.bottom(1)[0].w;
        var maxDate = date.top(1)[0].w;

        console.log(minDate);
        console.log(maxDate);

        var dateChart = dc.lineChart("#visualisation");
        var povertyLevelChart = dc.rowChart("#vis");
        dc.dataCount("#row-selection")
            .dimension(ndx)
            .group(all);

        dateChart
            //.width(600)
            .height(220)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(date)
            .group(commitsByDate)
            .renderArea(true)
            .transitionDuration(800)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .elasticY(true)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .xAxisLabel("Year")
            .yAxis().ticks(6);

        povertyLevelChart
            //.width(300)
            .height(2000)
            .dimension(author)
            .group(totalCommitByAuthor)
            .ordering(function(d) { return -d.value })
            .xAxis().ticks(4);


        dc.renderAll();

    };

}]);
