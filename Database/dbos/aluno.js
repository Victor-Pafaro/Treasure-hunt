class Livro
{
    
    #ra
    #longitude
    #latitude
    #foto

    constructor(ra,longitude,latitude,foto){
        this.ra = ra;
        this.longitude = longitude; 
        this.latitude = latitude; 
        this.foto = foto;
    }


    get getRa(){
        return this.#ra
    }

    get getLongitude(){
        return this.#longitude
    }

    get getLatitude(){
        return this.#latitude
    }
    get getFoto(){
        return this.#foto
    }   

    set setLongitude(longitude) {
        if(longitude === undefined || typeof longitude !== number || isNaN(longitude) || longitude !==parseInt(longitude)){
            throw ('Codigo invalido')
        }
        this.#longitude = longitude;
    }

    set setLatitude(latitude) {
        if(latitude === undefined || typeof latitude !== number || isNaN(latitude) || latitude !==parseInt(latitude)){
            throw ('Codigo invalido')
        }
        this.#latitude = latitude;
    }

}

function novo(ra,longitude,latitude,foto) {
    return new Alunos(ra,longitude,latitude,foto)
}

module.exports={novo}