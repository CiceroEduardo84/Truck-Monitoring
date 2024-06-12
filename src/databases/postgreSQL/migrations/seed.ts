import { postgreSqlConnection } from "..";
import { userAdmin } from "../../../configs/userAdmin";

export async function createdAdminUser() {
  try {
    if (!userAdmin.email || !userAdmin.password) {
      throw new Error(
        "As variáveis de ambiente ADMIN_EMAIL ou ADMIN_PASSWORD não estão definidas"
      );
    }

    const db = await postgreSqlConnection();

    const quarySQL = "SELECT * FROM users WHERE email = $1;";
    const res = await db.query(quarySQL, [userAdmin.email]);
    // console.log(res.rowCount);
    
    // if (res.rowCount) {
    //   console.error("Usuário admin já existe!");
    //   return;
    // }

    // const passwordHash = await bcrypt.hash(userAdmin.password, 10);
    // const createdAdminUser = await prisma.users.create({
    //   data: {
    //     name: userAdmin.name,
    //     email: userAdmin.email,
    //     password: passwordHash,
    //     is_admin: userAdmin.isAdmin,
    //   },
    // });
    // console.log("Usuário admin criado com sucesso:", createdAdminUser);
  } catch (error) {
    console.error("Erro ao criar usuário admin:", error);
  }
}
