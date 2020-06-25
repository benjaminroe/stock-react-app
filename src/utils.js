export function parseUploadedData(data) {
    let newArray = [];
    let index = 0;

    data.forEach(element => {
        if(index !== 0) {
            let struct = element.data;
            let changedStructure = {
                date: new Date(struct[0]),
                open: +struct[1],
                high: +struct[2],
                low: +struct[3],
                close: +struct[4],
                volume: +struct[5]
            }
            newArray.push(changedStructure);
        }
        index++;
    });

    newArray.sort((a, b) => {
        return a.date.valueOf() - b.date.valueOf();
    });

    return newArray;
}

export function formatJSONtoCSV(priceArray, volumeArray) {
    let newArray = [];
    let index = 0;

    priceArray.forEach(element => {
        let changedStructure = {
            date: new Date(element.dateTime),
            open: +(Math.random() * ((element.value + 0.500) - (element.value - 0.500)) + (element.value - 0.500)).toFixed(3),
            high: +(Math.random() * ((element.value + 0.500) - (element.value - 0.500)) + (element.value - 0.500)).toFixed(3),
            low: +(Math.random() * ((element.value + 0.500) - (element.value - 0.500)) + (element.value - 0.500)).toFixed(3),
            close: +(Math.random() * ((element.value + 0.500) - (element.value - 0.500)) + (element.value - 0.500)).toFixed(3),
            volume: volumeArray[index].value
        }
        index++;
        newArray.push(changedStructure);
    })

    newArray.sort((a, b) => {
        return a.date.valueOf() - b.date.valueOf();
    });

    return newArray;
}

// TODO: Condense and add comments
export function getMaxProfit(data) {
    let profit = 0, tempProfit = 0, min = 0, val = 0, index = 0;
    let buyDate, buyPrice, sellDate, sellPrice;
    let tempBuyDate, tempBuyPrice;

    data.forEach(element => {
        val = element.open;

        if(index === 0) {
            min = val;
            buyDate = element.date;
            buyPrice = element.open;
            sellDate = element.date;
            sellPrice = element.open;
            tempBuyDate = element.date;
            tempBuyPrice = element.open;
        }

        tempProfit = val - min;

        if(tempProfit > profit) {
            // Profit keeps track of the maximum possible profit
            profit = tempProfit;
            sellDate = element.date;
            sellPrice = element.open;
            buyDate = tempBuyDate;
            buyPrice = tempBuyPrice;
        }

        if(val < min) {
            min = val;
            tempBuyDate = element.date;
            tempBuyPrice = element.open;
        }

        index++;
    });

    const results = {
        profit: profit,
        buyDate: buyDate.toDateString(),
        buyPrice: buyPrice,
        sellDate: sellDate.toDateString(),
        sellPrice: sellPrice
    };

    return results;
}