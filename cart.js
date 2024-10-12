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
