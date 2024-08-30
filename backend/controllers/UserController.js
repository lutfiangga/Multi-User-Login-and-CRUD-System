import Users from "../models/UserModel.js"
import argon2 from "argon2"

export const getUsers = async(req, res) =>{
    try {
        const response = await Users.findAll({
            attributes:['uuid','name','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
    
}
export const getUsersById = async(req, res) =>{
    try {
        const response = await Users.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
export const createUsers = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;
    if(!password) return res.status(404).json({msg:'harap isi password'});
    if(password !== confPassword) return res.status(400).json({msg:'password tidak sama'});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json({msg:'register berhasil'})
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}
export const updateUsers = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        const { name, email, password, confPassword, role } = req.body;
        let hashPassword;

        if (!password) {
            hashPassword = user.password; // Use existing password if not provided
        } else {
            if (password !== confPassword) {
                return res.status(400).json({ msg: 'Password tidak sama' });
            }
            hashPassword = await argon2.hash(password);
        }

        await Users.update(
            {
                name: name,
                email: email,
                password: hashPassword,
                role: role,
            },
            {
                where: {
                    id: user.id,
                },
            }
        );

        res.status(200).json({ msg: 'Update user berhasil' }); // Only one response here
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUsers = async(req, res) =>{
 try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg:"user tidak ditemukan"});
        try {
            await Users.destroy({
                where: {
                    id: user.id
                }
            });
            res.status(200).json({msg:'delete user berhasil'})
        } catch (error) {
            res.status(400).json({msg:error.message});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}