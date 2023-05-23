class Aluno
{
    #RA
    #latitude
    #longitude
    #foto

    constructor (RA, latitude, longitude, foto)
    {
        this.RA = RA;
        this.latitude = latitude;
        this.longitude = longitude;
        this.foto = foto;
    }

    get RA ()
    {
        return this.#RA
    }

    get latitude()
    {
        return this.#latitude
    }

    get longitude ()
    {
        return this.#longitude
    }

    get foto (){
        return this.#foto
    }

    set RA (RA)
    {
        if (RA===undefined || typeof RA !== 'number' || isNaN(RA) || RA!==parseInt(RA) || RA<=0)
            throw ('RA invalido');

        this.#RA = RA;
    }

    set latitude (latitude)
    {
        if (latitude===undefined || typeof latitude !== 'number' || isNaN(latitude)|| latitude==="")
            throw ('latitude invalido');

        this.#latitude = latitude;
    }

    set longitude (longitude)
    {
        if (longitude===undefined || typeof longitude !== 'number' || isNaN(longitude) || longitude ==="")
            throw ('longitude invalido');

        this.#longitude = longitude;
    }
    set foto (foto){
        this.#foto = foto;
    }
}


function novo (RA,latitude,longitude, foto)
{
    return new Aluno (RA,latitude,longitude, foto);
}

module.exports = {novo}