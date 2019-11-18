var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });
  //Method for checking unhashed password with hashed one for validation
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  //Hook so that before the user is created, the password will be hashed with the middleware

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
