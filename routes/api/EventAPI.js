var express = require("express");
var router = express.Router();
const eventController = require('../../components/events/EventController');

// http://localhost:3000/api/event/getAllEvent
// lấy tất cả event
router.get('/getAllEvent', async (req, res, next) => {
    try {
        const events = await eventController.getAllEvent();
        return res.status(200).json({result: true,  events: events});
    } catch (error) {
        return res.status(500).json({result: false, events: null});
    }
})

module.exports = router;