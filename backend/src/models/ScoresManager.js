const AbstractManager = require("./AbstractManager");

class scoresManager extends AbstractManager {
  constructor() {
    super({ table: "scores" });
  }

  findscores(id) {
        return this.connection.query(`select * from  ${this.table} where id_speedruns = ?`, [
        id,
      ]);
  }

  insert(scores) {
    return this.connection.query(
      `insert into ${this.table} (id_try, id_users, id_speedruns, id_katas, solution, brain_time, exec_time) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        scores.id_try,
        scores.id_users,
        scores.id_speedruns,
        scores.id_katas,
        scores.solution,
        scores.brain_time,
        scores.exec_time,
      ]
    );
  }

  update(scores) {
    return this.connection.query(
      `update ${this.table} set id_try = ?, id_users = ?, id_speedruns = ?, id_katas = ?, solution = ?, brain_time = ?, exec_time = ? where id = ?`,
      [
        scores.id_try,
        scores.id_users,
        scores.id_speedruns,
        scores.id_katas,
        scores.solution,
        scores.brain_time,
        scores.exec_time,
        scores.id_try,
      ]
    );
  }
}

module.exports = scoresManager;
