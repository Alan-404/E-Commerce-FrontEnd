export function checkTelephone(telephone: string){
    for (var i =0; i<telephone.length; ++i){
        if(telephone[i]<='0' || telephone[i]>='9'){
            return false;
        }
    }
    return true;
}

export function handlePriceDiscount(){
    
}