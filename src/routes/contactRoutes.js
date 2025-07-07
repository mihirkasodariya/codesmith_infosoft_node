import express from 'express';
const router = express.Router();
import { validateAccessToken } from "../middleware/auth.js";
import { jobApplicationPDF } from '../utils/multer.js';
import {
    addBusinessInquiry,
    getAllInquiries,
    getInquiry,
    markInquiry,
    addJobApplication,
    getAllJobApplication,
    getJobApplication,
    markJobApplication,
    addGetInTouch,
    getAllGetInTouch,
    addSubscribe,
    getGetInTouch,
    getAllSubscribe,
    markGetInTouch,
} from '../controllers/contactController.js';

router.post('/addBusinessInquiry', addBusinessInquiry);
router.get('/getAllInquiries', validateAccessToken, getAllInquiries);
router.get('/getInquiry/:id', validateAccessToken, getInquiry);
router.put('/markInquiry/:id', validateAccessToken, markInquiry);

router.post('/addJobApplication', jobApplicationPDF, addJobApplication);
router.get('/getAllJobApplication', validateAccessToken, getAllJobApplication);
router.get('/getJobApplication/:id', validateAccessToken, getJobApplication);
router.put('/markJobApplication/:id', validateAccessToken, markJobApplication);

router.post('/addGetInTouch', addGetInTouch);
router.get('/getAllGetInTouch', validateAccessToken, getAllGetInTouch);
router.get('/getGetInTouch/:id', validateAccessToken, getGetInTouch);
router.put('/markGetInTouch/:id', validateAccessToken, markGetInTouch);

router.post('/addSubscribe', addSubscribe);
router.get('/getAllSubscribe', validateAccessToken, getAllSubscribe);

export default router;