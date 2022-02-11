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
        label: 'DEACTIVATED',
        value: 'DEACTIVATED'
    }
];



export default (isItemValid, filterValues);