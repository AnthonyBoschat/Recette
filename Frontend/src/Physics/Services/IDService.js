class IDService{

    static getNextID(array){
        return Math.max(...array.map(mat => mat.id)) + 1
    }
}

export default IDService