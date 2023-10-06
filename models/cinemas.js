const sql = require('../utils/postgreConnection')

class CinemasModel {
  static async _getListCinemas() {
    const cinemas = await sql`SELECT * FROM cinemas`
    return cinemas
  }

  static async _getSelectedCinema(id) {
    const cinemas = await sql`SELECT * FROM cinemas WHERE id=${id}`
    return cinemas
  }

  static async _addCinema(payload) {
    const { movie_id, name, city, address, show_times, price, logo } =
      payload.body

    const cinemas = await sql`
        insert into cinemas
          (movie_id, name, city, address, show_times, price, logo)
        values
          (${movie_id},${name},${city},${address},${show_times},${price},${logo})
        returning id`
    return cinemas
  }

  static async _udateCinema(payload) {
    const { id } = payload.params
    const { movie_id, name, city, address, show_times, price, logo } =
      payload.body

    const cinemas = await sql`update cinemas set
        name=${name},
        movie_id=${movie_id},
        city=${city},
        address=${address},
        show_times=${show_times},
        price=${price},
        logo=${logo}
        where id=${id} RETURNING id;`

    return cinemas
  }

  static async _deleteCinema(payload) {
    const { id } = payload.params
    const cinemas = await sql`DELETE FROM cinemas where id=${id} RETURNING id;`
    return cinemas
  }
}

module.exports = CinemasModel
