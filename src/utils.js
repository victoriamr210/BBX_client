function isItemValid(item){
    let isValid = true;
    
    Object.values(item).forEach(value => {
        if(typeof value === 'undefined'){
            console.log(value);
            isValid = false;
            return;
        }
    });
    
    return isValid;
}

const filterValues = [
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

function areDatesValid(prices){
    let datesPrices = prices.map(price => (
        {
            startDate: new Date(price.startDate),
            endDate: new Date(price.endDate)
        })
    ); 

    let earliest = datesPrices.reduce(function (prev, curr) {
        return prev.startDate < curr.startDate ? prev : curr
    });


    let latest = datesPrices.reduce(function (prev, curr) {
        return prev.endDate > curr.endDate ? prev : curr
    });

    console.log(earliest, latest);
    let isValid = true;
    prices.map(price => {
        if(price.startDate > earliest.startDate || price.endDate < latest.endDate){
            isValid = false;
        }
    });
    console.log(isValid);
    return isValid;
}



export default (isItemValid, filterValues, areDatesValid);