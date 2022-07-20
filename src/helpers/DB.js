class DB {
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

  async findAll(instance) {
    try {
      const rows = await instance.findAll();
      // console.log({ data });
      return rows;
    } catch (e) {
      console.error({ e });
      return [];
    }
  }
}

module.exports = new DB();
