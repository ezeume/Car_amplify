$(document).ready(function () {
  $('.select').select();
});

//calling load ajax function
loadAjax()

var id;

//Nested ajax calla to populate make and model dropdowns 
$.ajax({
  url: "/api/examples/",
  method: 'GET'
}).then(function (data1) {
  for (let i = 0; i < data1.length; i++) {
    var newOption = $('<option>').addClass('makeclass');
    newOption.text(data1[i].name)
    newOption.attr("value", data1[i].id)
    newOption.attr("name", data1[i].name)
    $('#make').append(newOption);
  }
  $('#make').change(function () {
    id = $('#make').val();
    $('#model').empty()
    $.ajax({
      url: '/api/examples/' + id,
      method: 'GET',
    }).then(function (data) {
      for (let i = 0; i < data.length; i++) {
        var newOption2 = $('<option>');
        newOption2.text(data[i].name)
        $('#model').append(newOption2)
      }
    });
  });
});

//loads in previous searches 
function loadAjax() {
  $.ajax({
    url: "/api/searches",
    method: 'GET'
  }).then(function (data1) {
    for (let i = 0; i < data1.length; i++) {
      var previousSearchLi = $("<li>").addClass("previousSearchLi")
      var previousSearchDiv = $("<div>").addClass("previousSearchDiv")
      previousSearchDiv.text("Year: " + data1[i].year + " Make: " + data1[i].make + " Model: " + data1[i].model)
      // var redoBtn = $("<button>").addClass("redoButton")
      // redoBtn.text("redo")
      previousSearchLi.append(previousSearchDiv)
      $(".previousSearchesList").append(previousSearchLi)
    }
  });
}

//moment js to set the date 
$("#date").text(moment().format("dddd, MMMM Do YYYY"));

//On Click of search button execute api call
$('#searchButton').on('click', function (event) {
  event.preventDefault();
  var year = document.getElementById('year').value;
  var make = $("#make option:selected").text()
  var model = document.getElementById('model').value;

  var noWhiteSpaceMake = make.replace(" ", "")
  var noWhiteSpaceModel = model.replace(" ", "")
  
  //Validation for selecting criteria
  if (!make || !year || !model) {
    $(".errorMessage").removeClass("hide")
  } else {
    $(".errorMessage").addClass("hide")

    //ajax call for getting car model data 
    var carQueryURL = `https://vpic.nhtsa.dot.gov/api/vehicles/GetCanadianVehicleSpecifications/?Year=2018&Make=${noWhiteSpaceMake}&Model=${noWhiteSpaceModel}&units=US&format=json`;
    $.ajax({
      url: carQueryURL,
      method: 'GET',
    }).then(function (data) {
      $(".carInfoDiv").empty()
      var arrayLength = data.Results.length
      let j = 1

      //for loop to create car info div
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
        var frontTrackWidth = newVar.Specs[15].Value;
        var rearTrackWidth = newVar.Specs[16].Value;

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
        if (newVar.Specs[13].value = "undefined") {
          frontOverHang = "N/A"
          var frontOverhangDiv = $("<div>").addClass("frontOverhangDiv")
          frontOverhangDiv.text("Front Over Hang: " + frontOverHang)
        } else {
          var frontOverHang = newVar.Specs[13].Value;
          var frontOverhangDiv = $("<div>").addClass("frontOverhangDiv")
          frontOverhangDiv.text("Front Over Hang: " + parseFloat(frontOverHang).toFixed(2) + " inches")
        }

        // Back Over Hang
        if (newVar.Specs[14].value = "undefined") {
          backOverHang = "N/A"
          var backOverHangDiv = $("<div>").addClass("backOverHangDiv")
          backOverHangDiv.text("Back Over Hang: " + backOverHang)
        } else {
          var backOverHang = newVar.Specs[14].Value;
          var backOverHangDiv = $("<div>").addClass("backOverHangDiv")
          backOverHangDiv.text("Front Over Hang: " + parseFloat(backOverHang).toFixed(2) + " inches")
        }

        //Front Track width 
        var frontTrackWidthDiv = $("<div>").addClass("frontTrackWidthDiv")
        frontTrackWidthDiv.text("Front Track Width " + parseFloat(frontTrackWidth).toFixed(2) + " inches")

        //Back Track Width
        var backTrackWidthDiv = $("<div>").addClass("backTrackWidthDiv")
        backTrackWidthDiv.text("Back Track Width: " + parseFloat(rearTrackWidth).toFixed(2) + " inches")

        //weight distribution 
        if (newVar.Specs[17].value = "undefined") {
          weightDistribution = "N/A"
          var weightDistributionDiv = $("<div>").addClass("weightDistributionDiv")
          weightDistributionDiv.text("Weight Distribution: " + weightDistribution)
        } else {
          var weightDistribution = newVar.Specs[17].Value;
          var weightDistributionDiv = $("<div>").addClass("weightDistributionDiv")
          weightDistributionDiv.text("Weight Distribution " + parseFloat(weightDistribution).toFixed(2) + " inches")
        }

        //appending info to the page 
        carInfo.append(carNameDiv, carModelYearDiv, hLwdimensionsDiv, wheelbaseDiv, curbWeightDiv, frontOverhangDiv, backOverHangDiv, frontTrackWidthDiv, weightDistributionDiv)
        $(".carInfoDiv").append(carInfo)
      };

      // previous search list items
      var previousSearchLi = $("<li>").addClass("previousSearchLi")
      var previousSearchDiv = $("<div>").addClass("previousSearchDiv")
      previousSearchDiv.text("Year: " + year + " Make: " + make + " Model: " + model)

      previousSearchLi.attr("year", year);
      previousSearchLi.attr("make", make);
      previousSearchLi.attr("model", model);

      previousSearchLi.append(previousSearchDiv)
      $(".previousSearchesList").append(previousSearchLi)
    });

    //ajax call to send make model and year to backend
    $.ajax({
      url: "/api/examples",
      method: "POST",
      data: {
        make,
        model,
        year
      }
    }).then(function () {
      console.log('saved successful')
    })


    //Ajax call for getting car picture with bing api
    $(".carmakeimage").empty();
    picture = make + model + "20" + year
    const cors_anywhere = "https://cors-anywhere.herokuapp.com/"
    let otherKey = "9760a4c7d4d94a39b2ff9055fbe79c30";
    $.ajax({
      url: cors_anywhere + "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + picture,
      method: "GET",
      beforeSend: function (xhr) { xhr.setRequestHeader("Ocp-Apim-Subscription-Key", otherKey); }
    }).then((response) => {
      var imgSrc = response.value[0].thumbnailUrl
      let img = document.querySelector("img")
      img.setAttribute("src", imgSrc)
    })
  }
});

//Reset button clears selected items on click 
$('#resetBtn').on('click', function (event) {
  event.preventDefault();
  $(".carInfoDiv").empty();
  $(".previousSearchesList").empty()
  $("#year").val("");
  $("#make").val("");
  $("#model").val("");
  $.ajax({
    method: "DELETE",
    url: "/api/delete"
  })

})
