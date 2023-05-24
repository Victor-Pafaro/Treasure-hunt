class Aluno
{
    #ra
    #latitude
    #longitude
    #foto

    constructor (ra, latitude, longitude, foto)
    {
        this.ra = ra;
        this.latitude = latitude;
        this.longitude = longitude;
        this.foto = foto;
    }

    get ra ()
    {
        return this.#ra
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

    set ra (ra)
    {
        if (ra===undefined || typeof ra !=='number' || isNaN(ra) || ra!==parseInt(ra) || ra<=0)
            throw ('RA invalido');

        this.#ra = ra;
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


function novo (ra,latitude,longitude, foto)
{
    return new Aluno (ra,latitude,longitude, foto);
}

module.exports = {novo}