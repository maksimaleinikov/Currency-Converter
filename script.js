let curIDS = [145, 292, 298]

let mySelect = document.getElementById('select');


async function initCurrencies() {
    const responses = await Promise.all(curIDS.map(cur => {
        return fetch('https://www.nbrb.by/API/ExRates/Rates/' + cur)
    }))
    const data = await Promise.all(responses.map(r => r.json()))

    const select = document.getElementById('select')
    data.forEach((value, key) => {
        const option = document.createElement('option')
        option.innerHTML = value['Cur_Name']
        const rate = value['Cur_OfficialRate'] / value['Cur_Scale']
        option.value = rate
        select.appendChild(option)
    })
    selectValue()
}

function selectValue() {
    const select = document.getElementById('select')
    const value = document.getElementById('input').value
    const span = document.getElementById('span')
    span.innerHTML = +value / select.value
}

document.getElementById('select').addEventListener("change", selectValue);
document.getElementById('input').addEventListener("input", selectValue);

initCurrencies()