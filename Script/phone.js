const loadPhone = async (searchtext=13, isAllshow) => {
    const rec = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`);
    const data = await rec.json();
    const phones = data.data;
    displayPhone(phones, isAllshow);
}

const displayPhone = (phones, isAllshow) =>{
    const phoneContainer = document.getElementById('phone-container');
    const seeAll = document.getElementById('seeMoreBtn');
    phoneContainer.innerHTML='';
    if(phones.length > 12 && isAllshow !== true){
        seeAll.classList.remove('hidden');
    }else{
        seeAll.classList.add('hidden');
    }
    if(!isAllshow){
        phones=phones.slice(0,12);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl `;
        phoneCard.innerHTML = `
        <figure><img class="pt-8" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body flex items-center text-center gap-5">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p class="font-bold">$999</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary font-bold">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

const handleSearch = (isAllshow) =>{
    const handleLoad = document.getElementById('loadingArea');
    const searchText = document.getElementById('search-text').value;
    handleLoad.classList.remove('hidden');
    loadPhone(searchText, isAllshow);
    handleLoad.classList.add('hidden');
}

const handleShowDetails =async (id) =>{
    const handleLoad = document.getElementById('loadingArea');
    handleLoad.classList.remove('hidden');
    const rec = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await rec.json();
    const phoneDetails = data.data;
    showPhoneDetails(phoneDetails);
    handleLoad.classList.add('hidden');
}

const showPhoneDetails = (phone) =>{
    const showPhoneDetails = document.getElementById('show-details-phone');
    console.log(phone)
    showPhoneDetails.innerHTML = `
                <div class="flex items-center  justify-center bg-[#0D6EFD0D] mb-3 w-full py-6"><img src="${phone.image}" alt=""> </div>
                <h3 class="text-center font-bold text-lg">${phone.name}</h3>
                <p class=" py-4">It is a long established fact that a reader will be distracted by the readable.</p>
                <div class="text-left">
                    <p class="text-black font-bold">Storage : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.storage}</span> </p>
                    <p class="text-black font-bold">Display Size : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.displaySize.slice(0,20)}</span> </p>
                    <p class="text-black font-bold">Chipset : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.chipSet}</span> </p>
                    <p class="text-black font-bold">Memory : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.memory.slice(0,28)}</span> </p>
                    <p class="text-black font-bold">Sensors : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.sensors.length}</span> </p>
                    <p class="text-black font-bold">Slug : <span class="text-[#706F6F] font-normal">${phone.slug}</span> </p>
                    <p class="text-black font-bold">Release data : <span class="text-[#706F6F] font-normal">${phone.releaseDate}</span> </p>
                    <p class="text-black font-bold">Brand : <span class="text-[#706F6F] font-normal">${phone.brand}</span> </p>
                    <p class="text-black font-bold">GPS : <span class="text-[#706F6F] font-normal">${phone?.others?.GPS}</span> </p>
                </div>
                
                <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
                </div>
    `
    show_details_modal.showModal();
}

const showAllPhone = () =>{
    handleSearch(true);
}

loadPhone();