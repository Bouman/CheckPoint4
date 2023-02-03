class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id, tableliaison) {
    if(tableliaison){
      return this.connection.query(`SELECT * FROM ${this.table} INNER JOIN ${tableliaison}_${this.table} ON id_${tableliaison} = ? WHERE ${tableliaison}_${this.table}.id_${this.table} = ${this.table}.id`, [
        id,
      ]);
    } else{
        return this.connection.query(`select * from  ${this.table} where id = ?`, [
        id,
      ]);
    }
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  updateliaison(id, users, tableliaison, secondcolumn) {
    let values = "";
    users.forEach((el) => {
      values += `, (${id},${el.id})`;
    });
    values = values.substring(1);
    this.connection.query(
      `DELETE FROM ${tableliaison} WHERE EXISTS(SELECT id_${this.table} WHERE id_${this.table} = ${id});`
    );
    return this.connection.query(
      `INSERT INTO ${tableliaison} (id_${this.table}, ${secondcolumn}) VALUES ${values};`
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }

  setConnection(connection) {
    this.connection = connection;
  }
}

module.exports = AbstractManager;
