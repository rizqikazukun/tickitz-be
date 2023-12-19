const sql = require('../utils/postgreConnection')

class CinemasModel {
  static async _getListCinemas() {
    const cinemas = await sql`SELECT * FROM tbl_cinemas_rzq`
    return cinemas
  }

  static async _getSelectedCinema(id) {
    const cinemas = await sql`SELECT * FROM tbl_cinemas_rzq WHERE id=${id}`
    return cinemas
  }

  static async _addCinema(payload) {
    const { movie_id, name, city, address, show_times, price, logo } =
      payload.body

    const cinemas = await sql`
        insert into tbl_cinemas_rzq
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

    const cinemas = await sql`update tbl_cinemas_rzq set
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
    const cinemas =
      await sql`DELETE FROM tbl_cinemas_rzq where id=${id} RETURNING id;`
    return cinemas
  }
}

module.exports = CinemasModel
