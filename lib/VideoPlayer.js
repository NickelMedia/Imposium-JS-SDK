"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analytics_1 = require("./Analytics");
var VideoPlayer = /** @class */ (function () {
    function VideoPlayer() {
    }
    VideoPlayer.evts = [0.25, 0.5, 0.75];
    VideoPlayer.checkDelay = 100;
    VideoPlayer.ref = null;
    VideoPlayer.currExp = '';
    VideoPlayer.lastEvtFired = 0;
    VideoPlayer.updateId = false;
    VideoPlayer.startSent = false;
    VideoPlayer.finishedSent = false;
    /*
        Assign the tracking events to a video player reference
     */
    VideoPlayer.setup = function (ref) {
        if (ref instanceof HTMLVideoElement) {
            VideoPlayer.ref = ref;
            VideoPlayer.updateId = true;
            VideoPlayer.ref.addEventListener('loadstart', function () { return VideoPlayer.onLoad(); });
            VideoPlayer.ref.addEventListener('play', function () { return VideoPlayer.onPlay(); });
            VideoPlayer.ref.addEventListener('pause', function () { return VideoPlayer.onPause(); });
            VideoPlayer.ref.addEventListener('ended', function () { return VideoPlayer.onEnd(); });
        }
        else {
            throw new Error('The video player reference passed to ImposiumClient.setupAnalytics is not of type HTMLVideoElement');
        }
    };
    /*
        Store the experience ID related to the video currently being displayed
     */
    VideoPlayer.updateExperienceID = function (id) {
        VideoPlayer.currExp = id;
    };
    /*
        Record video view hits
     */
    VideoPlayer.onLoad = function () {
        var currExp = VideoPlayer.currExp;
        Analytics_1.default.send({
            t: 'event',
            ec: 'video_player',
            ea: 'view',
            el: currExp
        });
    };
    /*
        Start listening for playback progress when video starts playing
     */
    VideoPlayer.onPlay = function () {
        var checkDelay = VideoPlayer.checkDelay, checkProgress = VideoPlayer.checkProgress, progressCheckInterval = VideoPlayer.progressCheckInterval;
        clearInterval(progressCheckInterval);
        VideoPlayer.progressCheckInterval = setInterval(function () { return checkProgress(); }, checkDelay);
    };
    /*
        Measure video playback percentage record analytics at defined intervals
     */
    VideoPlayer.checkProgress = function () {
        var ref = VideoPlayer.ref, evts = VideoPlayer.evts, lastEvtFired = VideoPlayer.lastEvtFired, currExp = VideoPlayer.currExp, progressCheckInterval = VideoPlayer.progressCheckInterval;
        if (ref) {
            var currentTime = ref.currentTime, duration = ref.duration;
            var perc = currentTime / duration;
            var next = evts[lastEvtFired];
            if (perc > next) {
                Analytics_1.default.send({
                    t: 'event',
                    ec: 'video_player',
                    ea: 'playback_' + next,
                    el: currExp
                });
                VideoPlayer.lastEvtFired++;
            }
        }
        else {
            clearInterval(progressCheckInterval);
        }
    };
    /*
        Clear progress interval on video pause
     */
    VideoPlayer.onPause = function () {
        var progressCheckInterval = VideoPlayer.progressCheckInterval;
        clearInterval(progressCheckInterval);
    };
    /*
        Handle cleaning up once video finishes playing
     */
    VideoPlayer.onEnd = function () {
        var currExp = VideoPlayer.currExp, progressCheckInterval = VideoPlayer.progressCheckInterval;
        clearInterval(progressCheckInterval);
        Analytics_1.default.send({
            t: 'event',
            ec: 'video_player',
            ea: 'playback_1',
            el: currExp
        });
        VideoPlayer.lastEvtFired = 0;
    };
    return VideoPlayer;
}());
exports.default = VideoPlayer;
//# sourceMappingURL=VideoPlayer.js.map