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

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }



export default (isItemValid, filterValues, authHeader);