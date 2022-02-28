const input = document.querySelector('#brand-name');
const search = document.querySelector('.search-btn');
let cartDiv = document.querySelector('#phone-cart');
let detailsDiv = document.querySelector('#phone-details');

const initial = () => {
    detailsDiv = '';
    const url = 'https://openapi.programming-hero.com/api/phones?';
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data))
}

search.addEventListener('click', () => {
    const inputValue = input.value;
    onLoad(inputValue);
})

const onLoad = (brandName) => {
    input.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${brandName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data))
}

const displayPhone = (spec) => {
    console.log(spec.data);
    const div = document.querySelector('#phone-cart');
    let count = 0;
    const phoneSummary = spec.data;
    phoneSummary.forEach(brand => {
        // console.log(brand);
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `     
                    <div class="card text-center mb-3">
                        <div class="card-body">
                            <img src="${brand.image}" class="card-img-top w-50" alt="...">
                            <h5 class="card-title">Name: ${brand.phone_name}</h5>
                            
                            <button onclick="phoneId('${brand.slug}')" type="button" class="btn btn-primary" >Details</button>
                        </div>
                    </div>
             
        `;

        cartDiv.appendChild(phoneCard);
        count++;
        // if (count > 20) {

        // }
    })
}

const phoneId = id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

const displayDetails = details => {
    console.log(details.mainFeatures.storage);
    console.log(details.mainFeatures.memory);
    console.log(details.releaseDate);
    cartDiv.textContent = '';
    const specificationDiv = document.createElement('div');
    specificationDiv.innerHTML = `
    <div class="card text-center mb-3">
      <div class="card-body">
        <h2 class="card-title my-3">Phone: ${details.name}</h2>
        <img src="${details.image}" class="card-img-top w-25" alt="...">
        <h4 class="card-text my-3">Release Date:${details.releaseDate}</h4>
        <h4 class="card-text my-3">Memory:${details.mainFeatures.memory}</h4>
        <h4 class="card-text my-3">Sensor:${details.mainFeatures.sensors[0]}</h4>
      </div>
      <button onclick="initial()" type="button" class="btn btn-primary mx-auto w-25" >Back</button>
    </div>
    `;
    detailsDiv.appendChild(specificationDiv);


    // console.log(details.image);
}