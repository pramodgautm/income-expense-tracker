$("#loginForm").on("submit", function (e) {
  e.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  $.ajax({
    url: "http://localhost:3000/api/auth/login",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email, password }),
    success: function (data) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    },
    error: function (error) {
      alert("Login failed");
    },
  });
});

$("#registerForm").on("submit", function (e) {
  e.preventDefault();

  const username = $("#username").val();
  const email = $("#email").val();
  const password = $("#password").val();

  $.ajax({
    url: "/api/auth/register",
    method: "POST",
    data: { username, email, password },
    success: function (data) {
      window.location.href = "login.html";
    },
    error: function (error) {
      alert("Registration failed");
    },
  });
});

$("#addTransaction").on("submit", function (e) {
  e.preventDefault();

  const date = $("#date").val();
  const amount = $("#amount").val();
  const category = $("#category").val();
  const description = $("#description").val();

  $.ajax({
    url: "/api/auth/addTransaction",
    method: "POST",
    data: { date, amount, category, description },
    success: function (data) {
      window.location.href = "add-transaction.html";
    },
    error: function (error) {
      alert("Registration failed");
    },
  });
});

$(document).ready(function () {
  let reportPage = $("#reportPage");
  if (reportPage.length) {
    getBudgetReport();
  }
});

function getBudgetReport() {
  $.ajax({
    url: "/api/auth/dashboard",
    method: "GET",
    datatype: "json",
    // data: ,
    success: function (data) {
      createBudgetReportHtml(data.incomeResult);
      createTransactionReportHtml(data.transactionResult);
    },
    error: function (error) {
      alert("Registration failed");
    },
  });
}

function createBudgetReportHtml(data) {
  let report = "";
  console.log(data);
  data.forEach((row) => {
    report += `
    <tr>
      <td>N/A</td>

      <td>${row.category_name}</td>
      <td>$ ${row.totalbudget}</td>
      <td>$ ${row.totalexpenses}</td>
    </tr>
    `;
  });

  $("#expeseSummaryTbody").append(report);
  console.log("prepared report: ", report);
}

function createTransactionReportHtml(data) {
  let report = "";
  console.log(data);
  data.forEach((row) => {
    report += `
    <tr>
      <td>${row.tran_date}</td>
      <td>${row.category_name}</td>
      <td>$ ${row.tran_amount}</td>
      <td>${row.tran_desc}</td>

    </tr>
    `;
  });

  $("#transactionTbody").append(report);
  console.log("prepared report: ", report);
}

$("#addExpenses").on("submit", function (e) {
  e.preventDefault();

  const formData = $("#addExpenses").serialize();

  $.ajax({
    url: "/api/auth/addExpenses",
    method: "POST",
    datatype: "json",
    data: formData,
    success: function (data) {
      alert("success");
      // clearform()
      // window.location.href = "add-transaction.html";
    },
    error: function (error) {
      alert("Registration failed");
    },
  });
});

$("#budgetForm").on("submit", function (e) {
  e.preventDefault();

  let formdata = $("#budgetForm").serialize();

  $.ajax({
    url: "/api/auth/addBudget",
    method: "POST",
    dataType: "json",
    data: formdata,
    success: function (response) {
      //  dont refesh page
      // window.location.href = "budget.html";
      // reset form
      console.log(response);
    },
    error: function (error) {
      alert("Budget Adding failed");
    },
  });
});

$("#goals-form").on("submit", function (e) {
  e.preventDefault();

  const goalName = $("#goal-name").val();
  const goalAmount = $("#goal-amount").val();
  const goalDate = $("#goal-date").val();
  const goalCategory = $("#goal-category").val();
  const goalNotes = $("#goal-notes").val();

  $.ajax({
    url: "/api/auth/addGoal",
    method: "POST",
    data: { goalName, goalAmount, goalDate, goalCategory, goalNotes },
    success: function (data) {
      window.location.href = "add-transaction.html";
    },
    error: function (error) {
      alert("Registration failed");
    },
  });
});
