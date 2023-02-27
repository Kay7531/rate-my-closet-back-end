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
      Outfit.belongsTo(models.Profile, { as:'author', foreignKey: 'profileId' })
      Outfit.hasMany(models.Comment, {as: 'comments', foreignKey: 'outfitId'})
    }
  }
  Outfit.init({
    photo: {
      type:DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
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