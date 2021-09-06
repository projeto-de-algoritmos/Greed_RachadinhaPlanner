export function knapsack(departments, limit) {
    var departsList = departments.sort((a, b) => {
        return (b.value / b.weight) - (a.value / a.weight)
    });
    var earnings = 0;
    var limitRemainder = limit;
    var orderedList = [];

    for (var i in departsList) {
        orderedList.push({ 
            department: departsList[i], 
            amount: Math.min(limitRemainder, departsList[i].weight) 
        });

        earnings += Math.min(limitRemainder, departsList[i].weight) * (departsList[i].value / departsList[i].weight);

        limitRemainder -= Math.min(limitRemainder, departsList[i].weight);
    }

    return { 
        orderedDepartsList: orderedList, 
        totalEarnings: parseFloat(earnings.toFixed(2)),
    };
}
