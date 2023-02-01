const fs = require('fs');
// let data = require('./data.json')


// let new_data = []

// for (let ele of data) {
//     if (ele.country == 'India') {
//         new_data.push(ele);
//     }
// }

let data = require('./Ind_data.json');
// let data = [{ city: 'Andhra Pradesh' }]

for (let ele of data) {
    for (let i = 0; i < ele.city.length; i++) {

        let letter = { alpha: ele.city.charAt(i), code: ele.city.charCodeAt(i) }
        if ((ele.city.charCodeAt(i) > 122 || ele.city.charCodeAt(i) < 65) && ele.city.charCodeAt(i) != 32) {
            console.log(ele.city)
        }
    }

    for (let i = 0; i < ele.admin_name.length; i++) {
        if ((ele.admin_name.charCodeAt(i) > 122 || ele.admin_name.charCodeAt(i) < 65) && ele.admin_name.charCodeAt(i) != 32) {
            console.log(ele.admin_name)
        }
    }
}

fs.writeFileSync('./Ind_data - Copy.json', JSON.stringify(data))