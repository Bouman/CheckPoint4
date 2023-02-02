const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "katas" });
  }

  

  insert(katas) {
    return this.connection.query(
      `insert into ${this.table}(lastname, firstname, email, password, admin) values (?, ?, ?, ?, ?);`,
      [
        katas.lastname,
        katas.firstname,
        katas.email,
        katas.hashedPassword,
        katas.admin,
      ]
    );
  }

  readForLogin(katas) {
    return this.connection.query(
      `select * from ${this.table} where email = ?;`,
      [katas.email]
    );
  }

  update(katas) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ? , email = ?, password = ? where id = ?`,
      [
        katas.firstname,
        katas.lastname,
        katas.email,
        katas.hashedPassword,
        katas.id,
      ]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = UsersManager;
