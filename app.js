const div = document.querySelector('#render')

let getData = JSON.parse(localStorage.getItem('userData'))
console.log(getData);


div.innerHTML += `
 <div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src=""
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${getData.title}</h2>
    <p>${getData.description}</p>
    <p>${getData.price}</p>
    <p>${getData.name}</p>
    <p>${getData.contactNumber}</p>
    <div class="card-actions justify-end">
      <button class="deleteBtn btn btn-danger">Delete Ad</button>
      <button class="editBtn btn btn-primary ">Edit Ad</button>
    </div>
  </div>
</div>
</hr>
        
`

    


