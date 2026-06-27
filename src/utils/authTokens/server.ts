import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = ({
  id,
  email,
  role,
}: TokenPayload): string | null => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET environment variable is missing.");
      return null;
    }

    return jwt.sign(
      {
        id,
        email,
        role,
      },
      jwtSecret,
      { expiresIn: "12d" },
    );
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || !token) { 
      return null;
    } 

    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
    return decoded;
  } catch (error) {
    // Returns null if signature is invalid, tampered with, or expired
    console.error("Token verification failed or expired:", error);
    return null;
  }
};
 
