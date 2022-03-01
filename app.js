const input = document.querySelector('#brand-name');
const search = document.querySelector('.search-btn');
let cartDiv = document.querySelector('#phone-cart');
let detailsDiv = document.querySelector('#phone-details');
let phoneValue = '';
let showLess = true;
const spinner = document.querySelector('#spin');

let showMoreBtn = document.querySelector('#show');
showMoreBtn.style.display = 'none';
spinner.style.display = 'none';


// toggole function 
const toggleSpin = displaySpinner => {
    spinner.style.display = displaySpinner;
}

//search btn function 
search.addEventListener('click', () => {
    const inputValue = input.value;

    if ((inputValue === '')) {
        alert("Please provide your prefered gadget Brand");
    } else {
        onLoad(inputValue);
    }

})

// click on show more button 
showMoreBtn.addEventListener('click', () => {
    phoneValue != '' ? morePhones(phoneValue) : alert('No Brand Name is found');
})

//call api for showing more than 20 Phones
const morePhones = (phoneName) => {
    showMoreBtn.style.display = 'none';
    showLess = false;
    onLoad(phoneName);

}


// getting data from api for phone brand 
const onLoad = (brandName) => {
    input.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${brandName}`;
    toggleSpin('block');
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data))
}


// display phone brand and name 
const displayPhone = (spec) => {
    console.log(spec.data);
    cartDiv.textContent = '';
    let phoneSummary = spec.data;
    if (phoneSummary.length === 0) {
        showMoreBtn.style.display = 'none';
        alert('Not Available in our store');
    } else {
        phoneValue = phoneSummary[0].brand;
        if ((phoneSummary.length > 20) && showLess) {
            console.log(phoneSummary.length);
            phoneSummary = phoneSummary.slice(0, 20);
            showMoreBtn.style.display = 'block';
        }

        console.log(phoneSummary);
        phoneSummary.forEach(brand => {
            const phoneCard = document.createElement('div');
            phoneCard.innerHTML = `     
                    <div class="card text-center mb-3">
                        <div class="card-body">
                            <img src="${brand.image}" class="card-img-top w-50" alt="...">
                            <h5 class="card-title">${brand.phone_name}</h5>
                            
                            <button onclick="phoneId('${brand.slug}')" type="button" class="btn btn-primary" >Details</button>
                        </div>
                    </div>
             
        `;

            cartDiv.appendChild(phoneCard);

        })
    }
    toggleSpin('none');
    detailsDiv.textContent = '';
    showLess = true;

}

// search by phone id 
const phoneId = id => {
    detailsDiv.textContent = '';
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    toggleSpin('block');
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}


// display phone details 
const displayDetails = details => {

        const sensors = details.mainFeatures.sensors;
        console.log(sensors);
        const others = details.others;
        phoneValue = details.brand;
        console.log(phoneValue);
        const specificationDiv = document.createElement('div');
        specificationDiv.innerHTML = `
    <div class="card text-center mb-3">
      <div class="card-body">
        <h2 class="card-title my-3 text-primary">${details.name}</h2>
        <img src="${details.image}" class="card-img-top w-25" alt="...">
        <h4 class="card-text my-3 text-primary">Release Date: </h4><p>${details.releaseDate ? details.releaseDate:'Not available'}</p>
        <h4 class="card-text my-3 text-primary">Memory: </h4><p>${details.mainFeatures.memory}</p>
        <h4 class="card-text my-3 text-primary">Sensor: </h4><p>${(function loopSensor(sensors){
            let sensor= '';
            for(let i=0;i<sensors.length;i++){   
                 sensor =sensor+ sensors[i]+' , ';
            }
            return sensor;
        })(sensors)}</p>
        <h4 class="card-text my-3 text-primary">Others: </h4><p>${others!=null ? (function loopOthers(other){
            let property='';
            for(let value in other){
                property+=`${value} : ${other[value]}`;
            }
            return property;
        })(others): 'Not Found'}</p>
      </div>
    </div>
    `;
    detailsDiv.appendChild(specificationDiv);
    toggleSpin('none');

}