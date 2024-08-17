function getBudgetDetailFunction() {
  $("#openDialogBtn").trigger("click");


  // get data from the api
  // $.ajax({
  //   url: "/api/auth/getBudgetStatus",
  //   method: "GET",
  //   dataType : "json",
  //   data: formdata,
  //   success: function (response) {
  //     if(response.status) {
  //       // open popup model here.
  // and feed the data to the model
  //     }

  //   },
  //   error: function (error) {
  //     alert("Budget Adding failed");
  //   },
  // });
}

// misc dialog scripts.
// Get the dialog
var dialog = document.getElementById("myDialog");

// Get the button that opens the dialog
var btn = document.getElementById("openDialogBtn");

// Get the <span> element that closes the dialog
var span = document.querySelector(".close-btn");

// When the user clicks the button, open the dialog
btn.onclick = function () {
  dialog.showModal();
};

// When the user clicks on <span> (x), close the dialog
span.onclick = function () {
  dialog.close();
};

// When the user clicks anywhere outside of the dialog, close it
// window.onclick = function (event) {
//   if (event.target == dialog) {
//     dialog.close();
//   }
// };
