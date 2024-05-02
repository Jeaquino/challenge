module.exports=(sequelize,dataTypes)=>{
    let alias="BooksAuthors"
    let cols={
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        AuthorId:{
            type:dataTypes.INTEGER,
            allowNull:false
        },
        BookId:{
            type:dataTypes.INTEGER,
            allowNull:false
        }
    }
    let config={
        tableName:"booksauthors",
        timestamps: false,
      
    }

    const booksAuthors=sequelize.define(alias,cols,config)

    return booksAuthors
}