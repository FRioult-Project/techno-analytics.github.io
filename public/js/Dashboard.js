queue()
	.defer(d3.json, "/api/technos")
	.await(makeGraphs);

function makeGraphs(error, apiData) {

//Start Transformations
	var dataSet = apiData;
	var dateFormat = d3.time.format("%m/%d/%Y");
	/*dataSet.forEach(function(d) {
		d.created_at = dateFormat.parse(d.created_at);
		d.created_at.setDate(1);
	});*/

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var datePosted = ndx.dimension(function(d) { return d.created_at; });
	var techno = ndx.dimension(function(d) { return d.techno; });
	var subscribers_count = ndx.dimension(function(d) { return d.subscribers_count; });
	/*var fundingStatus = ndx.dimension(function(d) { return d.funding_status; });
	var povertyLevel = ndx.dimension(function(d) { return d.poverty_level; });
	var state = ndx.dimension(function(d) { return d.techno; });
	var totalDonations  = ndx.dimension(function(d) { return d.total_donations; });
*/

	//Calculate metrics
	var projectsByDate = datePosted.group();
	var projectsByGrade = techno.group();
	/*var projectsByResourceType = resourceType.group();
	var projectsByFundingStatus = fundingStatus.group();
	var projectsByPovertyLevel = povertyLevel.group();
	var stateGroup = state.group();
*/
	var all = ndx.groupAll();

	//Calculate Groups
	var totalSubscribers = techno.group().reduceSum(function(d) {
		return d.subscribers_count;
	});
/*
	var totalDonationsGrade = gradeLevel.group().reduceSum(function(d) {
		return d.grade_level;
	});

	var totalDonationsFundingStatus = fundingStatus.group().reduceSum(function(d) {
		return d.funding_status;
	});



	var netTotalDonations = ndx.groupAll().reduceSum(function(d) {return d.total_donations;});
*/
	//Define threshold values for data
	var minDate = subscribers_count.bottom(1)[0].subscribers_count;
	var maxDate = subscribers_count.top(1)[0].subscribers_count;

	console.log(minDate);
	console.log(maxDate);

	//Charts
	var dateChart = dc.lineChart("#date-chart");
	var gradeLevelChart = dc.rowChart("#grade-chart");
	var resourceTypeChart = dc.rowChart("#resource-chart");
	var fundingStatusChart = dc.pieChart("#funding-chart");
	var povertyLevelChart = dc.rowChart("#poverty-chart");
	var totalProjects = dc.numberDisplay("#total-projects");
	var netDonations = dc.numberDisplay("#net-donations");
	var stateDonations = dc.barChart("#state-donations");


	selectField = dc.selectMenu('#menuselect')
		.dimension(techno)
		.group(totalSubscribers);

	dc.dataCount("#row-selection")
		.dimension(ndx)
		.group(all);


	/*totalProjects
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(all);

	netDonations
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(netTotalDonations)
		.formatNumber(d3.format(".3s"));
*/
	dateChart
		//.width(600)
		.height(220)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(techno)
		.group(projectsByGrade)
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.xAxisLabel("Year")
		.yAxis().ticks(6);

	resourceTypeChart
		//.width(300)
		.height(220)
		.dimension(techno)
		.group(projectsByGrade)
		.elasticX(true)
		.xAxis().ticks(5);

	povertyLevelChart
		//.width(300)
		.height(220)
		.dimension(techno)
		.group(projectsByGrade)
		.xAxis().ticks(4);

	gradeLevelChart
		//.width(300)
		.height(220)
		.dimension(techno)
		.group(projectsByGrade)
		.xAxis().ticks(4);


	fundingStatusChart
		.height(220)
		//.width(350)
		.radius(90)
		.innerRadius(40)
		.transitionDuration(1000)
		.dimension(techno)
		.group(projectsByGrade);


	stateDonations
		//.width(800)
		.height(220)
		.transitionDuration(1000)
		.dimension(techno)
		.group(projectsByGrade)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.centerBar(false)
		.gap(5)
		.elasticY(true)
		.x(d3.scale.ordinal().domain(techno))
		.xUnits(dc.units.ordinal)
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.ordering(function(d){return d.value;})
		.yAxis().tickFormat(d3.format("s"));






	dc.renderAll();

};