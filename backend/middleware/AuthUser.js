import Users from '../models/UserModel.js'

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId) return res.status(401).json({msg: 'mohon login terlebih dahulu'});
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });        
    if(!user) return res.status(404).json({msg:"user tidak ditemukan"});
    // res.status(200).json(user);
    req.userId = user.id;
    req.role = user.role;
    next();
}
export const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });        
    if(!user) return res.status(404).json({msg:"user tidak ditemukan"});
    if(user.role !== 'admin') return res.status(403).json({msg:"akses terlarang"});
    next();
}