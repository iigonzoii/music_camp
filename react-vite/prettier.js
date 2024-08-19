const formatDate = (dateTime) => {
    let year = dateTime.slice(0,4)
    let monthDay = dateTime.slice(5, 10).split('-').join('/')

    let time = dateTime.slice(11, 16)
    let hour = time.slice(0, 2)
    let minute = time.slice(3)

    if (hour > 12) {
        hour = parseInt(hour) - 12
        time = hour.toString() + ':' + minute + 'PM'
    } else if (hour === '00') {
        time = '12:'+ minute + "AM"
    } else {
        time = hour + ":" + minute + "AM"
    }

    return monthDay + '/' + year + " · " + time
}


const sortByDate = (array) => {
    let sorter = (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
    return array.sort(sorter)
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return hash;
}

const createCartKey = (userId, albumId, type) => {
    let newKey = `${userId}${albumId}${type}`

    return hashString(newKey)
}


const isValidUrl = (string) => {
    try {
        new URL(url)
        return true;
    } catch (err) {
        return false;
    }
}

export { formatDate, sortByDate, capitalizeFirstLetter, createCartKey, isValidUrl }
