import express from 'express';
import authRouter from './auth.js';
import noticeRouter from './notice.js'; // New route for notices
import editprofRouter from './editProf.js';
import companyDetails from './companydetails.js';
import removeCV from './resumedelet.js';
import uploadCV from './resumeadd.js';
import profile from './profile.js';

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.send("API is working");
});

router.use("/auth", authRouter);

router.use("/notices", noticeRouter); // Add notice routes
router.use("/editProf",editprofRouter);
router.use('/company', companyDetails);
router.use('/uploadcv', uploadCV);
router.use('/removecv', removeCV);
router.use('/profile', profile);


export default router;
