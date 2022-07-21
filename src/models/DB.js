class DB {
  /**
   * Inserts data into table
   * @param {*} instance
   * @param {*} data
   * @returns table data
   */
  async insert(instance, data) {
    try {
      const response = await instance.create(data);
      return response.dataValues;
    } catch (e) {
      // console.error({ e });
      // throw e;
      return e;
    }
  }

  /**
   * Fetches all records from database based on option
   * @param {*} instance
   * @param {*} options
   * @returns Array
   */
  async findAll(instance, options = { raw: true }) {
    try {
      const rows = await instance.findAll(options);
      return rows;
    } catch (e) {
      return [];
    }
  }
}

module.exports = new DB();
