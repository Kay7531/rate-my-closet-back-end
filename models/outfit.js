'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Outfit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Outfit.belongsTo(models.Profile, { foreignKey: 'profileId' })
      
    }
  }
  Outfit.init({
    photo: DataTypes.STRING,
    description: DataTypes.STRING,
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Outfit',
  });
  return Outfit;
};