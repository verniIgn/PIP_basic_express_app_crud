let __swords = null

class Sword {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

class Swords {
  constructor() {
    this.data = []
    this.next_id = 0

    let seed = [
      "Kengo Golden Dragon Sword",
      "Ghost Katana",
      "Bloody Ebony"
    ]
    seed.forEach( (name) => this.data.push(new Sword(++this.next_id, name)) )
  }

  static get_instance() {
    return (__swords ? __swords : new Swords())
  }

  delete(criteria, callback) {
    this.findOne(criteria, (err, sword) => {
      if (err) {
        callback(err, null)
        return
      }

      this.data.splice(this.data.indexOf(sword), 1)
      callback(null, sword)
    })
  }

  find(criteria, callback) {
    callback(null, this.data)
  }

  findOne(criteria, callback) {
    if (criteria._id) {
      let id = Number(criteria._id)
      if (isNaN(id)) {
        handle_error(`Invalid ID: ${criteria._id}`, callback)
        return
      }

      let sword = this.data.find( (sword) => sword.id === id )
      sword ? callback(null, sword) : handle_error(`Not found: ID ${id}`, callback)
      return
    }
    handle_error(`No valid criteria submitted to findOne(): ${JSON.stringify(criteria)}`, callback)
  }

  findAndModify(criteria, data, callback) {
    this.findOne(criteria, (err, sword) => {
      if (err) {
        callback(err, null)
        return
      }

      if (data.name) {
        sword.name = data.name
        callback(null, sword)
      } else {
        handle_error(`Invalid fields provided: ${JSON.stringify(data)}`, callback)
      }
    })
  }

  insert(data, callback) {
    if (!data.name) {
      handle_error("No name provided", callback)
      return
    }

    let sword = new Sword(++this.next_id, data.name)
    this.data.push(sword)
    callback(null, sword)
  }
}

function handle_error(message, callback) {
  let error = new Error(message)
  callback(error.message, null)
  console.error(error)
  return error.message
}


module.exports = Swords.get_instance()