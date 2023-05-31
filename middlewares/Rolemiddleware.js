const ROLES = {
    "SuperAdmin": "SuperAdmin",
    "Admin": "Admin",
    "Gerant": "Gerant"
}

const inRole  = (...roles)=>(req, res, next)=>{
    console.log(req.user)
    const role =  roles.find(role=> req.user.role === role)
    if(!role){
      return res.status(401).json({message: "no access"})
    }
     next()
}

module.exports = {
    inRole,
    ROLES
}