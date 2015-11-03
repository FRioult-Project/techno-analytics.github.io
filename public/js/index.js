var app = angular.module('routeAppControllers', ['nvd3ChartDirectives','ngStorage']);
app.controller('SalesController', ['$scope','$rootScope','$http','$state','$localStorage',
    function($scope,$rootScope, $http,$state,$localStorage){
    var i = 0,
        margin = {top: 20, right: 0, bottom: 0, left: 380},
        w = 500,
        h = 380 - margin.top - margin.bottom,
        nodeRadius,
        colors = ["#bd0026", "#fd8d3c", "#f03b20", "#B02D5D",
            "#9B2C67", "#982B9A", "#692DA7", "#5725AA", "#4823AF",
            "#d7b5d8", "#dd1c77", "#5A0C7A", "#5A0C7A"];

    var tree = d3.layout.tree().size([h, w]);;
    var circles={};
    var paths={};
    var labels={};

    var toolTip = d3.select(document.getElementById("toolTip"));
    var header = d3.select(document.getElementById("head"));
    var header1 = d3.select(document.getElementById("header1"));
    var header2 = d3.select(document.getElementById("header2"));

    var fedSpend = d3.select(document.getElementById("fedSpend"));

    var stateSpend = d3.select(document.getElementById("stateSpend"));

    var localSpend = d3.select(document.getElementById("localSpend"));
    var federalTip = d3.select(document.getElementById("federalTip"));
    var stateTip = d3.select(document.getElementById("stateTip"));
    var localTip = d3.select(document.getElementById("localTip"));

    var fedSpend = d3.select(document.getElementById("fedSpend"));

    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.y, d.x];
        });

    var svg = d3.select("#body").append("svg")
        .attr("width", w + margin.right + margin.left)
        .attr("height", h-100)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    d3.json("data/data.json", function (root) {
        $http.get('/api/technos')
            .success(function(data) {
                var client = data.filter(function(a){
                    return (a.side == 'Client Side');
                });
                var sinatra = data.filter(function(a){
                    return (a.side == 'Server Side' && a.subtype=="Sinatra-like");
                });
                var rails = data.filter(function(a){
                    return (a.side == 'Server Side' && a.subtype=="Rails-like");
                });
                root.children[0].children=client;
                root.children[1].children[0].children=sinatra;
                root.children[1].children[1].children=rails;
                root.x0 = 0;
                root.y0=h/2;
                $scope.root=root;
                $rootScope.pieData=root.children[0].children;
                $rootScope.pieData2=root.children[1].children[0].children;
                $rootScope.pieData3=root.children[1].children[1].children;
                toggleNodes(root.children[0]);
                toggleNodes(root.children[1]);
                toggleNodes(root.children[1]._children[0])
                toggleNodes(root.children[1]._children[1])
                update($scope.root);
            })
            .error(function(error) {
            });
    });

    function update(source) {

        var duration = d3.event && d3.event.altKey ? 5000 : 500;

        var nodes = tree.nodes($scope.root).reverse();
        var depthCounter = 0;

        nodeRadius = d3.scale.sqrt()
            .domain([0, 50])
            .range([1, 40]);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 180;
            d.numChildren = (d.children) ? d.children.length : 0;
            if (d.depth == 1) {
                d.linkColor = colors[(depthCounter % (colors.length - 1))];
                depthCounter++;
            }
            if (d.numChildren == 0 && d._children) d.numChildren = d._children.length;

        });

        //Set link colors based on parent color
        nodes.forEach(function (d) {
            var obj = d;
            while ((obj.source && obj.source.depth > 1) || obj.depth > 1) {
                obj = (obj.source) ? obj.source.parent : obj.parent;
            }
            d.linkColor = (obj.source) ? obj.source.linkColor : obj.linkColor;

        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("id",function (d) { return "node_" + d.id })
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", function (d) {
                toggleNodes(d);
                update(d);
                if (d.numChildren ==0) {
                    $state.go('analytics',{"techno": d.techno,"frmw": d.techno=="Node.js"?d.name:""});

                }else if (d.numChildren>0) {
                    var seen = [];
                    $localStorage.data = JSON.stringify(d.children?d.children:d._children, function(key, val) {
                        if (typeof val == "object") {
                            if (seen.indexOf(val) >= 0)
                                return
                            seen.push(val)
                        }
                        return val
                    })

                    $state.go('home.details',{"side": d.name});
                }

            });

        nodeEnter.append("svg:circle")
            .attr("r", 1e-6)
            .on("mouseover", function (d) {
                if(d.numChildren==0)
                node_onMouseOver(d);
            })
            .on("mouseout", function (d) {if(d.numChildren==0) node_onMouseOut(d)})
            .style("fill", function (d) {
                circles[d.id] = this;
                return d.source ? d.source.linkColor : d.linkColor;
            })
            .style("fill-opacity", ".8")
            .style("stroke", function (d) {
                return d.source ? d.source.linkColor : d.linkColor;
            });

        /*nodeEnter.append("svg:image")
         .attr("xlink:href", function (d) {
         return d.icon;
         })
         .attr("x", "-16px")
         .attr("y", "-15px")
         .attr("width", "30px")
         .attr("height", "30px")
         .attr("class", function(d){
         return d.parent?"children"+ d.parent.id : "";
         })
         .on("mouseover", function (d) {
         node_onMouseOver(d);
         })
         .on("mouseout", function (d) { node_onMouseOut(d)})
         */

        nodeEnter.append("svg:text")
            .attr("x", function (d) {
                labels[d.id] = this;
                return d.children || d._children ? -15 : 15;
            })
            .attr("dy", ".35em")
            .attr("text-anchor",
            function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", "0")
            .style("font-size","12")
            .on("mouseover", function (d) {
                if(d.numChildren==0){
                    node_onMouseOver(d);
                }
            })
            .on("mouseout", function (d) {if(d.numChildren==0) node_onMouseOut(d)});

        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", function (d) { return (d.numChildren==0)? nodeRadius(2): nodeRadius(d.depth); })
            .style("fill", function (d) { return d.source ? d.source.linkColor : d.linkColor })
            .style("fill-opacity", function (d) { return ((d.depth + 1) / 5);});

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle").attr("r", 1e-6);

        nodeExit.select("text").style("fill-opacity", 1e-6);

        var link = svg.selectAll("path.link")
            .data(tree.links(nodes), function (d) {
                return d.target.id;
            });

        var rootCounter = 0;

        // Enter any new links at the parent's previous position.
        link.enter().insert("svg:path", "g")
            .attr("class", "link")
            .attr("id",function (d) { return "link_" + d.target.id })
            .attr("d", function (d) {
                paths[d.target.id] = this;
                if (Number(d.target.numChildren) > 0) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                }
                else {
                    null;
                }
            })
            .style("stroke", function (d, i) {
                if (d.source.depth == 0) {
                    rootCounter++;
                    return (d.source.children[rootCounter - 1].linkColor);
                }
                else {
                    return (d.source) ? d.source.linkColor : d.linkColor;
                }
            })
            .style("stroke-width", function (d, i) {
                return (1/nodeRadius(d.target.depth))*180; })
            .style("stroke-opacity", function (d) { return (d.target.depth) / 4.5; })
            .style("stroke-linecap", "round")
            .on("mouseover", function (d) {if(d.numChildren==0) node_onMouseOver(d.source);})
            .on("mouseout", function (d) {if(d.numChildren==0) node_onMouseOut(d.source)});

        link.transition()
            .duration(duration)
            .attr("d", diagonal)
            .style("stroke-width", function (d, i) {
                return (1/nodeRadius(d.target.depth))*180; })
            .style("stroke-opacity", function (d) { return (d.target.depth) / 4.5; });

        link.exit().transition()
            .duration(duration)
            .attr("d", diagonal)
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });


        function node_onMouseOver(d) {

            if (typeof d.target != "undefined") {
                d = d.target;
            }

            toolTip.transition()
                .duration(200)
                .style("opacity", ".9");
            header.text(d.name);
            header1.text(d.description? d.description:"");
            header2.text(d.created_at? "created at : "+d.created_at.split("T")[0]:"")
            fedSpend.text(d.stargazers_count);
            stateSpend.text(d.forks_count);

            localSpend.text(d.watchers_count);

            toolTip.style("left", (d3.event.pageX + 18) + "px")
                .style("top", (d3.event.pageY+28) + "px");

            d3.select(labels[d.id]).transition().style("font-weight","bold").style("font-size","16");;
            d3.select(circles[d.id]).transition().style("fill-opacity",0.6);
            highlightPath(d);

            function highlightPath(d) {
                if (d) {
                    d3.select(paths[d.id]).style("stroke-opacity",function (d) {return d.target.depth <= 0 ? .1 + .3 : ((d.source.depth + 1) / 4.5) + .3;});
                    highlightPath(d.parent);
                }
            }



        }

        function node_onMouseOut(d) {
            toolTip.transition()
                .duration(500)
                .style("opacity", "0");

            d3.select(labels[d.id]).transition().style("font-weight","normal").style("font-size","12");
            d3.select(circles[d.id]).transition().style("fill-opacity",0.3);
            noHighlightPath(d);

            function noHighlightPath(d) {
                if (d) {
                    d3.select(paths[d.id]).style("stroke-opacity",function (d) {return d.target.depth <= 0 ? .1 : ((d.source.depth + 1) / 4.5);});
                    noHighlightPath(d.parent);
                }
            }
        }


    }



    function toggleNodes(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
    }

}]);

app.directive('PieChart', function($parse, $window){
   return{
      restrict:'EA',
      template:"<svg width='850' height='200'></svg>",
       link: function(scope, elem, attrs){
           scope.$watch('pieData', function (apiData) {
                   //cache.set('contrs_ember', apiData);
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



           });

       }
   };

});
