const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate');

const auth = require("../util/authCheck");


router.post('/candidates/register',auth.isAdmin,candidateController.createNewCandidate);

// api/candidates                       --  Get all Candidates
// api/candidates?skip=0&limit=50       --  Get particular range of candidates based on skip and limit
router.get('/candidates',auth.isBoth,candidateController.getAllCandidates);

//Find candidates by name (or starts by/contains that name)
router.post('/candidates/name-filter',auth.isBoth,candidateController.getAllCandidatesByName);

router.get('/candidates/:candidateId',auth.isBoth,candidateController.getSingleCandidateDetails);

router.post('/candidates/suggestions',auth.isUser,candidateController.getAllCandidateSuggestions);

router.patch('/candidates/:candidateId',auth.isAdmin,candidateController.editSingleCandidate);

//Hire candidate
router.get('/candidates/:candidateId/hire',auth.isAdmin,candidateController.hireSingleCandidate);

router.delete('/candidates/:candidateId',auth.isAdmin,candidateController.deleteSingleCandidate);


module.exports = router;
