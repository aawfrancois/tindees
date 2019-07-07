import { Model } from 'sequelize'
import bcrypt from 'bcrypt'

const MIN_PASSWORD_LENGHT = 4;

export default class User extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                uuid: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: true,
                    },
                    unique: {
                        args: true,
                        msg: "Email adress already in use",
                    },
                },
                password_digest: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.VIRTUAL,
                    validate: {
                        isLongEnough(val) {
                            if (val.length < MIN_PASSWORD_LENGHT) {
                                throw new Error("Password is too short")
                            }
                        },
                    },
                },
                password_confirmation: {
                    type: DataTypes.VIRTUAL,
                    validate: {
                        isEqual(val) {
                            if (this.password !== val) {
                                throw new Error("Passwords don't match")
                            }
                        },
                    },
                },
                firstname: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                lastname: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                birthdate: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                country: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                city: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                zipCode: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: true,
                }
            },
            {
                sequelize,
                tableName: "user",
                hooks: {
                    beforeValidate: async user => {
                        if(user.isNewRecord) {
                            user.password_digest = await user.generatePasswordHash(user.password);
                        }
                    },
                    beforeSave: async user => {
                        if (user.changed("password")) {
                            if (user.password !== user.password_confirmation) {
                                throw new Error("Passwords don't match");
                            }
                            user.password_digest = await user.generatePasswordHash(user.password);
                        }
                    }
                },
            },
        )
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password_digest)
    }

    async generatePasswordHash() {
        // we choose ~10 hashes/sec

        const SALT_ROUNDS = 10

        // auto-generate a salt and hash the password
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS)

        if (!hash) {
            throw new Error("USER.PASSWORD.HASH_MESSAGE")
        }

        return hash
    }

    toJson() {
        const obj = Object.assign({}, this.get());
        delete obj.password_digest;
        delete obj.password;
        delete obj.password_confirmation;
        return obj;
    }
}
