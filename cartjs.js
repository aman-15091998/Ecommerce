const table=document.querySelector('.my-cart .left table');
let extractProducts=JSON.parse(sessionStorage.getItem('addedProducts'));
loadTable();
calculate();

// window.addEventListener('click',(e)=>{
//     console.log("Entered cartjs");
    
// })

window.addEventListener('click',(e)=>{

    if(e.target.className==='cart-button'){

        window.location.reload();
    // loadTable();
    }
    
    if(e.target.classList.contains('remove')){
        // console.log(e.target.parentElement.parentElement);
        let temp;
        extractProducts.forEach((productList, ind)=>{
            if(e.target.parentElement.parentElement.className===productList.class){
                temp=ind;
                 } 
             
         })
         extractProducts.splice(temp, 1);
                sessionStorage.setItem('addedProducts', JSON.stringify(extractProducts));
                e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);

                calculate();
               refresh();//fix
               loadTable();
    }
    if(e.target.className==='decrement' || e.target.className==='increment'){
        changeQuantity(e);
    }
    if(e.target.classList.contains('apply')){
        checkCoupon();
    } 
})

function calculate(){
    if(extractProducts.length!=0)
    {
        let sum=0;
        extractProducts.forEach((element)=>{
            for(let i=1;i<=element.quantity;i++){
                sum=sum + parseInt((element.price).substring(1));  
            }

        })
        let Mrp=document.querySelector('.discount h3');
        Mrp.innerHTML=`₹${sum}`;
    }
    else{
        let Mrp=document.querySelector('.discount h3');
        console.log("Empty cart")
        Mrp.innerHTML=`₹0`;
        Mrp.classList.remove('striked');
        // let Sp=document.querySelector('.discount h2');
        // Sp.style.display=`none`;
    }
}

function refresh(){
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
    }
}

function loadTable(){
    let prods=`<tr>
    <td><b>Remove</b></td>
    <td><b>Products</b></td>
    <td><b>Quantity</b></td>
    <td><b>Total</b></td>
    </tr>`;
    // console.log("Before if");
    if(extractProducts.length!=0)
    {
        extractProducts.forEach((element)=>{
            prods=prods+`<tr class="${element.class}">
            <td><i class="fa-regular fa-circle-xmark remove"></i></td>
            <td>${element.name}</td>
            <td><input class="increment" type="button" value="+"><input type="text" value="${element.quantity}" readonly><input class="decrement" type="button" value="-"></td>
            <td>${element.price}</td>
            </tr>`
            table.innerHTML=prods;
        })
    }
    else{
        let parent=table.parentElement;
        parent.innerHTML=`<h2 style="text-align: center" class="empty-cart">Cart is  empty!</h2>`;
    }
}

function changeQuantity(e){
        if(e.target.className==='decrement'){
            console.log(e.target);
            extractProducts.forEach((productList, ind)=>{
                if(e.target.parentElement.parentElement.className===productList.class){   //class of <tr> check
                    if(productList.quantity>1){
                        extractProducts[ind].quantity=extractProducts[ind].quantity-1;
                        // console.log(extractProducts[ind].quantity);
                        e.target.parentElement.children[1].value=extractProducts[ind].quantity;
                        sessionStorage.setItem('addedProducts', JSON.stringify(extractProducts));
                    }
                    else{
                        extractProducts.splice(ind, 1);
                        sessionStorage.setItem('addedProducts', JSON.stringify(extractProducts));
                        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                    }
    
                    calculate();
                } 
                   refresh(); //fixed
             })
        }
        if(e.target.className==='increment'){
            console.log(e.target);
            extractProducts.forEach((productList, ind)=>{
                if(e.target.parentElement.parentElement.className===productList.class){   //class of <tr> check
                    
                        extractProducts[ind].quantity=extractProducts[ind].quantity+1;
                        // console.log(extractProducts[ind].quantity);
                        e.target.parentElement.children[1].value=extractProducts[ind].quantity;
                        sessionStorage.setItem('addedProducts', JSON.stringify(extractProducts));
                    
                    // else{
                    //     extractProducts.splice(ind, 1);
                    //     sessionStorage.setItem('addedProducts', JSON.stringify(extractProducts));
                    //     e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                    // }
    
                    calculate();
                } 
                   refresh(); //fixed
             })
        }
        
}


function checkCoupon(){
    if(extractProducts.length!=0){  //&& document.querySelector('.coupon').children[2]===undefined
        // console.log("if1");
        if(document.querySelector('.coupon-area').value==="EXTRA10")
        {
            // console.log("if2");
            if(document.querySelector('.coupon-area').readOnly===false)
            {
                let coupon= document.querySelector('.coupon');
                let newElement=document.createElement('h4');
                newElement.classList.add('coupon-applied');
                newElement.innerHTML=`10% discount applied!`;
                console.log(newElement);
                coupon.appendChild(newElement);
                                                            
                let total= document.querySelector('.discount h3').innerHTML;
                    total=parseInt(total.substring(1));
                let discount=(10*total)/100;
                let newAmt=total-discount;

                document.querySelector('.discount h3').classList.add('striked'); 
                document.querySelector('.discount').children[1].innerHTML=`₹${newAmt}`;
                document.querySelector('.discount').children[1].style.display=`initial`;
                
                document.querySelector('.coupon-area').readOnly=true;
                document.querySelector('.apply').value=`Remove`;
                // ducument.querySelector('.apply').classList.add('remove-apply');

                // document.querySelector('.remove-apply').classList.remove('apply');
            }else
            {
                document.querySelector('.coupon').children[2].remove();
                document.querySelector('.discount h3').classList.remove('striked');
                calculate();
                document.querySelector('.discount').children[1].style.display=`none`;

                document.querySelector('.coupon-area').value="";
                document.querySelector('.apply').value=`Apply`;
                document.querySelector('.coupon-area').readOnly=false;
                // ducument.querySelector('.remove-apply').classList.add('apply');
                // document.querySelector('.apply').classList.remove('remove-apply');


                

            }
            
           

        }
        else{
            let coupon= document.querySelector('.coupon');
                let newElement=document.createElement('h4');
                newElement.classList.add('invalid');
                newElement.innerHTML=`Not a valid coupon!`;
                // console.log(newElement);
                coupon.appendChild(newElement);

            setTimeout(() => {
                coupon.children[2].remove();
            }, 2000);
            
        }
    }
    console.log("Clicked");
}

