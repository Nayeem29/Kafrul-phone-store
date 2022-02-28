const input = document.querySelector('#brand-name');
const search = document.querySelector('.search-btn');

search.addEventListener('click', () => {
    const inputValue = input.value;
    onLoad(inputValue);
})

const onLoad = (brandName) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${brandName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = (spec) => {
    // console.log(spec);
    spec.forEach(brand => {
        console.log(brand.phone_name);
    })
}