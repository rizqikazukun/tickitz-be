const sql = require('../utils/postgreConnection')

class MovieModel {
  static async _getListMovies(payload) {
    const { search, year } = payload.query

    const movies = await sql`SELECT id, name, ${
      !year || year === '' ? sql`` : sql`release_date,`
    } duration, genres, poster FROM movies
        ${
          !search || search === ''
            ? sql``
            : sql`where lower(name) like lower(${
                String('%') + search + String('%')
              })`
        }
        ${
          !year || year === ''
            ? sql`order by name`
            : year === 'desc'
            ? sql`order by release_date desc`
            : year === 'asc'
            ? sql`order by release_date asc`
            : sql`order by id`
        }`

    return movies
  }

  static async _getDetailMovie(payload) {
    const { id } = payload.params
    const movies = await sql`SELECT * FROM movies WHERE id=${id}`
    return movies
  }

  static async _addMovie(payload) {
    const {
      name,
      release_date,
      duration,
      genres,
      directed_by,
      casts,
      synopsis,
      poster,
    } = payload.body

    const movies = sql`
        insert into movies
          (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
        values
          (${name}, ${release_date},${duration},${genres},${directed_by},${casts},${synopsis},${poster} )
        returning id`

    return movies
  }

  static async _updateMovie(payload) {
    const { id } = payload.params
    const {
      name,
      release_date,
      duration,
      genres,
      directed_by,
      casts,
      synopsis,
      poster,
    } = payload.body

    const movies = await sql`update movies set
        name=${name},
        release_date=${release_date},
        duration=${duration},
        genres=${genres},
        directed_by=${directed_by},
        casts=${casts},
        synopsis=${synopsis},
        poster=${poster}
        where id=${id} RETURNING id;`

    return movies
  }

  static async _deleteMovie(payload) {
    const { id } = payload.params
    const movies = await sql`DELETE FROM movies where id=${id} RETURNING id;`
    return movies
  }
}

module.exports = MovieModel
