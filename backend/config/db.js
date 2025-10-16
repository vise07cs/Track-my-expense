const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("track-my-expense","root","Admin@123",{
    dialect:"mysql",
    host:"localhost"
})
sequelize.authenticate().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})

module.exports=sequelize;