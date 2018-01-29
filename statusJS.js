var api = "192.168.0.13"





function loadHome(argument) {
  // body...
}
/*
$.ajax({
  dataType: "json",
  url: api,
  data: data,
  success: success
});
*/

function displayStatus(status) {
  console.log('displayStatus');
  console.log(status);
  $('#pic').attr('src', status['image']);
  $('#status').text(status['status']);
}

function hideLoading() {
  $("#load").hide();
  console.log('1')
}

function showLoading() {

}





test = {

  image: "https://s3.amazonaws.com/pistatus/1.2018-01-25.01.59.14.png",
  status: "Weight: 212.2"

}

$(function() {
  console.log('ready');
  hideLoading();
  displayStatus(test);
})