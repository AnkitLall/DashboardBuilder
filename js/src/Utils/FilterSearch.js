export const filterByName = (arr,key,value) => {
    let result = arr.filter((elem) => {
        if(elem[key].toLowerCase().includes(value.toLowerCase())) {
            return elem;
        }
    });

    return result
}