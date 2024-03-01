const loadPhone = async (searchtext) => {
    const rec = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`);
    const data = await rec.json();
    const phones = data.data;
    displayPhone(phones);
}

const displayPhone = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML='';
    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl `;
        phoneCard.innerHTML = `
        <figure><img class="pt-8" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body flex items-center text-center gap-5">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p class="font-bold">$999</p>
            <div class="card-actions justify-center">
            <button class="btn btn-primary font-bold">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

const handleSearch = () =>{
    const searchText = document.getElementById('search-text').value;
    loadPhone(searchText);
}

loadPhone('iphone');