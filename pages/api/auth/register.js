// const { hash } = require("bcryptjs");
// const User = require("../../../models/user");
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { hash } from "bcryptjs";

const handler = async (req, res) => {
  try {
    await mongooseConnect();
    console.log("test");
    if (req.method === "POST") {
      if (!req.body) {
        return res.status(400).json({ error: "Les données sont manquantes" });
      }

      const { fullName, email, password } = req.body;

      const userExists = await User.findOne({ email });
      //   return res.status(200).json({ userExists});

      if (userExists) {
        return res.status(409).json({ error: "L'utilisateur existe déjà" });
      } else {
        if (password.length < 6) {
          return res
            .status(409)
            .json({ error: "Le mot de passe doit comporter 6 caractères" });
        }

        const hashedPassword = await hash(password, 12);
        // return res.status(200).json({ email });

        User.create({
          fullName,
          email,
          password: hashedPassword,
        })
          .then((data) => {
            const user = {
              email: data.email,
              fullName: data.fullName,
              _id: data._id,
            };

            return res.status(201).json({
              success: true,
              user,
            });
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              // MongoDB retournera un tableau
              // mais nous ne voulons afficher qu'une seule erreur à la fois

              for (let field in error.errors) {
                const msg = error.errors[field].message;
                return res.status(409).json({ error: msg });
              }
            }

            return res
              .status(500)
              .json({ error: "Erreur lors de la création du compte" });
          });

        // User.create(
        //   {
        //     fullName,
        //     email,
        //     password: hashedPassword,
        //   },
        //   (error, data) => {
        //     if (error && error instanceof mongoose.Error.ValidationError) {
        //       // MongoDB retournera un tableau

        //       for (let field in error.errors) {
        //         const msg = error.errors[field].message;
        //         return res.status(409).json({ error: msg });
        //       }
        //     }

        //     const user = {
        //       email: data.email,
        //       fullName: data.fullName,
        //       _id: data._id,
        //     };

        //     return res.status(201).json({
        //       success: true,
        //       user,
        //     });
        //   }
        // );
      }
    } else {
      res.status(405).json({ error: "Méthode Non Autorisée" });
    }
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports = handler;
