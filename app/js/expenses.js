function ExpensesCtrl($scope) {
	$scope.expenses = [
		{name: "Food", amount: 1000},
		{name: "Internet", amount: 150},
		{name: "Mortgage", amount: 1500}
	];

	$scope.income = undefined;

	$scope.addExpense = function() {
		$scope.expenses.push({
			name: $scope.expenseName,
			amount: $scope.expenseAmount
		});

		$scope.expenseName = '';
		$scope.expenseAmount = '';
	};

	$scope.deleteExpense = function(idx) {
		console.log(idx);
		var index = $scope.expenses.indexOf(idx);
	    if (index != -1) {
	        $scope.expenses.splice(index, 1);
	    }
	}

	$scope.filter = "amount";

	$scope.changeFilter = function(e) {
		if ($scope.filter == e) {
			$scope.filter = "-"+e;
		} else {
			$scope.filter = e;
		}
	};

	$scope.total = function() {
		var sum = 0;
	    for (var i = 0, v; v = $scope.expenses[i]; i++) {
	     	sum += +v.amount;
	    }
	    return sum;
	};

	$scope.year = {
		months: [
			'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
		],
		getMonthExpenses: function() {
			var monthExpenses = $scope.total()/$scope.year.months.length;
			return monthExpenses;
		},
		getMonthNet: function() {
			var net = $scope.income - $scope.total();
			return net;
		},
		getMonthNetClass: function() {
			var className;
			if ($scope.year.getMonthNet() > 0) {
				className = 'green';
			} else if ($scope.year.getMonthNet() < 0) {className = 'red';}
			return className;
		},
		getYearlySavings: function() {
			for (var i = 0; i < myStringArray.length; i++) {
			    alert(myStringArray[i]);
			    //Do something
			}
		}
	};
}