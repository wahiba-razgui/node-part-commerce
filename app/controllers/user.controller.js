var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.getAll = (req, res) => {
    User.find({}, {password: false})
        .populate([{path: 'roles', transform: (doc, id) => doc === null ? '' : doc.name}])
        .exec(function (err, users) {
                if (err) {
                    res.status(400).send({message: 'error on getting all tool'});
                } else {
                    res.send(users);
                }
            }
        );
}

exports.delete = (req, res) => {
    User.findByIdAndRemove({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            res.status(500).send({message: 'Error deleting user'});
        } else {
            res.send({message: 'User was deleted successfully'});
        }
    });
}

exports.update = (req, res) => {
    User.findByIdAndUpdate({
            _id: req.params.id
        }
        , {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            }
        }, {
            upsert: true,
            new: true
        }, function (err, user) {
            if (err) {
                res.send({message: 'error updating user'});
            } else {
                if (req.body.roles && req.body.roles.length) {
                    Role.find(
                        {
                            name: {$in: req.body.roles}
                        },
                        (err, roles) => {
                            if (err) {
                                res.status(500).send({message: err});
                            }
                            User.updateOne({_id: req.body._id}, {
                                $set: {
                                    roles: roles.map(role => role._id)
                                }
                            }, (err) => {
                                if (err) {
                                    res.status(500).send({message: err});
                                }
                                res.send({message: "User was updated successfully!"});
                            });
                        }
                    );
                } else {
                    Role.findOne({name: "user"}, (err, role) => {
                        if (err) {
                            res.status(500).send({message: err});
                            return;
                        }

                        user.roles = [role._id];
                        user.updateOne({_id: user._id}, err => {
                            if (err) {
                                res.status(500).send({message: err});
                                return;
                            }
                            res.send({message: "User was updated successfully!"});
                        });
                    });
                }
            }
        });
}

 




