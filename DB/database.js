const mongoose=require("mongoose")

class databaseConection{
    constructor()
    {
        this.databasecom()
    }

    databasecom(){
        mongoose.connect("mongodb://localhost:27017/SkillTest")
        mongoose.connection.once('open',()=>{
            console.log("database connected sucessfully");
        })

        mongoose.connection.on('on',()=>{
            console.log("database connection failled");
        })
    }
}

module.exports=databaseConection


