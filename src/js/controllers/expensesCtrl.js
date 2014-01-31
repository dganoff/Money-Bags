app.controller('ExpensesCtrl', ['$scope', function($scope) {
	$scope.saveExpenses = function() {
		localStorage["budget.income"] = $scope.income;

		localStorage["budget.expenses"] = JSON.stringify($scope.expenses);

		localStorage["budget.oneTimeExpenses"] = JSON.stringify($scope.oneTimeExpenses);
	};

	$scope.expenses = localStorage["budget.expenses"] ? JSON.parse(localStorage["budget.expenses"]) : [];

	$scope.income = localStorage["budget.income"] ? parseInt(localStorage["budget.income"]) : 0;

	$scope.addExpense = function() {
		$scope.expenses.push({
			name: $scope.expenseName,
			amount: $scope.expenseAmount
		});

		$scope.saveExpenses();

		$scope.expenseName = undefined;
		$scope.expenseAmount = undefined;
	};

	$scope.deleteExpense = function(idx) {
		var index = $scope.expenses.indexOf(idx);
	    if (index != -1) {
	        $scope.expenses.splice(index, 1);
	    }

	    $scope.saveExpenses();
	}

	$scope.filter = "amount";

	$scope.changeFilter = function(e) {
		if ($scope.filter == e) {
			$scope.filter = "-"+e;
		} else {
			$scope.filter = e;
		}
	};

	$scope.total = function(month) {
		var sum = 0;
	    for (var i = 0, v; v = $scope.expenses[i]; i++) {
	     	sum += +v.amount;
	    }

	    for (var x =0; x < $scope.oneTimeExpenses.length; x++) {
			if ($scope.oneTimeExpenses[x].month == month) {
				sum += $scope.oneTimeExpenses[x].amount;
			}
		}

	    return sum;
	};

	$scope.oneTimeExpenses = localStorage["budget.oneTimeExpenses"] ? JSON.parse(localStorage["budget.oneTimeExpenses"]) : [];

	$scope.addOneTimeExpense = function() {
		$scope.oneTimeExpenses.push({
			name: $scope.oneTimeExpenseName,
			amount: $scope.oneTimeExpenseAmount,
			month: $scope.oneTimeExpenseMonth
		});

		$scope.saveExpenses();

		$scope.oneTimeExpenseName = undefined;
		$scope.oneTimeExpenseAmount = undefined;
		$scope.oneTimeExpenseMonth = undefined;
	};

	$scope.deleteOneTimeExpense = function(idx) {
		var index = $scope.oneTimeExpenses.indexOf(idx);
	    if (index != -1) {
	        $scope.oneTimeExpenses.splice(index, 1);
	    }

	    $scope.saveExpenses();
	}

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
		getMonthNet: function(month) {
			// console.log('running function: getMonthNet');
			var net = $scope.income - $scope.total(month);
			return net;
		},
		getMonthNetClass: function(month) {
			// console.log('running function: getMonthNetClass');
			var className;
			if ($scope.year.getMonthNet(month) > 0) {
				className = 'green';
			} else if ($scope.year.getMonthNet(month) < 0) {className = 'red';}
			return className;
		},
		getYearlySavings: function() {
			// console.log('running function: getYearlySavings');
			var total = 0;
			for (var i = 0; i < $scope.year.months.length; i++) {
				total += $scope.year.getMonthNet($scope.year.months[i]);
			}
			return total;
		}
	};
}]);