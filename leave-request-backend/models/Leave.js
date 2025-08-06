module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StartDate: {
      type: DataTypes.DATEONLY, 
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    }
  }, {
    timestamps: false,
    tableName: 'LeaveRequests'
  });

  Leave.associate = (models) => {
    Leave.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return Leave;
};
