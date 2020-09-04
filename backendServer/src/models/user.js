const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    employeeNumber: DataTypes.NUMBER,
    email: DataTypes.TEXT,
    simplePass: DataTypes.TEXT,
    role: DataTypes.TEXT,
  });
  User.associate = (models) => {
    User.hasMany(models.FeaRequestModel, {
      onDelete: "cascade",
    });

    // adding additional methods
    User.findByLogin = async (login) => {
      let logUser = await User.findOne({
        where: { name: login },
      });
      if (!logUser) {
        logUser = await User.findOne({
          where: { email: login },
        });
      }
    };
  };

  return User;
};
export default user;