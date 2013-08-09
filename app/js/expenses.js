function ExpensesCtrl($scope) {
	$scope.saveExpenses = function() {
		// localStorage["budget.income"] = $scope.income;
		localStorage["budget.income"] = undefined;
		console.log('Local storage: budget.income = ' + localStorage["budget.income"]);
	};

	$scope.expenses = [
		{name: "Food", amount: 1000},
		{name: "Internet", amount: 150},
		{name: "Mortgage", amount: 1500}
	];

	$scope.income = localStorage["budget.income"];

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
			// console.log('running function: getMonthExpenses');
			var monthExpenses = $scope.total()/$scope.year.months.length;
			return monthExpenses;
		},
		getMonthNet: function() {
			// console.log('running function: getMonthNet');
			var net = $scope.income - $scope.total();
			return net;
		},
		getMonthNetClass: function() {
			// console.log('running function: getMonthNetClass');
			var className;
			if ($scope.year.getMonthNet() > 0) {
				className = 'green';
			} else if ($scope.year.getMonthNet() < 0) {className = 'red';}
			return className;
		},
		getYearlySavings: function() {
			// console.log('running function: getYearlySavings');
			var total = $scope.year.getMonthNet() * $scope.year.months.length;
			// for (var i = 0; i < $scope.year.months.length; i++) {
			// }
			console.log(total);
			return total;
		}
	};
}