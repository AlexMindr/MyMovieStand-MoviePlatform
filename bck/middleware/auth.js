import jwt, { decode } from 'jsonwebtoken'


const auth = async (req, res, next) => {
   const jwtSecret=process.env.JWT_SECRET;
   try {
      if(req.headers.authorization){

      const token =req.headers.authorization.split(" ")[1];

      let decodedData;
      if (token) {
         decodedData = jwt.verify(token, jwtSecret)

         req.userId = decodedData?.useruuid
         //req.userRole= decodedData?.role
  
      }
      }

      next();

   } catch (error) {
      console.log(error);
   }
}

export default auth;