let product_detail=document.querySelector('.product-detail');
product_detail.innerHTML=JSON.parse(localStorage.getItem('selected_product'));
localStorage.clear();