//On load, initialize page
$(function() {
  showLoading();
  //console.log('ready');
  getStatusJSON();

  var statusObj = {};
  var currentStatus = 0
  var lastStatus = 0
    //Stop looking at my JS. I know its bad. I wrote it mostly while very intoxicated.

  function displayStatus(status) {
    showLoading();
    $('#pic').one("load", function() {
      hideLoading();
    }).attr('src', ("https://s3.amazonaws.com/pistatus/" + status['image']));
    //Change picture
    $('#pic').attr('src', ("https://s3.amazonaws.com/pistatus/" + status['image']));
    //delete previous status
    $('#status').remove();
    //create holder div for this status
    $('#statusContainer').append("<div id='status'></div>");
    //for each key in new status create a new div and populate
    for (var metric in status) {
      $('#status').append("<div id='" + metric + "'></div>");
      $('#' + metric).text(metric + ": " + status[metric]);
    }
    //hideLoading();
  }

  function hideLoading() {
    $("#load").hide();
    $("#main").show();
  }

  function showLoading() {
    $("#load").show();
    $("#main").hide();
  }

  function getStatusJSON() {
    $.ajax({
      crossDomain: true,
      url: "https://s3.amazonaws.com/pistatus/data.json",
      success: function(result) {
        //cache the whole json blob so we dont have to make another request
        statusObj = JSON.parse(result);
        //set status to newest status
        currentStatus = Object.keys(statusObj).length;
        lastStatus = currentStatus;
        //console.log("number of statuses: " + currentStatus);
        //display most recent status
        displayStatus(statusObj[currentStatus]);
      }
    });
  }

  function nextStatus() {
    //dont go over current status
    if (currentStatus + 1 < lastStatus) {
      displayStatus(statusObj[currentStatus + 1]);
      currentStatus += 1;
    } else {
      console.log('out of index fam.');
    }
  }

  function prevStatus() {
    //dont out of bounds
    if (currentStatus - 1 > 0) {
      displayStatus(statusObj[currentStatus - 1]);
      currentStatus -= 1;
    } else {
      console.log('no negatives fam');
    }

  }

  function latestStatus() {
    displayStatus(statusObj[lastStatus]);
    currentStatus = lastStatus;
  }

  function firstStatus() {
    displayStatus(statusObj['1'])
    currentStatus = 1
  }

  function randStatus() {
    index = Math.floor((Math.random() * lastStatus) + 1);
    displayStatus(statusObj[index]);
    currentStatus = index;
  }


  $("#First").click(function() {
    console.log('first');
    firstStatus();
  });

  $("#Back").click(function() {
    console.log('back');
    prevStatus();
  });

  $("#Rand").click(function() {
    console.log('rand');
    randStatus();
  });

  $("#Latest").click(function() {
    console.log('last');
    latestStatus();
  });

  $("#Next").click(function() {
    console.log('next');
    nextStatus();
  });




})