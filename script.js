const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click',() => {
      nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active');
    })
}

const sliderMainImage = document.getElementById("product-main-image");
const sliderImageList = document.getElementsByClassName("image-list");
console.log(sliderImageList);

sliderImageList[0].onclick = function(){
    sliderMainImage.src = sliderImageList[0].src;
    console.log(sliderMainImage.src);
};

sliderImageList[1].onclick = function(){
    sliderMainImage.src = sliderImageList[1].src;
    console.log(sliderMainImage.src);
};

sliderImageList[2].onclick = function(){
    sliderMainImage.src = sliderImageList[2].src;
    console.log(sliderMainImage.src);
};

sliderImageList[3].onclick = function(){
    sliderMainImage.src = sliderImageList[3].src;
    console.log(sliderMainImage.src);
};


const cards = document.querySelectorAll('.pro');
        const cart = document.getElementById('cart');
        const totalElement = document.getElementById('total'); 
        const selectedItems = {};

        function handleCardClick(event) {
            const card = event.currentTarget;
            const itemId = card.id;
            const itemName = card.querySelector('h2').textContent;
            const itemPrice = parseFloat(card.querySelector('.price').textContent); 

            if (selectedItems[itemId]) {
                selectedItems[itemId].count++;
            } else {
                selectedItems[itemId] = {
                    name: itemName,
                    price: itemPrice,
                    count: 1,
                };
            }

            updateCart();
        }

        function updateCart() {
            cart.innerHTML = '';
            let total = 0; 

            for (const itemId in selectedItems) {
                const item = selectedItems[itemId];
                const listItem = document.createElement('li');
                const quantityContainer = document.createElement('div'); 
                const quantityText = document.createElement('span'); 
                const addButton = document.createElement('button');
                const subtractButton = document.createElement('button');

                addButton.textContent = '+';
                subtractButton.textContent = '-';

                quantityText.textContent = item.count; 

                addButton.addEventListener('click', () => {
                    addItem(itemId);
                });

                subtractButton.addEventListener('click', () => {
                    removeItem(itemId);
                });

                const hr = document.createElement('hr');

                quantityContainer.appendChild(subtractButton); 
                quantityContainer.appendChild(quantityText); 
                quantityContainer.appendChild(addButton); 
                quantityContainer.appendChild(hr); 

                listItem.textContent = `${item.name} - $${item.price * item.count}`;
                listItem.appendChild(quantityContainer); 
                cart.appendChild(listItem);

                total += item.price * item.count; 
            }

            totalElement.textContent = `Общая сумма: $${total.toFixed(2)}`; 
        }

        function addItem(itemId) {
            if (selectedItems[itemId]) {
                selectedItems[itemId].count++;
            }
            updateCart();
        }

        function removeItem(itemId) {
            if (selectedItems[itemId]) {
                selectedItems[itemId].count--;
                if (selectedItems[itemId].count <= 0) {
                    delete selectedItems[itemId];
                }
            }
            updateCart();
        }

        cards.forEach((card) => {
            card.addEventListener('click', handleCardClick);
        });



        // Function to update the total
function updateTotal() {
    let total = 0;
    const cartRows = document.querySelectorAll('#cart tbody tr');
    cartRows.forEach(row => {
        const priceElement = row.querySelector('td:nth-child(4)').innerText.replace('Rs.', '');
        const quantityElement = row.querySelector('td:nth-child(5) input').value;
        const price = parseFloat(priceElement);
        const quantity = parseInt(quantityElement);
        const subtotal = price * quantity;
        row.querySelector('td:nth-child(6)').innerText = `Rs.${subtotal.toFixed(2)}`;
        total += subtotal;
    });

    document.getElementById('cart-subtotal').innerText = `Rs.${total.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `Rs.${total.toFixed(2)}`;
}

// Function to delete cart item
function deleteCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('tr').remove();
    updateTotal();
}

// Attach delete function to trash icons
document.querySelectorAll('.fa-trash').forEach(button => {
    button.addEventListener('click', deleteCartItem);
});

// Update total on page load
updateTotal();

// Update total when quantity changes
document.querySelectorAll('#cart tbody input[type="number"]').forEach(input => {
    input.addEventListener('change', updateTotal);
});
