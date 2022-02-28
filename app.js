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
    const div = document.querySelector('#phone-cart');
    spec.forEach(brand => {
        console.log(brand);
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        
                    <div class="card text-center mb-3">
                        <div class="card-body">
                            <img src="${brand.image}" class="card-img-top w-50" alt="...">
                            <h5 class="card-title">Name: ${brand.phone_name}</h5>
                            <p class="card-text">Release Date:${brand.releaseDate}</p>
                            <a href="#" class="btn btn-primary">Details</a>
                        </div>
                    </div>
             
        `;
        div.appendChild(phoneCard);
    })
}