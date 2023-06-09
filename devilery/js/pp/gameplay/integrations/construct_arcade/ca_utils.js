import { Globals } from "../../../pp/globals";

let _myDummyServer = null;
let _myUseDummyServerOnSDKMissing = false;
let _myUseDummyServerOnError = false;

export let CAError = {
    DUMMY_NOT_INITIALIZED: 0,
    CA_SDK_MISSING: 1,
    SUBMIT_SCORE_FAILED: 2,
    GET_LEADERBOARD_FAILED: 3,
    GET_USER_FAILED: 4,
    USER_HAS_NO_SCORE: 5
};

export function setUseDummyServerOnSDKMissing(useDummyServer) {
    _myUseDummyServerOnSDKMissing = useDummyServer;
}

export function setUseDummyServerOnError(useDummyServer) {
    _myUseDummyServerOnError = useDummyServer;
}

export function setDummyServer(dummyServer) {
    _myDummyServer = dummyServer;
}

export function isUseDummyServerOnSDKMissing() {
    return _myUseDummyServerOnSDKMissing;
}

export function isUseDummyServerOnError() {
    return _myUseDummyServerOnError;
}

export function getDummyServer() {
    return _myDummyServer;
}

export function isSDKAvailable(engine = Globals.getMainEngine()) {
    return "casdk" in Globals.getWindow(engine);
}

export function getSDK(engine = Globals.getMainEngine()) {
    return Globals.getWindow(engine).casdk;
}

