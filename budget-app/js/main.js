" use strict ";

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    persentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');



startBtn.addEventListener('click', function () {
  expensesBtn.removeAttribute('disabled');
  optionalExpensesBtn .removeAttribute('disabled');
  
  time = prompt("Введите дату в формате YYYY-MM-DD", "2022-04-19");
  money = +prompt("Ваш бюджет на месяц?", "");
  
  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?", "");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();
});


expensesBtn.addEventListener('click', function () {
  countBtn.removeAttribute('disabled');
  let sum = 0;

  for (let i = 0; i < expensesItem.length; i++) {
    let spending = expensesItem[i].value;
    let price = expensesItem[++i].value;

    if (
      typeof spending === "string" &&
      typeof spending != null &&
      typeof price != null &&
      spending != "" &&
      price != "" &&
      spending.length < 50
    ) {
      console.log("done!");
      appData.expenses[spending] = price;
      sum += +price;
    } else {
      i = i - 1;
    }
  }
  expensesValue.textContent = sum;
  
  
  
});


optionalExpensesBtn.addEventListener('click', function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let opt = optionalExpensesItem[i].value;

    if (typeof opt != null && opt != "") {
      console.log("done!");
      appData.optionalExpenses[i] = opt;
      optionalExpensesValue.textContent += appData.optionalExpenses[i] + ', ';
    } else {
      alert("Вы ввели не те данные, попробуйте снова!");
    }
  }
});

countBtn.addEventListener('click', function () {
  let compulsory = +expensesValue.textContent;
  if (appData.budget != undefined) {
  let dayBudget = appData.moneyPerDay = ((appData.budget - compulsory) / 30).toFixed();
  dayBudgetValue.textContent = dayBudget;
   if (appData.moneyPerDay < 100) {
      levelValue.textContent = "Минимальный уровень достатка";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = "Средний уровень достатка";
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = "Высокий уровень достатка";
    } else {
      levelValue.textContent = "Произошла ошибка!";
    }
  } else {
    dayBudgetValue.textContent = "Произошла ошибка!";
  }
});


checkSavings.addEventListener('click', function () {
  if (checkSavings.checked) { 
    sumValue.removeAttribute('readonly');
    persentValue.removeAttribute('readonly');
} else {
    sumValue.setAttribute('readonly','readonly');
    persentValue.setAttribute('readonly','readonly');
}
});

checkSavings.addEventListener('click', function () {
  if (appData.savings == true) { 
    appData.savings = false;
} else {
  appData.savings = true;
}
});

sumValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = + sumValue.value;
    let persent = + persentValue.value;

        appData.monthIncome = (sum / 100 / 12) * persent;
        appData.yearIncome = (sum / 100) * persent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

persentValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = + sumValue.value;
    let persent = + persentValue.value;

        appData.monthIncome = (sum / 100 / 12) * persent;
        appData.yearIncome = (sum / 100) * persent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

incomeItem.addEventListener('input', function () {
  let items = incomeItem.value;
  appData.income = items.split(', ');
  incomeValue.textContent = appData.income;
});



let appData = {
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};
