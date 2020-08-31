export const validator = (actualValues,formType) => {
    let errorMsgs = {};
    let isValid = true;
    let passwordPattern = /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/g;
    console.log(actualValues.password.match(passwordPattern));

    if(!actualValues.name && formType === 'register') {
        errorMsgs['name'] = 'Name field is required.';
    }

    if(!actualValues.email) {
        errorMsgs['email'] = 'Email field is required.';
    }

    if(!actualValues.password) {
        errorMsgs['password'] = 'Password field is required.';
    }else if(!actualValues.password.match(passwordPattern)  && formType === 'register') {
        errorMsgs['password'] = 'Password format is not correct.';
    }

    if(actualValues.password !== actualValues.passwordConfirm && formType === 'register') {
        errorMsgs['passwordConfirm'] = 'Passwords must match.';
    }

    if(Object.keys(errorMsgs).length) {
        isValid = false;
    }
    return [errorMsgs,isValid];
}