export function getLeaderboard(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError, useDummyServerOverride = null, engine = Globals.getMainEngine()) {
    if (isSDKAvailable(engine)) {
        let casdk = getSDK(engine);
        if (!aroundPlayer) {
            casdk.getLeaderboard(leaderboardID, ascending, aroundPlayer, scoresAmount).then(function (result) {
                if (result.leaderboard) {
                    if (callbackOnDone) {
                        callbackOnDone(result.leaderboard);
                    }
                } else {
                    if (_myDummyServer != null && _myDummyServer.getLeaderboard != null &&
                        (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                        getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
                    } else if (callbackOnError) {
                        let error = {};
                        error.reason = "Get leaderboard failed";
                        error.type = CAError.GET_LEADERBOARD_FAILED;
                        callbackOnError(error, result);
                    }
                }
            }).catch(function (result) {
                if (_myDummyServer != null && _myDummyServer.getLeaderboard != null &&
                    (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                    getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
                } else if (callbackOnError) {
                    let error = {};
                    error.reason = "Get leaderboard failed";
                    error.type = CAError.GET_LEADERBOARD_FAILED;
                    callbackOnError(error, result);
                }
            });
        } else {
            getUser(
                function (user) {
                    let userName = user.displayName;
                    casdk.getLeaderboard(leaderboardID, ascending, aroundPlayer, scoresAmount).then(function (result) {
                        if (result.leaderboard) {
                            let userValid = false;
                            for (let value of result.leaderboard) {
                                if (value.displayName == userName && value.score != 0) {
                                    userValid = true;
                                    break;
                                }
                            }
                            if (userValid) {
                                if (callbackOnDone) {
                                    callbackOnDone(result.leaderboard);
                                }
                            } else {
                                if (_myDummyServer != null && _myDummyServer.getLeaderboard != null &&
                                    (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                                    getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
                                } else if (callbackOnError) {
                                    let error = {};
                                    error.reason = "Searching for around player but the user has not submitted a score yet";
                                    error.type = CAError.USER_HAS_NO_SCORE;
                                    callbackOnError(error, result);
                                }
                            }
                        } else {
                            if (_myDummyServer != null && _myDummyServer.getLeaderboard != null &&
                                (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                                getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
                            } else if (callbackOnError) {
                                let error = {};
                                error.reason = "Get leaderboard failed";
                                error.type = CAError.GET_LEADERBOARD_FAILED;
                                callbackOnError(error, result);
                            }
                        }
                    }).catch(function (result) {
                        if (_myDummyServer != null && _myDummyServer.getLeaderboard != null &&
                            (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                            getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
                        } else if (callbackOnError) {
                            let error = {};
                            error.reason = "Get leaderboard failed";
                            error.type = CAError.GET_LEADERBOARD_FAILED;
                            callbackOnError(error, result);
                        }
                    });

                },
                function () {
                    if (_myDummyServer != null && _myDummyServer.getLeaderboard != null &&
                        (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                        getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
                    } else if (callbackOnError) {
                        let error = {};
                        error.reason = "Searching for around player but the user can't be retrieved";
                        error.type = CAError.GET_USER_FAILED;
                        callbackOnError(error, result);
                    }
                },
                false,
                engine);
        }
    } else {
        if (_myDummyServer != null && _myDummyServer.getLeaderboard != null &&
            (_myUseDummyServerOnSDKMissing && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
            getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
        } else if (callbackOnError) {
            let error = {};
            error.reason = "Construct Arcade SDK missing";
            error.type = CAError.CA_SDK_MISSING;
            callbackOnError(error, null);
        }
    }
}

export function getLeaderboardDummy(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError) {
    if (_myDummyServer) {
        _myDummyServer.getLeaderboard(leaderboardID, ascending, aroundPlayer, scoresAmount, callbackOnDone, callbackOnError);
    } else {
        if (callbackOnError) {
            let error = {};
            error.reason = "Dummy server not initialized";
            error.type = CAError.DUMMY_NOT_INITIALIZED;
            callbackOnError(error);
        }
    }
}

export function submitScore(leaderboardID, scoreToSubmit, callbackOnDone, callbackOnError, useDummyServerOverride = null, engine = Globals.getMainEngine()) {
    if (isSDKAvailable(engine)) {
        let casdk = getSDK(engine);

        casdk.submitScore(leaderboardID, scoreToSubmit).then(function (result) {
            if (result.error) {
                if (_myDummyServer != null && _myDummyServer.submitScore != null &&
                    (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                    submitScoreDummy(leaderboardID, scoreToSubmit, callbackOnDone, callbackOnError);
                } else if (callbackOnError) {
                    let error = {};
                    error.reason = "Submit score failed";
                    error.type = CAError.SUBMIT_SCORE_FAILED;
                    callbackOnError(error, result);
                }
            } else {
                callbackOnDone();
            }
        }).catch(function (result) {
            if (_myDummyServer != null && _myDummyServer.submitScore != null &&
                (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                submitScoreDummy(leaderboardID, scoreToSubmit, callbackOnDone, callbackOnError);
            } else if (callbackOnError) {
                let error = {};
                error.reason = "Submit score failed";
                error.type = CAError.SUBMIT_SCORE_FAILED;
                callbackOnError(error, result);
            }
        });
    } else {
        if (_myDummyServer != null && _myDummyServer.submitScore != null &&
            (_myUseDummyServerOnSDKMissing && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
            submitScoreDummy(leaderboardID, scoreToSubmit, callbackOnDone, callbackOnError);
        } else if (callbackOnError) {
            let error = {};
            error.reason = "Construct Arcade SDK missing";
            error.type = CAError.CA_SDK_MISSING;
            callbackOnError(error, null);
        }
    }
}

export function submitScoreDummy(leaderboardID, scoreToSubmit, callbackOnDone, callbackOnError) {
    if (_myDummyServer) {
        _myDummyServer.submitScore(leaderboardID, scoreToSubmit, callbackOnDone, callbackOnError);
    } else {
        if (callbackOnError) {
            let error = {};
            error.reason = "Dummy server not initialized";
            error.type = CAError.DUMMY_NOT_INITIALIZED;
            callbackOnError(error);
        }
    }
}

export function getUser(callbackOnDone, callbackOnError, useDummyServerOverride = null, engine = Globals.getMainEngine()) {
    if (isSDKAvailable(engine)) {
        let casdk = getSDK(engine);

        casdk.getUser().then(function (result) {
            if (result.user) {
                if (callbackOnDone) {
                    callbackOnDone(result.user);
                }
            } else {
                if (_myDummyServer != null && _myDummyServer.getUser != null &&
                    (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                    getUserDummy(callbackOnDone, callbackOnError);
                } else if (callbackOnError) {
                    let error = {};
                    error.reason = "Get user failed";
                    error.type = CAError.GET_USER_FAILED;
                    callbackOnError(error, result);
                }
            }
        }).catch(function (result) {
            if (_myDummyServer != null && _myDummyServer.getUser != null &&
                (_myUseDummyServerOnError && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
                getUserDummy(callbackOnDone, callbackOnError);
            } else if (callbackOnError) {
                let error = {};
                error.reason = "Get user failed";
                error.type = CAError.GET_USER_FAILED;
                callbackOnError(error, result);
            }
        });
    } else {
        if (_myDummyServer != null && _myDummyServer.getUser != null &&
            (_myUseDummyServerOnSDKMissing && useDummyServerOverride == null) || (useDummyServerOverride != null && useDummyServerOverride)) {
            getUserDummy(callbackOnDone, callbackOnError);
        } else if (callbackOnError) {
            let error = {};
            error.reason = "Construct Arcade SDK missing";
            error.type = CAError.CA_SDK_MISSING;
            callbackOnError(error, null);
        }
    }
}

export function getUserDummy(callbackOnDone, callbackOnError) {
    if (_myDummyServer) {
        _myDummyServer.getUser(callbackOnDone, callbackOnError);
    } else {
        if (callbackOnError) {
            let error = {};
            error.reason = "Dummy server not initialized";
            error.type = CAError.DUMMY_NOT_INITIALIZED;
            callbackOnError(error);
        }
    }
}

export let CAUtils = {
    setUseDummyServerOnSDKMissing,
    setUseDummyServerOnError,
    setDummyServer,
    isUseDummyServerOnSDKMissing,
    isUseDummyServerOnError,
    getDummyServer,
    isSDKAvailable,
    getSDK,
    getLeaderboard,
    getLeaderboardDummy,
    submitScore,
    submitScoreDummy,
    getUser,
    getUserDummy
};