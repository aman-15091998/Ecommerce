const bar=document.querySelector('.bar');
const cross=document.querySelector('.cross');
const navbar=document.querySelector('#navbar');

const featured_section=document.querySelectorAll('#featured-section .product');
const new_arrival=document.querySelectorAll('#new-arrival-section .product');
let product_view;
let img;
let product_name;
let rating;
let price;
const addToCart_btn=document.querySelector('.cart-button');
const myCart=document.querySelector('#navbar li a .count');
const mobileCart=document.querySelector('.mobile .count');

let addedProducts=JSON.parse(sessionStorage.getItem('addedProducts'));

if(addedProducts===undefined || addedProducts===null){
    addedProducts=[];
    sessionStorage.setItem('addedProducts', JSON.stringify(addedProducts));
    console.log("created");
    myCart.innerHTML=addedProducts.length;
    mobileCart.innerHTML=addedProducts.length;
    console.log(myCart.innerHTML);
}
else{
    addedProducts=JSON.parse(sessionStorage.getItem('addedProducts'));
    myCart.innerHTML=addedProducts.length;
    mobileCart.innerHTML=addedProducts.length;
    // console.log("Already has");
    // console.log(myCart.innerHTML);
}


bar.addEventListener('click', ()=>{
    // navbar.classList.add('appear');
    navbar.style.right=`0px`;
});
cross.addEventListener('click', ()=>{
    // navbar.classList.add('appear');
    navbar.style.right=`-300px`;
});







window.addEventListener('click',(e)=>{
    if(e.target.className==='product')
    {
        if(e.target.parentElement.classList.contains('featured'))
        {   
            featured_section.forEach((prod, ind)=>{ 
        
                if(prod.children[0].classList[1]===e.target.children[0].classList[1])
                
                {
                    console.log("match-featured");  
                    product_name=e.target.children[2].innerHTML;
                    rating=e.target.children[3].innerHTML;
                    price=e.target.children[4].innerHTML;
            
                    img=window.getComputedStyle(e.target.children[0]).backgroundImage;
                     console.log(img);
            product_view=`<div class="left">
                        <div class="main ${e.target.children[0].classList[1]}" style="background-image:url(img/products/f${img.charAt(41)}.jpg)"></div>
                        <div class="small">
                            <div class="img one"></div>
                            <div class="img two"></div>
                            <div class="img three"></div>
                            <div class="img four"></div>
                        </div>
                    </div>
                    <div class="right">
                        <h2>${product_name}</h2>
                        <div class="rating">
                            ${rating}
                        </div>
                        <select id="size">
                            <option value="S">S</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                        <h2>${price}</h2>
                        <input type="button" class="add-to-cart" value="Add To Cart">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est omnis excepturi, repudiandae dolore accusantium vitae molestias doloremque praesentium quam, labore commodi nostrum ut! Suscipit architecto laborum excepturi dolores similique quos!</p>
                    </div>`;
                
                    localStorage.setItem('selected_product', JSON.stringify(product_view));
                    window.location.assign('pdetail.html');
                }
            })
        }
    
        if(e.target.parentElement.classList.contains('arrival'))
        {    
            new_arrival.forEach((prod, ind)=>{ 
        
                if(prod.children[0].classList[1]===e.target.children[0].classList[1])
                {
                    console.log("match-arrival");   
                    product_name=e.target.children[2].innerHTML;
                    rating=e.target.children[3].innerHTML;
                    price=e.target.children[4].innerHTML;
            
                    img=window.getComputedStyle(e.target.children[0]).backgroundImage;
                    //  console.log(img.charAt(41));
            product_view=`<div class="left">
                        <div class="main" style="background-image:url(img/products/n${img.charAt(41)}.jpg)"></div>
                        <div class="small">
                            <div class="img one"></div>
                            <div class="img two"></div>
                            <div class="img three"></div>
                            <div class="img four"></div>
                        </div>
                    </div>
                    <div class="right">
                        <h2>${product_name}</h2>
                        <div class="rating">
                            ${rating}
                        </div>
                        <select id="size">
                            <option value="S">S</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                        <h2>${price}</h2>
                        <input type="button" class="add-to-cart" value="Add To Cart">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est omnis excepturi, repudiandae dolore accusantium vitae molestias doloremque praesentium quam, labore commodi nostrum ut! Suscipit architecto laborum excepturi dolores similique quos!</p>
                    </div>`;
                
                    localStorage.setItem('selected_product', JSON.stringify(product_view));
                    window.location.assign('pdetail.html');
                }
            })
        } 
    } 
    if(e.target.className==='cart-button' || e.target.className==='add-to-cart') 
    {

        const added={class: e.target.className==='cart-button'? e.target.parentElement.children[0].classList[1]: e.target.parentElement.parentElement.children[0].children[0].classList[1],
                    // details:`<tr>
                    // <td><i class="fa-regular fa-circle-xmark remove"></i></td>
                    // <td>${(e.target.className==='cart-button'? e.target.parentElement.children[2]:e.target.parentElement.children[0]).innerHTML}</td>
                    // <td><input class="increment" type="button" value="+"><input type="text" value="1" readonly><input class="decrement" type="button" value="-"></td>
                    // <td>${(e.target.className==='cart-button'? e.target.parentElement.children[4]:e.target.parentElement.children[3]).innerHTML}</td>
                    // </tr>`
                    name: (e.target.className==='cart-button'? e.target.parentElement.children[2]:e.target.parentElement.children[0]).innerHTML,
                    quantity: 1,
                    price:(e.target.className==='cart-button'? e.target.parentElement.children[4]:e.target.parentElement.children[3]).innerHTML
                };
                    console.log(addedProducts);
    
                    if(addedProducts.length!=0)
                    {
                        // console.log("Entered");
                        let flag=0;
                        addedProducts.forEach((element)=>{
                            // console.log("Entered loop");   
                            if(element.class===(e.target.className==='cart-button'? e.target.parentElement.children[0].classList[1]:e.target.parentElement.parentElement.children[0].children[0].classList[1]))
                            {
                                element.quantity++;
                                flag=1;
                            }
                        })
                        if(flag===1)
                        {
                            sessionStorage.setItem('addedProducts', JSON.stringify(addedProducts));
                        }
                        else{
                            addedProducts.push(added);
                            sessionStorage.setItem('addedProducts', JSON.stringify(addedProducts));
                        }
                    }
                    else
                    {
                        addedProducts.push(added);
                        sessionStorage.setItem('addedProducts', JSON.stringify(addedProducts));
                    }
    console.log(addedProducts);
    myCart.innerHTML=addedProducts.length;
    mobileCart.innerHTML=addedProducts.length;
    
    }   
})






