

function validateCreateUser(requestBody)
{
    let requiredFields = ['username', 'firstname', 'surname', 'email', 'password'];

    for(i in requiredFields){
        key = requiredFields[i];
        //first validate if all required fields are present
        if(! (key in requestBody)){
            return{
                result: "ERROR",
                message: `Required field not present: ${key}.`
            };
        }
        //now validate if they have values or not
        if(requestBody.key == ""){
            return{
                result: "ERROR",
                message: `Required field cannot be empty: ${key}.`
            };
        }
    }

    //now validate the password
    if(requestBody.password.length < 8){
        return({
            result: "ERROR",
            message: `Password must have at least 8 characters.`
        });
    }


    return true;
}

function validateLoginUser(requestBody)
{
    const requiredFields = ['username', 'password'];
    for(i in requiredFields){
        key = requiredFields[i];
        //first validate if all required fields are present
        if(! (key in requestBody)){
            return{
                result: "ERROR",
                message: `Required field not present: ${key}.`
            };
        }
        //now validate if they have values or not
        if(requestBody.key == ""){
            return{
                result: "ERROR",
                message: `Required field cannot be empty: ${key}.`
            };
        }
    }

    return true;
}


module.exports = {
    validateCreateUser,
    validateLoginUser
  }