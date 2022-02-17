const _ = require('lodash');

function isItemValid(item){
    let isValid = true;
    
    Object.values(item).forEach(value => {
        if(typeof value === 'undefined'){
            isValid = false;
            return;
        }
    });
    
    return isValid;
}

export const filterValues = [
    {
        label: 'NONE',
        value: 'NONE'
    },
    {
        label: 'ACTIVE',
        value: 'ACTIVE'
    },
    {
        label: 'DISCONTINUED',
        value: 'DISCONTINUED'
    }
];

export function areDatesValid(prices){
    let datesPrices = prices.map(price => (
        {
            startDate: new Date(price.startDate),
            endDate: new Date(price.endDate)
        })
    ); 
    if(datesPrices.length <= 1){
        return true;
    }

    let earliest = datesPrices.reduce(function (prev, curr) {
        return prev.startDate < curr.startDate ? prev : curr
    });


    let latest = datesPrices.reduce(function (prev, curr) {
        return prev.endDate > curr.endDate ? prev : curr
    });


    let isValid = true;
    datesPrices.map(price => {

        if(!arePricesEqual(price, earliest)){
            if(price.startDate.getTime() >= earliest.startDate.getTime() || price.startDate.getTime() <= latest.endDate.getTime()){
                isValid = false;
            }
        }

        if(price !== earliest){
            if(price.startDate >= earliest.startDate || price.startDate <= latest.endDate){
                isValid = false;
            }
        }

        if(!arePricesEqual(price, latest)){
            if(price.endDate <= latest.endDate){
                isValid = false;
            }
        }

        if(price !== latest){
            if(price.endDate <= latest.endDate){
                isValid = false;
            }
        }

        

    });
    return isValid;
}

function arePricesEqual(price1, price2){
    return price1.startDate === price2.startDate && price1.endDate === price2.endDate;
}



