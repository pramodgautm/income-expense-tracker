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

$("#budgetForm").on("submit", function (e) {
  e.preventDefault();

  const month = $("month-budget").val();
  const budgetCategory = $("#category-budget").val();
  const budget = $("#amount-budget").val();
  const notes = $("#notes-budget").val();

  $.ajax({
    url: "/api/auth/addBudget",
    method: "POST",
    data: { month, budgetCategory, budget, notes },
    success: function (data) {
      window.location.href = "budget.html";
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
