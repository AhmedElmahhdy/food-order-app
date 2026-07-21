import {User} from "../user.entity";
import {db} from "../../../common/knex/knex";


const user_columns = [
    'id','email','name','phone','password_hash','system_role','created_at','updated_at','deleted_at'
]


function  toEntity(row:any  ){
    return new User({
        id: row.id,
        email: row.email,
        phone: row.phone,
        passwordHash: row.password_hash,
        systemRole: row.system_role,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        deletedAt: row.deleted_at,

    })
}


export async  function  findUserByEmail(email: string): Promise<User | undefined> {

    const row = await db("users").select(
        user_columns,
    ).where('email', email).whereNull('deleted_at').first();


    console.log("row", row);

    return row ? toEntity(row) : undefined
}

// check user exist or not
export async  function  findUserByEmailOrPhone(email: string , phone: string): Promise<Boolean> {
    const userExist = await db.raw(`
        SELECT EXISTS (SELECT 1 FROM users WHERE email = ? or phone = ?) AS "exists"
    `,[email, phone])

    return userExist.rows[0].exists
}

export async function createUser(user: Partial <User>): Promise<User> {

    const row = await db("users").insert({
        email: user.email,
        phone: user.phone,
        name: user.name,
        password_hash: user.passwordHash,
        system_role:user.systemRole,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        }
    ).returning(user_columns);

    return toEntity(row)

}

