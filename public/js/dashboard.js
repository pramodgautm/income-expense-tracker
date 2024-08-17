$(document).ready(function() {
    // Fetch user data
    fetchUserData();

    function fetchUserData() {
        $.ajax({
            url: '/api/dashboard',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(data) {
                $('#totalIncome').text('$' + data.totalIncome);
                $('#totalExpenses').text('$' + data.totalExpenses);
                $('#netBalance').text('$' + data.netBalance);

                let transactions = data.transactions;
                let transactionTableBody = $('#transactionTableBody');
                transactionTableBody.empty();

                transactions.forEach(transaction => {
                    let row = `<tr>
                        <td>${transaction.date}</td>
                        <td>${transaction.category}</td>
                        <td>${transaction.description}</td>
                        <td>${transaction.amount}</td>
                    </tr>`;
                    transactionTableBody.append(row);
                });
            },
            error: function(error) {
                console.log(error);
                alert('Failed to fetch user data.');
            }
        });
    }
});
