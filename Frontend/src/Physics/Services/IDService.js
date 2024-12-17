class IDService{

    static getNextID(array){
        if(array.length !== 0){
            return Math.max(...array.map(mat => mat.id)) + 1
        }else{
            return 0
        }
    }
}

export default IDService