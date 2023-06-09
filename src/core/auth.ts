import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "strategy-94851",
});

const getAuthToken = (req: any, _: any, next: any) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

export const checkIfAuthenticated = (req: any, res: any, next: any) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
        console.log(e);
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};