const errors = Array.from(document.querySelectorAll('.error'));
if(errors.length){
    setTimeout(()=>{
        errors.forEach(err => err.remove());
    },5000);
    
}
