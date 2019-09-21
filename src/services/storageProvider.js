

// reads data from localstorage
function read(key) {
    return JSON.parse(window.localStorage.getItem(key)) || []
}

//saves data to localstoragef
function save(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value))
}



// export default saveData;
export default { read, save };