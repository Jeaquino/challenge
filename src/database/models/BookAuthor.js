module.exports = (sequelize, dataTypes) => {
    let alias = 'BookAuthor';
    let cols = {
      Id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      AuthorId:{
        type: dataTypes.INTEGER,
        allowNull: false
      },
      BookId:{
        type: dataTypes.INTEGER,
        allowNull: false
      },

     
    };
    let config = {
      tableName: 'booksauthors',
      timestamps: false
    };
    const BookAuthor = sequelize.define(alias, cols, config);
  
    BookAuthor.associate = function (models) {
      BookAuthor.belongsTo(models.Author, {
        as: 'author',
        foreingKey: 'AuthorId',
        timestamps: false
      });
      BookAuthor.belongsTo(models.Book, {
        as: 'book',
        foreingKey: 'BookId',
        timestamps: false
      });
    };
  
    return BookAuthor;
  };