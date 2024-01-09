export function displayError(error) {
    
    const h1El = document.createElement('h1');

    if(error === 404){ 
         h1El.innerText = `No results found. Check if your spelling is correct and try again!`;
         
    }
    else{ 
        h1El.innerText = `Something went wrong. Try again later!`;
        
    }
    document.body.append(h1El);

}