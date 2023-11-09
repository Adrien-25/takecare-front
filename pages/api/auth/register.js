// const { hash } = require("bcryptjs");
// const User = require("../../../models/user");
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { hash } from "bcryptjs";
import mongoose from "mongoose";

const handler = async (req, res) => {
  try {
    await mongooseConnect();
    // console.log("test");
    if (req.method === "POST") {
      if (!req.body) {
        return res.status(400).json({ error: "Les données sont manquantes" });
      }

      const { name, email, password,role,city,postalCode,streetAddress,country } = req.body;

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
        // const role = "user";
        // const city = "";
        // const postalCode = "";
        // const streetAddress = "";
        // const country = "";

        // return res.status(300).json({ city });

        User.create({
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
          city: city,
          postalCode: postalCode,
          streetAddress: streetAddress,
          country: country,
        })
          .then((data) => {
            const user = {
              email: data.email,
              name: data.name,
              _id: data._id,
              role: data.role,
              city: data.city,
              postalCode: data.postalCode,
              streetAddress: data.streetAddress,
              country: data.country,
            };

            return res.status(201).json({
              success: true,
              user,
            });
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              // MongoDB retournera un tableau

              for (let field in error.errors) {
                const msg = error.errors[field].message;
                return res.status(409).json({ error: msg });
              }
            }

            return res
              .status(500)
              .json({ error: "Erreur lors de la création du compte" });
          });
      }
    } else {
      res.status(405).json({ error: "Méthode Non Autorisée" });
    }
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// module.exports = handler;
export default handler;
