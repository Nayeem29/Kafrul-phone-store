const input = document.querySelector('#brand-name');
const search = document.querySelector('.search-btn');
let cartDiv = document.querySelector('#phone-cart');
let detailsDiv = document.querySelector('#phone-details');
let showLess = true;
const spinner = document.querySelector('#spin');

let showMoreBtn = document.querySelector('#show');
showMoreBtn.style.display = 'none';
spinner.style.display = 'none';

// on load and back button function 
const initial = () => {
    detailsDiv.textContent = '';
    const url = 'https://openapi.programming-hero.com/api/phones?';
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data))
}

// toggole function 
const toggleSpin = displaySpinner => {
    spinner.style.display = displaySpinner;
}

//search btn function 
search.addEventListener('click', () => {
    const inputValue = input.value;
    toggleSpin('block');
    if ((inputValue === '')) {
        alert("Please provide your prefered gadget Brand");
    } else {
        onLoad(inputValue);
    }

})

// getting data from api for phone brand 
const onLoad = (brandName) => {
    input.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${brandName}`;
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
        alert('Not Available in our store');
    } else {
        if ((phoneSummary.length > 20) && showLess) {
            console.log(phoneSummary.length);
            phoneSummary = phoneSummary.slice(0, 20);

        }

        console.log(phoneSummary);
        phoneSummary.forEach(brand => {
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

        })
    }
    toggleSpin('none');
    detailsDiv.textContent = '';
    showMoreBtn.style.display = 'block';
    showMoreBtn.addEventListener('click', () => {
        loadMore(spec.data);
    })

}

const loadMore = (moreData) => {
    showMoreBtn.style.display = 'none';
    showLess = false;
    displayPhone(moreData);
}


// search by phone id 
const phoneId = id => {
    // console.log(id);
    detailsDiv.textContent = '';
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}


// display phone details 
const displayDetails = details => {
    // console.log(details.mainFeatures.storage);
    // console.log(details.mainFeatures.memory);
    // console.log(details.releaseDate);
    const sensors = details.mainFeatures.sensors;
    console.log(sensors);
    cartDiv.textContent = '';
    const specificationDiv = document.createElement('div');
    specificationDiv.innerHTML = `
    <div class="card text-center mb-3">
      <div class="card-body">
        <h2 class="card-title my-3">Phone: </h2><p>${details.name}</p>
        <img src="${details.image}" class="card-img-top w-25" alt="...">
        <h4 class="card-text my-3">Release Date: </h4><p>${details.releaseDate ? details.releaseDate:'Not available'}</p>
        <h4 class="card-text my-3">Memory: </h4><p>${details.mainFeatures.memory}</p>
        <h4 class="card-text my-3">Sensor: </h4><p>${(function loopSensor(sensors){
            let sensor= '';
            for(let i=0;i<sensors.length;i++){   
                 sensor =sensor+ sensors[i]+' , ';
            }
            return sensor;
        })(sensors)}</p>
      </div>
      <button onclick="initial()" type="button" class="btn btn-primary mx-auto w-25" >Back</button>
    </div>
    `;
    detailsDiv.appendChild(specificationDiv);
    showMoreBtn.style.display = 'none';

}