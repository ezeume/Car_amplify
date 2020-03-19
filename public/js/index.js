// $(document).ready(function(){
//   $('.parallax').parallax();
// });

var id;
$.ajax({
  url: "/api/examples/",
  method: 'GET'
}).then(function (data1) {
  for (let i = 0; i < data1.length; i++) {
    var newOption = $('<option>').addClass('makeclass');
    newOption.text(data1[i].name)
    newOption.attr("value", data1[i].id)
    newOption.attr("name", data1[i].name)
    console.log(newOption)
    $('#make').append(newOption);
  }
  $('#make').change(function () {
    id = $('#make').val();
    console.log(id);
    $('#model').empty()
    $.ajax({
      url: '/api/examples/' + id,
      method: 'GET',
    }).then(function (data) {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        var newOption2 = $('<option>');
        newOption2.text(data[i].name)
        $('#model').append(newOption2)
      }
    });
  });
});

$("#date").text(moment().format("dddd, MMMM Do YYYY"));

$('#searchButton').on('click', function (event) {
  event.preventDefault();
  var year = document.getElementById('year').value;
  console.log("year", year)

  var make = $("#make")
  console.log("make", make)
  var model = document.getElementById('model').value;
  console.log("model", model)
  if (!make || !year || !model) {
    $(".errorMessage").removeClass("hide")
  } else {
    $(".errorMessage").addClass("hide")
    // var searchValue1 = '2018';
    // var searchValue2 = 'Ford';
    // var searchValue3 = 'Focus';
    var carQueryURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetCanadianVehicleSpecifications/?Year=2018&Make=${make}&Model=${model}&units=US&format=json`;
    console.log(carQueryURL)
    $.ajax({
      url: carQueryURL,
      method: 'GET',
    }).then(function (data) {
      $(".carInfoDiv").empty()
      var arrayLength = data.Results.length
      let j = 1

      for (let i = 0; i < arrayLength; i++) {
        let itemId = j++
        var newVar = data.Results[i];

        var make = newVar.Specs[0].Value;
        var model = newVar.Specs[1].Value;
        var year = newVar.Specs[2].Value;
        var length = newVar.Specs[3].Value;
        var width = newVar.Specs[4].Value;
        var height = newVar.Specs[5].Value;
        var wheelbase = newVar.Specs[6].Value;
        var curbWeight = newVar.Specs[7].Value;
        var frontOverHang = newVar.Specs[13].Value;
        var backOverHang = newVar.Specs[14].Value;
        var frontTrackWidth = newVar.Specs[15].Value;
        var rearTrackWidth = newVar.Specs[16].Value;
        var weightDistribution = newVar.Specs[17].Value;

        // car info div
        var carInfo = $("<div>").addClass("carListItem");

        //Adding attributes to div 
        carInfo.attr("year", year);
        carInfo.attr("make", make);
        carInfo.attr("model", model);

        //Car Name div
        var carNameDiv = $("<h5>").addClass("carNameDiv")
        carNameDiv.text(itemId + ":  Make: " + make)

        //Car model + Year div 
        var carModelYearDiv = $("<div>").addClass("yearAndModelDiv")
        carModelYearDiv.text("Model: " + model + "   Yr: " + year)

        //Height Length Weight 
        var hLwdimensionsDiv = $("<div>").addClass("hLwdimensionsDiv")
        hLwdimensionsDiv.text("Height: " + parseFloat(height).toFixed(2) + " inches  ,  Length: " + parseFloat(length).toFixed(2) + "inches  ,  Width: " + parseFloat(width).toFixed(2) + " inches")

        //Wheelbase 
        var wheelbaseDiv = $("<div>").addClass("wheelbaseDiv")
        wheelbaseDiv.text("Wheelbase: " + parseFloat(wheelbase).toFixed(2) + " inches")

        //Car Weight
        var curbWeightDiv = $("<div>").addClass("curbWeightDiv")
        curbWeightDiv.text("Weight: " + parseFloat(curbWeight).toFixed(2) + " lbs")

        //Front Over Hang 
        var frontOverhangDiv = $("<div>").addClass("frontOverhangDiv")
        frontOverhangDiv.text("Front Over Hang: " + parseFloat(frontOverHang).toFixed(2) + " inches")

        //Back Over Hang
        var backOverhangDiv = $("<div>").addClass("backOverhangDiv")
        backOverhangDiv.text("Back Over Hang: " + parseFloat(backOverHang).toFixed(2) + " inches")

        //Front Track width 
        var frontTrackWidthDiv = $("<div>").addClass("frontTrackWidthDiv")
        frontTrackWidthDiv.text("Front Track Width " + parseFloat(frontTrackWidth).toFixed(2) + " inches")

        //Back Track Width
        var backTrackWidthDiv = $("<div>").addClass("backTrackWidthDiv")
        backTrackWidthDiv.text("Back Track Width: " + parseFloat(rearTrackWidth).toFixed(2) + " inches")

        //weight distribution 
        var weightDistributionDiv = $("<div>").addClass("weightDistributionDiv")
        weightDistributionDiv.text("Weight Distribution: " + weightDistribution)

        //appending info to the page 
        carInfo.append(carNameDiv, carModelYearDiv, hLwdimensionsDiv, wheelbaseDiv, curbWeightDiv, frontOverhangDiv, backOverhangDiv, frontTrackWidthDiv, weightDistributionDiv)
        $(".carInfoDiv").append(carInfo)
      };

      // previous search list items
      var previousSearchLi = $("<li>").addClass("previousSearchLi")
      var previousSearchDiv = $("<div>").addClass("previousSearchDiv")
      previousSearchDiv.text("Year: " + year + " Make: " + make + " Model: " + model)

      var redoBtn = $("<button>").addClass("redoButton")
      redoBtn.text("redo")

      previousSearchLi.attr("year", year);
      previousSearchLi.attr("make", make);
      previousSearchLi.attr("model", model);

      previousSearchLi.append(previousSearchDiv, redoBtn)
      $(".previousSearchesList").append(previousSearchLi)
    });
  }
});

$('#resetBtn').on('click', function (event) {
  event.preventDefault();
  $(".carInfoDiv").empty();
  $(".previousSearchesList").empty()
  $(".year").val("");
  $(".make").val("");
  $(".model").val("");
})

$(document).on('click', ".redoButton", function (event) {
  event.preventDefault();
  var year = document.getElementById('year').value;
  console.log("year", year)

  var make = $("#make")
  console.log("make", make)
  var model = document.getElementById('model').value;
  console.log("model", model)
  if (!make || !year || !model) {
    $(".errorMessage").removeClass("hide")
  } else {
    $(".errorMessage").addClass("hide")
    // var searchValue1 = '2018';
    // var searchValue2 = 'Ford';
    // var searchValue3 = 'Focus';
    var carQueryURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetCanadianVehicleSpecifications/?Year=2018&Make=${make}&Model=${model}&units=US&format=json`;
    console.log(carQueryURL)
    $.ajax({
      url: carQueryURL,
      method: 'GET',
    }).then(function (data) {
      $(".carInfoDiv").empty()
      var arrayLength = data.Results.length
      let j = 1

      for (let i = 0; i < arrayLength; i++) {
        let itemId = j++
        var newVar = data.Results[i];

        var make = newVar.Specs[0].Value;
        var model = newVar.Specs[1].Value;
        var year = newVar.Specs[2].Value;
        var length = newVar.Specs[3].Value;
        var width = newVar.Specs[4].Value;
        var height = newVar.Specs[5].Value;
        var wheelbase = newVar.Specs[6].Value;
        var curbWeight = newVar.Specs[7].Value;
        var frontOverHang = newVar.Specs[13].Value;
        var backOverHang = newVar.Specs[14].Value;
        var frontTrackWidth = newVar.Specs[15].Value;
        var rearTrackWidth = newVar.Specs[16].Value;
        var weightDistribution = newVar.Specs[17].Value;

        // car info div
        var carInfo = $("<div>").addClass("carListItem");

        //Adding attributes to div 
        carInfo.attr("year", year);
        carInfo.attr("make", make);
        carInfo.attr("model", model);

        //Car Name div
        var carNameDiv = $("<h5>").addClass("carNameDiv")
        carNameDiv.text(itemId + ":  Make: " + make)

        //Car model + Year div 
        var carModelYearDiv = $("<div>").addClass("yearAndModelDiv")
        carModelYearDiv.text("Model: " + model + "   Yr: " + year)

        //Height Length Weight 
        var hLwdimensionsDiv = $("<div>").addClass("hLwdimensionsDiv")
        hLwdimensionsDiv.text("Height: " + parseFloat(height).toFixed(2) + " inches  ,  Length: " + parseFloat(length).toFixed(2) + "inches  ,  Width: " + parseFloat(width).toFixed(2) + " inches")

        //Wheelbase 
        var wheelbaseDiv = $("<div>").addClass("wheelbaseDiv")
        wheelbaseDiv.text("Wheelbase: " + parseFloat(wheelbase).toFixed(2) + " inches")

        //Car Weight
        var curbWeightDiv = $("<div>").addClass("curbWeightDiv")
        curbWeightDiv.text("Weight: " + parseFloat(curbWeight).toFixed(2) + " lbs")

        //Front Over Hang 
        var frontOverhangDiv = $("<div>").addClass("frontOverhangDiv")
        frontOverhangDiv.text("Front Over Hang: " + parseFloat(frontOverHang).toFixed(2) + " inches")

        //Back Over Hang
        var backOverhangDiv = $("<div>").addClass("backOverhangDiv")
        backOverhangDiv.text("Back Over Hang: " + parseFloat(backOverHang).toFixed(2) + " inches")

        //Front Track width 
        var frontTrackWidthDiv = $("<div>").addClass("frontTrackWidthDiv")
        frontTrackWidthDiv.text("Front Track Width " + parseFloat(frontTrackWidth).toFixed(2) + " inches")

        //Back Track Width
        var backTrackWidthDiv = $("<div>").addClass("backTrackWidthDiv")
        backTrackWidthDiv.text("Back Track Width: " + parseFloat(rearTrackWidth).toFixed(2) + " inches")

        //weight distribution 
        var weightDistributionDiv = $("<div>").addClass("weightDistributionDiv")
        weightDistributionDiv.text("Weight Distribution: " + weightDistribution)

        //appending info to the page 
        carInfo.append(carNameDiv, carModelYearDiv, hLwdimensionsDiv, wheelbaseDiv, curbWeightDiv, frontOverhangDiv, backOverhangDiv, frontTrackWidthDiv, weightDistributionDiv)
        $(".carInfoDiv").append(carInfo)
      };

      // previous search list items
      var previousSearchLi = $("<li>").addClass("previousSearchLi")
      var previousSearchDiv = $("<div>").addClass("previousSearchDiv")
      previousSearchDiv.text("Year: " + year + " Make: " + make + " Model: " + model)

      var redoBtn = $("<button>").addClass("redoButton")
      redoBtn.text("redo")

      previousSearchLi.attr("year", year);
      previousSearchLi.attr("make", make);
      previousSearchLi.attr("model", model);

      previousSearchLi.append(previousSearchDiv, redoBtn)
      $(".previousSearchesList").append(previousSearchLi)
    });
  }
});