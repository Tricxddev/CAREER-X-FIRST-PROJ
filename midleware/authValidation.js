//Validate email entry


const emailEntryVaildate = async(req,res,next)=>{
    const {userFName, userLName, userDob, usergender, userMail, userPword, userPhone, useraddress, 
        userPlan}= req.body 

        const err = []
        
        if(!userFName){
            return err.push({msg:"First Name Should not be empty, Kindly check"})
        }
        if(!userLName){
            return err.push({msg:"Last Name Should not be empty, Kindly check"})
        }
        if(!userMail){
            return res.push({msg:"Please Enters your Email"})
        }else if(!validEmail(userMail)){
            return err.push("Email not in right format")
        }
        if(!userPword){
            return err.push({msg:"Please Enters your Password"})
        }
        // if(!userPlan){
        //     return res.push({msg:"Plan Number Required"})
        // }
        if(userPword.length >10){
            return err.push({msg:"Password lenght exeeded, please check"})
        }
        if(err.length>0){
           return res.status(400).json({msg:err})
        }
        next()

};

const validateLogin = async(req,res,next)=>{
    const {userMail,userPword}= req.body
    const err=[]
    if(!userMail || !userPword){
        return err.push("PLEASE ENTER CORRECT CREDENTIALS")
    }else if(!validEmail(userMail)){
        return err.push("WRONG EMAIL FORMAT ENTERED")
    }
    if(err.length > 0){
        return res.status(400).json({msg:err})
    }
    next()
}

// Validate Email With Regex
const validEmail = (userMail) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userMail).toLowerCase());
}
module.exports = {validEmail,emailEntryVaildate,validateLogin} ;
