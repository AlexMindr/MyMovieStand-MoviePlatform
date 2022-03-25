import jwt from 'jsonwebtoken'

const jwtSecret=process.env.JWT_SECRET;

const auth = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];

      let decodedData;
      if (token) {
         decodedData = jwt.verify(token, jwtSecret)

         req.userId = decodedData?.uuid
         //req.userRole= decodedData?.role
      }

      next();

   } catch (error) {
      console.log(error);
   }
}

export default auth;